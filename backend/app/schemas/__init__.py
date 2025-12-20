# backend/app/schemas/__init__.py

from app.schemas.user import (
    UserBase,
    UserCreate,
    UserUpdate,
    User,
    UserLogin,
    Token,
    TokenData
)
from app.schemas.property import (
    PropertyBase,
    PropertyCreate,
    PropertyUpdate,
    Property,
    PropertyList
)

__all__ = [
    # User schemas
    "UserBase",
    "UserCreate",
    "UserUpdate", 
    "User",
    "UserLogin",
    "Token",
    "TokenData",
    # Property schemas
    "PropertyBase",
    "PropertyCreate",
    "PropertyUpdate",
    "Property",
    "PropertyList"
]
