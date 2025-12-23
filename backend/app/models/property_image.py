# app/models/property_image.py
"""
Model PropertyImage per gestione immagini immobili
Mia Per Sempre - Marketplace Nuda Proprietà
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, event
from sqlalchemy.orm import relationship
from datetime import datetime
from pathlib import Path
import logging

# Import corretti per questo progetto
from app.core.database import Base
from app.models.base import BaseModel

logger = logging.getLogger(__name__)


class PropertyImage(Base, BaseModel):
    """
    Modello per immagini associate agli immobili.
    Ogni immagine ha 3 versioni: thumbnail, medium, large (tutte WebP).
    """
    __tablename__ = "property_images"
    
    # Foreign key all'immobile
    property_id = Column(
        Integer, 
        ForeignKey('properties.id', ondelete='CASCADE'),
        nullable=False,
        index=True
    )
    
    # Paths per ogni versione (relativi a upload directory)
    thumbnail_path = Column(String(500), nullable=False)
    medium_path = Column(String(500), nullable=False)
    large_path = Column(String(500), nullable=False)
    
    # Metadata
    original_filename = Column(String(255))  # Nome file originale
    file_size_kb = Column(Float)  # Dimensione totale tutte le versioni in KB
    width = Column(Integer)  # Larghezza originale
    height = Column(Integer)  # Altezza originale
    
    # Ordine visualizzazione (0 = prima immagine/copertina)
    display_order = Column(Integer, default=0, index=True)
    
    # Flag immagine principale
    is_cover = Column(Integer, default=0)  # 1 = immagine di copertina
    
    # Timestamps
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    
    # Relazione con Property (rinominata per evitare conflitto con @property)
    parent_property = relationship("Property", back_populates="images")
    
    def __repr__(self):
        return f"<PropertyImage(id={self.id}, property_id={self.property_id}, order={self.display_order})>"
    
    def get_urls(self) -> dict:
        """Genera URLs per le versioni dell'immagine"""
        return {
            'thumbnail': f"/api/v1/images/{self.property_id}/{Path(self.thumbnail_path).name}",
            'medium': f"/api/v1/images/{self.property_id}/{Path(self.medium_path).name}",
            'large': f"/api/v1/images/{self.property_id}/{Path(self.large_path).name}",
        }
    
    def to_dict(self) -> dict:
        """Serializza l'immagine per API response"""
        return {
            'id': self.id,
            'property_id': self.property_id,
            'display_order': self.display_order,
            'is_cover': bool(self.is_cover),
            'original_filename': self.original_filename,
            'file_size_kb': self.file_size_kb,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None,
            'urls': self.get_urls()
        }


# ============================================================
# EVENT LISTENERS - Eliminazione automatica file fisici
# ============================================================

@event.listens_for(PropertyImage, 'before_delete')
def delete_image_files_on_record_delete(mapper, connection, target):
    """
    Event listener che elimina i file fisici quando 
    un record PropertyImage viene eliminato dal database.
    """
    paths_to_delete = [
        target.thumbnail_path,
        target.medium_path,
        target.large_path
    ]
    
    for path in paths_to_delete:
        if path:
            filepath = Path(path)
            if filepath.exists():
                try:
                    filepath.unlink()
                    logger.info(f"Eliminato file immagine: {filepath}")
                except Exception as e:
                    logger.error(f"Errore eliminando {filepath}: {e}")
