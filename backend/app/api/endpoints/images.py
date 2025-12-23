# app/api/endpoints/images.py
"""
Endpoint API per gestione immagini immobili
Mia Per Sempre - Marketplace Nuda Proprietà

Endpoints:
- POST /api/v1/images/{property_id} - Upload immagini
- GET /api/v1/images/{property_id}/{filename} - Serve immagine
- DELETE /api/v1/images/{property_id}/{image_id} - Elimina immagine
- PUT /api/v1/images/{property_id}/reorder - Riordina immagini
- PUT /api/v1/images/{property_id}/{image_id}/cover - Imposta copertina
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Query
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List, Optional
from pathlib import Path
import logging

from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.property import Property
from app.models.property_image import PropertyImage
from app.services.image_processor import ImageProcessor, get_image_processor

logger = logging.getLogger(__name__)

router = APIRouter()


# ============================================================
# UPLOAD IMMAGINI
# ============================================================

@router.post(
    "/{property_id}",
    summary="Upload immagini per immobile",
    description="""
    Carica una o più immagini per un immobile.
    
    - **Formati accettati**: JPG, JPEG, PNG, GIF, BMP, TIFF, WebP
    - **Dimensione max**: 20MB per file
    - **Max immagini**: 30 per annuncio
    - **Ottimizzazione automatica**: ridimensionamento a 1920×1080 max + conversione WebP
    
    Le immagini vengono processate e salvate in 3 versioni:
    - **thumbnail**: 300×300 px (anteprima card)
    - **medium**: 800×600 px (gallery)
    - **large**: 1920×1080 px (fullscreen)
    """
)
async def upload_images(
    property_id: int,
    files: List[UploadFile] = File(..., description="File immagini da caricare"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload multiple immagini per un immobile."""
    
    # Verifica che l'immobile esista e appartenga all'utente
    property = db.query(Property).filter(
        Property.id == property_id,
        Property.owner_id == current_user.id
    ).first()
    
    if not property:
        raise HTTPException(
            status_code=404,
            detail="Immobile non trovato o non autorizzato"
        )
    
    # Conta immagini esistenti
    existing_count = db.query(PropertyImage).filter(
        PropertyImage.property_id == property_id
    ).count()
    
    # Validazione numero immagini
    if len(files) + existing_count > 30:
        raise HTTPException(
            status_code=400,
            detail=f"Massimo 30 immagini per annuncio. "
                   f"Attuali: {existing_count}, Nuove: {len(files)}"
        )
    
    # Inizializza processore
    processor = get_image_processor()
    
    uploaded_images = []
    total_original_size = 0
    total_new_size = 0
    
    for index, file in enumerate(files):
        # Valida file
        is_valid, error_msg = processor.validate_image(file.file, file.filename)
        if not is_valid:
            raise HTTPException(
                status_code=400,
                detail=f"Errore file '{file.filename}': {error_msg}"
            )
        
        # Calcola indice (continua da esistenti)
        image_index = existing_count + index
        
        # Calcola dimensione originale
        file.file.seek(0, 2)
        original_size_kb = file.file.tell() / 1024
        total_original_size += original_size_kb
        file.file.seek(0)
        
        try:
            # Processa immagine
            results = processor.process_property_image(
                file.file,
                property_id,
                image_index,
                file.filename
            )
            
            # Calcola dimensioni risultanti
            sizes = processor.get_file_sizes(results)
            new_size_kb = sum(sizes.values())
            total_new_size += new_size_kb
            
            # Salva nel database
            db_image = PropertyImage(
                property_id=property_id,
                thumbnail_path=results['thumbnail'],
                medium_path=results['medium'],
                large_path=results['large'],
                original_filename=file.filename,
                file_size_kb=new_size_kb,
                display_order=image_index,
                is_cover=1 if image_index == 0 and existing_count == 0 else 0
            )
            
            db.add(db_image)
            db.flush()  # Per ottenere l'ID
            
            uploaded_images.append({
                'id': db_image.id,
                'display_order': image_index,
                'original_filename': file.filename,
                'original_size_kb': round(original_size_kb, 1),
                'optimized_size_kb': round(new_size_kb, 1),
                'saving_percent': round((1 - new_size_kb / original_size_kb) * 100, 1),
                'sizes_kb': {k: round(v, 1) for k, v in sizes.items()},
                'urls': processor.get_image_urls(property_id, image_index)
            })
            
        except Exception as e:
            logger.error(f"Errore processando {file.filename}: {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Errore processando '{file.filename}': {str(e)}"
            )
    
    # Commit finale
    db.commit()
    
    # Calcola risparmio totale
    total_saving_kb = total_original_size - total_new_size
    total_saving_percent = (1 - total_new_size / total_original_size) * 100 if total_original_size > 0 else 0
    
    logger.info(
        f"Upload completato: {len(files)} immagini per immobile {property_id}. "
        f"Risparmio: {total_saving_kb:.0f}KB ({total_saving_percent:.0f}%)"
    )
    
    return {
        'success': True,
        'message': f'{len(files)} immagini caricate e ottimizzate',
        'property_id': property_id,
        'images': uploaded_images,
        'summary': {
            'total_images': len(files),
            'original_size_kb': round(total_original_size, 1),
            'optimized_size_kb': round(total_new_size, 1),
            'space_saved_kb': round(total_saving_kb, 1),
            'saving_percent': round(total_saving_percent, 1)
        },
        'optimization': {
            'format': 'WebP',
            'quality': 85,
            'versions': ['thumbnail (300×300)', 'medium (800×600)', 'large (1920×1080)']
        }
    }


# ============================================================
# SERVE IMMAGINE
# ============================================================

