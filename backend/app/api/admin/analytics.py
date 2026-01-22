from fastapi import APIRouter
from app.db.session import SessionLocal
from app.models.analytics import AnalyticsEvent
from fastapi import Depends
from app.core.security import require_admin

router = APIRouter(prefix="/admin/analytics", tags=["Admin"])

@router.get("/", dependencies=[Depends(require_admin)])
def get_analytics():
    db = SessionLocal()
    return db.query(AnalyticsEvent).order_by(
        AnalyticsEvent.created_at.desc()
    ).all()
