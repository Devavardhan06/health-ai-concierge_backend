from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.session import Base


class Escalation(Base):
    __tablename__ = "escalations"

    id = Column(Integer, primary_key=True, index=True)
    user_message = Column(String)
    reason = Column(String)
    status = Column(String, default="OPEN")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
