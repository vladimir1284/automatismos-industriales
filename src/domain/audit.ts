export async function checkRateLimit(
  db: D1Database,
  telegramUserId: number,
  limitPerDay = 5
): Promise<boolean> {
  const query = `
    SELECT COUNT(*) AS count FROM audit_log
     WHERE actor_telegram_user_id = ?
       AND action IN ('assign','release','swap','request_create')
       AND at > datetime('now', '-1 day')
  `;
  const res = await db.prepare(query).bind(telegramUserId).first<{ count: number }>();
  return (res?.count ?? 0) < limitPerDay;
}

export async function logAudit(
  db: D1Database,
  params: {
    courseId: number;
    actorTelegramUserId?: number | null;
    actorRole: 'student' | 'teacher' | 'agent' | 'system';
    action: string;
    personId?: number | null;
    variantId?: number | null;
    detail?: Record<string, any>;
  }
) {
  const query = `
    INSERT INTO audit_log
      (course_id, actor_telegram_user_id, actor_role, action, person_id, variant_id, detail)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  await db
    .prepare(query)
    .bind(
      params.courseId,
      params.actorTelegramUserId ?? null,
      params.actorRole,
      params.action,
      params.personId ?? null,
      params.variantId ?? null,
      params.detail ? JSON.stringify(params.detail) : null
    )
    .run();
}
