from fastapi import APIRouter, Depends, Request
from pathlib import Path

from app.core.security import require_admin
from app.services.audit_service import log_audit
from app.db.session import SessionLocal
from app.core.rate_limiter import limiter

router = APIRouter(prefix="/admin/knowledge", tags=["Admin"])

KNOWLEDGE_FILE = Path("app/knowledge/clinic_data.txt")


@router.get("/", dependencies=[Depends(require_admin)])
def read_knowledge():
    return {
        "content": KNOWLEDGE_FILE.read_text()
    }


@router.post("/", dependencies=[Depends(require_admin)])
@limiter.limit("5/minute")
def update_knowledge(
    request: Request,
    content: str
):
    db = SessionLocal()

    KNOWLEDGE_FILE.write_text(content)

    log_audit(
        db=db,
        actor="admin",
        action="UPDATED_KNOWLEDGE",
        resource="clinic_data",
        details="Clinic knowledge updated"
    )

    return {"status": "Clinic knowledge updated"}
