# backend/app/models/__init__.py

from app.core.database import Base
from app.models.user import User, UserType, VerificationMethod
from app.models.property import (
    Property,
    PropertyType,
    PropertyStatus,
    EnergyClass,
    UsufructType,
    PaymentPreference
)
from app.models.property_image import PropertyImage  # ← NUOVO

__all__ = [
    "Base",
    "User",
    "UserType",
    "VerificationMethod",
    "Property",
    "PropertyType",
    "PropertyStatus",
    "EnergyClass",
    "UsufructType",
    "PaymentPreference",
    "PropertyImage",  # ← NUOVO
]
