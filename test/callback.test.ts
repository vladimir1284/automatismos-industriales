import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { callbackButton, validateCallbackData } from '../src/telegram/keyboard';
import { handleCallbackQuery } from '../src/flows/menu';

describe('validateCallbackData', () => {
  it('allows valid data under 64 bytes', () => {
    const valid = 'ok|12|48';
    expect(validateCallbackData(valid)).toBe(valid);
  });

  it('throws error if callback data exceeds 64 bytes', () => {
    const longData = 'a'.repeat(65);
    expect(() => validateCallbackData(longData)).toThrow(/exceeds 64 bytes/);
  });

  it('creates valid callback button', () => {
    const btn = callbackButton('Aprobar', 'rq|7|ap');
    expect(btn.text).toBe('Aprobar');
    expect(btn.callback_data).toBe('rq|7|ap');
  });
});

describe('handleCallbackQuery session UPSERT tests', () => {
  let dbNative: any;
  let mockD1: any;
  let mockApi: any;
  let editedMessages: any[];

  beforeEach(() => {
    dbNative = new Database(':memory:');

    const schemaSql = readFileSync('migrations/0001_init.sql', 'utf8');
    const seedSql = readFileSync('migrations/0002_seed_variants.sql', 'utf8');

    dbNative.exec(schemaSql);
    dbNative.exec(seedSql);

    dbNative.exec(`
      INSERT INTO courses (id, code, name, telegram_chat_id)
      VALUES (1, 'auto-2026-1', 'Automatismos Industriales 2026-1', -100123456789);

      INSERT INTO people (id, course_id, moodle_id, full_name, search_name, origin, active)
      VALUES (1, 1, 'm101', 'María Elena López Cruz', 'maria elena lopez cruz', 'moodle', 1);
    `);

    mockD1 = {
      prepare: (sql: string) => {
        return {
          bind: (...args: any[]) => ({
            first: async <T = any>(): Promise<T | null> => {
              const stmt = dbNative.prepare(sql);
              return (stmt.get(...args) as T) ?? null;
            },
            all: async <T = any>(): Promise<{ results: T[] }> => {
              const stmt = dbNative.prepare(sql);
              return { results: stmt.all(...args) as T[] };
            },
            run: async () => {
              const stmt = dbNative.prepare(sql);
              const info = stmt.run(...args);
              return {
                meta: {
                  changes: info.changes,
                  last_row_id: info.lastInsertRowid,
                },
              };
            },
          }),
        };
      },
    };

    editedMessages = [];
    mockApi = {
      answerCallbackQuery: async () => true,
      editMessageText: async (params: any) => {
        editedMessages.push(params);
        return { message_id: params.message_id };
      },
      sendMessage: async () => ({ message_id: 1 }),
    };
  });

  afterEach(() => {
    if (dbNative) dbNative.close();
  });

  it('creates a session via UPSERT when clicking m|pick without an existing session', async () => {
    const userId = 9999;
    // Ensure no session exists
    const sessionBefore = dbNative.prepare('SELECT * FROM sessions WHERE telegram_user_id = ?').get(userId);
    expect(sessionBefore).toBeUndefined();

    const query = {
      id: 'q1',
      from: { id: userId },
      data: 'm|pick',
      message: { chat: { id: userId }, message_id: 100 },
    };

    await handleCallbackQuery(mockApi, mockD1, query, { VARIANTS_SOURCE_URL: 'https://example.com' });

    const sessionAfter = dbNative.prepare('SELECT * FROM sessions WHERE telegram_user_id = ?').get(userId);
    expect(sessionAfter).toBeDefined();
    expect(sessionAfter.state).toBe('PICK_WHO');
    expect(sessionAfter.course_id).toBe(1);
    expect(editedMessages.length).toBe(1);
  });

  it('creates session via UPSERT when clicking w|self without an existing session', async () => {
    const userId = 8888;
    const query = {
      id: 'q2',
      from: { id: userId },
      data: 'w|self',
      message: { chat: { id: userId }, message_id: 101 },
    };

    await handleCallbackQuery(mockApi, mockD1, query, { VARIANTS_SOURCE_URL: 'https://example.com' });

    const sessionAfter = dbNative.prepare('SELECT * FROM sessions WHERE telegram_user_id = ?').get(userId);
    expect(sessionAfter).toBeDefined();
    expect(sessionAfter.state).toBe('PICK_PERSON_INPUT');
    expect(editedMessages.length).toBe(1);
  });

  it('handles missing session payload gracefully when action is v', async () => {
    const userId = 7777;
    const query = {
      id: 'q3',
      from: { id: userId },
      data: 'v|12',
      message: { chat: { id: userId }, message_id: 102 },
    };

    await handleCallbackQuery(mockApi, mockD1, query, { VARIANTS_SOURCE_URL: 'https://example.com' });

    expect(editedMessages.length).toBe(1);
    expect(editedMessages[0].text).toContain('La sesión expiró');
  });
});
