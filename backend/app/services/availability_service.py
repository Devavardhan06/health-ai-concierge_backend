from datetime import datetime, timedelta, time
from app.services.calendar_service import get_existing_events

CLINIC_START = time(9, 0)
CLINIC_END = time(18, 0)
APPOINTMENT_DURATION = timedelta(minutes=30)
BUFFER_TIME = timedelta(minutes=10)


def generate_daily_slots(date):
    slots = []
    current = datetime.combine(date, CLINIC_START)
    end = datetime.combine(date, CLINIC_END)

    while current + APPOINTMENT_DURATION <= end:
        slots.append({
            "start": current,
            "end": current + APPOINTMENT_DURATION
        })
        current += APPOINTMENT_DURATION + BUFFER_TIME

    return slots


def get_available_slots(date):
    slots = generate_daily_slots(date)
    available = []

    for slot in slots:
        events = get_existing_events(slot["start"], slot["end"])
        if not events:
            available.append(slot)

    return available
