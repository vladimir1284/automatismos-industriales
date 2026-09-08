import { TelegramApi } from '../telegram/api';
import { callbackButton, inlineKeyboard } from '../telegram/keyboard';
import { MESSAGES } from '../render/messages';
import { assignVariantAtomic, swapVariantAtomic } from '../domain/assignment';
import { checkRateLimit, logAudit } from '../domain/audit';

export async function handleCallbackQuery(
  api: TelegramApi,
  db: D1Database,
  query: any,
  env: any
) {
  const queryId = query.id;
  const userId = query.from.id;
  const data = query.data;
  const message = query.message;

  await api.answerCallbackQuery({ callback_query_id: queryId });

  if (!data) return;
  const parts = data.split('|');
  const action = parts[0];

  if (action === 'x') {
    // Cancel
    await db.prepare('DELETE FROM sessions WHERE telegram_user_id = ?').bind(userId).run();
    if (message) {
      await api.editMessageText({
        chat_id: message.chat.id,
        message_id: message.message_id,
        text: MESSAGES.cancelled(),
      });
    }
    return;
  }

  if (action === 'm') {
    const sub = parts[1];
    const session = await db.prepare('SELECT course_id FROM sessions WHERE telegram_user_id = ?').bind(userId).first<any>();
    const courseId = session?.course_id ?? 1;

    if (sub === 'pick') {
      await db.prepare('UPDATE sessions SET state = "PICK_WHO", updated_at = datetime("now") WHERE telegram_user_id = ?').bind(userId).run();

      const buttons = inlineKeyboard([
        [
          callbackButton('Para mí', 'w|self'),
          callbackButton('Para otro alumno', 'w|other'),
        ],
      ]);

      if (message) {
        await api.editMessageText({
          chat_id: message.chat.id,
          message_id: message.message_id,
          text: MESSAGES.pickWho(),
          reply_markup: buttons,
        });
      }
    } else if (sub === 'myvar') {
      const link = await db.prepare('SELECT p.full_name, a.variant_id, v.title, v.url FROM telegram_links l JOIN people p ON l.person_id = p.id LEFT JOIN assignments a ON a.person_id = p.id AND a.course_id = l.course_id LEFT JOIN variants v ON a.variant_id = v.id WHERE l.course_id = ? AND l.telegram_user_id = ?')
        .bind(courseId, userId)
        .first<any>();

      if (!link) {
        if (message) await api.editMessageText({ chat_id: message.chat.id, message_id: message.message_id, text: MESSAGES.notLinkedMsg() });
        return;
      }

      if (link.variant_id) {
        if (message) await api.editMessageText({ chat_id: message.chat.id, message_id: message.message_id, text: MESSAGES.myVariantInfo(link.full_name, link.variant_id, link.title, link.url) });
      } else {
        if (message) await api.editMessageText({ chat_id: message.chat.id, message_id: message.message_id, text: MESSAGES.noVariantLinked(link.full_name) });
      }
    }
    return;
  }

  if (action === 'w') {
    const who = parts[1];
    const session = await db.prepare('SELECT course_id FROM sessions WHERE telegram_user_id = ?').bind(userId).first<any>();
    const courseId = session?.course_id ?? 1;

    if (who === 'self') {
      const link = await db.prepare('SELECT person_id FROM telegram_links WHERE course_id = ? AND telegram_user_id = ?').bind(courseId, userId).first<{ person_id: number }>();

      if (link) {
        await db.prepare('UPDATE sessions SET state = "PICK_VARIANT_INPUT", payload = ?, updated_at = datetime("now") WHERE telegram_user_id = ?')
          .bind(JSON.stringify({ person_id: link.person_id, for_self: true }), userId)
          .run();

        if (message) {
          await api.editMessageText({
            chat_id: message.chat.id,
            message_id: message.message_id,
            text: MESSAGES.searchVariantPrompt(env.VARIANTS_SOURCE_URL),
          });
        }
      } else {
        await db.prepare('UPDATE sessions SET state = "PICK_PERSON_INPUT", payload = ?, updated_at = datetime("now") WHERE telegram_user_id = ?')
          .bind(JSON.stringify({ for_self: true }), userId)
          .run();

        if (message) {
          await api.editMessageText({
            chat_id: message.chat.id,
            message_id: message.message_id,
            text: MESSAGES.searchStudentPrompt(),
          });
        }
      }
    } else {
      await db.prepare('UPDATE sessions SET state = "PICK_PERSON_INPUT", payload = ?, updated_at = datetime("now") WHERE telegram_user_id = ?')
        .bind(JSON.stringify({ for_self: false }), userId)
        .run();

      if (message) {
        await api.editMessageText({
          chat_id: message.chat.id,
          message_id: message.message_id,
          text: MESSAGES.searchStudentPrompt(),
        });
      }
    }
    return;
  }

  if (action === 'p') {
    const personIdStr = parts[1];
    const forSelf = parts[2] === '1';

    if (personIdStr === 'retry') {
      await db.prepare('UPDATE sessions SET state = "PICK_PERSON_INPUT" WHERE telegram_user_id = ?').bind(userId).run();
      if (message) await api.editMessageText({ chat_id: message.chat.id, message_id: message.message_id, text: MESSAGES.searchStudentPrompt() });
      return;
    }

    const personId = parseInt(personIdStr, 10);
    const session = await db.prepare('SELECT course_id FROM sessions WHERE telegram_user_id = ?').bind(userId).first<any>();
    const courseId = session?.course_id ?? 1;

    // Link if for_self
    if (forSelf) {
      await db.prepare('INSERT OR IGNORE INTO telegram_links (person_id, course_id, telegram_user_id, telegram_username) VALUES (?, ?, ?, ?)')
        .bind(personId, courseId, userId, query.from.username ?? null)
        .run();
    }

    // Check if target person already has a variant
    const currentAssign = await db.prepare('SELECT a.variant_id, a.created_by_telegram_user_id, a.created_by_person_id, v.title FROM assignments a JOIN variants v ON a.variant_id = v.id WHERE a.course_id = ? AND a.person_id = ?')
      .bind(courseId, personId)
      .first<any>();

    const course = await db.prepare('SELECT * FROM courses WHERE id = ?').bind(courseId).first<any>();
    const isLocked = course?.changes_locked === 1;

    if (currentAssign) {
      // Check actor identity
      const actorLink = await db.prepare('SELECT person_id FROM telegram_links WHERE course_id = ? AND telegram_user_id = ?')
        .bind(courseId, userId)
        .first<{ person_id: number }>();

      const isSameStudent = actorLink?.person_id === personId;
      const isCreator = currentAssign.created_by_telegram_user_id === userId || (actorLink && currentAssign.created_by_person_id === actorLink.person_id);

      const canDirectChange = !isLocked && (isSameStudent || isCreator);

      if (!canDirectChange) {
        const person = await db.prepare('SELECT full_name FROM people WHERE id = ?').bind(personId).first<any>();
        await db.prepare('UPDATE sessions SET state = "PICK_VARIANT_INPUT", payload = ? WHERE telegram_user_id = ?')
          .bind(JSON.stringify({ person_id: personId, for_self: forSelf, is_request: true }), userId)
          .run();

        const buttons = inlineKeyboard([
          [
            callbackButton('Solicitar cambio al profesor', 'v_req_start'),
            callbackButton('Cancelar', 'x'),
          ],
        ]);

        if (message) {
          await api.editMessageText({
            chat_id: message.chat.id,
            message_id: message.message_id,
            text: MESSAGES.alreadyHasVariantNotice(person.full_name, currentAssign.variant_id, currentAssign.title),
            reply_markup: buttons,
          });
        }
        return;
      }
    }

    await db.prepare('UPDATE sessions SET state = "PICK_VARIANT_INPUT", payload = ? WHERE telegram_user_id = ?')
      .bind(JSON.stringify({ person_id: personId, for_self: forSelf }), userId)
      .run();

    if (message) {
      await api.editMessageText({
        chat_id: message.chat.id,
        message_id: message.message_id,
        text: MESSAGES.searchVariantPrompt(env.VARIANTS_SOURCE_URL),
      });
    }
    return;
  }

  if (action === 'v_req_start') {
    if (message) {
      await api.editMessageText({
        chat_id: message.chat.id,
        message_id: message.message_id,
        text: MESSAGES.searchVariantPrompt(env.VARIANTS_SOURCE_URL),
      });
    }
    return;
  }

  if (action === 'v') {
    const variantIdStr = parts[1];
    if (variantIdStr === 'retry') {
      await db.prepare('UPDATE sessions SET state = "PICK_VARIANT_INPUT" WHERE telegram_user_id = ?').bind(userId).run();
      if (message) await api.editMessageText({ chat_id: message.chat.id, message_id: message.message_id, text: MESSAGES.searchVariantPrompt(env.VARIANTS_SOURCE_URL) });
      return;
    }

    const variantId = parseInt(variantIdStr, 10);
    const session = await db.prepare('SELECT * FROM sessions WHERE telegram_user_id = ?').bind(userId).first<any>();
    const courseId = session?.course_id ?? 1;
    const payload = session.payload ? JSON.parse(session.payload) : {};
    const personId = payload.person_id;

    const variant = await db.prepare('SELECT * FROM variants WHERE id = ?').bind(variantId).first<any>();

    const occ = await db.prepare('SELECT COUNT(*) as count FROM assignments WHERE course_id = ? AND variant_id = ?').bind(courseId, variantId).first<{ count: number }>();
    if ((occ?.count ?? 0) >= variant.capacity) {
      if (message) await api.sendMessage({ chat_id: message.chat.id, text: MESSAGES.variantOccupied(variantId) });
      return;
    }

    if (payload.is_request) {
      await db.prepare('UPDATE sessions SET state = "REQUEST_REASON", payload = ? WHERE telegram_user_id = ?')
        .bind(JSON.stringify({ ...payload, to_variant_id: variantId }), userId)
        .run();

      if (message) {
        await api.editMessageText({
          chat_id: message.chat.id,
          message_id: message.message_id,
          text: `Escribe el motivo del cambio (o envía /omitir si no deseas indicar ninguno).`,
        });
      }
      return;
    }

    const { proceedToVariantConfirmation } = await import('../flows/assign');
    await proceedToVariantConfirmation(api, env, userId, courseId, personId, variant, payload);
    return;
  }

  if (action === 'ok') {
    const personId = parseInt(parts[1], 10);
    const variantId = parseInt(parts[2], 10);

    const session = await db.prepare('SELECT course_id FROM sessions WHERE telegram_user_id = ?').bind(userId).first<any>();
    const courseId = session?.course_id ?? 1;

    // Check rate limit for non-teachers
    const teacherUserIds = (env.TEACHER_USER_IDS || '').split(',').map((s: string) => parseInt(s.trim(), 10)).filter((n: number) => !isNaN(n));
    if (!teacherUserIds.includes(userId)) {
      const allowed = await checkRateLimit(db, userId, parseInt(env.RATE_LIMIT_PER_DAY || '5', 10));
      if (!allowed) {
        if (message) await api.editMessageText({ chat_id: message.chat.id, message_id: message.message_id, text: MESSAGES.rateLimited() });
        return;
      }
    }

    const actorLink = await db.prepare('SELECT person_id FROM telegram_links WHERE course_id = ? AND telegram_user_id = ?').bind(courseId, userId).first<{ person_id: number }>();
    const actorPersonId = actorLink?.person_id ?? null;

    const currentAssign = await db.prepare('SELECT variant_id FROM assignments WHERE course_id = ? AND person_id = ?').bind(courseId, personId).first<{ variant_id: number }>();

    let res;
    if (currentAssign) {
      res = await swapVariantAtomic(db, courseId, personId, currentAssign.variant_id, variantId, userId, actorPersonId, 'student');
    } else {
      res = await assignVariantAtomic(db, courseId, variantId, personId, userId, actorPersonId, 'student');
    }

    await db.prepare('DELETE FROM sessions WHERE telegram_user_id = ?').bind(userId).run();

    if (!res.success) {
      if (message) await api.editMessageText({ chat_id: message.chat.id, message_id: message.message_id, text: MESSAGES.variantJustTaken(variantId) });
      return;
    }

    const variant = await db.prepare('SELECT * FROM variants WHERE id = ?').bind(variantId).first<any>();
    const person = await db.prepare('SELECT full_name FROM people WHERE id = ?').bind(personId).first<any>();

    if (message) {
      await api.editMessageText({
        chat_id: message.chat.id,
        message_id: message.message_id,
        text: MESSAGES.assignSuccess(variant.id, variant.title, variant.url, env.GENERAL_TASKS_URL),
      });
    }

    const course = await db.prepare('SELECT telegram_chat_id FROM courses WHERE id = ?').bind(courseId).first<any>();
    if (course?.telegram_chat_id) {
      let announceText = '';
      if (actorPersonId === personId) {
        announceText = MESSAGES.announceSelf(person.full_name, variant.title);
      } else {
        const actorName = actorPersonId ? (await db.prepare('SELECT full_name FROM people WHERE id = ?').bind(actorPersonId).first<any>())?.full_name : 'Un usuario';
        announceText = MESSAGES.announceThirdParty(actorName || 'Un usuario', person.full_name, variant.title);
      }

      await api.sendMessage({
        chat_id: course.telegram_chat_id,
        text: announceText,
        disable_notification: true,
      });
    }
    return;
  }

  if (action === 'rq') {
    const teacherUserIds = (env.TEACHER_USER_IDS || '').split(',').map((s: string) => parseInt(s.trim(), 10)).filter((n: number) => !isNaN(n));
    if (!teacherUserIds.includes(userId)) {
      await api.answerCallbackQuery({ callback_query_id: queryId, text: 'No autorizado.', show_alert: true });
      return;
    }

    const requestId = parseInt(parts[1], 10);
    const decision = parts[2]; // 'ap' or 'rj'

    const req = await db.prepare('SELECT * FROM change_requests WHERE id = ? AND status = "pending"').bind(requestId).first<any>();

    if (!req) {
      await api.answerCallbackQuery({ callback_query_id: queryId, text: 'Esta solicitud ya fue procesada o expiró.', show_alert: true });
      if (message) {
        await api.editMessageReplyMarkup({ chat_id: message.chat.id, message_id: message.message_id, reply_markup: inlineKeyboard([]) });
      }
      return;
    }

    const courseId = req.course_id;
    const personId = req.person_id;
    const toVariantId = req.to_variant_id;
    const fromVariantId = req.from_variant_id;

    if (decision === 'ap') {
      let swapRes;
      if (fromVariantId) {
        swapRes = await swapVariantAtomic(db, courseId, personId, fromVariantId, toVariantId, userId, null, 'request');
      } else {
        swapRes = await assignVariantAtomic(db, courseId, toVariantId, personId, userId, null, 'request');
      }

      if (swapRes.success) {
        await db.prepare('UPDATE change_requests SET status = "approved", resolved_at = datetime("now"), resolved_by = ? WHERE id = ? AND status = "pending"')
          .bind(userId, requestId)
          .run();

        const toVariant = await db.prepare('SELECT * FROM variants WHERE id = ?').bind(toVariantId).first<any>();
        const person = await db.prepare('SELECT full_name FROM people WHERE id = ?').bind(personId).first<any>();

        if (message) {
          await api.editMessageText({
            chat_id: message.chat.id,
            message_id: message.message_id,
            text: message.text + `\n\n<b>[ ✅ APROBADA ]</b>`,
          });
        }

        await api.sendMessage({
          chat_id: req.requested_by_telegram_user_id,
          text: MESSAGES.requestApprovedStudentMsg(toVariant.id, toVariant.title),
        });

        const course = await db.prepare('SELECT telegram_chat_id FROM courses WHERE id = ?').bind(courseId).first<any>();
        if (course?.telegram_chat_id) {
          await api.sendMessage({
            chat_id: course.telegram_chat_id,
            text: MESSAGES.announceTeacher(person.full_name, toVariant.title),
            disable_notification: true,
          });
        }
      } else {
        await db.prepare('UPDATE change_requests SET status = "failed", resolved_at = datetime("now"), resolved_by = ? WHERE id = ? AND status = "pending"')
          .bind(userId, requestId)
          .run();

        if (message) {
          await api.editMessageText({
            chat_id: message.chat.id,
            message_id: message.message_id,
            text: message.text + `\n\n<b>[ ⚠️ FALLIDA — VARIANTE OCUPADA ]</b>`,
          });
        }

        await api.sendMessage({
          chat_id: req.requested_by_telegram_user_id,
          text: MESSAGES.requestFailedStudentMsg(toVariantId),
        });
      }
    } else if (decision === 'rj') {
      await db.prepare('UPDATE change_requests SET status = "rejected", resolved_at = datetime("now"), resolved_by = ? WHERE id = ? AND status = "pending"')
        .bind(userId, requestId)
        .run();

      if (message) {
        await api.editMessageText({
          chat_id: message.chat.id,
          message_id: message.message_id,
          text: message.text + `\n\n<b>[ ❌ RECHAZADA ]</b>`,
        });
      }

      await api.sendMessage({
        chat_id: req.requested_by_telegram_user_id,
        text: MESSAGES.requestRejectedStudentMsg(),
      });
    }
    return;
  }
}
