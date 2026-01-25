from fastapi import FastAPI
from app.api.chats import router as chat_router
from app.db.session import Base, engine
from app.api.booking import router as booking_router 
from app.api.payment import router as payment_router
from app.api.webhook import router as webhook_router
from app.api.admin.bookings import router as admin_bookings_router
from app.api.admin.chats import router as admin_chats_router
from app.api.admin.knowledge import router as admin_knowledge_router
from app.api.admin.escalations import router as admin_escalations_router
from app.api.admin.analytics import router as admin_analytics_router
from app.api.auth import router as auth_router
from app.api.admin.audit import router as admin_audit_router
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from fastapi.responses import JSONResponse
from app.core.rate_limiter import limiter
from app.core.config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Concierge Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.limiter = limiter

@app.on_event("startup")
def startup():
    print("=" * 70)
    print("🚀 BACKEND INITIALIZING")
    print(f"📡 Database Host: {settings.masked_database_url}")
    print("=" * 70)
    
    # Create DB tables safely on startup
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables verified/created.")
    except Exception as e:
        print(f"❌ DATABASE ERROR: {e}")
        # We don't exit here to allow logs to be flushed


app.include_router(chat_router)
app.include_router(booking_router)
app.include_router(payment_router)
app.include_router(webhook_router)
app.include_router(admin_bookings_router)
app.include_router(admin_chats_router)
app.include_router(admin_knowledge_router)
app.include_router(admin_escalations_router)
app.include_router(admin_analytics_router)
app.include_router(auth_router)
app.include_router(admin_audit_router)

# New Phase 1 Routers
from app.api.metrics import router as metrics_router
from app.api.triage import router as triage_router
app.include_router(metrics_router)
app.include_router(triage_router)

# New Phase 2 Routers
from app.api.patient import router as patient_router
from app.api.doctors import router as doctors_router
app.include_router(patient_router)
app.include_router(doctors_router)

app.add_middleware(SlowAPIMiddleware)

@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests. Please slow down."}
    )
@app.get("/")
def root():
    return {"status": "Chat API running"}

