-- user_interactions: best-effort activity log written by
-- frontend/src/services/interactions.js. Table was missing from tracked
-- migrations even though the client already inserted into it.
create table if not exists public.user_interactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,
  content text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.user_interactions enable row level security;

create policy "Users can view their own interactions"
  on public.user_interactions for select
  using (user_id = auth.uid());

create policy "Users can insert their own interactions"
  on public.user_interactions for insert
  with check (user_id = auth.uid());

-- legal_agent_runs had a SELECT policy but no INSERT policy; client-side
-- writes only worked because the edge function uses the service-role key.
-- Add the matching insert policy for consistency with the other tables.
create policy "Users can insert their own agent runs"
  on public.legal_agent_runs for insert
  with check (
    conversation_id in (
      select id from public.legal_conversations where user_id = auth.uid()
    )
  );
