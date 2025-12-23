# backend/app/models/property.py

from sqlalchemy import Column, Integer, String, Boolean, Enum, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import BaseModel
import enum


class PropertyType(str, enum.Enum):
    """Property types"""
    APPARTAMENTO = "appartamento"
    VILLA = "villa"
    VILLETTA = "villetta"
    ATTICO = "attico"
    LOFT = "loft"
    MANSARDA = "mansarda"
    CASA_INDIPENDENTE = "casa_indipendente"
    RUSTICO = "rustico"
    CASTELLO = "castello"
    PALAZZO = "palazzo"


class PropertyStatus(str, enum.Enum):
    """Property listing status"""
    DRAFT = "draft"
    PUBLISHED = "published"
    PENDING = "pending"
    SOLD = "sold"
    SUSPENDED = "suspended"
    DELETED = "deleted"


class EnergyClass(str, enum.Enum):
    """Energy efficiency class"""
    A4_PLUS = "a4+"
    A4 = "a4"
    A3 = "a3"
    A2 = "a2"
    A1 = "a1"
    B = "b"
    C = "c"
    D = "d"
    E = "e"
    F = "f"
    G = "g"


class UsufructType(str, enum.Enum):
    """Type of usufruct"""
    VITALIZIO = "vitalizio"  # Lifetime
    TEMPORANEO = "temporaneo"  # Temporary


class PaymentPreference(str, enum.Enum):
    """Payment preference for bare property"""
    FULL = "full"  # Full payment upfront
    DEPOSIT_ANNUITY = "deposit_annuity"  # Deposit + annual payments
    ANNUITY = "annuity"  # Only annual payments
    OTHER = "other"  # Custom arrangement


class Property(Base, BaseModel):
    """
    Property model - represents real estate listings
    """
    __tablename__ = "properties"
    
    # Owner
    owner_id = Column(Integer, ForeignKey('users.id'), nullable=False, index=True)
    
    # Basic Info
    title = Column(String(200), nullable=False)
    description = Column(Text)
    property_type = Column(Enum(PropertyType), nullable=False)
    status = Column(Enum(PropertyStatus), default=PropertyStatus.DRAFT, nullable=False, index=True)
    
    # Location
    address = Column(String(255))
    city = Column(String(100), nullable=False, index=True)
    province = Column(String(50), nullable=False)
    region = Column(String(50), nullable=False)
    zip_code = Column(String(10))
    latitude = Column(Float)
    longitude = Column(Float)
    show_exact_location = Column(Boolean, default=False)
    
    # Property Details
    surface_sqm = Column(Float, nullable=False)  # Commercial surface
    rooms = Column(Integer)
    bathrooms = Column(Integer)
    floor = Column(String(20))  # e.g., "piano terra", "primo", "attico"
    total_floors = Column(Integer)  # Building total floors
    
    # Features
    has_elevator = Column(Boolean, default=False)
    has_balcony = Column(Boolean, default=False)
    has_terrace = Column(Boolean, default=False)
    has_garden = Column(Boolean, default=False)
    has_parking = Column(Boolean, default=False)
    has_garage = Column(Boolean, default=False)
    has_cellar = Column(Boolean, default=False)
    
    # Building Info
    building_year = Column(Integer)
    renovation_year = Column(Integer)
    energy_class = Column(Enum(EnergyClass))
    heating_type = Column(String(50))  # e.g., "autonomo", "centralizzato"
    
    # Usufruct Info
    usufructuary_age = Column(Integer, nullable=False)  # Age of person with usufruct
    usufruct_type = Column(Enum(UsufructType), default=UsufructType.VITALIZIO)
    
    # Valuation
    full_property_value = Column(Float)  # Full property value (€)
    bare_property_value = Column(Float, nullable=False)  # Nuda proprietà value (€)
    
    # Payment Preferences
    payment_preference = Column(Enum(PaymentPreference), default=PaymentPreference.FULL)
    payment_preference_notes = Column(Text)
    
    # Listing Stats
    is_featured = Column(Boolean, default=False)
    views_count = Column(Integer, default=0)
    contacts_count = Column(Integer, default=0)
    
    # Relationships
    owner = relationship("User", back_populates="properties")
    
    # ← RELAZIONE IMMAGINI (back_populates aggiornato)
    images = relationship(
        "PropertyImage",
        back_populates="parent_property",
        cascade="all, delete-orphan",
        order_by="PropertyImage.display_order"
    )
    
    # documents = relationship("PropertyDocument", back_populates="property", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Property {self.title} - {self.city} (€{self.bare_property_value})>"
    
    @property
    def full_address(self) -> str:
        """Returns complete address"""
        parts = [self.address, self.city, self.province, self.zip_code]
        return ", ".join([p for p in parts if p])
    
    @property
    def discount_percentage(self) -> float:
        """Calculate discount percentage from full property value"""
        if self.full_property_value and self.bare_property_value:
            discount = (self.full_property_value - self.bare_property_value) / self.full_property_value
            return round(discount * 100, 1)
        return 0.0


# Export
__all__ = [
    "Property",
    "PropertyType",
    "PropertyStatus",
    "EnergyClass",
    "UsufructType",
    "PaymentPreference"
]
