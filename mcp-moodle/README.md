# MCP moodle.ladetec.com — Fase 1

Server MCP (Python, `mcp` SDK) que habla con el REST web service de Moodle.
Cubre: revisar y calificar tareas, ver notas de estudiantes, y gestionar
estructura de secciones del curso.

**No cubre** (ver limitación abajo): editar el contenido interno de una
actividad (texto de una Page, archivo de un Resource, Label, enunciado de un
Quiz, etc.). Moodle core no expone función web service para eso; el plugin
comunitario usado acá (`local_wsmanagesections`) solo maneja secciones, no el
contenido de cada módulo. Cubrir eso es Fase 2: un plugin Moodle a medida
(PHP) que se instala en el propio Moodle y expone funciones nuevas.

## Setup en Moodle (admin de moodle.ladetec.com)

1. **Site administration → Advanced features** → habilitar *Enable web services*.
2. **Site administration → Plugins → Web services → Manage protocols** → habilitar
   *REST protocol*.
3. **Site administration → Plugins → Install plugins** → subir el zip de
   [`local_wsmanagesections`](https://github.com/corvus-albus/moodle-local_wsmanagesections)
   (necesario solo para las funciones de secciones).
4. Crear cuenta de servicio dedicada, ej. `mcp-service` (**Site administration →
   Users → Add a new user**), y matricularla como **Teacher** en el/los cursos
   que va a manejar el MCP (no como admin del sitio).
5. **Site administration → Plugins → Web services → External services →
   Add** → crear servicio nuevo, ej. "MCP Automatismos", marcado como
   *Authorised users only*. Agregarle estas funciones:
   - `mod_assign_get_assignments`
   - `mod_assign_get_submissions`
   - `mod_assign_get_grades`
   - `mod_assign_get_user_flags`
   - `mod_assign_save_grade`
   - `gradereport_user_get_grade_items`
   - `core_enrol_get_enrolled_users`
   - `core_course_get_contents`
   - `local_wsmanagesections_get_sections`
   - `local_wsmanagesections_create_sections`
   - `local_wsmanagesections_update_sections`
   - `local_wsmanagesections_move_section`
   - `local_wsmanagesections_delete_sections`
6. En el servicio creado, pestaña **Authorised users** → agregar `mcp-service`.
7. **Site administration → Plugins → Web services → Manage tokens → Add** →
   crear token para `mcp-service`, asociado al servicio "MCP Automatismos".

## Setup local

```sh
cd mcp-moodle
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # completar MOODLE_TOKEN, nunca commitear este archivo
```

Registrar el server en Claude Code:

```sh
claude mcp add moodle-ladetec -- python3 /ruta/absoluta/a/mcp-moodle/server.py
```

Las variables `MOODLE_URL` / `MOODLE_TOKEN` deben estar exportadas en el
entorno donde corre `claude` (o cargadas desde `.env` antes de lanzarlo) — el
server las lee de `os.environ` y falla explícito si faltan.

## Herramientas expuestas

| Tool | Qué hace |
|---|---|
| `list_assignments` | Tareas de un curso |
| `get_submissions` | Entregas de estudiantes |
| `get_grades` / `get_user_flags` | Notas y estado de flujo puestas hasta ahora |
| `grade_assignment` | Califica una entrega, con feedback |
| `get_grade_items` | Notas finales del curso |
| `get_enrolled_users` | Estudiantes matriculados |
| `get_course_contents` | Estructura completa (solo lectura, sin plugin) |
| `get_sections` / `create_section` / `update_section` / `move_section` / `delete_section` | Estructura de secciones (requiere `local_wsmanagesections`) |

`delete_section` es irreversible en el curso — confirmar con el usuario del
lado del agente antes de invocarla.

## Fase 2 (pendiente)

Editar contenido real de actividades (Page/Resource/Label/Quiz) requiere un
plugin Moodle a medida corriendo del lado del servidor, con acceso directo a
las APIs internas de cada módulo — no es alcanzable solo con REST estándar.
