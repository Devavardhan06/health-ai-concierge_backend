from fastapi import APIRouter, Body
from pydantic import BaseModel
import asyncio
import random

router = APIRouter(prefix="/triage", tags=["Triage"])

class TriageRequest(BaseModel):
    symptom: str

@router.post("/chat")
async def triage_chat(request: TriageRequest):
    """
    Simulated AI Triage endpoint for the Hero widget.
    Returns a streaming-like or instant quick response.
    """
    # Simulate thinking time
    await asyncio.sleep(1)
    
    symptom = request.symptom.lower()
    
    if "chest" in symptom or "heart" in symptom:
        return {
            "risk_level": "High",
            "message": "⚠️ Based on 'chest pain', this could be serious. I recommend immediate emergency care or calling 911. Do not wait.",
            "action": "emergency"
        }
    elif "fever" in symptom and "child" in symptom:
        return {
            "risk_level": "Medium",
            "message": "For a child with fever, monitor temperature. If > 102°F or persistent > 24h, consult a pediatrician. I can find one near you.",
            "action": "consult"
        }
    else:
        return {
            "risk_level": "Low",
            "message": f"I understand you are experiencing '{request.symptom}'. based on initial triage, this seems manageable. Would you like to see a GP?",
            "action": "book"
        }
