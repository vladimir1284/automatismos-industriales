import { TelegramApi } from '../telegram/api';
import { callbackButton, inlineKeyboard } from '../telegram/keyboard';
import { assignVariantAtomic, swapVariantAtomic, releaseAssignment } from '../domain/assignment';
import { logAudit } from '../domain/audit';
import { processVariantSyncJob } from '../jobs/syncVariants';
import { processPinnedJob } from '../jobs/pinned';

export async function handleTeacherCommand(
  api: TelegramApi,
  db: D1Database,
  teacherUserId: number,
  command: string,
  argsStr: string,
  env: any
) {
  const defaultCourse = await db.prepare('SELECT * FROM courses ORDER BY id DESC LIMIT 1').first<any>();
  if (!defaultCourse) {
    await api.sendMessage({ chat_id: teacherUserId, text: 'No hay cursos registrados en el sistema.' });
    return;
  }
  const courseId = defaultCourse.id;

  if (command === 'bloquear') {
    const parts = argsStr.trim().split(/\s+/).filter(Boolean);
    if (parts.length > 0) {
      // Bloquear alumno específico
      const targetName = parts.join(' ');
      const person = await db.prepare('SELECT id, full_name FROM people WHERE course_id = ? AND (full_name LIKE ? OR search_name LIKE ?)')
        .bind(courseId, `%${targetName}%`, `%${targetName.toLowerCase()}%`).first<any>();
      if (!person) {
        await api.sendMessage({ chat_id: teacherUserId, text: `No se encontró ningún alumno con "${targetName}".` });
        return;
      }
      await db.prepare('UPDATE people SET active = 0 WHERE id = ?').bind(person.id).run();
      await api.sendMessage({ chat_id: teacherUserId, text: `🔒 Alumno "${person.full_name}" bloqueado/desactivado.` });
    } else {
      // Bloquear curso completo
      await db.prepare('UPDATE courses SET changes_locked = 1 WHERE id = ?').bind(courseId).run();
      await api.sendMessage({ chat_id: teacherUserId, text: `🔒 Curso "${defaultCourse.name}" bloqueado.` });
    }
    return;
  }

  if (command === 'desbloquear') {
    const parts = argsStr.trim().split(/\s+/).filter(Boolean);
    if (parts.length > 0) {
      const targetName = parts.join(' ');
      const person = await db.prepare('SELECT id, full_name FROM people WHERE course_id = ? AND (full_name LIKE ? OR search_name LIKE ?)')
        .bind(courseId, `%${targetName}%`, `%${targetName.toLowerCase()}%`).first<any>();
      if (!person) {
        await api.sendMessage({ chat_id: teacherUserId, text: `No se encontró ningún alumno con "${targetName}".` });
        return;
      }
      await db.prepare('UPDATE people SET active = 1 WHERE id = ?').bind(person.id).run();
      await api.sendMessage({ chat_id: teacherUserId, text: `🔓 Alumno "${person.full_name}" desbloqueado/activado.` });
    } else {
      await db.prepare('UPDATE courses SET changes_locked = 0 WHERE id = ?').bind(courseId).run();
      await api.sendMessage({ chat_id: teacherUserId, text: `🔓 Curso "${defaultCourse.name}" desbloqueado.` });
    }
    return;
  }

  if (command === 'solicitudes') {
    const reqs = await db.prepare(`
      SELECT r.id, r.person_id, p.full_name as student_name, r.from_variant_id,
             vf.title as from_title, r.to_variant_id, vt.title as to_title,
             r.requested_by_telegram_user_id, r.reason, r.created_at
        FROM change_requests r
        JOIN people p ON r.person_id = p.id
        LEFT JOIN variants vf ON r.from_variant_id = vf.id
        JOIN variants vt ON r.to_variant_id = vt.id
       WHERE r.course_id = ? AND r.status = 'pending'
       ORDER BY r.created_at ASC
    `).bind(courseId).all<any>();

    if (!reqs.results || reqs.results.length === 0) {
      await api.sendMessage({ chat_id: teacherUserId, text: 'No hay solicitudes de cambio pendientes.' });
      return;
    }

    await api.sendMessage({ chat_id: teacherUserId, text: `📋 <b>Solicitudes pendientes (${reqs.results.length}):</b>` });

    for (const req of reqs.results) {
      const buttons = inlineKeyboard([
        [
          callbackButton('✅ Aprobar', `rq|${req.id}|ap`),
          callbackButton('❌ Rechazar', `rq|${req.id}|rj`),
        ],
      ]);

      const cardText =
        `🔔 <b>Petición #${req.id}</b>\n` +
        `Alumno: <b>${req.student_name}</b>\n` +
        `De: ${req.from_variant_id ? `${req.from_variant_id} — ${req.from_title}` : '(sin variante)'}\n` +
        `A: <b>${req.to_variant_id} — ${req.to_title}</b>\n` +
        `Motivo: <i>"${req.reason ? req.reason : 'Sin motivo'}"</i>`;

      await api.sendMessage({
        chat_id: teacherUserId,
        text: cardText,
        reply_markup: buttons,
      });
    }
    return;
  }

  if (command === 'asignar') {
    // /asignar <alumno> <nº variante>
    const match = argsStr.trim().match(/^(.+)\s+(\d+)$/);
    if (!match) {
      await api.sendMessage({ chat_id: teacherUserId, text: 'Uso: /asignar <nombre alumno> <nº variante>' });
      return;
    }
    const targetName = match[1].trim();
    const variantId = parseInt(match[2], 10);

    const person = await db.prepare('SELECT id, full_name FROM people WHERE course_id = ? AND (full_name LIKE ? OR search_name LIKE ?)')
      .bind(courseId, `%${targetName}%`, `%${targetName.toLowerCase()}%`).first<any>();
    if (!person) {
      await api.sendMessage({ chat_id: teacherUserId, text: `No se encontró el alumno "${targetName}".` });
      return;
    }

    const currentAssign = await db.prepare('SELECT variant_id FROM assignments WHERE course_id = ? AND person_id = ?')
      .bind(courseId, person.id).first<{ variant_id: number }>();

    let res;
    if (currentAssign) {
      res = await swapVariantAtomic(db, courseId, person.id, currentAssign.variant_id, variantId, teacherUserId, null, 'teacher');
    } else {
      res = await assignVariantAtomic(db, courseId, variantId, person.id, teacherUserId, null, 'teacher');
    }

    if (res.success) {
      const v = await db.prepare('SELECT title FROM variants WHERE id = ?').bind(variantId).first<any>();
      await api.sendMessage({ chat_id: teacherUserId, text: `✅ Variante ${variantId} — ${v?.title} asignada a ${person.full_name}.` });

      if (defaultCourse.telegram_chat_id) {
        await api.sendMessage({
          chat_id: defaultCourse.telegram_chat_id,
          text: `📌 El profesor ha asignado la variante <b>${variantId} — ${v?.title}</b> a <b>${person.full_name}</b>.`,
          disable_notification: true,
        });
      }
    } else {
      await api.sendMessage({ chat_id: teacherUserId, text: `⚠️ Error al asignar: ${res.reason}.` });
    }
    return;
  }

  if (command === 'liberar') {
    // /liberar <alumno | nº variante>
    const input = argsStr.trim();
    if (!input) {
      await api.sendMessage({ chat_id: teacherUserId, text: 'Uso: /liberar <nombre alumno | nº variante>' });
      return;
    }

    const varNum = parseInt(input, 10);
    if (!isNaN(varNum)) {
      // Liberar por número de variante
      const assigns = await db.prepare('SELECT a.person_id, p.full_name FROM assignments a JOIN people p ON a.person_id = p.id WHERE a.course_id = ? AND a.variant_id = ?')
        .bind(courseId, varNum).all<any>();

      if (!assigns.results || assigns.results.length === 0) {
        await api.sendMessage({ chat_id: teacherUserId, text: `La variante ${varNum} no tiene asignaciones.` });
        return;
      }

      for (const a of assigns.results) {
        await releaseAssignment(db, courseId, a.person_id, teacherUserId, 'teacher');
      }

      const v = await db.prepare('SELECT title FROM variants WHERE id = ?').bind(varNum).first<any>();
      await api.sendMessage({ chat_id: teacherUserId, text: `🔓 Variante ${varNum} liberada.` });

      if (defaultCourse.telegram_chat_id) {
        await api.sendMessage({
          chat_id: defaultCourse.telegram_chat_id,
          text: `🔓 La variante <b>${varNum} — ${v?.title}</b> ha quedado <b>libre</b>.`,
          disable_notification: true,
        });
      }
    } else {
      // Liberar por nombre de alumno
      const person = await db.prepare('SELECT id, full_name FROM people WHERE course_id = ? AND (full_name LIKE ? OR search_name LIKE ?)')
        .bind(courseId, `%${input}%`, `%${input.toLowerCase()}%`).first<any>();
      if (!person) {
        await api.sendMessage({ chat_id: teacherUserId, text: `No se encontró el alumno "${input}".` });
        return;
      }

      const current = await db.prepare('SELECT v.id, v.title FROM assignments a JOIN variants v ON a.variant_id = v.id WHERE a.course_id = ? AND a.person_id = ?')
        .bind(courseId, person.id).first<any>();

      if (!current) {
        await api.sendMessage({ chat_id: teacherUserId, text: `El alumno ${person.full_name} no tiene variante asignada.` });
        return;
      }

      await releaseAssignment(db, courseId, person.id, teacherUserId, 'teacher');
      await api.sendMessage({ chat_id: teacherUserId, text: `🔓 Liberada la variante de ${person.full_name}.` });

      if (defaultCourse.telegram_chat_id) {
        await api.sendMessage({
          chat_id: defaultCourse.telegram_chat_id,
          text: `🔓 La variante <b>${current.id} — ${current.title}</b> ha quedado <b>libre</b>.`,
          disable_notification: true,
        });
      }
    }
    return;
  }

  if (command === 'mover') {
    // /mover <alumno> <nº variante>
    const match = argsStr.trim().match(/^(.+)\s+(\d+)$/);
    if (!match) {
      await api.sendMessage({ chat_id: teacherUserId, text: 'Uso: /mover <nombre alumno> <nº variante destino>' });
      return;
    }
    const targetName = match[1].trim();
    const toVariantId = parseInt(match[2], 10);

    const person = await db.prepare('SELECT id, full_name FROM people WHERE course_id = ? AND (full_name LIKE ? OR search_name LIKE ?)')
      .bind(courseId, `%${targetName}%`, `%${targetName.toLowerCase()}%`).first<any>();
    if (!person) {
      await api.sendMessage({ chat_id: teacherUserId, text: `No se encontró el alumno "${targetName}".` });
      return;
    }

    const currentAssign = await db.prepare('SELECT variant_id FROM assignments WHERE course_id = ? AND person_id = ?')
      .bind(courseId, person.id).first<{ variant_id: number }>();

    const res = await swapVariantAtomic(db, courseId, person.id, currentAssign?.variant_id ?? null, toVariantId, teacherUserId, null, 'teacher');
    if (res.success) {
      const v = await db.prepare('SELECT title FROM variants WHERE id = ?').bind(toVariantId).first<any>();
      await api.sendMessage({ chat_id: teacherUserId, text: `✅ ${person.full_name} movido/a a variante ${toVariantId} — ${v?.title}.` });

      if (defaultCourse.telegram_chat_id) {
        await api.sendMessage({
          chat_id: defaultCourse.telegram_chat_id,
          text: `📌 El profesor ha asignado la variante <b>${toVariantId} — ${v?.title}</b> a <b>${person.full_name}</b>.`,
          disable_notification: true,
        });
      }
    } else {
      await api.sendMessage({ chat_id: teacherUserId, text: `⚠️ Error al mover: ${res.reason}.` });
    }
    return;
  }

  if (command === 'limite') {
    // /limite YYYY-MM-DD HH:MM
    const dateStr = argsStr.trim();
    if (!dateStr) {
      await api.sendMessage({ chat_id: teacherUserId, text: 'Uso: /limite YYYY-MM-DD HH:MM' });
      return;
    }
    await db.prepare('UPDATE courses SET deadline_at = ? WHERE id = ?').bind(dateStr, courseId).run();
    await api.sendMessage({ chat_id: teacherUserId, text: `📅 Fecha límite actualizada a: ${dateStr}` });
    return;
  }

  if (command === 'pendientes') {
    const peopleWithoutVar = await db.prepare(`
      SELECT full_name FROM people
       WHERE course_id = ? AND active = 1
         AND id NOT IN (SELECT person_id FROM assignments WHERE course_id = ?)
       ORDER BY full_name ASC
    `).bind(courseId, courseId).all<any>();

    const list = (peopleWithoutVar.results || []).map((p) => `• ${p.full_name}`).join('\n');
    await api.sendMessage({
      chat_id: teacherUserId,
      text: `<b>Alumnos sin variante (${peopleWithoutVar.results?.length ?? 0}):</b>\n\n${list || 'Todos tienen variante.'}`,
    });
    return;
  }

  if (command === 'historial') {
    const input = argsStr.trim();
    if (!input) {
      await api.sendMessage({ chat_id: teacherUserId, text: 'Uso: /historial <nombre alumno | nº variante>' });
      return;
    }

    const varNum = parseInt(input, 10);
    let logs;
    if (!isNaN(varNum)) {
      logs = await db.prepare('SELECT at, actor_role, action, detail FROM audit_log WHERE course_id = ? AND variant_id = ? ORDER BY id DESC LIMIT 20')
        .bind(courseId, varNum).all<any>();
    } else {
      const person = await db.prepare('SELECT id FROM people WHERE course_id = ? AND (full_name LIKE ? OR search_name LIKE ?)')
        .bind(courseId, `%${input}%`, `%${input.toLowerCase()}%`).first<any>();
      if (!person) {
        await api.sendMessage({ chat_id: teacherUserId, text: `No se encontró el alumno "${input}".` });
        return;
      }
      logs = await db.prepare('SELECT at, actor_role, action, detail FROM audit_log WHERE course_id = ? AND person_id = ? ORDER BY id DESC LIMIT 20')
        .bind(courseId, person.id).all<any>();
    }

    const lines = (logs.results || []).map((l) => `[${l.at}] (${l.actor_role}) ${l.action}: ${l.detail || ''}`).join('\n');
    await api.sendMessage({ chat_id: teacherUserId, text: `<pre>${lines || 'Sin historial.'}</pre>` });
    return;
  }

  if (command === 'sincronizar') {
    await api.sendMessage({ chat_id: teacherUserId, text: '🔄 Sincronizando variantes desde el sitio web...' });
    await processVariantSyncJob(env, api);
    await api.sendMessage({ chat_id: teacherUserId, text: '✅ Sincronización completada.' });
    return;
  }

  if (command === 'refrescar') {
    await db.prepare('UPDATE courses SET pinned_dirty = 1 WHERE id = ?').bind(courseId).run();
    await processPinnedJob(env, api);
    await api.sendMessage({ chat_id: teacherUserId, text: '✅ Mensaje fijado refrescado.' });
    return;
  }

  if (command === 'anunciar') {
    if (!argsStr.trim()) {
      await api.sendMessage({ chat_id: teacherUserId, text: 'Uso: /anunciar <texto a enviar al grupo>' });
      return;
    }
    if (defaultCourse.telegram_chat_id) {
      await api.sendMessage({
        chat_id: defaultCourse.telegram_chat_id,
        text: `📢 <b>Anuncio del profesor:</b>\n\n${argsStr.trim()}`,
      });
      await api.sendMessage({ chat_id: teacherUserId, text: '📢 Anuncio enviado al grupo.' });
    } else {
      await api.sendMessage({ chat_id: teacherUserId, text: 'No se ha configurado el ID del grupo para este curso.' });
    }
    return;
  }

  if (command === 'estado') {
    const totalV = await db.prepare('SELECT SUM(capacity) as cap FROM variants WHERE active = 1').first<{ cap: number }>();
    const totalCap = totalV?.cap ?? 65;

    const totalA = await db.prepare('SELECT COUNT(*) as cnt FROM assignments WHERE course_id = ?').bind(courseId).first<{ cnt: number }>();
    const totalAssigned = totalA?.cnt ?? 0;

    const unassigned = await db.prepare('SELECT COUNT(*) as cnt FROM people WHERE course_id = ? AND active = 1 AND id NOT IN (SELECT person_id FROM assignments WHERE course_id = ?)').bind(courseId, courseId).first<{ cnt: number }>();

    const pendingReqs = await db.prepare('SELECT COUNT(*) as cnt FROM change_requests WHERE course_id = ? AND status = "pending"').bind(courseId).first<{ cnt: number }>();

    const text =
      `<b>Estado del curso: ${defaultCourse.name}</b>\n\n` +
      `• Asignaciones: ${totalAssigned} / ${totalCap}\n` +
      `• Libres: ${Math.max(0, totalCap - totalAssigned)}\n` +
      `• Alumnos sin variante: ${unassigned?.cnt ?? 0}\n` +
      `• Solicitudes pendientes: ${pendingReqs?.cnt ?? 0}\n` +
      `• Cambios bloqueados: ${defaultCourse.changes_locked === 1 ? 'Sí' : 'No'}\n` +
      `• Asignación abierta: ${defaultCourse.assignment_open === 1 ? 'Sí' : 'No'}`;

    await api.sendMessage({ chat_id: teacherUserId, text });
    return;
  }

  if (command === 'exportar') {
    const rows = await db.prepare(
      'SELECT p.full_name, v.id as variant_id, v.title as variant_title, v.url, a.created_at, a.source FROM assignments a JOIN people p ON a.person_id = p.id JOIN variants v ON a.variant_id = v.id WHERE a.course_id = ? ORDER BY v.id ASC'
    )
      .bind(courseId)
      .all<any>();

    let csv = 'Alumno,Variante,Titulo,URL,Fecha,Origen\n';
    (rows.results || []).forEach((r) => {
      csv += `"${r.full_name}",${r.variant_id},"${r.variant_title}","${r.url}","${r.created_at}","${r.source}"\n`;
    });

    await api.sendMessage({
      chat_id: teacherUserId,
      text: `<pre>${csv}</pre>`,
    });
    return;
  }

  if (command === 'alumno_nuevo') {
    if (!argsStr.trim()) {
      await api.sendMessage({ chat_id: teacherUserId, text: 'Uso: /alumno_nuevo <Nombre Completo>' });
      return;
    }
    const fullName = argsStr.trim();
    const searchName = fullName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    await db.prepare('INSERT INTO people (course_id, full_name, search_name, origin, active) VALUES (?, ?, ?, "manual", 1)')
      .bind(courseId, fullName, searchName)
      .run();

    await api.sendMessage({ chat_id: teacherUserId, text: `✅ Alumno "${fullName}" creado con origen 'manual'.` });
    return;
  }

  await api.sendMessage({ chat_id: teacherUserId, text: `Comando /${command} no reconocido.` });
}
