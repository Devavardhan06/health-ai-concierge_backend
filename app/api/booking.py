from fastapi import APIRouter, Request
from datetime import date, time

from app.services.booking_service import book_appointment
from app.services.availability_service import get_available_slots
from app.core.rate_limiter import limiter

router = APIRouter(prefix="/booking", tags=["Booking"])


@router.get("/available-slots")
def available_slots(appointment_date: date):
    slots = get_available_slots(appointment_date)

    if not slots:
        return {"message": "No available slots for the selected date."}

    return {
        "available_slots": [
            {
                "start": slot["start"].strftime("%I:%M %p"),
                "end": slot["end"].strftime("%I:%M %p")
            }
            for slot in slots
        ]
    }


@router.post("/schedule")
@limiter.limit("5/minute")
def schedule_appointment(
    request: Request,
    appointment_date: date,
    appointment_time: time,
    patient_name: str
):
    message = book_appointment(
        appointment_date,
        appointment_time,
        patient_name
    )
    return {"message": message}
