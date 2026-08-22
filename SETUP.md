# Setup

Local dev instructions for the current skeleton (frontend + backend). No
real agent/LLM logic is wired up yet — this just gets the shell running.

## Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.example .env.local   # optional for now, nothing is read yet
npm run dev
```

Visit `http://localhost:3000` for the landing page and
`http://localhost:3000/chat` for the chat UI (mock responses only, no
backend call wired in yet).

> Note: requires a working Node.js runtime with a functioning
> `Headers`/`undici` implementation (Node 20 LTS or newer from
> nodejs.org). Some repackaged/distro Node builds are known to be broken
> for this; use the official binaries if `next dev`/`next build` throws
> `webidl.util.markAsUncloneable is not a function`.

## Backend (FastAPI)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # .venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

API runs on `http://localhost:8000` by default. Stub endpoints:

- `GET /api/health` — health check
- `POST /api/chat` — echoes back `{"message": "..."}` for now (no
  orchestrator/agent routing yet)

CORS is configured to allow `http://localhost:3000` by default; override
with `CORS_ALLOWED_ORIGINS` in `backend/.env`.

## Supabase

Not connected yet. See `supabase/README.md` and `supabase/schema.sql`
for the current placeholder structure and the env vars (`SUPABASE_URL`,
`SUPABASE_ANON_KEY`) that will be needed once it's wired in.
