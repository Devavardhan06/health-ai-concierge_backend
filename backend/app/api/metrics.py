from fastapi import APIRouter
import random
import time

router = APIRouter(prefix="/metrics", tags=["Metrics"])

@router.get("/system")
def get_live_metrics():
    """
    Returns simulated live system metrics for the landing page dashboard.
    """
    return {
        "predictions_today": 214 + random.randint(0, 5),
        "response_time_ms": random.randint(820, 860),
        "active_hospitals": 56,
        "records_secured": 1240 + random.randint(0, 2),
        "system_status": "Operational",
        "last_updated": time.time()
    }
