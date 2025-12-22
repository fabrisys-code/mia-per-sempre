-- ============================================================================
-- SCHEMA DATABASE OMI (Osservatorio Mercato Immobiliare)
-- Data: Semestre 1/2025
-- Records: 26.991 zone + 157.593 quotazioni
-- ============================================================================

-- Tabella: Informazioni Zone OMI
-- Contiene le informazioni geografiche e descrittive delle zone
CREATE TABLE IF NOT EXISTS omi_zones (
    id SERIAL PRIMARY KEY,
    
    -- Identificazione geografica
    area_territoriale VARCHAR(20) NOT NULL,  -- NORD-OVEST, NORD-EST, CENTRO, SUD, ISOLE
    regione VARCHAR(50) NOT NULL,
    provincia VARCHAR(2) NOT NULL,
    comune_istat VARCHAR(10),
    comune_catastale VARCHAR(10),
    sezione VARCHAR(5),
    comune_amministrativo VARCHAR(10),
    comune_descrizione VARCHAR(100) NOT NULL,
    
    -- Classificazione zona
    fascia VARCHAR(1) NOT NULL,  -- B, C, D, E, R
    zona_codice VARCHAR(10) NOT NULL,  -- es. B1, C2, D3
    zona_descrizione TEXT,
    link_zona VARCHAR(20) UNIQUE,  -- Codice univoco zona (es. AL00000001)
    
    -- Tipologia prevalente
    cod_tipologia_prevalente INTEGER,
    descr_tipologia_prevalente VARCHAR(100),
    stato_prevalente VARCHAR(1),  -- N=Normale, O=Ottimo, S=Scadente
    microzona INTEGER DEFAULT 0,
    
    -- Metadati
    data_rilevazione DATE DEFAULT '2025-01-15',
    semestre VARCHAR(10) DEFAULT '2025/1',
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Indici per performance
    CONSTRAINT unique_zona UNIQUE (comune_amministrativo, zona_codice)
);

-- Indici per ricerche frequenti
CREATE INDEX idx_omi_zones_comune ON omi_zones(comune_descrizione);
CREATE INDEX idx_omi_zones_provincia ON omi_zones(provincia);
CREATE INDEX idx_omi_zones_regione ON omi_zones(regione);
CREATE INDEX idx_omi_zones_fascia ON omi_zones(fascia);
CREATE INDEX idx_omi_zones_link ON omi_zones(link_zona);
CREATE INDEX idx_omi_zones_lookup ON omi_zones(provincia, comune_descrizione, fascia, zona_codice);

-- ============================================================================

-- Tabella: Quotazioni Valori OMI
-- Contiene i valori di mercato per tipologia immobiliare e zona
CREATE TABLE IF NOT EXISTS omi_quotations (
    id SERIAL PRIMARY KEY,
    
    -- Identificazione geografica (denormalizzata per performance)
    area_territoriale VARCHAR(20) NOT NULL,
    regione VARCHAR(50) NOT NULL,
    provincia VARCHAR(2) NOT NULL,
    comune_istat VARCHAR(10),
    comune_catastale VARCHAR(10),
    sezione VARCHAR(5),
    comune_amministrativo VARCHAR(10),
    comune_descrizione VARCHAR(100) NOT NULL,
    fascia VARCHAR(1) NOT NULL,
    zona_codice VARCHAR(10) NOT NULL,
    link_zona VARCHAR(20),  -- FK logica a omi_zones
    
    -- Tipologia immobile
    cod_tipologia INTEGER NOT NULL,
    descr_tipologia VARCHAR(100) NOT NULL,
    
    -- Stato immobile
    stato VARCHAR(10) NOT NULL,  -- NORMALE, OTTIMO, SCADENTE
    stato_prevalente VARCHAR(1),
    
    -- Valori compravendita (€/mq)
    prezzo_min DECIMAL(10,2),
    prezzo_max DECIMAL(10,2),
    superficie_normalizzata_compra VARCHAR(1),  -- L=Lorda, N=Netta
    
    -- Valori locazione (€/mq/mese)
    locazione_min DECIMAL(10,2),
    locazione_max DECIMAL(10,2),
    superficie_normalizzata_loc VARCHAR(1),
    
    -- Metadati
    data_rilevazione DATE DEFAULT '2025-01-15',
    semestre VARCHAR(10) DEFAULT '2025/1',
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraint per evitare duplicati
    CONSTRAINT unique_quotation UNIQUE (
        link_zona, 
        cod_tipologia, 
        stato
    )
);

