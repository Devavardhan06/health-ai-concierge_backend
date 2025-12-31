from pydantic import BaseModel
from datetime import datetime

class ChatCreate(BaseModel):
    message: str


class ChatResponse(BaseModel):
    id: int
    sender: str
    message: str
    timestamp: datetime

    class Config:
        from_attributes = True
