// Single shared Supabase client for the whole app. Import this everywhere —
// never call createClient() again elsewhere, so auth state stays in one place.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!supabaseConfigured) {
  // Don't throw — let the app render and surface a clear error in the UI
  // instead of a blank white screen from a missing .env file.
  console.error(
    'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in frontend/.env.local (see .env.example).'
  );
}

// Only the anon/publishable key ever belongs here. It is safe to expose in
// client code because table access is enforced by Postgres Row Level Security,
// not by keeping this key secret. NEVER put the service_role key, any secret
// key, or a database password in frontend code or env vars prefixed VITE_ —
// those are bundled into the public JS build.
export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