-- Indici per ricerche frequenti
CREATE INDEX idx_omi_quot_comune ON omi_quotations(comune_descrizione);
CREATE INDEX idx_omi_quot_zona ON omi_quotations(link_zona);
CREATE INDEX idx_omi_quot_tipologia ON omi_quotations(cod_tipologia);
CREATE INDEX idx_omi_quot_lookup ON omi_quotations(
    provincia, 
    comune_descrizione, 
    fascia, 
    zona_codice, 
    cod_tipologia
);
CREATE INDEX idx_omi_quot_prezzi ON omi_quotations(prezzo_min, prezzo_max);

-- ============================================================================

-- Tabella: Tipologie Immobiliari (Lookup)
-- Mappatura codici -> descrizioni
CREATE TABLE IF NOT EXISTS omi_property_types (
    cod_tipologia INTEGER PRIMARY KEY,
    descrizione VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),  -- RESIDENZIALE, COMMERCIALE, INDUSTRIALE, AGRICOLO, ALTRO
    is_residenziale BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Popolamento tipologie principali
INSERT INTO omi_property_types (cod_tipologia, descrizione, categoria, is_residenziale) VALUES
(1, 'Ville e Villini', 'RESIDENZIALE', TRUE),
(5, 'Negozi', 'COMMERCIALE', FALSE),
(6, 'Uffici', 'COMMERCIALE', FALSE),
(7, 'Capannoni tipici', 'INDUSTRIALE', FALSE),
(8, 'Capannoni industriali', 'INDUSTRIALE', FALSE),
(9, 'Magazzini', 'COMMERCIALE', FALSE),
(10, 'Laboratori', 'INDUSTRIALE', FALSE),
(13, 'Box', 'PERTINENZA', FALSE),
(14, 'Posti auto coperti', 'PERTINENZA', FALSE),
(15, 'Posti auto scoperti', 'PERTINENZA', FALSE),
(20, 'Abitazioni civili', 'RESIDENZIALE', TRUE),
(21, 'Abitazioni di tipo economico', 'RESIDENZIALE', TRUE),
(22, 'Abitazioni tipiche dei luoghi', 'RESIDENZIALE', TRUE),
(101, 'Seminativo', 'AGRICOLO', FALSE),
(102, 'Uliveto', 'AGRICOLO', FALSE),
(103, 'Vigneto', 'AGRICOLO', FALSE)
ON CONFLICT (cod_tipologia) DO NOTHING;

-- ============================================================================

