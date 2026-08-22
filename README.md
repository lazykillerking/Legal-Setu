# Legal Setu

AI Legal Assistant for Citizens — built for **All India Hackathon 2026** (presented by Axentra, hosted on Unstop), Problem Statement **PS-013**.

Citizens struggle with legal procedures/documents due to complex language and low legal awareness; professional help is expensive and slow. Legal Setu closes that gap.

**Team:** sudo rm -rf last_braincell — Arsh Khandelwal, Kunal Bansal, Swastik Arora

## What it is

A multi-agent AI legal assistant built around a **Legal Orchestrator** that reads a user's plain-language legal problem and routes it to the right specialized agent, instead of one generic chatbot.

**USP:** One Legal AI → Multiple Specialized Agents → From Legal Question to Action. A bridge to legal awareness/action, not a lawyer replacement.

### The 8 specialized agents

1. **Legal Query Agent** — explains concepts simply
2. **Legal Research Agent** — searches Acts, rules, judgments
3. **Rights Agent** — identifies applicable rights
4. **Case Guidance Agent** — step-by-step next actions
5. **Document Generation Agent** — drafts notices, RTIs, affidavits
6. **Complaint & Filing Agent** — guides where/how to file
7. **Contract Review Agent** — flags risky clauses
8. **Safety Agent** — flags high-risk situations, disclaimers

## Tech stack

- **Lyzr.ai** — agent orchestration
- **Supabase** — backend / DB / auth
- **RAG** grounded in verified legal sources, starting with the Indian Constitution
- **Wolfram** (under consideration) — computational tasks like deadline/notice-period calculations
- Multilingual support built into every agent, not a bolt-on layer

### Design system (light mode)

Background `#F6F8FC` · card `#FFFFFF` · elevated `#F0F4FA` · nested `#E8EEF7` · borders `#D7DFEC` / `#E8EDF5` · text `#172033` / `#66728A` / `#9AA5B8` · blue accent `#3D73E6` / `#6F9BFF` / `#EAF1FF` / `#BFD1FA` · warning orange `#E87525` / `#FFF1E6` (sparingly).

Fonts: Inter (UI), JetBrains Mono (system logs/code). Logo mark: **LS**.

## Running locally

Initial scaffold: Next.js frontend (`/frontend`), FastAPI backend
(`/backend`), Supabase schema placeholder (`/supabase`). See
[SETUP.md](./SETUP.md) for full instructions.

## Hackathon status

- **Phase 1** (idea screening) — submitted, shortlisted
- **Phase 2** (elevator pitch video) — submitted
- **Phase 3** (72-hour coding sprint) — in progress: building the working prototype

## Contributing (team only)

Repo is shared across 3 collaborators. `main` is protected: no direct pushes for collaborators, no force-push, no branch deletion on main.

```bash
git clone https://github.com/lazykillerking/Legal-Setu.git
cd Legal-Setu
git checkout -b <yourname>/<feature>       # e.g. arsh/orchestrator
```

Work loop:

```bash
git pull origin main                        # always pull first
git add <files>
git commit -m "message"
git push -u origin <yourname>/<feature>
```

Open a PR into `main` on GitHub. Feature branches auto-delete after merge.

Keep your branch in sync with main:

```bash
git checkout main && git pull origin main
git checkout <yourname>/<feature>
git merge main                               # or: git rebase main
```
