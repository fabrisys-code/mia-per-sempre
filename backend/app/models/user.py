# backend/app/models/user.py

from sqlalchemy import Column, Integer, String, Boolean, Enum, Date, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import BaseModel
import enum


class UserType(str, enum.Enum):
    """User types enum"""
    PROPRIETARIO = "proprietario"
    INVESTITORE = "investitore"
    AGENZIA = "agenzia"
    PARTNER = "partner"
    ADMIN = "admin"


class VerificationMethod(str, enum.Enum):
    """Identity verification methods"""
    NONE = "none"
    EMAIL = "email"
    DOCUMENT = "document"
    SPID = "spid"
    CIE = "cie"


class User(Base, BaseModel):
    """User model - represents all user types in the platform"""
    __tablename__ = "users"
    
    # Authentication
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    
    # Personal Info
    first_name = Column(String(100))
    last_name = Column(String(100))
    phone = Column(String(20))
    
    # User Type
    user_type = Column(
        Enum(UserType), 
        default=UserType.PROPRIETARIO,
        nullable=False,
        index=True
    )
    
    # Identity Verification (CIE/SPID)
    fiscal_code = Column(String(16), unique=True, index=True)
    date_of_birth = Column(Date)
    place_of_birth = Column(String(255))
    gender = Column(Enum('M', 'F', 'X', name='gender_enum'))
    
    # Verification Status
    verified_identity = Column(Boolean, default=False)
    verification_method = Column(
        Enum(VerificationMethod),
        default=VerificationMethod.NONE
    )
    verification_level = Column(Integer, default=0)
    verified_at = Column(DateTime)
    
    # Document Info
    document_type = Column(Enum('cie', 'passport', 'id_card', 'spid', name='document_type_enum'))
    document_number = Column(String(50))
    document_expiry = Column(Date)
    
    # Account Status
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    email_verified = Column(Boolean, default=False)
    
    # Soft Delete
    deleted_at = Column(DateTime)
    
    # Relationships - QUI! Dopo tutti i Column, prima del __repr__
    properties = relationship("Property", back_populates="owner", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User {self.email} ({self.user_type})>"
    
    @property
    def full_name(self) -> str:
        """Returns full name"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.email
    
    @property
    def is_verified(self) -> bool:
        """Check if user has verified identity"""
        return self.verified_identity and self.verification_level >= 2


__all__ = ["User", "UserType", "VerificationMethod"]
