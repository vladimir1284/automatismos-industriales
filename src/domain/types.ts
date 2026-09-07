export interface Course {
  id: number;
  code: string;
  name: string;
  telegram_chat_id: number | null;
  assignment_open: number;
  changes_locked: number;
  deadline_at: string | null;
  timezone: string;
  pinned_message_id: number | null;
  pinned_dirty: number;
}

export interface Person {
  id: number;
  course_id: number;
  moodle_id: string | null;
  full_name: string;
  search_name: string;
  origin: 'moodle' | 'manual';
  active: number;
}

export interface TelegramLink {
  person_id: number;
  course_id: number;
  telegram_user_id: number;
  telegram_username: string | null;
}

export interface Variant {
  id: number;
  title: string;
  search_title: string;
  slug: string;
  url: string;
  capacity: number;
  active: number;
}

export interface Assignment {
  id: number;
  course_id: number;
  variant_id: number;
  person_id: number;
  slot: number;
  created_by_telegram_user_id: number | null;
  created_by_person_id: number | null;
  source: 'student' | 'teacher' | 'agent' | 'request';
  created_at: string;
}

export interface ChangeRequest {
  id: number;
  course_id: number;
  person_id: number;
  from_variant_id: number | null;
  to_variant_id: number;
  requested_by_telegram_user_id: number;
  reason: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'expired' | 'failed' | 'cancelled';
  admin_chat_id: number | null;
  admin_message_id: number | null;
  created_at: string;
}
