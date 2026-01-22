from fastapi import APIRouter
from app.db.session import SessionLocal
from app.models.booking import Booking
from app.models.payment import Payment
from fastapi import Depends
from app.core.security import require_admin
from app.services.audit_service import log_audit

router = APIRouter(prefix="/admin/bookings", tags=["Admin"])

@router.get("/", dependencies=[Depends(require_admin)])
def list_bookings():
    db = SessionLocal()
    bookings = db.query(Booking).all()
    return bookings


@router.get("/payments")
def list_payments():
    db = SessionLocal()
    payments = db.query(Payment).all()
    return payments


@router.post("/{booking_id}/cancel")
def cancel_booking(booking_id: int):
    db = SessionLocal()

    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    booking.status = "CANCELLED"
    db.commit()

    # ✅ AUDIT LOG HERE
    log_audit(
        db=db,
        actor="admin",
        action="CANCELLED_BOOKING",
        resource="booking",
        details=f"Booking ID {booking_id} cancelled"
    )

    return {"status": "Booking cancelled"}
