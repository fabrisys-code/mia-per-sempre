-- ============================================================
-- MIGRAZIONE: Tabella property_images
-- Mia Per Sempre - Sistema Upload Immagini
-- Data: 23 Dicembre 2024
-- ============================================================

-- Tabella principale per le immagini degli immobili
CREATE TABLE IF NOT EXISTS property_images (
    id SERIAL PRIMARY KEY,
    
    -- Foreign key con cascade delete
    property_id INTEGER NOT NULL 
        REFERENCES properties(id) ON DELETE CASCADE,
    
    -- Paths delle 3 versioni WebP
    thumbnail_path VARCHAR(500) NOT NULL,  -- 300x300 px
    medium_path VARCHAR(500) NOT NULL,     -- 800x600 px
    large_path VARCHAR(500) NOT NULL,      -- 1920x1080 px
    
    -- Metadata
    original_filename VARCHAR(255),
    file_size_kb FLOAT,        -- Dimensione totale tutte le versioni
    width INTEGER,             -- Larghezza originale
    height INTEGER,            -- Altezza originale
    
    -- Ordinamento e flag
    display_order INTEGER DEFAULT 0,
    is_cover INTEGER DEFAULT 0,  -- 1 = immagine di copertina
    
    -- Timestamps
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- INDICI per performance
-- ============================================================

-- Indice per query per property_id
CREATE INDEX IF NOT EXISTS idx_property_images_property_id 
    ON property_images(property_id);

-- Indice per ordinamento immagini
CREATE INDEX IF NOT EXISTS idx_property_images_display_order 
    ON property_images(property_id, display_order);

-- Indice per trovare copertine
CREATE INDEX IF NOT EXISTS idx_property_images_cover 
    ON property_images(property_id, is_cover) 
    WHERE is_cover = 1;

-- ============================================================
-- COMMENTI
-- ============================================================

COMMENT ON TABLE property_images IS 
    'Immagini degli immobili in formato WebP ottimizzato (3 versioni per immagine)';

COMMENT ON COLUMN property_images.thumbnail_path IS 
    'Path versione thumbnail 300x300 px';

COMMENT ON COLUMN property_images.medium_path IS 
    'Path versione medium 800x600 px';

COMMENT ON COLUMN property_images.large_path IS 
    'Path versione large 1920x1080 px';

COMMENT ON COLUMN property_images.display_order IS 
    'Ordine visualizzazione (0 = prima immagine)';

COMMENT ON COLUMN property_images.is_cover IS 
    'Flag immagine di copertina (1 = copertina)';

-- ============================================================
-- VERIFICA CREAZIONE
-- ============================================================

-- Controlla che la tabella sia stata creata
SELECT 
    table_name, 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'property_images'
ORDER BY ordinal_position;

-- ============================================================
-- QUERY UTILI
-- ============================================================

-- Conteggio immagini per immobile
-- SELECT property_id, COUNT(*) as image_count 
-- FROM property_images 
-- GROUP BY property_id;

-- Immagine di copertina per ogni immobile
-- SELECT * FROM property_images WHERE is_cover = 1;

-- Spazio occupato totale
-- SELECT SUM(file_size_kb) / 1024 as total_mb FROM property_images;
