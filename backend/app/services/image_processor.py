# app/services/image_processor.py
"""
Servizio Elaborazione Immagini
Mia Per Sempre - Marketplace Nuda Proprietà

Funzionalità:
- Ridimensionamento automatico (max 1920×1080)
- Conversione in formato WebP
- Rotazione automatica da EXIF
- Generazione multiple versioni (thumbnail, medium, large)
"""

import os
import logging
from pathlib import Path
from typing import Dict, Optional, BinaryIO, Tuple
from PIL import Image, ExifTags
from io import BytesIO

logger = logging.getLogger(__name__)


class ImageProcessor:
    """Processore immagini per ottimizzazione e conversione WebP"""
    
    # Dimensioni per ogni versione (width, height)
    SIZES = {
        'thumbnail': (300, 300),    # Card preview, quadrata
        'medium': (800, 600),       # Gallery view
        'large': (1920, 1080),      # Full screen / lightbox
    }
    
    # Qualità WebP (0-100, 85 è ottimo compromesso)
    WEBP_QUALITY = 85
    
    # Metodo compressione WebP (0-6, 6 = max compressione)
    WEBP_METHOD = 6
    
    # Dimensione max file originale (MB)
    MAX_FILE_SIZE_MB = 20
    
    # Formati accettati
    ALLOWED_FORMATS = {'JPEG', 'JPG', 'PNG', 'GIF', 'BMP', 'TIFF', 'WEBP'}
    
    def __init__(self, upload_base_path: str = None):
        """
        Inizializza il processore
        
        Args:
            upload_base_path: Directory base per upload (default: ./uploads/properties)
        """
        if upload_base_path is None:
            # Usa directory relativa al progetto
            base_dir = Path(__file__).parent.parent.parent  # backend/
            upload_base_path = base_dir / "uploads" / "properties"
        
        self.upload_base_path = Path(upload_base_path)
        self.upload_base_path.mkdir(parents=True, exist_ok=True)
        
        logger.info(f"ImageProcessor inizializzato. Upload path: {self.upload_base_path}")
    
    def process_property_image(
        self,
        file_data: BinaryIO,
        property_id: int,
        image_index: int,
        original_filename: str = None
    ) -> Dict[str, str]:
        """
        Processa un'immagine per un immobile.
        Crea 3 versioni ottimizzate in WebP.
        
        Args:
            file_data: File binario dell'immagine
            property_id: ID dell'immobile
            image_index: Indice progressivo immagine (0, 1, 2...)
            original_filename: Nome file originale (per logging)
            
        Returns:
            Dict con paths delle 3 versioni: {thumbnail, medium, large}
        """
        try:
            # Apri immagine
            img = Image.open(file_data)
            
            # Verifica formato
            if img.format and img.format.upper() not in self.ALLOWED_FORMATS:
                raise ValueError(f"Formato non supportato: {img.format}")
            
            # Converti in RGB se necessario (per trasparenza PNG, etc.)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Crea sfondo bianco per trasparenza
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Rotazione automatica da EXIF
            img = self._auto_rotate(img)
            
            # Crea directory per questo immobile
            property_path = self.upload_base_path / str(property_id)
            property_path.mkdir(parents=True, exist_ok=True)
            
            results = {}
            
            # Genera ogni versione
            for size_name, dimensions in self.SIZES.items():
                # Ridimensiona
                resized = self._resize_image(img.copy(), dimensions, size_name == 'thumbnail')
                
                # Nome file
                filename = f"img_{image_index}_{size_name}.webp"
                filepath = property_path / filename
                
                # Salva come WebP
                resized.save(
                    filepath,
                    'WEBP',
                    quality=self.WEBP_QUALITY,
                    method=self.WEBP_METHOD
                )
                
                results[size_name] = str(filepath)
                
                logger.debug(f"Creata versione {size_name}: {filepath}")
            
            # Log risparmio spazio
            original_size = file_data.seek(0, 2) / 1024  # KB
            file_data.seek(0)
            total_new_size = sum(Path(p).stat().st_size / 1024 for p in results.values())
            saving_percent = (1 - total_new_size / original_size) * 100 if original_size > 0 else 0
            
            logger.info(
                f"Immagine {original_filename or image_index} processata: "
                f"{original_size:.0f}KB → {total_new_size:.0f}KB ({saving_percent:.0f}% risparmio)"
            )
            
            return results
            
        except Exception as e:
            logger.error(f"Errore processing immagine: {e}")
            raise
    
    def _resize_image(
        self,
        img: Image.Image,
        target_size: Tuple[int, int],
        is_square: bool = False
    ) -> Image.Image:
        """
        Ridimensiona immagine mantenendo aspect ratio.
        
        Args:
            img: Immagine PIL
            target_size: (width, height) target
            is_square: Se True, crea canvas quadrato con immagine centrata
            
        Returns:
            Immagine ridimensionata
        """
        # Ridimensiona mantenendo aspect ratio
        img.thumbnail(target_size, Image.Resampling.LANCZOS)
        
        # Se deve essere quadrata (thumbnail), centra su canvas
        if is_square and target_size[0] == target_size[1]:
            canvas = Image.new('RGB', target_size, (255, 255, 255))
            offset = (
                (target_size[0] - img.width) // 2,
                (target_size[1] - img.height) // 2
            )
            canvas.paste(img, offset)
            return canvas
        
        return img
    
    def _auto_rotate(self, img: Image.Image) -> Image.Image:
        """
        Ruota automaticamente in base a dati EXIF.
        Molti smartphone salvano foto con rotazione nei metadati.
        
        Args:
            img: Immagine PIL
            
        Returns:
            Immagine con orientamento corretto
        """
        try:
            # Cerca tag Orientation in EXIF
            exif = img._getexif()
            if exif is not None:
                for tag, value in exif.items():
                    tag_name = ExifTags.TAGS.get(tag, tag)
                    if tag_name == 'Orientation':
                        if value == 3:
                            img = img.rotate(180, expand=True)
                        elif value == 6:
                            img = img.rotate(270, expand=True)
                        elif value == 8:
                            img = img.rotate(90, expand=True)
                        break
        except (AttributeError, KeyError, IndexError) as e:
            # Ignora errori EXIF (immagine senza metadati)
            pass
        
        return img
    
    def get_file_sizes(self, paths: Dict[str, str]) -> Dict[str, float]:
        """
        Ritorna dimensioni file in KB.
        
        Args:
            paths: Dict con paths delle versioni
            
        Returns:
            Dict con dimensioni in KB
        """
        sizes = {}
        for name, path in paths.items():
            try:
                sizes[name] = Path(path).stat().st_size / 1024
            except FileNotFoundError:
                sizes[name] = 0
        return sizes
    
    def delete_property_images(self, property_id: int) -> Dict[str, int]:
        """
        Elimina tutte le immagini di un immobile.
        
        Args:
            property_id: ID dell'immobile
            
        Returns:
            Dict con conteggio file eliminati e spazio liberato
        """
        property_path = self.upload_base_path / str(property_id)
        
        if not property_path.exists():
            logger.warning(f"Cartella immobile {property_id} non trovata")
            return {'deleted_files': 0, 'freed_kb': 0}
        
        deleted_files = 0
        freed_bytes = 0
        
        # Elimina tutti i file nella cartella
        for file in property_path.iterdir():
            if file.is_file():
                try:
                    freed_bytes += file.stat().st_size
                    file.unlink()
                    deleted_files += 1
                except Exception as e:
                    logger.error(f"Errore eliminando {file}: {e}")
        
        # Rimuovi la cartella vuota
        try:
            property_path.rmdir()
            logger.info(f"Eliminata cartella immobile {property_id}")
        except OSError:
            # Cartella non vuota (altri file?)
            pass
        
        freed_kb = freed_bytes / 1024
        logger.info(f"Eliminati {deleted_files} file per immobile {property_id} ({freed_kb:.1f} KB)")
        
        return {
            'deleted_files': deleted_files,
            'freed_kb': round(freed_kb, 2)
        }
    
    def delete_single_image(self, property_id: int, image_index: int) -> bool:
        """
        Elimina una singola immagine (tutte le versioni).
        
        Args:
            property_id: ID dell'immobile
            image_index: Indice dell'immagine
            
        Returns:
            True se eliminata, False altrimenti
        """
        property_path = self.upload_base_path / str(property_id)
        deleted = False
        
        for size_name in self.SIZES.keys():
            filepath = property_path / f"img_{image_index}_{size_name}.webp"
            if filepath.exists():
                try:
                    filepath.unlink()
                    deleted = True
                except Exception as e:
                    logger.error(f"Errore eliminando {filepath}: {e}")
        
        return deleted
    
    def get_image_urls(self, property_id: int, image_index: int) -> Dict[str, str]:
        """
        Genera URLs per le versioni di un'immagine.
        
        Args:
            property_id: ID dell'immobile
            image_index: Indice dell'immagine
            
        Returns:
            Dict con URLs per ogni versione
        """
        base_url = f"/api/v1/images/{property_id}"
        return {
            'thumbnail': f"{base_url}/img_{image_index}_thumbnail.webp",
            'medium': f"{base_url}/img_{image_index}_medium.webp",
            'large': f"{base_url}/img_{image_index}_large.webp",
        }
    
    def validate_image(self, file_data: BinaryIO, filename: str) -> Tuple[bool, str]:
        """
        Valida un file immagine prima del processing.
        
        Args:
            file_data: File binario
            filename: Nome file
            
        Returns:
            (is_valid, error_message)
        """
        # Controlla estensione
        ext = Path(filename).suffix.lower()
        allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'}
        if ext not in allowed_extensions:
            return False, f"Estensione non supportata: {ext}"
        
        # Controlla dimensione
        file_data.seek(0, 2)  # Fine file
        size_mb = file_data.tell() / (1024 * 1024)
        file_data.seek(0)  # Inizio
        
        if size_mb > self.MAX_FILE_SIZE_MB:
            return False, f"File troppo grande: {size_mb:.1f}MB (max {self.MAX_FILE_SIZE_MB}MB)"
        
        # Verifica che sia un'immagine valida
        try:
            img = Image.open(file_data)
            img.verify()  # Verifica integrità
            file_data.seek(0)
        except Exception as e:
            return False, f"File non è un'immagine valida: {e}"
        
        return True, ""


# Singleton per uso globale
_processor_instance = None

def get_image_processor() -> ImageProcessor:
    """Ritorna istanza singleton del processore"""
    global _processor_instance
    if _processor_instance is None:
        _processor_instance = ImageProcessor()
    return _processor_instance


# Test standalone
if __name__ == "__main__":
    import sys
    
    logging.basicConfig(level=logging.DEBUG)
    
    processor = ImageProcessor()
    
    print("ImageProcessor Test")
    print("=" * 50)
    print(f"Upload path: {processor.upload_base_path}")
    print(f"Sizes: {processor.SIZES}")
    print(f"WebP quality: {processor.WEBP_QUALITY}")
    print(f"Max file size: {processor.MAX_FILE_SIZE_MB}MB")
    
    if len(sys.argv) > 1:
        # Test con file reale
        test_file = sys.argv[1]
        print(f"\nProcessing: {test_file}")
        
        with open(test_file, 'rb') as f:
            results = processor.process_property_image(f, 9999, 0, test_file)
            print(f"Results: {results}")
            print(f"Sizes: {processor.get_file_sizes(results)}")
