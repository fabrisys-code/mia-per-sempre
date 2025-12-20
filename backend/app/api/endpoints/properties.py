# backend/app/api/endpoints/properties.py

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.models.property import PropertyStatus
from app.crud import property as crud_property
from app.schemas.property import (
    Property,
    PropertyCreate,
    PropertyUpdate,
    PropertyList
)

router = APIRouter()


@router.get("/", response_model=List[PropertyList])
def list_properties(
    skip: int = 0,
    limit: int = Query(default=100, le=100),
    city: Optional[str] = None,
    status: Optional[PropertyStatus] = PropertyStatus.PUBLISHED,
    db: Session = Depends(get_db)
):
    """
    Get list of properties
    Public endpoint - returns published properties by default
    """
    properties = crud_property.get_properties(
        db,
        skip=skip,
        limit=limit,
        status=status,
        city=city
    )
    return properties


@router.get("/my", response_model=List[Property])
def get_my_properties(
    skip: int = 0,
    limit: int = Query(default=100, le=100),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get current user's properties
    Requires authentication
    """
    properties = crud_property.get_user_properties(
        db,
        user_id=current_user.id,
        skip=skip,
        limit=limit
    )
    return properties


@router.get("/search", response_model=List[PropertyList])
def search_properties(
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    min_sqm: Optional[float] = Query(None, ge=0),
    max_sqm: Optional[float] = Query(None, ge=0),
    min_rooms: Optional[int] = Query(None, ge=0),
    city: Optional[str] = None,
    province: Optional[str] = None,
    property_type: Optional[str] = None,
    skip: int = 0,
    limit: int = Query(default=100, le=100),
    db: Session = Depends(get_db)
):
    """
    Advanced search for properties
    Public endpoint
    """
    properties = crud_property.search_properties(
        db,
        min_price=min_price,
        max_price=max_price,
        min_sqm=min_sqm,
        max_sqm=max_sqm,
        min_rooms=min_rooms,
        city=city,
        province=province,
        property_type=property_type,
        skip=skip,
        limit=limit
    )
    return properties


@router.get("/{property_id}", response_model=Property)
def get_property(
    property_id: int,
    db: Session = Depends(get_db)
):
    """
    Get property by ID
    Public endpoint - increments view counter
    """
    property = crud_property.get_property(db, property_id=property_id)
    
    if not property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    # Increment views
    crud_property.increment_views(db, property)
    
    return property


@router.post("/", response_model=Property, status_code=status.HTTP_201_CREATED)
def create_property(
    property_in: PropertyCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Create new property
    Requires authentication
    """
    property = crud_property.create_property(
        db,
        property_in=property_in,
        owner_id=current_user.id
    )
    return property


@router.put("/{property_id}", response_model=Property)
def update_property(
    property_id: int,
    property_in: PropertyUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Update property
    Only property owner can update
    """
    property = crud_property.get_property(db, property_id=property_id)
    
    if not property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    # Check ownership
    if property.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this property"
        )
    
    property = crud_property.update_property(db, property, property_in)
    return property


@router.delete("/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_property(
    property_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Delete property (soft delete)
    Only property owner can delete
    """
    property = crud_property.get_property(db, property_id=property_id)
    
    if not property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    # Check ownership
    if property.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this property"
        )
    
    crud_property.delete_property(db, property)
    return None


@router.post("/{property_id}/publish", response_model=Property)
def publish_property(
    property_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Publish property (change status from draft to published)
    Only property owner can publish
    """
    property = crud_property.get_property(db, property_id=property_id)
    
    if not property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    # Check ownership
    if property.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to publish this property"
        )
    
    property = crud_property.publish_property(db, property)
    return property
