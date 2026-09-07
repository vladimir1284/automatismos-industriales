import { escapeHtml } from '../telegram/escape';

export interface AssignedVariantRow {
  variant_id: number;
  variant_title: string;
  people_names: string[];
  capacity: number;
}

/**
 * Formats the pinned table message for Telegram groups.
 * Ensures strict limit <= 4096 characters (section 9.3).
 */
export function renderPinnedMessage(
  courseName: string,
  assignments: AssignedVariantRow[],
  totalAssignedCount: number,
  freeCount: number,
  unassignedPeopleCount: number,
  sourceUrl: string,
  updatedAtFormatted: string
): string {
  const header =
    `📋 <b>VARIANTES ASIGNADAS — ${escapeHtml(courseName)}</b>\n` +
    `Actualizado: ${updatedAtFormatted}\n\n<pre>`;

  const footer =
    `</pre>\n\n` +
    `Asignadas: ${totalAssignedCount} · Libres: ${freeCount} · Sin variante: ${unassignedPeopleCount}\n` +
    `Listado completo: ${sourceUrl}`;

  const maxMessageLength = 4096;
  const availableForBody = maxMessageLength - header.length - footer.length - 100; // safety buffer

  let bodyLines: string[] = [];
  let truncated = false;
  let linesAdded = 0;

  for (const row of assignments) {
    const numStr = String(row.variant_id).padStart(2, ' ');
    // Truncate title to 32 chars and student names to 26 chars
    const truncTitle =
      row.variant_title.length > 32
        ? row.variant_title.substring(0, 31) + '…'
        : row.variant_title;

    let namesStr = row.people_names.join(' + ');
    if (row.capacity === 2 && row.people_names.length === 1) {
      namesStr += ' + [1 plaza libre]';
    }

    const truncNames =
      namesStr.length > 26 ? namesStr.substring(0, 25) + '…' : namesStr;

    const line = `${numStr}  ${truncTitle.padEnd(32, ' ')} ${truncNames}`;

    const currentTotal =
      header.length +
      bodyLines.join('\n').length +
      line.length +
      footer.length +
      50;

    if (currentTotal > availableForBody) {
      truncated = true;
      break;
    }

    bodyLines.push(line);
    linesAdded++;
  }

  let bodyText = bodyLines.join('\n');
  if (truncated) {
    const remainingCount = assignments.length - linesAdded;
    bodyText += `\n… y ${remainingCount} más. Usa /mivariante o pide /exportar al profesor.`;
  }

  return header + bodyText + footer;
}
