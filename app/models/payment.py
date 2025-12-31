from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.sql import func
from app.db.session import Base
import enum


class PaymentStatus(enum.Enum):
    INITIATED = "INITIATED"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"
    REFUNDED = "REFUNDED"


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"))
    stripe_session_id = Column(String, unique=True, index=True)
    amount = Column(Integer)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.INITIATED)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
