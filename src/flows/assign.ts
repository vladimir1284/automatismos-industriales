import { TelegramApi } from '../telegram/api';
import { callbackButton, inlineKeyboard } from '../telegram/keyboard';
import { MESSAGES } from '../render/messages';
import { searchFuzzy } from '../search/fuzzy';
import { assignVariantAtomic, swapVariantAtomic } from '../domain/assignment';
import { checkRateLimit, logAudit } from '../domain/audit';

export interface Env {
  DB: D1Database;
  TELEGRAM_BOT_TOKEN: string;
  BOT_USERNAME: string;
  TEACHER_USER_IDS: string;
  VARIANTS_SOURCE_URL: string;
  GENERAL_TASKS_URL: string;
  RATE_LIMIT_PER_DAY?: string;
}

export async function handlePrivateStart(
  api: TelegramApi,
  env: Env,
  userId: number,
  courseId: number
) {
  const course = await env.DB.prepare('SELECT * FROM courses WHERE id = ?')
    .bind(courseId)
    .first<any>();

  if (!course) {
    await api.sendMessage({ chat_id: userId, text: 'Curso no encontrado.' });
    return;
  }

  await env.DB.prepare(
    'INSERT INTO sessions (telegram_user_id, course_id, state, updated_at) VALUES (?, ?, "MENU", datetime("now")) ON CONFLICT(telegram_user_id) DO UPDATE SET course_id = excluded.course_id, state = "MENU", payload = NULL, updated_at = datetime("now")'
  )
    .bind(userId, courseId)
    .run();

  if (course.assignment_open === 0) {
    await api.sendMessage({
      chat_id: userId,
      text: MESSAGES.menuClosed(),
    });
    return;
  }

  const assignedRes = await env.DB.prepare('SELECT COUNT(*) as count FROM assignments WHERE course_id = ?').bind(courseId).first<{ count: number }>();
  const totalAssigned = assignedRes?.count ?? 0;

  const capRes = await env.DB.prepare('SELECT SUM(capacity) as total_cap FROM variants WHERE active = 1').first<{ total_cap: number }>();
  const totalCapacity = capRes?.total_cap ?? 65;
  const freeCount = Math.max(0, totalCapacity - totalAssigned);

  const link = await env.DB.prepare('SELECT person_id FROM telegram_links WHERE course_id = ? AND telegram_user_id = ?')
    .bind(courseId, userId)
    .first<{ person_id: number }>();

  const buttons = [[callbackButton('Escoger variante', 'm|pick')]];
  if (link) {
    buttons.push([callbackButton('Ver mi variante', 'm|myvar')]);
  }

  await api.sendMessage({
    chat_id: userId,
    text: MESSAGES.menuWelcome(course.name, freeCount, totalCapacity),
    reply_markup: inlineKeyboard(buttons),
  });
}

