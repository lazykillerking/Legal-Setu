"""
Stub chat router.

Currently just echoes the input back. This is where requests will
eventually be routed to the Legal Orchestrator, which dispatches to one
of the 8 specialized agents (Legal Query, Legal Research, Rights,
Case Guidance, Document Generation, Complaint & Filing, Contract Review,
Safety).
"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str
    agent: str = "stub"


@router.post("", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    """Echo stub — replace with orchestrator routing logic."""
    return ChatResponse(reply=f"Echo: {payload.message}", agent="stub")
