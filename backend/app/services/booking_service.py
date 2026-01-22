from app.services.availability_service import get_available_slots
from app.services.calendar_service import create_event
from app.services.payment_service import create_payment_link


def book_appointment(date, preferred_time, patient_name):
    available_slots = get_available_slots(date)

    for slot in available_slots:
        if slot["start"].time() == preferred_time:
            # 1️⃣ Create calendar event (tentative)
            create_event(
                slot["start"],
                slot["end"],
                summary="Clinic Appointment (Pending Payment)",
                description=f"Patient: {patient_name}"
            )

            # 2️⃣ Generate payment link
            payment_url = create_payment_link(
                amount_rupees=500,  # consultation fee
                patient_name=patient_name
            )

            return {
                "message": (
                    f"Your appointment is reserved for "
                    f"{slot['start'].strftime('%I:%M %p')}. "
                    "Please complete payment to confirm 👇"
                ),
                "payment_url": payment_url
            }

    return {
        "message": "Requested time is not available. Please choose another slot."
    }
