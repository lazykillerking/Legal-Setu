create table if not exists public.legal_conversations (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null,
  session_id text not null unique, title text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.legal_messages (
  id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.legal_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')), content text not null, created_at timestamptz not null default now()
);
create table if not exists public.legal_agent_runs (
  id uuid primary key default gen_random_uuid(), conversation_id uuid references public.legal_conversations(id) on delete set null,
  agent_name text not null, agent_id text, status text not null, created_at timestamptz not null default now()
);
create index if not exists legal_messages_conversation_id_created_at_idx on public.legal_messages (conversation_id, created_at);
create index if not exists legal_agent_runs_conversation_id_created_at_idx on public.legal_agent_runs (conversation_id, created_at);
create or replace function public.set_legal_conversations_updated_at() returns trigger language plpgsql security invoker set search_path = public as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists legal_conversations_updated_at on public.legal_conversations;
create trigger legal_conversations_updated_at before update on public.legal_conversations for each row execute function public.set_legal_conversations_updated_at();
alter table public.legal_conversations enable row level security;
alter table public.legal_messages enable row level security;
alter table public.legal_agent_runs enable row level security;
create policy "Users can view their own legal conversations" on public.legal_conversations for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can view messages in their own legal conversations" on public.legal_messages for select to authenticated using (exists (select 1 from public.legal_conversations conversations where conversations.id = legal_messages.conversation_id and conversations.user_id = (select auth.uid())));
create policy "Users can view runs for their own legal conversations" on public.legal_agent_runs for select to authenticated using (exists (select 1 from public.legal_conversations conversations where conversations.id = legal_agent_runs.conversation_id and conversations.user_id = (select auth.uid())));
