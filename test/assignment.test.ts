import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { assignVariantAtomic, swapVariantAtomic } from '../src/domain/assignment';

describe('D1 Database & Assignment Invariants Integration Test', () => {
  let dbNative: any;
  let mockD1: D1Database;

  beforeEach(() => {
    dbNative = new Database(':memory:');

    const schemaSql = readFileSync('migrations/0001_init.sql', 'utf8');
    const seedSql = readFileSync('migrations/0002_seed_variants.sql', 'utf8');

    dbNative.exec(schemaSql);
    dbNative.exec(seedSql);

    // Insert dummy course & students
    dbNative.exec(`
      INSERT INTO courses (id, code, name, telegram_chat_id)
      VALUES (1, 'auto-2026-1', 'Automatismos Industriales 2026-1', -100123456789);

      INSERT INTO people (id, course_id, moodle_id, full_name, search_name, origin, active)
      VALUES
        (1, 1, 'm101', 'María Elena López Cruz', 'maria elena lopez cruz', 'moodle', 1),
        (2, 1, 'm102', 'Juan Pérez Díaz', 'juan perez diaz', 'moodle', 1),
        (3, 1, 'm103', 'Ana Ruiz Peña', 'ana ruiz pena', 'moodle', 1),
        (4, 1, NULL, 'Carlos Gómez (manual)', 'carlos gomez manual', 'manual', 1),
        (5, 1, 'm105', 'Pedro Bajas', 'pedro bajas', 'moodle', 0);
    `);

    // Helper to wrap better-sqlite3 as D1Database interface for domain functions
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
      batch: async (stmts: any[]) => {
        const results: any[] = [];
        const txn = dbNative.transaction(() => {
          for (const s of stmts) {
            const info = s._runSync();
            results.push({ meta: { changes: info.changes, last_row_id: info.lastInsertRowid } });
          }
        });
        txn();
        return results;
      },
    } as any;

    const origPrepare = mockD1.prepare;
    mockD1.prepare = (sql: string) => {
      const p = origPrepare(sql);
      return {
        ...p,
        bind: (...args: any[]) => {
          const b = p.bind(...args);
          (b as any)._runSync = () => {
            const stmt = dbNative.prepare(sql);
            return stmt.run(...args);
          };
          return b;
        },
      };
    };
  });

  afterEach(() => {
    if (dbNative) dbNative.close();
  });

  it('assigns variant atomically to student successfully', async () => {
    const res = await assignVariantAtomic(mockD1, 1, 12, 1, 1001, 1, 'student');
    expect(res.success).toBe(true);

    const assign = dbNative.prepare('SELECT * FROM assignments WHERE person_id = 1').get();
    expect(assign.variant_id).toBe(12);
    expect(assign.slot).toBe(1);
  });

  it('prevents second assignment to same person (ux_assign_person invariant)', async () => {
    await assignVariantAtomic(mockD1, 1, 12, 1, 1001, 1, 'student');
    const res2 = await assignVariantAtomic(mockD1, 1, 19, 1, 1001, 1, 'student');

    expect(res2.success).toBe(false);
    expect(res2.reason).toBe('person_has_assignment');
  });

  it('prevents assigning capacity 1 variant to a second student (ux_assign_slot invariant)', async () => {
    await assignVariantAtomic(mockD1, 1, 12, 1, 1001, 1, 'student');
    const res2 = await assignVariantAtomic(mockD1, 1, 12, 2, 1002, 2, 'student');

    expect(res2.success).toBe(false);
    expect(res2.reason).toBe('variant_full');
  });

  it('allows 2 students to take a capacity 2 variant (variant 48)', async () => {
    const res1 = await assignVariantAtomic(mockD1, 1, 48, 1, 1001, 1, 'student');
    const res2 = await assignVariantAtomic(mockD1, 1, 48, 2, 1002, 2, 'student');
    const res3 = await assignVariantAtomic(mockD1, 1, 48, 3, 1003, 3, 'student');

    expect(res1.success).toBe(true);
    expect(res2.success).toBe(true);
    expect(res3.success).toBe(false); // 3rd student fails
    expect(res3.reason).toBe('variant_full');
  });

  it('prevents assignment to inactive student (trg_assign_check_ins trigger)', async () => {
    const res = await assignVariantAtomic(mockD1, 1, 12, 5, 1005, 5, 'student');
    expect(res.success).toBe(false);
    expect(res.reason).toBe('person_inactive');
  });

  it('protects manual student origin from Moodle agent UPSERT', () => {
    const upsertSql = `
      INSERT INTO people (course_id, moodle_id, full_name, search_name, origin, active)
      VALUES (?, ?, ?, ?, 'moodle', 1)
      ON CONFLICT(course_id, moodle_id) WHERE moodle_id IS NOT NULL DO UPDATE SET
        full_name   = excluded.full_name,
        search_name = excluded.search_name,
        active      = excluded.active,
        updated_at  = datetime('now')
      WHERE people.origin = 'moodle';
    `;

    dbNative.prepare(upsertSql).run(1, 'm101', 'María Elena López Cruz Modificada', 'maria elena lopez cruz modificada');
    const student1 = dbNative.prepare('SELECT full_name FROM people WHERE id = 1').get();
    expect(student1.full_name).toBe('María Elena López Cruz Modificada');

    // Manual student (id 4, moodle_id NULL) remains untouched
    const manualStudent = dbNative.prepare('SELECT full_name, origin FROM people WHERE id = 4').get();
    expect(manualStudent.full_name).toBe('Carlos Gómez (manual)');
    expect(manualStudent.origin).toBe('manual');
  });

  it('atomically swaps variant for a student', async () => {
    await assignVariantAtomic(mockD1, 1, 12, 1, 1001, 1, 'student');

    const res = await swapVariantAtomic(mockD1, 1, 1, 12, 19, 1001, 1, 'student');
    expect(res.success).toBe(true);

    const assign = dbNative.prepare('SELECT variant_id FROM assignments WHERE person_id = 1').get();
    expect(assign.variant_id).toBe(19);

    const oldAssign = dbNative.prepare('SELECT * FROM assignments WHERE variant_id = 12').get();
    expect(oldAssign).toBeUndefined();
  });

  it('enforces single pending request invariant (ux_req_one_pending)', () => {
    dbNative.prepare(`
      INSERT INTO change_requests (course_id, person_id, from_variant_id, to_variant_id, requested_by_telegram_user_id, status)
      VALUES (1, 1, 12, 19, 1001, 'pending')
    `).run();

    expect(() => {
      dbNative.prepare(`
        INSERT INTO change_requests (course_id, person_id, from_variant_id, to_variant_id, requested_by_telegram_user_id, status)
        VALUES (1, 1, 12, 20, 1001, 'pending')
      `).run();
    }).toThrow(/UNIQUE constraint failed/);
  });
});