export async function handlePrivateText(
  api: TelegramApi,
  env: Env,
  userId: number,
  text: string
) {
  const session = await env.DB.prepare('SELECT * FROM sessions WHERE telegram_user_id = ?')
    .bind(userId)
    .first<any>();

  if (!session || !session.course_id || session.state === 'IDLE') {
    await api.sendMessage({
      chat_id: userId,
      text: 'Usa /variante para iniciar una sesión.',
    });
    return;
  }

  const courseId = session.course_id;
  const payload = session.payload ? JSON.parse(session.payload) : {};

  if (session.state === 'PICK_PERSON_INPUT') {
    const people = await env.DB.prepare(
      'SELECT id, full_name, search_name FROM people WHERE course_id = ? AND active = 1'
    )
      .bind(courseId)
      .all<any>();

    const candidates = (people.results || []).map((p) => ({
      item: p,
      searchTitle: p.search_name || p.full_name,
    }));

    const matched = searchFuzzy(text, candidates, 0.45, 3);

    if (matched.length === 0) {
      const attempts = (payload.attempts || 0) + 1;
      if (attempts >= 3) {
        await env.DB.prepare('DELETE FROM sessions WHERE telegram_user_id = ?').bind(userId).run();
        await api.sendMessage({
          chat_id: userId,
          text: MESSAGES.searchStudentNotFound(),
        });
        return;
      }

      await env.DB.prepare('UPDATE sessions SET payload = ?, updated_at = datetime("now") WHERE telegram_user_id = ?')
        .bind(JSON.stringify({ ...payload, attempts }), userId)
        .run();

      await api.sendMessage({
        chat_id: userId,
        text: MESSAGES.searchStudentNotFound(),
      });
      return;
    }

    const buttons = matched.map((m, idx) => [
      callbackButton(`${idx + 1}. ${m.item.full_name}`, `p|${m.item.id}|${payload.for_self ? 1 : 0}`),
    ]);
    buttons.push([callbackButton('Ninguno, buscar otra vez', 'p|retry|0')]);

    await env.DB.prepare('UPDATE sessions SET state = "PICK_PERSON_CHOOSE", updated_at = datetime("now") WHERE telegram_user_id = ?')
      .bind(userId)
      .run();

    await api.sendMessage({
      chat_id: userId,
      text: MESSAGES.searchStudentChoose(),
      reply_markup: inlineKeyboard(buttons),
    });
    return;
  }

  if (session.state === 'PICK_VARIANT_INPUT') {
    const personId = payload.person_id;
    const variants = await env.DB.prepare('SELECT * FROM variants WHERE active = 1').all<any>();

    let chosenVariantId: number | null = null;
    const num = parseInt(text.trim(), 10);
    if (!isNaN(num) && num >= 1 && num <= 63) {
      chosenVariantId = num;
    }

    if (chosenVariantId !== null) {
      const v = (variants.results || []).find((varItem) => varItem.id === chosenVariantId);
      if (v) {
        if (payload.is_request) {
          await env.DB.prepare('UPDATE sessions SET state = "REQUEST_REASON", payload = ? WHERE telegram_user_id = ?')
            .bind(JSON.stringify({ ...payload, to_variant_id: v.id }), userId)
            .run();

          await api.sendMessage({
            chat_id: userId,
            text: `Escribe el motivo del cambio (o envía /omitir si no deseas indicar ninguno).`,
          });
          return;
        }

        await proceedToVariantConfirmation(api, env, userId, courseId, personId, v, payload);
        return;
      }
    }

    const candidates = (variants.results || []).map((v) => ({
      item: v,
      searchTitle: v.search_title || v.title,
    }));

    const matched = searchFuzzy(text, candidates, 0.45, 3);

    if (matched.length === 0) {
      await api.sendMessage({
        chat_id: userId,
        text: MESSAGES.searchVariantNotFound(),
      });
      return;
    }

    const assignments = await env.DB.prepare('SELECT variant_id, COUNT(*) as count FROM assignments WHERE course_id = ? GROUP BY variant_id')
      .bind(courseId)
      .all<any>();

    const assignMap = new Map<number, number>();
    (assignments.results || []).forEach((a) => assignMap.set(a.variant_id, a.count));

    const buttons = matched.map((m) => {
      const occ = assignMap.get(m.item.id) ?? 0;
      const isFull = occ >= m.item.capacity;
      const btnText = isFull
        ? `🔒 ${m.item.id} — ${m.item.title} (ocupada)`
        : `${m.item.id} — ${m.item.title}`;
      return [callbackButton(btnText, `v|${m.item.id}`)];
    });
    buttons.push([callbackButton('Ninguna, buscar otra vez', 'v|retry')]);

    await env.DB.prepare('UPDATE sessions SET state = "PICK_VARIANT_CHOOSE", updated_at = datetime("now") WHERE telegram_user_id = ?')
      .bind(userId)
      .run();

    await api.sendMessage({
      chat_id: userId,
      text: MESSAGES.searchVariantChoose(),
      reply_markup: inlineKeyboard(buttons),
    });
    return;
  }

  if (session.state === 'REQUEST_REASON') {
    let reason: string | null = text.trim();
    if (reason.toLowerCase() === '/omitir') {
      reason = null;
    }

    const { person_id, to_variant_id } = payload;

    const teacherUserIds = (env.TEACHER_USER_IDS || '').split(',').map((s: string) => parseInt(s.trim(), 10)).filter((n: number) => !isNaN(n));
    if (!teacherUserIds.includes(userId)) {
      const allowed = await checkRateLimit(env.DB, userId, parseInt(env.RATE_LIMIT_PER_DAY || '5', 10));
      if (!allowed) {
        await env.DB.prepare('DELETE FROM sessions WHERE telegram_user_id = ?').bind(userId).run();
        await api.sendMessage({ chat_id: userId, text: MESSAGES.rateLimited() });
        return;
      }
    }

    const existingPending = await env.DB.prepare('SELECT id FROM change_requests WHERE course_id = ? AND person_id = ? AND status = "pending"')
      .bind(courseId, person_id)
      .first<any>();

    if (existingPending) {
      await env.DB.prepare('DELETE FROM sessions WHERE telegram_user_id = ?').bind(userId).run();
      await api.sendMessage({ chat_id: userId, text: MESSAGES.requestAlreadyPending() });
      return;
    }

    const person = await env.DB.prepare('SELECT * FROM people WHERE id = ?').bind(person_id).first<any>();
    const toVariant = await env.DB.prepare('SELECT * FROM variants WHERE id = ?').bind(to_variant_id).first<any>();
    const currentAssign = await env.DB.prepare('SELECT variant_id FROM assignments WHERE course_id = ? AND person_id = ?')
      .bind(courseId, person_id)
      .first<any>();

    const fromVariantId = currentAssign?.variant_id ?? null;
    const fromVariant = fromVariantId
      ? await env.DB.prepare('SELECT * FROM variants WHERE id = ?').bind(fromVariantId).first<any>()
      : null;

    const ins = await env.DB.prepare(
      'INSERT INTO change_requests (course_id, person_id, from_variant_id, to_variant_id, requested_by_telegram_user_id, reason, status) VALUES (?, ?, ?, ?, ?, ?, "pending")'
    )
      .bind(courseId, person_id, fromVariantId, to_variant_id, userId, reason)
      .run();

    const requestId = ins.meta.last_row_id;

    await env.DB.prepare('DELETE FROM sessions WHERE telegram_user_id = ?').bind(userId).run();

    await api.sendMessage({
      chat_id: userId,
      text: MESSAGES.requestSent(to_variant_id),
    });

    const affectedLink = await env.DB.prepare('SELECT telegram_user_id FROM telegram_links WHERE course_id = ? AND person_id = ?')
      .bind(courseId, person_id)
      .first<any>();

    if (affectedLink && affectedLink.telegram_user_id !== userId) {
      const actorLink = await env.DB.prepare('SELECT p.full_name FROM telegram_links l JOIN people p ON l.person_id = p.id WHERE l.course_id = ? AND l.telegram_user_id = ?')
        .bind(courseId, userId)
        .first<any>();
      const actorName = actorLink?.full_name || 'Un compañero';

      await api.sendMessage({
        chat_id: affectedLink.telegram_user_id,
        text: MESSAGES.requestNoticeToAffected(
          actorName,
          fromVariant ? `${fromVariant.id} — ${fromVariant.title}` : 'sin variante',
          `${toVariant.id} — ${toVariant.title}`
        ),
      });
    }

    const teacherUserIdsList = (env.TEACHER_USER_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
    const reqUserLink = await env.DB.prepare('SELECT telegram_username, p.full_name FROM telegram_links l JOIN people p ON l.person_id = p.id WHERE l.course_id = ? AND l.telegram_user_id = ?')
      .bind(courseId, userId)
      .first<any>();

    const destAssigns = await env.DB.prepare('SELECT COUNT(*) as count FROM assignments WHERE course_id = ? AND variant_id = ?')
      .bind(courseId, to_variant_id)
      .first<{ count: number }>();
    const destStatus = (destAssigns?.count ?? 0) < toVariant.capacity ? 'libre' : 'ocupada';

    const cardButtons = inlineKeyboard([
      [
        callbackButton('✅ Aprobar', `rq|${requestId}|ap`),
        callbackButton('❌ Rechazar', `rq|${requestId}|rj`),
      ],
    ]);

    for (const teacherIdStr of teacherUserIdsList) {
      const teacherId = parseInt(teacherIdStr, 10);
      if (!isNaN(teacherId)) {
        const cardMsg = await api.sendMessage({
          chat_id: teacherId,
          text: MESSAGES.teacherRequestCard(
            requestId,
            person.full_name,
            fromVariant?.id ?? null,
            fromVariant?.title ?? null,
            toVariant.id,
            toVariant.title,
            reqUserLink?.full_name || 'Usuario',
            reqUserLink?.telegram_username ?? null,
            reason,
            destStatus
          ),
          reply_markup: cardButtons,
        });

        if (cardMsg) {
          await env.DB.prepare('UPDATE change_requests SET admin_chat_id = ?, admin_message_id = ? WHERE id = ?')
            .bind(teacherId, cardMsg.message_id, requestId)
            .run();
        }
      }
    }

    await logAudit(env.DB, {
      courseId,
      actorTelegramUserId: userId,
      actorRole: 'student',
      action: 'request_create',
      personId: person_id,
      variantId: to_variant_id,
      detail: { requestId, reason },
    });
  }
}

export async function proceedToVariantConfirmation(
  api: TelegramApi,
  env: Env,
  userId: number,
  courseId: number,
  personId: number,
  variant: any,
  payload: any
) {
  const person = await env.DB.prepare('SELECT * FROM people WHERE id = ?').bind(personId).first<any>();

  let capInfo: string | undefined = undefined;
  if (variant.capacity === 2) {
    const existing = await env.DB.prepare('SELECT p.full_name FROM assignments a JOIN people p ON a.person_id = p.id WHERE a.course_id = ? AND a.variant_id = ?')
      .bind(courseId, variant.id)
      .all<any>();

    if (existing.results && existing.results.length > 0) {
      const occupantName = existing.results[0].full_name;
      const rem = 2 - existing.results.length;
      capInfo = MESSAGES.capacity2Info(occupantName, rem);
    }
  }

  await env.DB.prepare('UPDATE sessions SET state = "CONFIRM", payload = ?, updated_at = datetime("now") WHERE telegram_user_id = ?')
    .bind(JSON.stringify({ ...payload, person_id: personId, variant_id: variant.id }), userId)
    .run();

  const buttons = inlineKeyboard([
    [
      callbackButton('✅ Confirmar', `ok|${personId}|${variant.id}`),
      callbackButton('❌ Cancelar', 'x'),
    ],
  ]);

  await api.sendMessage({
    chat_id: userId,
    text: MESSAGES.confirmAssignment(person.full_name, variant.id, variant.title, capInfo),
    reply_markup: buttons,
  });
}
