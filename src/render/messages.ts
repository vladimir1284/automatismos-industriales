import { escapeHtml } from '../telegram/escape';

export const MESSAGES = {
  // Public group welcome message
  groupWelcome: (botUsername: string, courseId: number) =>
    `Para escoger variante, abre el bot en privado 👇\n<a href="https://t.me/${botUsername}?start=c${courseId}">[ Abrir el bot ]</a>\n\n<i>(este mensaje se borra en 1 minuto)</i>`,

  // Group announcements
  announceSelf: (studentName: string, variantTitle: string) =>
    `📌 <b>${escapeHtml(studentName)}</b> ha escogido la variante <b>${escapeHtml(variantTitle)}</b>.`,

  announceThirdParty: (actorName: string, studentName: string, variantTitle: string) =>
    `📌 <b>${escapeHtml(actorName)}</b> ha escogido la variante <b>${escapeHtml(variantTitle)}</b> <b>para ${escapeHtml(studentName)}</b>.`,

  announceTeacher: (studentName: string, variantTitle: string) =>
    `📌 El profesor ha asignado la variante <b>${escapeHtml(variantTitle)}</b> a <b>${escapeHtml(studentName)}</b>.`,

  announceRelease: (variantTitle: string) =>
    `🔓 La variante <b>${escapeHtml(variantTitle)}</b> ha quedado <b>libre</b>.`,

  announceCapacity2Partial: (studentName: string, variantTitle: string, remainingSlots: number) =>
    `📌 <b>${escapeHtml(studentName)}</b> ha escogido la variante <b>${escapeHtml(variantTitle)}</b>. Es de dos estudiantes: <b>queda ${remainingSlots} plaza libre</b>.`,

  // Menu step
  menuWelcome: (courseName: string, freeCount: number, totalCount: number) =>
    `<b>Variantes de proyecto — ${escapeHtml(courseName)}</b>\n\nQuedan <b>${freeCount} variantes libres</b> de ${totalCount}.`,

  menuClosed: () =>
    `La asignación de variantes está cerrada. Si necesitas un cambio, escribe al profesor.`,

  // Selection step
  pickWho: () => `¿Para quién es la variante?`,

  searchStudentPrompt: () => `Escribe el nombre del alumno (o parte de él).`,

  searchStudentChoose: () => `Encontré esto. ¿Cuál es?`,

  searchStudentNotFound: () =>
    `No encontré a nadie con ese nombre en el listado del curso.\nPrueba con el apellido, o escribe el nombre completo.\nSi acabas de matricularte y no apareces, avisa al profesor.`,

  alreadyHasVariantNotice: (studentName: string, variantNum: number, variantTitle: string) =>
    `<b>${escapeHtml(studentName)}</b> ya tiene la variante <b>${variantNum} — ${escapeHtml(variantTitle)}</b>.`,

  searchVariantPrompt: (sourceUrl: string) =>
    `Escribe el <b>número</b> de la variante o parte de su nombre.\nListado completo: ${sourceUrl}`,

  searchVariantChoose: () => `¿Cuál de estas?`,

  searchVariantNotFound: () =>
    `No encontré esa variante. Escribe su número (1-63) o parte del título.`,

  variantOccupied: (variantNum: number) =>
    `⚠️ La variante ${variantNum} está ocupada. Escoge otra.`,

  variantJustTaken: (variantNum: number) =>
    `⚠️ Alguien acaba de tomar la variante ${variantNum} mientras confirmabas. Escoge otra.`,

  confirmAssignment: (studentName: string, variantNum: number, variantTitle: string, capacityInfo?: string) =>
    `<b>Confirma la asignación</b>\n\nAlumno: <b>${escapeHtml(studentName)}</b>\nVariante: <b>${variantNum} — ${escapeHtml(variantTitle)}</b>${capacityInfo ? `\n\n${capacityInfo}` : ''}`,

  capacity2Info: (occupantName: string, remainingSlots: number) =>
    `Esta variante es para <b>dos estudiantes</b>. Ahora mismo la tiene ${escapeHtml(occupantName)} y queda ${remainingSlots} plaza.`,

  assignSuccess: (variantNum: number, variantTitle: string, variantUrl: string, tasksUrl: string) =>
    `✅ <b>Variante asignada.</b>\n\n<b>${variantNum} — ${escapeHtml(variantTitle)}</b>\nEnunciado: ${variantUrl}\nTareas generales (obligatorias para toda variante):\n${tasksUrl}\n\nYa puedes empezar a trabajar.`,

  // Request flow
  requestSent: (toVariantNum: number) =>
    `📨 Petición enviada al profesor. Te aviso cuando la resuelva.\n<b>Importante:</b> la variante ${toVariantNum} <b>no queda reservada</b>. Si alguien la toma antes de que el profesor apruebe, la petición no podrá completarse.`,

  requestNoticeToAffected: (actorName: string, fromTitle: string, toTitle: string) =>
    `ℹ️ <b>${escapeHtml(actorName)}</b> ha pedido al profesor cambiar tu variante:\nde <b>${escapeHtml(fromTitle)}</b>\na <b>${escapeHtml(toTitle)}</b>.\n\nSi no estás de acuerdo, dile al profesor antes de que la apruebe.`,

  teacherRequestCard: (
    requestId: number,
    studentName: string,
    fromNum: number | null,
    fromTitle: string | null,
    toNum: number,
    toTitle: string,
    requestedByName: string,
    username: string | null,
    reason: string | null,
    destStatus: string
  ) =>
    `🔔 <b>Petición de cambio #${requestId}</b>\n\n` +
    `Alumno: <b>${escapeHtml(studentName)}</b>\n` +
    `De: ${fromNum ? `${fromNum} — ${escapeHtml(fromTitle)}` : '(sin variante)'}\n` +
    `A: ${toNum} — ${escapeHtml(toTitle)}\n` +
    `Pedido por: <b>${escapeHtml(requestedByName)}</b>${username ? ` (@${escapeHtml(username)})` : ''}\n` +
    `Motivo: <i>"${reason ? escapeHtml(reason) : 'Sin motivo indicado'}"</i>\n` +
    `Estado actual de la ${toNum}: <b>${escapeHtml(destStatus)}</b>`,

  requestAlreadyPending: () =>
    `Ya hay una petición pendiente para este alumno. Espera a que el profesor la resuelva.`,

  requestApprovedStudentMsg: (toNum: number, toTitle: string) =>
    `✅ El profesor ha aprobado el cambio de variante a <b>${toNum} — ${escapeHtml(toTitle)}</b>.`,

  requestRejectedStudentMsg: (note?: string) =>
    `❌ El profesor ha rechazado la petición de cambio${note ? `: ${escapeHtml(note)}` : '.'}`,

  requestFailedStudentMsg: (toNum: number) =>
    `⚠️ La petición de cambio a la variante ${toNum} no pudo completarse porque la variante destino ya fue ocupada por otro alumno.`,

  requestExpiredStudentMsg: () =>
    `⏳ La petición de cambio de variante expiró sin ser resuelta.`,

  // User queries
  myVariantInfo: (studentName: string, variantNum: number, variantTitle: string, variantUrl: string) =>
    `<b>${escapeHtml(studentName)}</b> tiene asignada la variante:\n\n<b>${variantNum} — ${escapeHtml(variantTitle)}</b>\nEnunciado: ${variantUrl}`,

  noVariantLinked: (studentName: string) =>
    `<b>${escapeHtml(studentName)}</b> aún no tiene ninguna variante asignada. Usa /variante para escoger una.`,

  notLinkedMsg: () =>
    `Aún no estás vinculado a ningún alumno. Usa /variante para vincularte o asignar una variante.`,

  freeVariantsSummary: (freeCount: number, totalCount: number, list: { id: number; title: string }[], sourceUrl: string) =>
    `Quedan <b>${freeCount} variantes libres</b> de ${totalCount}.\n\n` +
    `Primeras disponibles:\n` +
    list.map((v) => `• <b>${v.id}</b> — ${escapeHtml(v.title)}`).join('\n') +
    `\n\nListado completo: ${sourceUrl}`,

  cancelled: () => `Operación cancelada. Usa /variante para volver a empezar.`,

  helpText: () =>
    `<b>Bot de Asignación de Variantes</b>\n\n` +
    `Comandos disponibles:\n` +
    `/variante — Escoger o cambiar de variante\n` +
    `/mivariante — Ver la variante que tienes asignada\n` +
    `/libres — Ver variantes disponibles\n` +
    `/cancelar — Cancelar la operación en curso\n` +
    `/ayuda — Mostrar esta ayuda`,

  rateLimited: () =>
    `Has hecho muchos cambios hoy. Espera unas horas o escribe al profesor.`,

  sessionExpired: () =>
    `La sesión expiró. Empieza otra vez con /variante.`,

  lockNoticeGroup: () =>
    `🔒 Se ha cerrado el plazo de cambios de variante. A partir de ahora cualquier cambio necesita aprobación del profesor.`,
};
