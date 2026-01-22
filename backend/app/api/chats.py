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
        confidence = 1.0
        reasoning = "Risk detected by compliance engine."
    else:
        ai_resp = get_ai_reply(chat.message)
        ai_text = ai_resp["text"]
        confidence = ai_resp.get("confidence")
        reasoning = ai_resp.get("reasoning")

    # Store user message
    user_msg = ChatMessage(sender="user", message=chat.message)
    db.add(user_msg)
    db.commit()
    db.refresh(user_msg)

    # Store AI message
    ai_msg = ChatMessage(
        sender="concierge", 
        message=ai_text,
        confidence_score=confidence,
        reasoning=reasoning
    )
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)

from fastapi import UploadFile, File, Form
from app.services.file_service import extract_text_from_pdf

@router.post("/upload", response_model=ChatResponse)
@limiter.limit("5/minute")
async def upload_file(
    request: Request,
    file: UploadFile = File(...),
    message: str = Form(None),
    db: Session = Depends(get_db)
):
    # 1. Read file
    content = await file.read()
    
    # 2. Extract Text
    extracted_text = ""
    if file.filename.endswith(".pdf"):
        extracted_text = extract_text_from_pdf(content)
    else:
        # Mock for images
        extracted_text = "[Image Analysis: Skin rash detected with moderate redness. No signs of infection.]"

    # 3. Construct prompt
    user_prompt = f"User uploaded file: {file.filename}\nExtracted Content:\n{extracted_text}\n\nUser Message: {message or 'Analyze this.'}"

    # 4. Get AI Reply
    ai_resp = get_ai_reply(user_prompt)
    
    # Store user message (with file note)
    user_msg_text = f"[Uploaded {file.filename}] {message or ''}"
    user_msg = ChatMessage(sender="user", message=user_msg_text)
    db.add(user_msg)
    db.commit()

    # Store AI message
    ai_msg = ChatMessage(
        sender="concierge", 
        message=ai_resp["text"], 
        confidence_score=ai_resp["confidence"],
        reasoning=ai_resp["reasoning"]
    )
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)

    return ai_msg


@router.get("/", response_model=list[ChatResponse])
def get_chat_history(db: Session = Depends(get_db)):
    return db.query(ChatMessage).order_by(ChatMessage.timestamp).all()
