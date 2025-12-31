from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.session import Base


class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String, nullable=False)
    event_data = Column(String)  # ✅ renamed from metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
