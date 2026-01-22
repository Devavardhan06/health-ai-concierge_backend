from fastapi import APIRouter

router = APIRouter(prefix="/admin/metrics", tags=["Admin"])

@router.get("/")
def metrics():
    return {
        "total_bookings": 340,
        "total_chats": 1200,
        "system_health": "All Systems Operational",
        "revenue": 15000
    }