@router.get(
    "/{property_id}/{filename}",
    summary="Recupera immagine",
    description="Serve un'immagine ottimizzata con caching headers.",
    responses={
        200: {"content": {"image/webp": {}}},
        404: {"description": "Immagine non trovata"}
    }
)
async def serve_image(property_id: int, filename: str):
    """Serve un'immagine con headers di cache ottimali."""
    
    processor = get_image_processor()
    filepath = processor.upload_base_path / str(property_id) / filename
    
    if not filepath.exists():
        raise HTTPException(status_code=404, detail="Immagine non trovata")
    
    # Verifica che sia un file WebP
    if not filename.endswith('.webp'):
        raise HTTPException(status_code=400, detail="Solo file WebP supportati")
    
    return FileResponse(
        filepath,
        media_type='image/webp',
        headers={
            'Cache-Control': 'public, max-age=31536000',  # Cache 1 anno
            'Vary': 'Accept-Encoding'
        }
    )


# ============================================================
# ELIMINA IMMAGINE
# ============================================================

@router.delete(
    "/{property_id}/{image_id}",
    summary="Elimina immagine",
    description="Elimina una singola immagine dall'immobile."
)
async def delete_image(
    property_id: int,
    image_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Elimina una singola immagine."""
    
    # Verifica proprietà
    property = db.query(Property).filter(
        Property.id == property_id,
        Property.owner_id == current_user.id
    ).first()
    
    if not property:
        raise HTTPException(
            status_code=404,
            detail="Immobile non trovato o non autorizzato"
        )
    
    # Trova immagine
    image = db.query(PropertyImage).filter(
        PropertyImage.id == image_id,
        PropertyImage.property_id == property_id
    ).first()
    
    if not image:
        raise HTTPException(status_code=404, detail="Immagine non trovata")
    
    # Elimina (l'event listener eliminerà i file)
    db.delete(image)
    db.commit()
    
    # Riordina le immagini rimanenti
    remaining_images = db.query(PropertyImage).filter(
        PropertyImage.property_id == property_id
    ).order_by(PropertyImage.display_order).all()
    
    for idx, img in enumerate(remaining_images):
        img.display_order = idx
        if idx == 0:
            img.is_cover = 1
        else:
            img.is_cover = 0
    
    db.commit()
    
    logger.info(f"Eliminata immagine {image_id} da immobile {property_id}")
    
    return {
        'success': True,
        'message': 'Immagine eliminata',
        'remaining_images': len(remaining_images)
    }


# ============================================================
# LISTA IMMAGINI IMMOBILE
# ============================================================

@router.get(
    "/{property_id}",
    summary="Lista immagini immobile",
    description="Ritorna tutte le immagini di un immobile ordinate."
)
async def list_images(
    property_id: int,
    db: Session = Depends(get_db)
):
    """Lista tutte le immagini di un immobile."""
    
    # Verifica che l'immobile esista
    property = db.query(Property).filter(Property.id == property_id).first()
    
    if not property:
        raise HTTPException(status_code=404, detail="Immobile non trovato")
    
    images = db.query(PropertyImage).filter(
        PropertyImage.property_id == property_id
    ).order_by(PropertyImage.display_order).all()
    
    return {
        'success': True,
        'property_id': property_id,
        'count': len(images),
        'images': [img.to_dict() for img in images]
    }


# ============================================================
# RIORDINA IMMAGINI
# ============================================================

@router.put(
    "/{property_id}/reorder",
    summary="Riordina immagini",
    description="Cambia l'ordine delle immagini. Passa una lista di ID nell'ordine desiderato."
)
async def reorder_images(
    property_id: int,
    image_ids: List[int],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Riordina le immagini di un immobile."""
    
    # Verifica proprietà
    property = db.query(Property).filter(
        Property.id == property_id,
        Property.owner_id == current_user.id
    ).first()
    
    if not property:
        raise HTTPException(
            status_code=404,
            detail="Immobile non trovato o non autorizzato"
        )
    
    # Aggiorna ordine
    for idx, image_id in enumerate(image_ids):
        image = db.query(PropertyImage).filter(
            PropertyImage.id == image_id,
            PropertyImage.property_id == property_id
        ).first()
        
        if image:
            image.display_order = idx
            image.is_cover = 1 if idx == 0 else 0
    
    db.commit()
    
    return {
        'success': True,
        'message': 'Ordine aggiornato',
        'new_order': image_ids
    }


# ============================================================
# IMPOSTA COPERTINA
# ============================================================

@router.put(
    "/{property_id}/{image_id}/cover",
    summary="Imposta immagine copertina",
    description="Imposta un'immagine come copertina dell'annuncio."
)
async def set_cover_image(
    property_id: int,
    image_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Imposta un'immagine come copertina."""
    
    # Verifica proprietà
    property = db.query(Property).filter(
        Property.id == property_id,
        Property.owner_id == current_user.id
    ).first()
    
    if not property:
        raise HTTPException(
            status_code=404,
            detail="Immobile non trovato o non autorizzato"
        )
    
    # Reset tutte le copertine
    db.query(PropertyImage).filter(
        PropertyImage.property_id == property_id
    ).update({'is_cover': 0})
    
    # Imposta nuova copertina
    image = db.query(PropertyImage).filter(
        PropertyImage.id == image_id,
        PropertyImage.property_id == property_id
    ).first()
    
    if not image:
        raise HTTPException(status_code=404, detail="Immagine non trovata")
    
    image.is_cover = 1
    image.display_order = 0  # Porta in prima posizione
    
    db.commit()
    
    return {
        'success': True,
        'message': 'Copertina aggiornata',
        'cover_image_id': image_id
    }
