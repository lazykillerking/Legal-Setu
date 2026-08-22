"""
Legal Setu backend — FastAPI skeleton.

This is a minimal scaffold. Agent orchestration, RAG, and Supabase wiring
are not yet implemented — see /api/chat for the current stub endpoint.

Run locally with: uvicorn main:app --reload
"""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import chat

app = FastAPI(
    title="Legal Setu API",
    description="AI legal assistant backend (Legal Orchestrator + 8 specialized agents).",
    version="0.1.0",
)

# Local dev origins for the Next.js frontend. Override via env var when deploying.
allowed_origins = os.getenv(
    "CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok"}
