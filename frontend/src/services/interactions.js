// Best-effort activity log: records what a signed-in user says/does so future
// agents have full context. Never throws into the caller — logging must not
// break the (currently mocked) orchestration UI if it fails or the user is signed out.
import { supabase } from './supabaseClient.js';

export async function logInteraction(userId, kind, content, metadata = {}) {
  if (!supabase || !userId) return;
  try {
    await supabase.from('user_interactions').insert({ user_id: userId, kind, content, metadata });
  } catch (err) {
    console.warn('logInteraction failed:', err?.message || err);
  }
}
