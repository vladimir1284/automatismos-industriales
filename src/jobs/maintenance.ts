import { TelegramApi } from '../telegram/api';
import { inlineKeyboard } from '../telegram/keyboard';
import { MESSAGES } from '../render/messages';

/**
 * Hourly maintenance job:
 * 1. Expire change requests older than TTL (7 days)
 * 2. Lock courses whose deadline_at has passed
 * 3. Clean processed_updates older than 48 hours
 * 4. Clean sessions inactive for > 30 mins
 * 5. Notify teachers if pending requests exist
 */
export async function processMaintenanceJob(env: any, api: TelegramApi) {
  const ttlDays = parseInt(env.REQUEST_TTL_DAYS || '7', 10);

  // 1. Expire old pending requests
  const expiredReqs = await env.DB.prepare(`
    SELECT * FROM change_requests
     WHERE status = 'pending' AND created_at < datetime('now', '-' || ? || ' days')
  `).bind(ttlDays).all<any>();

  if (expiredReqs.results && expiredReqs.results.length > 0) {
    for (const req of expiredReqs.results) {
      await env.DB.prepare('UPDATE change_requests SET status = "expired" WHERE id = ?').bind(req.id).run();

      await api.sendMessage({
        chat_id: req.requested_by_telegram_user_id,
        text: MESSAGES.requestExpiredStudentMsg(),
      });

      // Update teacher card message to remove action buttons
      if (req.admin_chat_id && req.admin_message_id) {
        await api.editMessageReplyMarkup({
          chat_id: req.admin_chat_id,
          message_id: req.admin_message_id,
          reply_markup: inlineKeyboard([]),
        });
      }
    }
  }

  // 2. Lock courses with deadline passed
  const coursesToLock = await env.DB.prepare(`
    SELECT * FROM courses
     WHERE changes_locked = 0 AND deadline_at IS NOT NULL AND deadline_at <= datetime('now')
  `).all<any>();

  if (coursesToLock.results && coursesToLock.results.length > 0) {
    for (const course of coursesToLock.results) {
      await env.DB.prepare('UPDATE courses SET changes_locked = 1 WHERE id = ?').bind(course.id).run();

      if (course.telegram_chat_id) {
        await api.sendMessage({
          chat_id: course.telegram_chat_id,
          text: MESSAGES.lockNoticeGroup(),
        });
      }
    }
  }

  // 3. Clean old processed_updates (> 48h)
  await env.DB.prepare('DELETE FROM processed_updates WHERE at < datetime("now", "-2 days")').run();

  // 4. Clean inactive sessions (> 30 min)
  await env.DB.prepare('DELETE FROM sessions WHERE updated_at < datetime("now", "-30 minutes")').run();

  // 5. Notify teachers of pending requests
  const pendingCountRes = await env.DB.prepare('SELECT COUNT(*) as count FROM change_requests WHERE status = "pending"').first<{ count: number }>();
  const pendingCount = pendingCountRes?.count ?? 0;

  if (pendingCount > 0) {
    const teacherUserIds = (env.TEACHER_USER_IDS || '').split(',').map((s: string) => s.trim()).filter(Boolean);
    for (const teacherIdStr of teacherUserIds) {
      const teacherId = parseInt(teacherIdStr, 10);
      if (!isNaN(teacherId)) {
        await api.sendMessage({
          chat_id: teacherId,
          text: `🔔 Hay ${pendingCount} solicitudes de cambio de variante pendientes de revisión. Usa /solicitudes para atenderlas.`,
        });
      }
    }
  }
}
