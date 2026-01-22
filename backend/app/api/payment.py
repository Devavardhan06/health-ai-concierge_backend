from fastapi import APIRouter, Request
from app.services.payment_service import create_payment_link
from app.core.rate_limiter import limiter

router = APIRouter(prefix="/payment", tags=["Payment"])


@router.post("/pay")
@limiter.limit("3/minute")
def initiate_payment(
    request: Request,
    patient_name: str
):
    payment_url = create_payment_link(
        amount_rupees=500,
        patient_name=patient_name
    )

    return {
        "message": "Please complete your payment using the link below.",
        "payment_url": payment_url
    }
