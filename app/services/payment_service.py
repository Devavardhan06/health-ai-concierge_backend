import stripe
from app.core.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY


def create_payment_link(amount_rupees: int, patient_name: str):
    """
    Creates a secure Stripe payment link.
    Amount is in rupees.
    """

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="payment",
        line_items=[
            {
                "price_data": {
                    "currency": "inr",
                    "product_data": {
                        "name": "Clinic Appointment",
                        "description": f"Patient: {patient_name}",
                    },
                    "unit_amount": amount_rupees * 100,  # paise
                },
                "quantity": 1,
            }
        ],
        success_url="http://localhost:8000/payment/success",
        cancel_url="http://localhost:8000/payment/cancel",
    )

    return session.url

def create_subscription(customer_email: str, price_id: str):
    """
    Creates a Stripe subscription.
    price_id comes from Stripe dashboard.
    """

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="subscription",
        customer_email=customer_email,
        line_items=[
            {
                "price": price_id,
                "quantity": 1,
            }
        ],
        success_url="http://localhost:8000/payment/success",
        cancel_url="http://localhost:8000/payment/cancel",
    )

    return session.url

