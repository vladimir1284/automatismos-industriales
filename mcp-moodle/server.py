"""MCP server for moodle.ladetec.com — Fase 1: calificar tareas, ver notas, estructura de secciones.

Requires the Moodle REST protocol enabled and a token scoped to a dedicated
service account (Teacher role on the target course(s)) — see README.md.
"""

import os

import httpx
from mcp.server.fastmcp import FastMCP

MOODLE_URL = os.environ["MOODLE_URL"].rstrip("/")
MOODLE_TOKEN = os.environ["MOODLE_TOKEN"]
REST_ENDPOINT = f"{MOODLE_URL}/webservice/rest/server.php"

mcp = FastMCP("moodle-ladetec")


class MoodleError(RuntimeError):
    pass


def _call(wsfunction: str, **params) -> dict | list:
    payload = {
        "wstoken": MOODLE_TOKEN,
        "wsfunction": wsfunction,
        "moodlewsrestformat": "json",
    }
    payload.update(_flatten(params))
    resp = httpx.post(REST_ENDPOINT, data=payload, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    if isinstance(data, dict) and "exception" in data:
        raise MoodleError(f"{wsfunction}: {data.get('errorcode')} — {data.get('message')}")
    return data


def _flatten(params: dict, prefix: str = "") -> dict:
    """Moodle REST expects bracketed keys for nested arrays: plugindata[key][subkey]."""
    flat = {}
    for key, value in params.items():
        if value is None:
            continue
        full_key = f"{prefix}[{key}]" if prefix else key
        if isinstance(value, dict):
            flat.update(_flatten(value, full_key))
        elif isinstance(value, (list, tuple)):
            for i, item in enumerate(value):
                item_key = f"{full_key}[{i}]"
                if isinstance(item, dict):
                    flat.update(_flatten(item, item_key))
                else:
                    flat[item_key] = item
        else:
            flat[full_key] = value
    return flat


# ---- Tareas: revisar y calificar -------------------------------------------------

@mcp.tool()
def list_assignments(course_id: int) -> dict:
    """Lista las tareas (assignments) de un curso, con fechas y configuración."""
    return _call("mod_assign_get_assignments", courseids=[course_id])


@mcp.tool()
def get_submissions(assignment_id: int) -> dict:
    """Entregas de los estudiantes para una tarea: archivos, texto, estado."""
    return _call("mod_assign_get_submissions", assignmentids=[assignment_id])


@mcp.tool()
def get_grades(assignment_id: int) -> dict:
    """Calificaciones ya puestas para una tarea."""
    return _call("mod_assign_get_grades", assignmentids=[assignment_id])


@mcp.tool()
def get_user_flags(assignment_id: int) -> dict:
    """Estado de flujo de trabajo (workflowstate) y marcador asignado por estudiante."""
    return _call("mod_assign_get_user_flags", assignmentids=[assignment_id])


@mcp.tool()
def grade_assignment(
    assignment_id: int,
    user_id: int,
    grade: float,
    feedback_text: str = "",
    attempt_number: int = -1,
    workflow_state: str = "graded",
    apply_to_all: bool = False,
) -> str:
    """Califica la entrega de un estudiante en una tarea, con comentario de feedback opcional."""
    _call(
        "mod_assign_save_grade",
        assignmentid=assignment_id,
        userid=user_id,
        grade=grade,
        attemptnumber=attempt_number,
        addattempt=0,
        workflowstate=workflow_state,
        applytoall=int(apply_to_all),
        plugindata={
            "assignfeedbackcomments_editor": {"text": feedback_text, "format": 1},
        },
    )
    return f"assignment {assignment_id}: user {user_id} calificado con {grade}"


# ---- Notas / calificaciones --------------------------------------------------------

@mcp.tool()
def get_grade_items(course_id: int, user_id: int = 0) -> dict:
    """Notas finales de un curso. user_id=0 solo funciona si el token tiene permiso de docente/manager."""
    return _call("gradereport_user_get_grade_items", courseid=course_id, userid=user_id)


@mcp.tool()
def get_enrolled_users(course_id: int) -> list:
    """Estudiantes matriculados en un curso, con su userid — necesario para cruzar con notas/entregas."""
    return _call("core_enrol_get_enrolled_users", courseid=course_id)


# ---- Estructura del curso (secciones) — requiere plugin local_wsmanagesections -----

@mcp.tool()
def get_course_contents(course_id: int) -> list:
    """Estructura completa del curso: secciones y módulos (solo lectura, función core)."""
    return _call("core_course_get_contents", courseid=course_id)


@mcp.tool()
def get_sections(course_id: int) -> list:
    """Detalle de secciones vía local_wsmanagesections (requiere plugin instalado)."""
    return _call("local_wsmanagesections_get_sections", courseid=course_id)


@mcp.tool()
def create_section(course_id: int, position: int, name: str = "", summary: str = "") -> dict:
    """Crea una sección nueva en una posición dada del curso."""
    return _call(
        "local_wsmanagesections_create_sections",
        courseid=course_id,
        position=position,
        name=name,
        summary=summary,
    )


@mcp.tool()
def update_section(
    course_id: int,
    section_number: int,
    name: str = None,
    summary: str = None,
    visible: bool = None,
) -> dict:
    """Actualiza nombre, resumen o visibilidad de una sección existente."""
    section = {"sectionnumber": section_number}
    if name is not None:
        section["name"] = name
    if summary is not None:
        section["summary"] = summary
    if visible is not None:
        section["visible"] = int(visible)
    return _call("local_wsmanagesections_update_sections", courseid=course_id, sections=[section])


@mcp.tool()
def move_section(course_id: int, section_number: int, position: int) -> dict:
    """Mueve una sección a otra posición dentro del curso."""
    return _call(
        "local_wsmanagesections_move_section",
        courseid=course_id,
        sectionnumber=section_number,
        position=position,
    )


@mcp.tool()
def delete_section(course_id: int, section_number: int) -> dict:
    """Borra una sección del curso. Irreversible — confirmar con el usuario antes de llamar."""
    return _call(
        "local_wsmanagesections_delete_sections",
        courseid=course_id,
        sectionnumbers=[section_number],
    )


if __name__ == "__main__":
    mcp.run()
