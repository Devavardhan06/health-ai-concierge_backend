from fastapi import APIRouter
from app.db.session import SessionLocal
from app.models.audit_log import AuditLog

router = APIRouter(prefix="/admin/audit", tags=["Admin"])

@router.get("/")
def get_audit_logs():
    db = SessionLocal()
    return db.query(AuditLog).order_by(
        AuditLog.created_at.desc()
    ).all()
