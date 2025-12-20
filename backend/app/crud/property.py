# backend/app/crud/property.py

from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import desc, and_
from app.models.property import Property, PropertyStatus
from app.schemas.property import PropertyCreate, PropertyUpdate


def get_property(db: Session, property_id: int) -> Optional[Property]:
    """Get property by ID"""
    return db.query(Property).filter(Property.id == property_id).first()


def get_properties(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    status: Optional[PropertyStatus] = None,
    city: Optional[str] = None,
    owner_id: Optional[int] = None
) -> List[Property]:
    """Get list of properties with filters"""
    query = db.query(Property)
    
    # Apply filters
    if status:
        query = query.filter(Property.status == status)
    if city:
        query = query.filter(Property.city.ilike(f"%{city}%"))
    if owner_id:
        query = query.filter(Property.owner_id == owner_id)
    
    # Order by featured first, then newest
    query = query.order_by(
        desc(Property.is_featured),
        desc(Property.created_at)
    )
    
    return query.offset(skip).limit(limit).all()


def get_user_properties(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 100
) -> List[Property]:
    """Get all properties for a specific user"""
    return db.query(Property)\
        .filter(Property.owner_id == user_id)\
        .order_by(desc(Property.created_at))\
        .offset(skip)\
        .limit(limit)\
        .all()


def create_property(
    db: Session,
    property_in: PropertyCreate,
    owner_id: int
) -> Property:
    """Create new property"""
    db_property = Property(
        **property_in.model_dump(),
        owner_id=owner_id,
        status=PropertyStatus.DRAFT
    )
    
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    
    return db_property


def update_property(
    db: Session,
    property: Property,
    property_in: PropertyUpdate
) -> Property:
    """Update property"""
    update_data = property_in.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(property, field, value)
    
    db.commit()
    db.refresh(property)
    
    return property


def delete_property(db: Session, property: Property) -> None:
    """Delete property (soft delete - mark as deleted)"""
    property.status = PropertyStatus.DELETED
    db.commit()


def publish_property(db: Session, property: Property) -> Property:
    """Publish property (change status to published)"""
    property.status = PropertyStatus.PUBLISHED
    db.commit()
    db.refresh(property)
    
    return property


def increment_views(db: Session, property: Property) -> None:
    """Increment property views counter"""
    property.views_count += 1
    db.commit()


def increment_contacts(db: Session, property: Property) -> None:
    """Increment property contacts counter"""
    property.contacts_count += 1
    db.commit()


def search_properties(
    db: Session,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_sqm: Optional[float] = None,
    max_sqm: Optional[float] = None,
    min_rooms: Optional[int] = None,
    city: Optional[str] = None,
    province: Optional[str] = None,
    property_type: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
) -> List[Property]:
    """Advanced search for properties"""
    query = db.query(Property).filter(
        Property.status == PropertyStatus.PUBLISHED
    )
    
    # Price range
    if min_price:
        query = query.filter(Property.bare_property_value >= min_price)
    if max_price:
        query = query.filter(Property.bare_property_value <= max_price)
    
    # Surface range
    if min_sqm:
        query = query.filter(Property.surface_sqm >= min_sqm)
    if max_sqm:
        query = query.filter(Property.surface_sqm <= max_sqm)
    
    # Rooms
    if min_rooms:
        query = query.filter(Property.rooms >= min_rooms)
    
    # Location
    if city:
        query = query.filter(Property.city.ilike(f"%{city}%"))
    if province:
        query = query.filter(Property.province.ilike(f"%{province}%"))
    
    # Property type
    if property_type:
        query = query.filter(Property.property_type == property_type)
    
    # Order
    query = query.order_by(
        desc(Property.is_featured),
        desc(Property.created_at)
    )
    
    return query.offset(skip).limit(limit).all()


def count_properties(
    db: Session,
    status: Optional[PropertyStatus] = None,
    owner_id: Optional[int] = None
) -> int:
    """Count properties with filters"""
    query = db.query(Property)
    
    if status:
        query = query.filter(Property.status == status)
    if owner_id:
        query = query.filter(Property.owner_id == owner_id)
    
    return query.count()
