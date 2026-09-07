-- Initial database schema for Telegram Bot & Moodle integration

PRAGMA foreign_keys = ON;

CREATE TABLE courses (
  id                INTEGER PRIMARY KEY,
  code              TEXT NOT NULL UNIQUE,          -- e.g. 'auto-2026-1'
  name              TEXT NOT NULL,                 -- e.g. 'Automatismos Industriales 2026-1'
  telegram_chat_id  INTEGER UNIQUE,                -- group chat ID (negative integer)
  assignment_open   INTEGER NOT NULL DEFAULT 1 CHECK (assignment_open IN (0,1)),
  changes_locked    INTEGER NOT NULL DEFAULT 0 CHECK (changes_locked IN (0,1)),
  deadline_at       TEXT,                          -- UTC ISO-8601; NULL = no deadline
  timezone          TEXT NOT NULL DEFAULT 'America/Havana',
  pinned_message_id INTEGER,                       -- pinned message ID in Telegram group
  pinned_dirty      INTEGER NOT NULL DEFAULT 0 CHECK (pinned_dirty IN (0,1)),
  created_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE people (
  id          INTEGER PRIMARY KEY,
  course_id   INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  moodle_id   TEXT,                                -- Moodle stable user ID; NULL if manual
  full_name   TEXT NOT NULL,                       -- Full name as displayed
  search_name TEXT NOT NULL,                       -- Normalized name for search
  origin      TEXT NOT NULL DEFAULT 'moodle' CHECK (origin IN ('moodle','manual')),
  active      INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0,1)),
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX ux_people_moodle
  ON people(course_id, moodle_id) WHERE moodle_id IS NOT NULL;
CREATE INDEX ix_people_course_active ON people(course_id, active);
CREATE INDEX ix_people_search        ON people(course_id, search_name);

CREATE TRIGGER trg_people_search_ins AFTER INSERT ON people
WHEN NEW.search_name IS NULL OR NEW.search_name = ''
BEGIN
  UPDATE people SET search_name = lower(trim(NEW.full_name)) WHERE id = NEW.id;
END;

CREATE TABLE telegram_links (
  person_id         INTEGER PRIMARY KEY REFERENCES people(id) ON DELETE CASCADE,
  course_id         INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  telegram_user_id  INTEGER NOT NULL,
  telegram_username TEXT,                          -- without '@', optional
  linked_at         TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX ux_links_course_user
  ON telegram_links(course_id, telegram_user_id);

CREATE TABLE variants (
  id            INTEGER PRIMARY KEY,               -- variant number (1..63)
  title         TEXT NOT NULL,
  search_title  TEXT NOT NULL,                     -- normalized
  slug          TEXT NOT NULL UNIQUE,
  url           TEXT NOT NULL,                     -- absolute URL
  capacity      INTEGER NOT NULL DEFAULT 1 CHECK (capacity IN (1,2)),
  active        INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0,1)),
  first_seen_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE assignments (
  id                          INTEGER PRIMARY KEY,
  course_id                   INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  variant_id                  INTEGER NOT NULL REFERENCES variants(id),
  person_id                   INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  slot                        INTEGER NOT NULL CHECK (slot IN (1,2)),
  created_by_telegram_user_id INTEGER,             -- NULL if created by agent
  created_by_person_id        INTEGER REFERENCES people(id),  -- if actor is linked
  source                      TEXT NOT NULL
                              CHECK (source IN ('student','teacher','agent','request')),
  created_at                  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX ux_assign_slot   ON assignments(course_id, variant_id, slot);
CREATE UNIQUE INDEX ux_assign_person ON assignments(course_id, person_id);
CREATE INDEX ix_assign_variant ON assignments(course_id, variant_id);

CREATE TRIGGER trg_assign_check_ins BEFORE INSERT ON assignments
BEGIN
  SELECT CASE
    WHEN NEW.slot > (SELECT capacity FROM variants WHERE id = NEW.variant_id)
      THEN RAISE(ABORT, 'slot_excede_capacidad')
    WHEN (SELECT active FROM variants WHERE id = NEW.variant_id) = 0
      THEN RAISE(ABORT, 'variante_inactiva')
    WHEN (SELECT active FROM people WHERE id = NEW.person_id) = 0
      THEN RAISE(ABORT, 'alumno_inactivo')
    WHEN (SELECT course_id FROM people WHERE id = NEW.person_id) <> NEW.course_id
      THEN RAISE(ABORT, 'alumno_de_otro_curso')
  END;
END;

CREATE TRIGGER trg_assign_check_upd BEFORE UPDATE ON assignments
BEGIN
  SELECT CASE
    WHEN NEW.slot > (SELECT capacity FROM variants WHERE id = NEW.variant_id)
      THEN RAISE(ABORT, 'slot_excede_capacidad')
    WHEN (SELECT course_id FROM people WHERE id = NEW.person_id) <> NEW.course_id
      THEN RAISE(ABORT, 'alumno_de_otro_curso')
  END;
END;

CREATE TABLE change_requests (
  id                            INTEGER PRIMARY KEY,
  course_id                     INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  person_id                     INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  from_variant_id               INTEGER REFERENCES variants(id),   -- NULL if didn't have one
  to_variant_id                 INTEGER NOT NULL REFERENCES variants(id),
  requested_by_telegram_user_id INTEGER NOT NULL,
  reason                        TEXT,
  status                        TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','approved','rejected','expired','failed','cancelled')),
  admin_chat_id                 INTEGER,   -- where request card was sent
  admin_message_id              INTEGER,
  created_at                    TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at                   TEXT,
  resolved_by                   INTEGER,   -- telegram_user_id of teacher
  resolution_note               TEXT
);

CREATE UNIQUE INDEX ux_req_one_pending
  ON change_requests(course_id, person_id) WHERE status = 'pending';

CREATE INDEX ix_req_pending ON change_requests(course_id, status, created_at);

CREATE TABLE audit_log (
  id                    INTEGER PRIMARY KEY,
  course_id             INTEGER NOT NULL,
  at                    TEXT NOT NULL DEFAULT (datetime('now')),
  actor_telegram_user_id INTEGER,
  actor_role            TEXT NOT NULL CHECK (actor_role IN ('student','teacher','agent','system')),
  action                TEXT NOT NULL,
  person_id             INTEGER,
  variant_id            INTEGER,
  detail                TEXT,          -- arbitrary JSON
  created_at            TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX ix_audit_course_at ON audit_log(course_id, at);
CREATE INDEX ix_audit_person    ON audit_log(person_id, at);
CREATE INDEX ix_audit_actor_at  ON audit_log(actor_telegram_user_id, at);

CREATE TABLE sessions (
  telegram_user_id INTEGER PRIMARY KEY,
  course_id        INTEGER,
  state            TEXT NOT NULL,
  payload          TEXT,            -- JSON
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE processed_updates (
  update_id INTEGER PRIMARY KEY,
  at        TEXT NOT NULL DEFAULT (datetime('now'))
);