-- Tabella: Settings Sistema
-- Per gestire parametri dinamici (es. tasso legale)
CREATE TABLE IF NOT EXISTS omi_settings (
    id SERIAL PRIMARY KEY,
    chiave VARCHAR(100) UNIQUE NOT NULL,
    valore VARCHAR(255) NOT NULL,
    descrizione TEXT,
    data_efficacia DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Inserimento tasso legale corrente
INSERT INTO omi_settings (chiave, valore, descrizione, data_efficacia) VALUES
('tasso_legale_corrente', '0.025', 'Tasso di interesse legale per calcolo usufrutto', '2025-01-01'),
('semestre_omi_corrente', '2025/1', 'Semestre di riferimento dati OMI', '2025-01-01'),
('data_ultimo_aggiornamento_omi', '2025-12-15', 'Data ultimo aggiornamento dati OMI', '2025-12-15')
ON CONFLICT (chiave) DO UPDATE SET 
    valore = EXCLUDED.valore,
    updated_at = NOW();

-- ============================================================================

-- View: Quotazioni con Join Tipologia
-- Per query semplificate
CREATE OR REPLACE VIEW v_omi_quotations_full AS
SELECT 
    q.*,
    pt.categoria as tipologia_categoria,
    pt.is_residenziale,
    z.zona_descrizione,
    z.descr_tipologia_prevalente as zona_tipologia_prevalente,
    -- Calcolo prezzo medio
    (q.prezzo_min + q.prezzo_max) / 2 AS prezzo_medio
FROM omi_quotations q
LEFT JOIN omi_property_types pt ON q.cod_tipologia = pt.cod_tipologia
LEFT JOIN omi_zones z ON q.link_zona = z.link_zona;

-- ============================================================================

-- Funzione: Ricerca Quotazione per Comune e Tipo
CREATE OR REPLACE FUNCTION get_quotation_by_comune(
    p_comune VARCHAR(100),
    p_cod_tipologia INTEGER DEFAULT 20,  -- Default: Abitazioni civili
    p_fascia VARCHAR(1) DEFAULT NULL,
    p_stato VARCHAR(10) DEFAULT 'NORMALE'
)
RETURNS TABLE (
    zona_codice VARCHAR(10),
    zona_descrizione TEXT,
    fascia VARCHAR(1),
    prezzo_min DECIMAL(10,2),
    prezzo_max DECIMAL(10,2),
    prezzo_medio DECIMAL(10,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        q.zona_codice,
        z.zona_descrizione,
        q.fascia,
        q.prezzo_min,
        q.prezzo_max,
        (q.prezzo_min + q.prezzo_max) / 2 as prezzo_medio
    FROM omi_quotations q
    LEFT JOIN omi_zones z ON q.link_zona = z.link_zona
    WHERE 
        q.comune_descrizione ILIKE p_comune
        AND q.cod_tipologia = p_cod_tipologia
        AND (p_fascia IS NULL OR q.fascia = p_fascia)
        AND q.stato = p_stato
        AND q.prezzo_min IS NOT NULL
    ORDER BY q.fascia, q.zona_codice;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- QUERY DI TEST
-- ============================================================================

-- Test 1: Conteggio per regione
-- SELECT regione, COUNT(*) as num_zone 
-- FROM omi_zones 
-- GROUP BY regione 
-- ORDER BY num_zone DESC;

-- Test 2: Quotazioni Milano centro (Abitazioni civili)
-- SELECT * FROM get_quotation_by_comune('MILANO', 20, 'B', 'NORMALE');

-- Test 3: Range prezzi per provincia
-- SELECT 
--     provincia,
--     COUNT(*) as quotazioni,
--     MIN(prezzo_min) as min_prezzo,
--     MAX(prezzo_max) as max_prezzo,
--     AVG((prezzo_min + prezzo_max) / 2) as prezzo_medio
-- FROM omi_quotations
-- WHERE cod_tipologia = 20  -- Abitazioni civili
-- GROUP BY provincia
-- ORDER BY prezzo_medio DESC;

-- ============================================================================
-- COMMENTI E NOTE
-- ============================================================================

/*
STRUTTURA DATI:
- omi_zones: 26.991 record (informazioni zone)
- omi_quotations: 157.593 record (quotazioni per zona/tipologia)
- omi_property_types: ~100 record (tipologie immobiliari)
- omi_settings: parametri sistema (tasso legale, etc)

RELAZIONI:
- omi_quotations.link_zona → omi_zones.link_zona (logica, non FK per performance)
- omi_quotations.cod_tipologia → omi_property_types.cod_tipologia

INDICI:
- Ottimizzati per query frequenti:
  * Ricerca per comune
  * Ricerca per zona
  * Ricerca per tipologia
  * Range prezzi

PERFORMANCE:
- Denormalizzazione parziale per velocità query
- Indici composti per lookup comuni
- View materializzata per report

MANUTENZIONE:
- Aggiornamento semestrale dati OMI
- Aggiornamento annuale tasso legale
- Pulizia dati obsoleti (>2 anni)

NOTA IMPORTANTE:
I dati geografici (zona) sono denormalizzati in omi_quotations per performance.
Questo evita JOIN costosi nelle query frequenti.
*/
