from sqlalchemy import Column, Integer, String, Date, Time, DateTime, Enum
from sqlalchemy.sql import func
from app.db.session import Base
import enum


class BookingStatus(enum.Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    CANCELLED = "CANCELLED"
    COMPLETED = "COMPLETED"


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String, nullable=False)
    appointment_date = Column(Date, nullable=False)
    appointment_time = Column(Time, nullable=False)

    status = Column(
        Enum(BookingStatus),
        default=BookingStatus.PENDING
    )

    created_at = Column(DateTime(timezone=True), server_default=func.now())
