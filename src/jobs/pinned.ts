import { TelegramApi } from '../telegram/api';
import { renderPinnedMessage, AssignedVariantRow } from '../render/pinned';

/**
 * Checks all courses with pinned_dirty = 1, regenerates the pinned table message,
 * and updates the pinned message in the Telegram group.
 */
export async function processPinnedJob(env: any, api: TelegramApi) {
  const dirtyCourses = await env.DB.prepare('SELECT * FROM courses WHERE pinned_dirty = 1')
    .all<any>();

  if (!dirtyCourses.results || dirtyCourses.results.length === 0) {
    return;
  }

  for (const course of dirtyCourses.results) {
    if (!course.telegram_chat_id) continue;

    // Fetch assignments with variant title and assigned students
    const assignmentsRes = await env.DB.prepare(`
      SELECT v.id as variant_id, v.title as variant_title, v.capacity, p.full_name
        FROM assignments a
        JOIN variants v ON a.variant_id = v.id
        JOIN people p ON a.person_id = p.id
       WHERE a.course_id = ?
       ORDER BY v.id ASC
    `).bind(course.id).all<any>();

    const map = new Map<number, AssignedVariantRow>();
    (assignmentsRes.results || []).forEach((row) => {
      if (!map.has(row.variant_id)) {
        map.set(row.variant_id, {
          variant_id: row.variant_id,
          variant_title: row.variant_title,
          people_names: [],
          capacity: row.capacity,
        });
      }
      map.get(row.variant_id)!.people_names.push(row.full_name);
    });

    const rows = Array.from(map.values());

    const totalAssignedRes = await env.DB.prepare('SELECT COUNT(*) as count FROM assignments WHERE course_id = ?')
      .bind(course.id).first<{ count: number }>();
    const totalAssigned = totalAssignedRes?.count ?? 0;

    const totalCapRes = await env.DB.prepare('SELECT SUM(capacity) as total_cap FROM variants WHERE active = 1')
      .first<{ total_cap: number }>();
    const totalCap = totalCapRes?.total_cap ?? 65;

    const freeCount = Math.max(0, totalCap - totalAssigned);

    const unassignedPeopleRes = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM people
       WHERE course_id = ? AND active = 1 AND id NOT IN (SELECT person_id FROM assignments WHERE course_id = ?)
    `).bind(course.id, course.id).first<{ count: number }>();
    const unassignedCount = unassignedPeopleRes?.count ?? 0;

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const messageText = renderPinnedMessage(
      course.name,
      rows,
      totalAssigned,
      freeCount,
      unassignedCount,
      env.VARIANTS_SOURCE_URL || 'https://automatismos.ladetec.com/proyectos/',
      nowStr
    );

    let edited = false;
    if (course.pinned_message_id) {
      const editRes = await api.editMessageText({
        chat_id: course.telegram_chat_id,
        message_id: course.pinned_message_id,
        text: messageText,
      });
      if (editRes) edited = true;
    }

    if (!edited) {
      const sent = await api.sendMessage({
        chat_id: course.telegram_chat_id,
        text: messageText,
      });
      if (sent) {
        await api.pinChatMessage({
          chat_id: course.telegram_chat_id,
          message_id: sent.message_id,
          disable_notification: true,
        });
        await env.DB.prepare('UPDATE courses SET pinned_message_id = ? WHERE id = ?')
          .bind(sent.message_id, course.id).run();
      }
    }

    await env.DB.prepare('UPDATE courses SET pinned_dirty = 0 WHERE id = ?')
      .bind(course.id).run();
  }
}
