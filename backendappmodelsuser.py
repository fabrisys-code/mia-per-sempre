"""
User model
"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Dati personali (da CIE/SPID)
    fiscal_code = Column(String(16), unique=True, index=True, nullable=True)
    name = Column(String(100))
    surname = Column(String(100))
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(20))
    
    # Verifica identità
    verified_identity = Column(Boolean, default=False)
    verification_method = Column(
        Enum('none', 'email', 'document', 'spid', 'cie', name='verification_methods'),
        default='none'
    )
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)
    
    # Relazioni (da implementare dopo)
    # properties = relationship("Property", back_populates="owner")
    
    def __repr__(self):
        return f"<User {self.email}>"
