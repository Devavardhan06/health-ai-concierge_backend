from fastapi import APIRouter
from app.db.session import SessionLocal
from app.models.chat import ChatMessage
from fastapi import Depends
from app.core.security import require_admin

router = APIRouter(prefix="/admin/chats", tags=["Admin"])

@router.get("/", dependencies=[Depends(require_admin)])
def get_all_chats():
    db = SessionLocal()
    return db.query(ChatMessage).order_by(ChatMessage.timestamp.desc()).all()
