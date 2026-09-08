import { AutoRouter } from 'itty-router';
import { TelegramApi } from './telegram/api';
import { handlePrivateStart, handlePrivateText } from './flows/assign';
import { handleCallbackQuery } from './flows/menu';
import { handleTeacherCommand } from './flows/teacher';
import { processPinnedJob } from './jobs/pinned';
import { processMaintenanceJob } from './jobs/maintenance';
import { processVariantSyncJob } from './jobs/syncVariants';
import { MESSAGES } from './render/messages';

export interface Env {
  DB: D1Database;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_WEBHOOK_SECRET?: string;
  CRON_SECRET: string;
  BOT_USERNAME: string;
  TEACHER_USER_IDS: string;
  VARIANTS_SOURCE_URL: string;
  GENERAL_TASKS_URL: string;
  RATE_LIMIT_PER_DAY?: string;
  REQUEST_TTL_DAYS?: string;
}

const router = AutoRouter();

router.get('/health', () => new Response('OK', { status: 200 }));

function authCron(request: Request, env: Env): Response | null {
  const header = request.headers.get('X-Cron-Secret');
  if (!env.CRON_SECRET || header !== env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  return null;
}

router.post('/jobs/pinned', async (request: Request, env: Env, ctx: ExecutionContext) => {
  const unauthorized = authCron(request, env);
  if (unauthorized) return unauthorized;
  const api = new TelegramApi(env.TELEGRAM_BOT_TOKEN);
  await processPinnedJob(env, api);
  return new Response('OK', { status: 200 });
});

router.post('/jobs/maintenance', async (request: Request, env: Env, ctx: ExecutionContext) => {
  const unauthorized = authCron(request, env);
  if (unauthorized) return unauthorized;
  const api = new TelegramApi(env.TELEGRAM_BOT_TOKEN);
  await processMaintenanceJob(env, api);
  return new Response('OK', { status: 200 });
});

router.post('/jobs/sync', async (request: Request, env: Env, ctx: ExecutionContext) => {
  const unauthorized = authCron(request, env);
  if (unauthorized) return unauthorized;
  const api = new TelegramApi(env.TELEGRAM_BOT_TOKEN);
  await processVariantSyncJob(env, api);
  return new Response('OK', { status: 200 });
});

router.post('/telegram', async (request: Request, env: Env, ctx: ExecutionContext) => {
  // 1. Authenticate secret token
  if (env.TELEGRAM_WEBHOOK_SECRET) {
    const secretHeader = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (secretHeader !== env.TELEGRAM_WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  const update = (await request.json()) as any;
  if (!update || !update.update_id) {
    return new Response('OK', { status: 200 });
  }

  const api = new TelegramApi(env.TELEGRAM_BOT_TOKEN);

  // 2. Idempotency check with processed_updates
  const insUpdate = await env.DB.prepare(
    'INSERT OR IGNORE INTO processed_updates (update_id) VALUES (?)'
  )
    .bind(update.update_id)
    .run();

  if (insUpdate.meta.changes === 0) {
    return new Response('OK', { status: 200 });
  }

  // Handle Callback Query
  if (update.callback_query) {
    ctx.waitUntil(handleCallbackQuery(api, env.DB, update.callback_query, env));
    return new Response('OK', { status: 200 });
  }

  // Handle Message
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const isGroup = msg.chat.type === 'group' || msg.chat.type === 'supergroup';
    const text = (msg.text || '').trim();
    const userId = msg.from?.id;

    if (!userId) return new Response('OK', { status: 200 });

    const teacherIds = (env.TEACHER_USER_IDS || '').split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
    const isTeacher = teacherIds.includes(userId);

    if (isGroup) {
      // Group message
      if (text.startsWith('/variante')) {
        const course = await env.DB.prepare('SELECT id FROM courses WHERE telegram_chat_id = ?')
          .bind(chatId)
          .first<{ id: number }>();

        const courseId = course?.id ?? 1;

        const sentMsg = await api.sendMessage({
          chat_id: chatId,
          text: MESSAGES.groupWelcome(env.BOT_USERNAME, courseId),
        });

        if (sentMsg) {
          ctx.waitUntil(
            new Promise((resolve) => {
              setTimeout(async () => {
                await api.deleteMessage({ chat_id: chatId, message_id: sentMsg.message_id });
                resolve(true);
              }, 60000);
            })
          );
        }
      }
      return new Response('OK', { status: 200 });
    }

    // Private message
    if (text.startsWith('/start') || text.startsWith('/variante')) {
      const match = text.match(/\/start\s+c(\d+)/);
      const courseId = match ? parseInt(match[1], 10) : 1;

      ctx.waitUntil(handlePrivateStart(api, env, userId, courseId));
      return new Response('OK', { status: 200 });
    }

    if (text.startsWith('/mivariante')) {
      const link = await env.DB.prepare(
        'SELECT p.full_name, a.variant_id, v.title, v.url FROM telegram_links l JOIN people p ON l.person_id = p.id LEFT JOIN assignments a ON a.person_id = p.id AND a.course_id = l.course_id LEFT JOIN variants v ON a.variant_id = v.id WHERE l.telegram_user_id = ?'
      )
        .bind(userId)
        .first<any>();

      if (!link) {
        await api.sendMessage({ chat_id: userId, text: MESSAGES.notLinkedMsg() });
      } else if (link.variant_id) {
        await api.sendMessage({ chat_id: userId, text: MESSAGES.myVariantInfo(link.full_name, link.variant_id, link.title, link.url) });
      } else {
        await api.sendMessage({ chat_id: userId, text: MESSAGES.noVariantLinked(link.full_name) });
      }
      return new Response('OK', { status: 200 });
    }

    if (text.startsWith('/libres')) {
      const freeVariants = await env.DB.prepare(
        'SELECT v.id, v.title FROM variants v WHERE v.active = 1 AND v.id NOT IN (SELECT variant_id FROM assignments GROUP BY variant_id HAVING COUNT(*) >= v.capacity) ORDER BY v.id ASC'
      ).all<any>();

      const totalCapRes = await env.DB.prepare('SELECT SUM(capacity) as cap FROM variants WHERE active = 1').first<{ cap: number }>();
      const totalCap = totalCapRes?.cap ?? 65;

      const list = (freeVariants.results || []).slice(0, 10).map((r) => ({ id: r.id, title: r.title }));

      await api.sendMessage({
        chat_id: userId,
        text: MESSAGES.freeVariantsSummary(freeVariants.results?.length ?? 0, totalCap, list, env.VARIANTS_SOURCE_URL),
      });
      return new Response('OK', { status: 200 });
    }

    if (text.startsWith('/cancelar')) {
      await env.DB.prepare('DELETE FROM sessions WHERE telegram_user_id = ?').bind(userId).run();
      await api.sendMessage({ chat_id: userId, text: MESSAGES.cancelled() });
      return new Response('OK', { status: 200 });
    }

    if (text.startsWith('/ayuda')) {
      await api.sendMessage({ chat_id: userId, text: MESSAGES.helpText() });
      return new Response('OK', { status: 200 });
    }

    // Check teacher commands in private
    if (isTeacher && text.startsWith('/')) {
      const commandParts = text.substring(1).split(/\s+/);
      const command = commandParts[0].toLowerCase();
      const argsStr = commandParts.slice(1).join(' ');

      ctx.waitUntil(handleTeacherCommand(api, env.DB, userId, command, argsStr, env));
      return new Response('OK', { status: 200 });
    }

    // Default: handle ongoing session text input
    ctx.waitUntil(handlePrivateText(api, env, userId, text));
  }

  return new Response('OK', { status: 200 });
});

export default {
  fetch: (request: Request, env: Env, ctx: ExecutionContext) => router.fetch(request, env, ctx),
};
