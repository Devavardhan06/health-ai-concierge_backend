from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.session import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    actor = Column(String, nullable=False)        # admin / system / user
    action = Column(String, nullable=False)       # UPDATED_KNOWLEDGE
    resource = Column(String, nullable=False)     # booking / payment
    details = Column(String)                      # optional info
    created_at = Column(DateTime(timezone=True), server_default=func.now())
