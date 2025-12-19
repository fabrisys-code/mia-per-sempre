# backend/app/models/__init__.py

from app.core.database import Base
from app.models.user import User, UserType, VerificationMethod

__all__ = [
    "Base",
    "User",
    "UserType", 
    "VerificationMethod"
]
