from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.chat import ChatMessage
from app.schemas.chat import ChatCreate, ChatResponse
from app.services.llm_service import get_ai_reply
from app.services.compliance_service import detect_risk
from app.services.escalation_service import human_escalation_message
from app.core.rate_limiter import limiter

router = APIRouter(prefix="/chat", tags=["Chat"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=list[ChatResponse])
@limiter.limit("10/minute")
def send_message(
    request: Request,
    chat: ChatCreate,
    db: Session = Depends(get_db)
):
    # 🔍 Compliance check
    risk_result = detect_risk(chat.message)

    if risk_result["risk_detected"]:
        ai_text = human_escalation_message()
    else:
        ai_text = get_ai_reply(chat.message)

    # Store user message
    user_msg = ChatMessage(sender="user", message=chat.message)
    db.add(user_msg)
    db.commit()
    db.refresh(user_msg)

    # Store AI message
    ai_msg = ChatMessage(sender="concierge", message=ai_text)
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)

    return [user_msg, ai_msg]


@router.get("/", response_model=list[ChatResponse])
def get_chat_history(db: Session = Depends(get_db)):
    return db.query(ChatMessage).order_by(ChatMessage.timestamp).all()
