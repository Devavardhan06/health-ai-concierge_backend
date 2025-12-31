from fastapi import APIRouter

router = APIRouter(prefix="/admin/metrics", tags=["Admin"])

@router.get("/")
def metrics():
    return {
        "total_chats": 1200,
        "bookings": 340,
        "payments_completed": 300,
        "escalations": 42
    }
