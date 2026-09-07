import { logAudit } from './audit';

export const INSERT_ASSIGNMENT_SQL = `
INSERT INTO assignments
  (course_id, variant_id, person_id, slot, created_by_telegram_user_id,
   created_by_person_id, source)
SELECT
  ?, ?, ?,
  (SELECT MIN(s.slot)
     FROM (SELECT 1 AS slot UNION ALL SELECT 2) s
    WHERE s.slot <= (SELECT capacity FROM variants WHERE id = ?)
      AND NOT EXISTS (SELECT 1 FROM assignments a
                       WHERE a.course_id = ? AND a.variant_id = ? AND a.slot = s.slot)),
  ?, ?, ?
WHERE (SELECT COUNT(*) FROM assignments
        WHERE course_id = ? AND variant_id = ?)
      < (SELECT capacity FROM variants WHERE id = ?)
  AND NOT EXISTS (SELECT 1 FROM assignments
                   WHERE course_id = ? AND person_id = ?)
  AND (SELECT active FROM variants WHERE id = ?) = 1
  AND (SELECT active FROM people   WHERE id = ?) = 1;
`;

export interface AssignResult {
  success: boolean;
  reason?: 'variant_full' | 'person_has_assignment' | 'variant_inactive' | 'person_inactive' | 'unknown';
}

/**
 * Attempts to assign a variant to a person atomically.
 */
export async function assignVariantAtomic(
  db: D1Database,
  courseId: number,
  variantId: number,
  personId: number,
  actorTelegramUserId: number | null,
  actorPersonId: number | null,
  source: 'student' | 'teacher' | 'agent' | 'request'
): Promise<AssignResult> {
  try {
    const stmt = db
      .prepare(INSERT_ASSIGNMENT_SQL)
      .bind(
        courseId,            // 1: course_id insert
        variantId,           // 2: variant_id insert
        personId,            // 3: person_id insert
        variantId,           // 4: capacity subquery
        courseId,            // 5: NOT EXISTS course_id
        variantId,           // 6: NOT EXISTS variant_id
        actorTelegramUserId ?? null, // 7: created_by_telegram_user_id insert
        actorPersonId ?? null,       // 8: created_by_person_id insert
        source,              // 9: source insert
        courseId,            // 10: WHERE assignments course_id
        variantId,           // 11: WHERE assignments variant_id
        variantId,           // 12: WHERE capacity variant_id
        courseId,            // 13: WHERE NOT EXISTS person course_id
        personId,            // 14: WHERE NOT EXISTS person person_id
        variantId,           // 15: WHERE variant active
        personId             // 16: WHERE person active
      );

    const res = await stmt.run();

    if (res.meta.changes === 1) {
      await db
        .prepare('UPDATE courses SET pinned_dirty = 1 WHERE id = ?')
        .bind(courseId)
        .run();

      await logAudit(db, {
        courseId,
        actorTelegramUserId,
        actorRole: source === 'teacher' ? 'teacher' : source === 'agent' ? 'agent' : 'student',
        action: 'assign',
        personId,
        variantId,
        detail: { slotAssigned: true, source },
      });

      return { success: true };
    }

    const variant = await db
      .prepare('SELECT capacity, active FROM variants WHERE id = ?')
      .bind(variantId)
      .first<{ capacity: number; active: number }>();

    if (!variant || variant.active === 0) {
      return { success: false, reason: 'variant_inactive' };
    }

    const currentAssignments = await db
      .prepare('SELECT COUNT(*) as count FROM assignments WHERE course_id = ? AND variant_id = ?')
      .bind(courseId, variantId)
      .first<{ count: number }>();

    if ((currentAssignments?.count ?? 0) >= variant.capacity) {
      return { success: false, reason: 'variant_full' };
    }

    const person = await db
      .prepare('SELECT active FROM people WHERE id = ?')
      .bind(personId)
      .first<{ active: number }>();

    if (!person || person.active === 0) {
      return { success: false, reason: 'person_inactive' };
    }

    const personAssign = await db
      .prepare('SELECT id FROM assignments WHERE course_id = ? AND person_id = ?')
      .bind(courseId, personId)
      .first();

    if (personAssign) {
      return { success: false, reason: 'person_has_assignment' };
    }

    return { success: false, reason: 'unknown' };
  } catch (err: any) {
    if (err.message && err.message.includes('UNIQUE constraint failed')) {
      return { success: false, reason: 'variant_full' };
    }
    throw err;
  }
}

/**
 * Executes an atomic swap (release fromVariantId and assign toVariantId) for a person.
 */
export async function swapVariantAtomic(
  db: D1Database,
  courseId: number,
  personId: number,
  fromVariantId: number | null,
  toVariantId: number,
  actorTelegramUserId: number | null,
  actorPersonId: number | null,
  source: 'student' | 'teacher' | 'agent' | 'request'
): Promise<AssignResult> {
  const batchStmts: D1PreparedStatement[] = [];

  if (fromVariantId !== null) {
    batchStmts.push(
      db
        .prepare('DELETE FROM assignments WHERE course_id = ? AND person_id = ? AND variant_id = ?')
        .bind(courseId, personId, fromVariantId)
    );
  }

  batchStmts.push(
    db
      .prepare(INSERT_ASSIGNMENT_SQL)
      .bind(
        courseId,
        toVariantId,
        personId,
        toVariantId,
        courseId,
        toVariantId,
        actorTelegramUserId ?? null,
        actorPersonId ?? null,
        source,
        courseId,
        toVariantId,
        toVariantId,
        courseId,
        personId,
        toVariantId,
        personId
      )
  );

  const res = await db.batch(batchStmts);
  const insertRes = res[res.length - 1];

  if (insertRes.meta.changes === 1) {
    await db
      .prepare('UPDATE courses SET pinned_dirty = 1 WHERE id = ?')
      .bind(courseId)
      .run();

    await logAudit(db, {
      courseId,
      actorTelegramUserId,
      actorRole: source === 'teacher' ? 'teacher' : source === 'agent' ? 'agent' : 'student',
      action: 'swap',
      personId,
      variantId: toVariantId,
      detail: { fromVariantId, toVariantId, source },
    });

    return { success: true };
  }

  return { success: false, reason: 'variant_full' };
}

/**
 * Releases an assignment for a person.
 */
export async function releaseAssignment(
  db: D1Database,
  courseId: number,
  personId: number,
  actorTelegramUserId: number | null,
  actorRole: 'student' | 'teacher' | 'system'
) {
  const current = await db
    .prepare('SELECT variant_id FROM assignments WHERE course_id = ? AND person_id = ?')
    .bind(courseId, personId)
    .first<{ variant_id: number }>();

  if (!current) return false;

  await db
    .prepare('DELETE FROM assignments WHERE course_id = ? AND person_id = ?')
    .bind(courseId, personId)
    .run();

  await db
    .prepare('UPDATE courses SET pinned_dirty = 1 WHERE id = ?')
    .bind(courseId)
    .run();

  await logAudit(db, {
    courseId,
    actorTelegramUserId,
    actorRole,
    action: 'release',
    personId,
    variantId: current.variant_id,
  });

  return true;
}
