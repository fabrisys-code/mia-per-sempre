# backend/app/schemas/user.py

from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from datetime import datetime, date
from app.models.user import UserType, VerificationMethod


# Base User Schema
class UserBase(BaseModel):
    """Base user schema with common fields"""
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    user_type: UserType = UserType.PROPRIETARIO


# Schema for User Creation
class UserCreate(UserBase):
    """Schema for creating new user"""
    password: str = Field(..., min_length=8, max_length=72)  # ← Aggiunto max_length=72
    
    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        """Validate password strength"""
        if not any(char.isdigit() for char in v):
            raise ValueError('Password must contain at least one digit')
        if not any(char.isupper() for char in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(char.islower() for char in v):
            raise ValueError('Password must contain at least one lowercase letter')
        return v

# Schema for User Update
class UserUpdate(BaseModel):
    """Schema for updating user"""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None


# Schema for User in DB (what we return)
class User(UserBase):
    """Complete user schema (from database)"""
    id: int
    fiscal_code: Optional[str] = None
    date_of_birth: Optional[date] = None
    place_of_birth: Optional[str] = None
    gender: Optional[str] = None
    
    verified_identity: bool = False
    verification_method: VerificationMethod = VerificationMethod.NONE
    verification_level: int = 0
    verified_at: Optional[datetime] = None
    
    is_active: bool = True
    email_verified: bool = False
    
    created_at: datetime
    updated_at: datetime
    
    model_config = {"from_attributes": True}


# Schema for Login
class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str


# Schema for Token Response
class Token(BaseModel):
    """JWT Token response"""
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Token payload data"""
    user_id: Optional[int] = None
    email: Optional[str] = None


# Export schemas
__all__ = [
    "UserBase",
    "UserCreate", 
    "UserUpdate",
    "User",
    "UserLogin",
    "Token",
    "TokenData"
]
