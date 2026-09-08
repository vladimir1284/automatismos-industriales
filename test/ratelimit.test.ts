import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { checkRateLimit } from '../src/domain/audit';

describe('Rate limiting and Flow permissions test', () => {
  let dbNative: any;
  let mockD1: D1Database;

  beforeEach(() => {
    dbNative = new Database(':memory:');
    const schemaSql = readFileSync('migrations/0001_init.sql', 'utf8');
    dbNative.exec(schemaSql);

    mockD1 = {
      prepare: (sql: string) => ({
        bind: (...args: any[]) => ({
          first: async <T = any>() => dbNative.prepare(sql).get(...args) as T,
          run: async () => {
            const info = dbNative.prepare(sql).run(...args);
            return { meta: { changes: info.changes } };
          },
        }),
      }),
    } as any;
  });

  afterEach(() => {
    if (dbNative) dbNative.close();
  });

  it('allows operations when rate limit is below 5', async () => {
    const allowed = await checkRateLimit(mockD1, 1001, 5);
    expect(allowed).toBe(true);
  });

  it('blocks operations when user exceeds 5 write operations in 24 hours', async () => {
    for (let i = 0; i < 5; i++) {
      dbNative.prepare(`
        INSERT INTO audit_log (course_id, actor_telegram_user_id, actor_role, action)
        VALUES (1, 1001, 'student', 'assign')
      `).run();
    }

    const allowed = await checkRateLimit(mockD1, 1001, 5);
    expect(allowed).toBe(false);
  });
});
