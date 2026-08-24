import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const SAFE_ERROR = "Unable to process your legal query right now.";
const MAX_MESSAGE_LENGTH = 50_000;

type LegalChatRequest = { message?: unknown; sessionId?: unknown; userId?: unknown };

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

function responseText(payload: unknown): string | null {
  if (typeof payload === "string") return payload;
  if (!payload || typeof payload !== "object") return null;
  const data = payload as Record<string, unknown>;
  for (const key of ["response", "message", "answer", "content", "output"]) {
    if (typeof data[key] === "string") return data[key] as string;
  }
  return responseText(data.data) ?? responseText(data.result);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ success: false, error: "Method not allowed." }, 405);

  let body: LegalChatRequest;
  try { body = await request.json(); } catch { return jsonResponse({ success: false, error: "Invalid request." }, 400); }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  if (!message || !sessionId || message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse({ success: false, error: "A valid message and sessionId are required." }, 400);
  }

  const apiUrl = Deno.env.get("LYZR_ORCHESTRATOR_API_URL");
  const agentId = Deno.env.get("LYZR_ORCHESTRATOR_AGENT_ID");
  const apiKey = Deno.env.get("LYZR_ORCHESTRATOR_API_KEY");
  if (!apiUrl || !agentId || !apiKey) {
    console.error("Lyzr orchestrator configuration is incomplete.");
    return jsonResponse({ success: false, error: SAFE_ERROR }, 503);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authHeader = request.headers.get("Authorization") ?? "";
  let authenticatedUserId: string | null = null;
  if (supabaseUrl && serviceRoleKey && authHeader) {
    const authClient = createClient(supabaseUrl, serviceRoleKey, { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false, autoRefreshToken: false } });
    const { data } = await authClient.auth.getUser();
    authenticatedUserId = data.user?.id ?? null;
  }

  // Only a verified JWT may associate a conversation with an auth.users record.
  // `requestedUserId` is accepted for compatibility but is never trusted on its own.
  const userId = authenticatedUserId;
  const database = supabaseUrl && serviceRoleKey ? createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  let conversationId: string | null = null;

  try {
    if (database) {
      const { data: existing } = await database.from("legal_conversations").select("id").eq("session_id", sessionId).maybeSingle();
      if (existing) {
        conversationId = existing.id;
      } else {
        const title = message.length > 60 ? `${message.slice(0, 57).trim()}…` : message;
        const { data: conversation, error: conversationError } = await database.from("legal_conversations").insert({ session_id: sessionId, user_id: userId, title }).select("id").single();
        if (conversationError) throw conversationError;
        conversationId = conversation.id;
      }
      await database.from("legal_messages").insert({ conversation_id: conversationId, role: "user", content: message });
      await database.from("legal_agent_runs").insert({ conversation_id: conversationId, agent_name: "Legal Orchestrator", agent_id: agentId, status: "started" });
    }

    const lyzrResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ user_id: userId, agent_id: agentId, session_id: sessionId, message }),
    });
    if (!lyzrResponse.ok) {
      const errorBody = await lyzrResponse.text();
      console.error("Lyzr error body:", errorBody);
      throw new Error(`Lyzr request failed with status ${lyzrResponse.status}`);
    }
    const response = responseText(await lyzrResponse.json());
    if (!response) throw new Error("Lyzr response did not contain text.");

    if (database && conversationId) {
      await database.from("legal_messages").insert({ conversation_id: conversationId, role: "assistant", content: response });
      await database.from("legal_agent_runs").insert({ conversation_id: conversationId, agent_name: "Legal Orchestrator", agent_id: agentId, status: "completed" });
    }
    return jsonResponse({ success: true, sessionId, response });
  } catch (error) {
    console.error("Legal chat request failed.", error instanceof Error ? error.message : "Unknown error");
    if (database && conversationId) await database.from("legal_agent_runs").insert({ conversation_id: conversationId, agent_name: "Legal Orchestrator", agent_id: agentId, status: "failed" });
    return jsonResponse({ success: false, error: SAFE_ERROR }, 502);
  }
});
