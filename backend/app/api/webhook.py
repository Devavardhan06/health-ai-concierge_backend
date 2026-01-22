from fastapi import APIRouter, Request, Header
import stripe

from app.core.config import settings
from app.db.session import SessionLocal
from app.services.audit_service import log_audit

router = APIRouter(prefix="/webhook", tags=["Webhook"])

stripe.api_key = settings.STRIPE_SECRET_KEY


@router.post("/stripe")
async def stripe_webhook(
    request: Request,
    stripe_signature: str = Header(None)
):
    payload = await request.body()

    try:
        event = stripe.Webhook.construct_event(
            payload,
            stripe_signature,
            settings.STRIPE_WEBHOOK_SECRET
        )
    except Exception:
        return {"status": "invalid signature"}

    # ✅ Only now we trust the event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]

        db = SessionLocal()

        # 🔑 Mark appointment as PAID here (later step)
        print("✅ Payment confirmed for session:", session["id"])

        # ✅ AUDIT LOG (correct place)
        log_audit(
            db=db,
            actor="system",
            action="PAYMENT_CONFIRMED",
            resource="payment",
            details=f"Stripe session {session['id']} confirmed"
        )

    return {"status": "success"}
