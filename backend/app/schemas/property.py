# backend/app/schemas/property.py

from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
from app.models.property import (
    PropertyType,
    PropertyStatus,
    EnergyClass,
    UsufructType,
    PaymentPreference
)


# Base Property Schema
class PropertyBase(BaseModel):
    """Base property schema with common fields"""
    title: str = Field(..., min_length=10, max_length=200)
    description: Optional[str] = None
    property_type: PropertyType
    
    # Location
    address: Optional[str] = None
    city: str
    province: str
    region: str
    zip_code: Optional[str] = None
    show_exact_location: bool = False
    
    # Property Details
    surface_sqm: float = Field(..., gt=0, description="Surface in square meters")
    rooms: Optional[int] = Field(None, ge=0)
    bathrooms: Optional[int] = Field(None, ge=0)
    floor: Optional[str] = None
    total_floors: Optional[int] = Field(None, ge=1)
    
    # Features
    has_elevator: bool = False
    has_balcony: bool = False
    has_terrace: bool = False
    has_garden: bool = False
    has_parking: bool = False
    has_garage: bool = False
    has_cellar: bool = False
    
    # Building Info
    building_year: Optional[int] = Field(None, ge=1800, le=2030)
    renovation_year: Optional[int] = Field(None, ge=1800, le=2030)
    energy_class: Optional[EnergyClass] = None
    heating_type: Optional[str] = None
    
    # Usufruct Info
    usufructuary_age: int = Field(..., ge=18, le=120, description="Age of usufructuary")
    usufruct_type: UsufructType = UsufructType.VITALIZIO
    
    # Valuation
    full_property_value: Optional[float] = Field(None, gt=0)
    bare_property_value: float = Field(..., gt=0, description="Nuda proprietà value in €")
    
    # Payment Preferences
    payment_preference: PaymentPreference = PaymentPreference.FULL
    payment_preference_notes: Optional[str] = None
    
    # ← AGGIUNGI QUESTI VALIDATORS QUI
    @field_validator('property_type', mode='before')
    @classmethod
    def normalize_property_type(cls, v):
        """Convert property_type to lowercase"""
        if isinstance(v, str):
            return v.lower()
        return v
    
    @field_validator('energy_class', mode='before')
    @classmethod
    def normalize_energy_class(cls, v):
        """Convert energy_class to lowercase"""
        if isinstance(v, str):
            return v.lower()
        return v
    
    @field_validator('usufruct_type', mode='before')
    @classmethod
    def normalize_usufruct_type(cls, v):
        """Convert usufruct_type to lowercase"""
        if isinstance(v, str):
            return v.lower()
        return v
    
    @field_validator('payment_preference', mode='before')
    @classmethod
    def normalize_payment_preference(cls, v):
        """Convert payment_preference to lowercase"""
        if isinstance(v, str):
            return v.lower()
        return v


# Schema for Property Creation
class PropertyCreate(PropertyBase):
    """Schema for creating new property"""
    
    @field_validator('renovation_year')
    @classmethod
    def validate_renovation_year(cls, v, info):
        """Renovation year must be >= building year"""
        if v and info.data.get('building_year'):
            if v < info.data['building_year']:
                raise ValueError('Renovation year must be >= building year')
        return v
    
    @field_validator('bare_property_value')
    @classmethod
    def validate_bare_property_value(cls, v, info):
        """Bare property value must be < full property value"""
        full_value = info.data.get('full_property_value')
        if full_value and v >= full_value:
            raise ValueError('Bare property value must be less than full property value')
        return v


# Schema for Property Update
class PropertyUpdate(BaseModel):
    """Schema for updating property"""
    title: Optional[str] = Field(None, min_length=10, max_length=200)
    description: Optional[str] = None
    status: Optional[PropertyStatus] = None
    
    # Location
    address: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    region: Optional[str] = None
    zip_code: Optional[str] = None
    show_exact_location: Optional[bool] = None
    
    # Property Details
    surface_sqm: Optional[float] = Field(None, gt=0)
    rooms: Optional[int] = Field(None, ge=0)
    bathrooms: Optional[int] = Field(None, ge=0)
    floor: Optional[str] = None
    total_floors: Optional[int] = Field(None, ge=1)
    
    # Features
    has_elevator: Optional[bool] = None
    has_balcony: Optional[bool] = None
    has_terrace: Optional[bool] = None
    has_garden: Optional[bool] = None
    has_parking: Optional[bool] = None
    has_garage: Optional[bool] = None
    has_cellar: Optional[bool] = None
    
    # Building Info
    building_year: Optional[int] = Field(None, ge=1800, le=2030)
    renovation_year: Optional[int] = Field(None, ge=1800, le=2030)
    energy_class: Optional[EnergyClass] = None
    heating_type: Optional[str] = None
    
    # Usufruct Info
    usufructuary_age: Optional[int] = Field(None, ge=18, le=120)
    usufruct_type: Optional[UsufructType] = None
    
    # Valuation
    full_property_value: Optional[float] = Field(None, gt=0)
    bare_property_value: Optional[float] = Field(None, gt=0)
    
    # Payment Preferences
    payment_preference: Optional[PaymentPreference] = None
    payment_preference_notes: Optional[str] = None
    
    # ← AGGIUNGI ANCHE QUI PER UPDATE
    @field_validator('status', mode='before')
    @classmethod
    def normalize_status(cls, v):
        """Convert status to lowercase"""
        if isinstance(v, str):
            return v.lower()
        return v
    
    @field_validator('energy_class', mode='before')
    @classmethod
    def normalize_energy_class(cls, v):
        """Convert energy_class to lowercase"""
        if isinstance(v, str):
            return v.lower()
        return v
    
    @field_validator('usufruct_type', mode='before')
    @classmethod
    def normalize_usufruct_type(cls, v):
        """Convert usufruct_type to lowercase"""
        if isinstance(v, str):
            return v.lower()
        return v
    
    @field_validator('payment_preference', mode='before')
    @classmethod
    def normalize_payment_preference(cls, v):
        """Convert payment_preference to lowercase"""
        if isinstance(v, str):
            return v.lower()
        return v


# Schema for Property in DB (what we return)
class Property(PropertyBase):
    """Complete property schema (from database)"""
    id: int
    owner_id: int
    status: PropertyStatus
    
    # Location coords
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    
    # Stats
    is_featured: bool = False
    views_count: int = 0
    contacts_count: int = 0
    
    # Timestamps
    created_at: datetime
    updated_at: datetime
    
    model_config = {"from_attributes": True}


# Schema for Property List (lighter version)
class PropertyList(BaseModel):
    """Lightweight property schema for listings"""
    id: int
    title: str
    property_type: PropertyType
    city: str
    province: str
    surface_sqm: float
    rooms: Optional[int]
    bathrooms: Optional[int]
    bare_property_value: float
    usufructuary_age: int
    status: PropertyStatus
    is_featured: bool
    views_count: int
    created_at: datetime
    
    model_config = {"from_attributes": True}


# Export schemas
__all__ = [
    "PropertyBase",
    "PropertyCreate",
    "PropertyUpdate",
    "Property",
    "PropertyList"
]
