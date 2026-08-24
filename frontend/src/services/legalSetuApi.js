import { supabase } from './supabaseClient.js';

const SESSION_STORAGE_KEY = 'legal-setu-session-id';

function getSessionId() {
  let sessionId = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  return sessionId;
}

/** Starts a fresh conversation: rotates the persisted session id so the next
 * message begins a new `legal_conversations` row instead of appending to the
 * previous one. */
export function startNewSession() {
  window.localStorage.setItem(SESSION_STORAGE_KEY, crypto.randomUUID());
}

/** Sends a chat turn through the Supabase Edge Function, never directly to Lyzr. */
export async function submitQuery(message) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data: authData } = await supabase.auth.getUser();
  const { data, error } = await supabase.functions.invoke('legal-chat', {
    body: {
      message,
      sessionId: getSessionId(),
      userId: authData.user?.id,
    },
  });

  if (error || !data?.success || typeof data.response !== 'string') {
    throw new Error(data?.error || 'Unable to process your legal query right now.');
  }

  return { sessionId: data.sessionId, response: data.response };
}
