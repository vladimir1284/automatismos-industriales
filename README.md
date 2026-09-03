# Automatismos Industriales

Repositorio del curso: tareas, notas de clase, proyectos, y las
herramientas que los soportan.

## Contenido

- **`docs/`** — sitio del curso (MkDocs Material): tareas, notas de clase,
  proyectos. Se despliega a Cloudflare Pages en cada push a `main` que
  toque `docs/` o `mkdocs.yml` (ver `.github/workflows/docs.yml`).
- **`mcp-moodle/`** — server MCP que conecta un agente (Claude Code) con
  moodle.ladetec.com, para calificar tareas, ver notas y gestionar
  secciones del curso sin entrar al panel web.

## MCP de Moodle — puesta en marcha

Detalle completo, incluidas las funciones exactas del web service y
limitaciones, en [`mcp-moodle/README.md`](mcp-moodle/README.md). Resumen
de pasos:

### 1. Configurar Moodle (como admin de moodle.ladetec.com)

1. *Site administration → Advanced features* → habilitar **Enable web services**.
2. *Site administration → Plugins → Web services → Manage protocols* →
   habilitar **REST protocol**.
3. *Site administration → Plugins → Install plugins* → subir el plugin
   [`local_wsmanagesections`](https://github.com/corvus-albus/moodle-local_wsmanagesections)
   (necesario para las funciones de secciones).
4. Crear usuario de servicio dedicado (ej. `mcp-service`) y matricularlo
   como **Teacher** en el/los cursos a manejar — nunca como admin de sitio.
5. *Site administration → Plugins → Web services → External services →
   Add* → crear servicio (ej. "MCP Automatismos"), marcado *Authorised
   users only*, con las funciones listadas en `mcp-moodle/README.md`.
6. En el servicio, pestaña **Authorised users** → agregar `mcp-service`.
7. *Site administration → Plugins → Web services → Manage tokens → Add* →
   generar token para `mcp-service` asociado a ese servicio.

### 2. Setup local del server MCP

```sh
cd mcp-moodle
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # completar MOODLE_TOKEN — nunca commitear .env
```

### 3. Registrar el server en Claude Code

```sh
claude mcp add moodle-ladetec -- python3 /ruta/absoluta/a/mcp-moodle/server.py
```

`MOODLE_URL` y `MOODLE_TOKEN` deben estar en el entorno donde corre
`claude` (o cargados desde `.env` antes de lanzarlo) — el server los lee
de `os.environ` y falla explícito si faltan.

### 4. Verificar

Con el server registrado, pedirle al agente algo simple como "lista las
tareas del curso `<course_id>`" (tool `list_assignments`). Si responde
`invalidtoken` o `accessexception`, revisar paso 1.5–1.7 (funciones
autorizadas, usuario autorizado, token vigente).

## Herramientas expuestas por el MCP

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

`delete_section` es irreversible — confirmar con el usuario antes de invocarla.

**No cubierto (Fase 2):** editar contenido interno de una actividad
(texto de Page, archivo de Resource, enunciado de Quiz). Moodle core no
expone función web service para eso; requiere plugin PHP a medida.
