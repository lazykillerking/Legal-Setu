# Supabase

This folder holds the database schema and setup notes for Legal Setu.
Nothing is wired up yet — `schema.sql` is a placeholder scaffold.

## Env vars needed

Backend and frontend will each need these once Supabase is actually
connected. Set them in `backend/.env` and `frontend/.env.local`
respectively (never commit real values — see the `.env.example` files).

- `SUPABASE_URL` — your Supabase project URL.
- `SUPABASE_ANON_KEY` — the public anon key (safe for client use with RLS).

For frontend (Next.js) usage these are typically also exposed as:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Next steps (not done yet)

- Design schema for chat sessions/messages, case history, generated
  documents, and agent routing logs.
- Add Supabase client setup in `frontend` and `backend`.
- Add RLS policies once auth model is decided.
