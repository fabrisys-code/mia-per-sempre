# backend/app/models/base.py

from datetime import datetime
from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.ext.declarative import declared_attr


class TimestampMixin:
    """Mixin that adds created_at and updated_at timestamps"""
    
    @declared_attr
    def created_at(cls):
        return Column(DateTime, default=datetime.utcnow, nullable=False)
    
    @declared_attr
    def updated_at(cls):
        return Column(
            DateTime, 
            default=datetime.utcnow, 
            onupdate=datetime.utcnow,
            nullable=False
        )


class BaseModel(TimestampMixin):
    """Base model with ID and timestamps"""
    
    @declared_attr
    def id(cls):
        return Column(Integer, primary_key=True, index=True)
