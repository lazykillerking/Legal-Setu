create policy "Users can create their own legal conversations"
  on public.legal_conversations for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can create messages in their own legal conversations"
  on public.legal_messages for insert to authenticated
  with check (exists (
    select 1 from public.legal_conversations conversations
    where conversations.id = legal_messages.conversation_id
      and conversations.user_id = (select auth.uid())
  ));
