from pydantic import BaseModel, EmailStr
from enum import Enum


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    STAFF = "STAFF"
    USER = "USER"


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: UserRole = UserRole.USER


class UserLogin(BaseModel):
    email: EmailStr
    password: str
