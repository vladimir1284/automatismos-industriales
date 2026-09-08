import { TelegramApi } from '../telegram/api';
import { normalize } from '../search/normalize';
import { logAudit } from '../domain/audit';

/**
 * Daily 3 AM sync scraper:
 * 1. Fetches https://automatismos.ladetec.com/proyectos/
 * 2. Parses Markdown table lines: # | Variante | Fichero
 * 3. Safely UPSERTs variants (preserving manual capacity changes)
 * 4. Safety check: if fetch fails or returns < 40 variants, aborts and alerts teacher.
 * 5. Handles missing variants (inactive vs assigned alerts).
 * 6. Detects slug changes and alerts teachers.
 */
export async function processVariantSyncJob(env: any, api: TelegramApi) {
  const url = env.VARIANTS_SOURCE_URL || 'https://automatismos.ladetec.com/proyectos/';
  const teacherUserIds = (env.TEACHER_USER_IDS || '').split(',').map((s: string) => s.trim()).filter(Boolean);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const htmlText = await response.text();
    const lineRegex = /\|\s*(\d+)\s*\|\s*([^|]+)\s*\|\s*\[md\]\(([^)]+)\)\s*\|/g;

    const parsed: { id: number; title: string; searchTitle: string; slug: string; url: string; isTwoStudents: boolean }[] = [];
    let match: RegExpExecArray | null;

    while ((match = lineRegex.exec(htmlText)) !== null) {
      const id = parseInt(match[1], 10);
      const title = match[2].trim();
      const relativePath = match[3].trim();
      const slugMatch = relativePath.match(/variante-\d+-[a-z0-9-]+/i);
      const slug = slugMatch ? slugMatch[0] : `variante-${id}`;
      const fullUrl = `https://automatismos.ladetec.com/proyectos/variantes/${slug}/`;
      const isTwoStudents = title.toLowerCase().includes('dos estudiantes');

      parsed.push({
        id,
        title,
        searchTitle: normalize(title),
        slug,
        url: fullUrl,
        isTwoStudents,
      });
    }

    if (parsed.length < 40) {
      const alertMsg = `⚠️ Error en la sincronización nocturna de variantes: se encontraron solo ${parsed.length} variantes (se esperaban >= 40). No se realizó ningún cambio.`;
      for (const teacherIdStr of teacherUserIds) {
        const teacherId = parseInt(teacherIdStr, 10);
        if (!isNaN(teacherId)) {
          await api.sendMessage({ chat_id: teacherId, text: alertMsg });
        }
      }
      return;
    }

    const seenIds = new Set<number>();

    for (const item of parsed) {
      seenIds.add(item.id);
      const existing = await env.DB.prepare('SELECT * FROM variants WHERE id = ?').bind(item.id).first<any>();

      if (existing) {
        if (existing.slug !== item.slug) {
          const alertMsg = `⚠️ El slug de la variante #${item.id} cambió de "${existing.slug}" a "${item.slug}". Las URLs anteriores enviadas a alumnos pueden estar rotas.`;
          for (const teacherIdStr of teacherUserIds) {
            const teacherId = parseInt(teacherIdStr, 10);
            if (!isNaN(teacherId)) {
              await api.sendMessage({ chat_id: teacherId, text: alertMsg });
            }
          }
        }

        await env.DB.prepare(`
          UPDATE variants
             SET title = ?, search_title = ?, slug = ?, url = ?, active = 1, last_seen_at = datetime('now')
           WHERE id = ?
        `).bind(item.title, item.searchTitle, item.slug, item.url, item.id).run();
      } else {
        const cap = item.isTwoStudents ? 2 : 1;
        await env.DB.prepare(`
          INSERT INTO variants (id, title, search_title, slug, url, capacity)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(item.id, item.title, item.searchTitle, item.slug, item.url, cap).run();

        for (const teacherIdStr of teacherUserIds) {
          const teacherId = parseInt(teacherIdStr, 10);
          if (!isNaN(teacherId)) {
            await api.sendMessage({ chat_id: teacherId, text: `ℹ️ Nueva variante detectada e insertada: #${item.id} — ${item.title}` });
          }
        }
      }
    }

    // Step 5: Check variants in DB that did not appear on the website
    const allDbVariants = await env.DB.prepare('SELECT * FROM variants WHERE active = 1').all<any>();
    for (const dbVar of allDbVariants.results || []) {
      if (!seenIds.has(dbVar.id)) {
        const assigns = await env.DB.prepare('SELECT p.full_name FROM assignments a JOIN people p ON a.person_id = p.id WHERE a.variant_id = ?')
          .bind(dbVar.id).all<any>();

        if (assigns.results && assigns.results.length > 0) {
          const names = assigns.results.map((r) => r.full_name).join(', ');
          const urgentMsg = `⚠️ La variante ${dbVar.id} — ${dbVar.title} ya no aparece en la web pero está asignada a: ${names}. Revisa si la renombraron.`;
          for (const teacherIdStr of teacherUserIds) {
            const teacherId = parseInt(teacherIdStr, 10);
            if (!isNaN(teacherId)) {
              await api.sendMessage({ chat_id: teacherId, text: urgentMsg });
            }
          }
        } else {
          await env.DB.prepare('UPDATE variants SET active = 0 WHERE id = ?').bind(dbVar.id).run();
          const infoMsg = `ℹ️ La variante ${dbVar.id} — ${dbVar.title} ya no aparece en la web y no tenía asignaciones. Ha sido deshabilitada.`;
          for (const teacherIdStr of teacherUserIds) {
            const teacherId = parseInt(teacherIdStr, 10);
            if (!isNaN(teacherId)) {
              await api.sendMessage({ chat_id: teacherId, text: infoMsg });
            }
          }
        }
      }
    }

    await logAudit(env.DB, {
      courseId: 1,
      actorRole: 'system',
      action: 'variant_sync',
      detail: { syncedCount: parsed.length },
    });
  } catch (err: any) {
    const errorMsg = `⚠️ Error en la sincronización de variantes: ${err.message}`;
    for (const teacherIdStr of teacherUserIds) {
      const teacherId = parseInt(teacherIdStr, 10);
      if (!isNaN(teacherId)) {
        await api.sendMessage({ chat_id: teacherId, text: errorMsg });
      }
    }
  }
}
