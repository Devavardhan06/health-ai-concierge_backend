from fastapi import APIRouter
from app.db.session import SessionLocal
from app.models.escalation import Escalation
from fastapi import Depends
from app.core.security import require_admin
from app.services.audit_service import log_audit


router = APIRouter(prefix="/admin/escalations", tags=["Admin"])

@router.get("/", dependencies=[Depends(require_admin)])
def list_escalations():
    db = SessionLocal()
    return db.query(Escalation).all()


@router.post("/{escalation_id}/resolve")
def resolve_escalation(escalation_id: int):
    db = SessionLocal()

    escalation.status = "RESOLVED"
    db.commit()

    # ✅ AUDIT LOG HERE
    log_audit(
        db=db,
        actor="admin",
        action="RESOLVED_ESCALATION",
        resource="escalation",
        details=f"Escalation ID {escalation_id} resolved"
    )

    return {"status": "Escalation resolved"}
