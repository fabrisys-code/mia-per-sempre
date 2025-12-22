#!/usr/bin/env python3
"""
Script di Import Dati OMI (Osservatorio Mercato Immobiliare)
Semestre 1/2025 - elaborazione del 15-DIC-25

Importa:
- Zone OMI (26.991 record)
- Quotazioni OMI (157.593 record)

Usage:
    python import_omi_data.py
"""

import os
import sys
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import logging
from tqdm import tqdm

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============================================================================
# CONFIGURAZIONE
# ============================================================================

# Path files OMI
OMI_ZONE_FILE = "QI_1303065_1_20251_ZONE.csv"
OMI_VALORI_FILE = "QI_1303065_1_20251_VALORI.csv"

# Batch size per insert
BATCH_SIZE = 1000

# Database connection
DATABASE_URL = os.getenv(
    'DATABASE_URL',
    'postgresql://postgres:postgres@localhost:5432/miapersempre'
)

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def clean_decimal(value):
    """Converte stringhe con virgola in decimali"""
    if pd.isna(value) or value == '':
        return None
    if isinstance(value, str):
        # Rimuove spazi e converte virgola in punto
        value = value.strip().replace(',', '.')
    try:
        return float(value)
    except (ValueError, TypeError):
        return None


def clean_string(value):
    """Pulisce stringhe rimuovendo apici e spazi"""
    if pd.isna(value) or value == '':
        return None
    if isinstance(value, str):
        # Rimuove apici singoli all'inizio/fine
        value = value.strip().strip("'")
    return value


def get_data_directory():
    """Trova la directory dei dati OMI"""
    # Prova diverse location
    possible_paths = [
        os.path.join(os.getcwd(), 'data', 'omi'),
        os.path.join(os.path.dirname(__file__), '..', 'data', 'omi'),
        '/mnt/project',  # Per Claude
        os.getcwd(),  # Current directory
    ]
    
    for path in possible_paths:
        zone_file = os.path.join(path, OMI_ZONE_FILE)
        if os.path.exists(zone_file):
            logger.info(f"✅ Dati OMI trovati in: {path}")
            return path
    
    raise FileNotFoundError(
        f"File OMI non trovati. Cercati in:\n" + 
        "\n".join(f"  - {p}" for p in possible_paths)
    )


# ============================================================================
# IMPORT FUNCTIONS
# ============================================================================

def import_zone_omi(engine, data_dir):
    """Importa dati Zone OMI"""
    logger.info("=" * 80)
    logger.info("📍 IMPORT ZONE OMI")
    logger.info("=" * 80)
    
    zone_file = os.path.join(data_dir, OMI_ZONE_FILE)
    logger.info(f"Lettura file: {zone_file}")
    
    # Leggi CSV (skip prima riga header descrittivo)
    df = pd.read_csv(
        zone_file,
        sep=';',
        skiprows=1,
        encoding='utf-8',
        dtype=str  # Tutto come string inizialmente
    )
    
    # Rimuove ultima colonna se vuota
    if 'Unnamed' in df.columns[-1]:
        df = df.iloc[:, :-1]
    
    logger.info(f"✅ Lette {len(df):,} righe")
    logger.info(f"✅ Colonne: {list(df.columns)}")
    
    # Pulizia dati
    logger.info("🧹 Pulizia dati...")
    df['Zona_Descr'] = df['Zona_Descr'].apply(clean_string)
    df['Microzona'] = df['Microzona'].fillna(0).astype(int)
    
    # Rinomina colonne per match con DB
    column_mapping = {
        'Area_territoriale': 'area_territoriale',
        'Regione': 'regione',
        'Prov': 'provincia',
        'Comune_ISTAT': 'comune_istat',
        'Comune_cat': 'comune_catastale',
        'Sez': 'sezione',
        'Comune_amm': 'comune_amministrativo',
        'Comune_descrizione': 'comune_descrizione',
        'Fascia': 'fascia',
        'Zona_Descr': 'zona_descrizione',
        'Zona': 'zona_codice',
        'LinkZona': 'link_zona',
        'Cod_tip_prev': 'cod_tipologia_prevalente',
        'Descr_tip_prev': 'descr_tipologia_prevalente',
        'Stato_prev': 'stato_prevalente',
        'Microzona': 'microzona'
    }
    df = df.rename(columns=column_mapping)
    
    # Aggiungi metadati
    df['data_rilevazione'] = '2025-01-15'
    df['semestre'] = '2025/1'
    
    # Import in batch
    logger.info(f"💾 Import in database (batch size: {BATCH_SIZE})...")
    
    total_imported = 0
    total_errors = 0
    
    with tqdm(total=len(df), desc="Import Zone") as pbar:
        for i in range(0, len(df), BATCH_SIZE):
            batch = df.iloc[i:i+BATCH_SIZE]
            
            try:
                batch.to_sql(
                    'omi_zones',
                    engine,
                    if_exists='append',
                    index=False,
                    method='multi'
                )
                total_imported += len(batch)
                pbar.update(len(batch))
                
            except Exception as e:
                logger.error(f"❌ Errore batch {i}-{i+len(batch)}: {str(e)}")
                total_errors += len(batch)
                pbar.update(len(batch))
    
    logger.info(f"✅ Importate {total_imported:,} zone")
    if total_errors > 0:
        logger.warning(f"⚠️  Errori: {total_errors:,} record")
    
    return total_imported


def import_quotazioni_omi(engine, data_dir):
    """Importa dati Quotazioni OMI"""
    logger.info("=" * 80)
    logger.info("💰 IMPORT QUOTAZIONI OMI")
    logger.info("=" * 80)
    
    valori_file = os.path.join(data_dir, OMI_VALORI_FILE)
    logger.info(f"Lettura file: {valori_file}")
    
    # Leggi CSV in chunks per file grandi
    chunk_size = 10000
    total_rows = 0
    total_imported = 0
    total_errors = 0
    
    # Prima conta le righe totali per progress bar
    logger.info("📊 Conteggio righe totali...")
    with open(valori_file, 'r', encoding='utf-8') as f:
        total_rows = sum(1 for line in f) - 2  # Skip 2 header rows
    
    logger.info(f"✅ Righe da importare: {total_rows:,}")
    
    # Leggi e importa in chunks
    logger.info("💾 Import in database...")
    
    with tqdm(total=total_rows, desc="Import Quotazioni") as pbar:
        for chunk in pd.read_csv(
            valori_file,
            sep=';',
            skiprows=1,
            encoding='utf-8',
            dtype=str,
            chunksize=chunk_size
        ):
            # Rimuove ultima colonna se vuota
            if 'Unnamed' in chunk.columns[-1]:
                chunk = chunk.iloc[:, :-1]
            
            # Pulizia dati
            chunk['Compr_min'] = chunk['Compr_min'].apply(clean_decimal)
            chunk['Compr_max'] = chunk['Compr_max'].apply(clean_decimal)
            chunk['Loc_min'] = chunk['Loc_min'].apply(clean_decimal)
            chunk['Loc_max'] = chunk['Loc_max'].apply(clean_decimal)
            
            # Rinomina colonne
            column_mapping = {
                'Area_territoriale': 'area_territoriale',
                'Regione': 'regione',
                'Prov': 'provincia',
                'Comune_ISTAT': 'comune_istat',
                'Comune_cat': 'comune_catastale',
                'Sez': 'sezione',
                'Comune_amm': 'comune_amministrativo',
                'Comune_descrizione': 'comune_descrizione',
                'Fascia': 'fascia',
                'Zona': 'zona_codice',
                'LinkZona': 'link_zona',
                'Cod_Tip': 'cod_tipologia',
                'Descr_Tipologia': 'descr_tipologia',
                'Stato': 'stato',
                'Stato_prev': 'stato_prevalente',
                'Compr_min': 'prezzo_min',
                'Compr_max': 'prezzo_max',
                'Sup_NL_compr': 'superficie_normalizzata_compra',
                'Loc_min': 'locazione_min',
                'Loc_max': 'locazione_max',
                'Sup_NL_loc': 'superficie_normalizzata_loc'
            }
            chunk = chunk.rename(columns=column_mapping)
            
            # Aggiungi metadati
            chunk['data_rilevazione'] = '2025-01-15'
            chunk['semestre'] = '2025/1'
            
            # Import batch
            try:
                chunk.to_sql(
                    'omi_quotations',
                    engine,
                    if_exists='append',
                    index=False,
                    method='multi'
                )
                total_imported += len(chunk)
                pbar.update(len(chunk))
                
            except Exception as e:
                logger.error(f"❌ Errore chunk: {str(e)}")
                total_errors += len(chunk)
                pbar.update(len(chunk))
    
    logger.info(f"✅ Importate {total_imported:,} quotazioni")
    if total_errors > 0:
        logger.warning(f"⚠️  Errori: {total_errors:,} record")
    
    return total_imported


def verify_import(engine):
    """Verifica import e mostra statistiche"""
    logger.info("=" * 80)
    logger.info("🔍 VERIFICA IMPORT")
    logger.info("=" * 80)
    
    with engine.connect() as conn:
        # Count zone
        result = conn.execute(text("SELECT COUNT(*) FROM omi_zones"))
        zone_count = result.scalar()
        logger.info(f"📍 Zone importate: {zone_count:,}")
        
        # Count quotazioni
        result = conn.execute(text("SELECT COUNT(*) FROM omi_quotations"))
        quot_count = result.scalar()
        logger.info(f"💰 Quotazioni importate: {quot_count:,}")
        
        # Top comuni per quotazioni
        logger.info("\n🏙️  Top 10 Comuni per numero quotazioni:")
        query = """
            SELECT comune_descrizione, COUNT(*) as num_quotazioni
            FROM omi_quotations
            GROUP BY comune_descrizione
            ORDER BY num_quotazioni DESC
            LIMIT 10
        """
        result = conn.execute(text(query))
        for row in result:
            logger.info(f"  {row[0]}: {row[1]:,} quotazioni")
        
        # Range prezzi nazionale
        logger.info("\n💶 Range Prezzi Nazionale (Abitazioni civili):")
        query = """
            SELECT 
                MIN(prezzo_min) as min_prezzo,
                MAX(prezzo_max) as max_prezzo,
                AVG((prezzo_min + prezzo_max) / 2) as prezzo_medio
            FROM omi_quotations
            WHERE cod_tipologia = '20'
            AND prezzo_min IS NOT NULL
        """
        result = conn.execute(text(query)).fetchone()
        logger.info(f"  Min: {result[0]:,.0f} €/mq")
        logger.info(f"  Max: {result[1]:,.0f} €/mq")
        logger.info(f"  Media: {result[2]:,.0f} €/mq")


# ============================================================================
# MAIN
# ============================================================================

def main():
    """Main import function"""
    logger.info("🚀 INIZIO IMPORT DATI OMI")
    logger.info(f"⏰ Data: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    try:
        # 1. Trova directory dati
        data_dir = get_data_directory()
        
        # 2. Connessione database
        logger.info(f"\n🔌 Connessione database...")
        engine = create_engine(DATABASE_URL, echo=False)
        
        # Test connessione
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version()"))
            version = result.scalar()
            logger.info(f"✅ Connesso a PostgreSQL: {version.split(',')[0]}")
        
        # 3. Crea schema (se non esiste)
        logger.info("\n📋 Creazione schema database...")
        schema_file = os.path.join(
            os.path.dirname(__file__),
            'omi_database_schema.sql'
        )
        
        if os.path.exists(schema_file):
            logger.info(f"Esecuzione script: {schema_file}")
            with open(schema_file, 'r', encoding='utf-8') as f:
                schema_sql = f.read()
            
            with engine.connect() as conn:
                # Esegui statement by statement (split su ;)
                for statement in schema_sql.split(';'):
                    if statement.strip():
                        try:
                            conn.execute(text(statement))
                            conn.commit()
                        except Exception as e:
                            # Ignora errori per tabelle già esistenti
                            if 'already exists' not in str(e):
                                logger.warning(f"⚠️  {str(e)}")
            
            logger.info("✅ Schema creato/verificato")
        else:
            logger.warning(f"⚠️  Schema file non trovato: {schema_file}")
        
        # 4. Import zone
        import_zone_omi(engine, data_dir)
        
        # 5. Import quotazioni
        import_quotazioni_omi(engine, data_dir)
        
        # 6. Verifica
        verify_import(engine)
        
        # 7. Success
        logger.info("\n" + "=" * 80)
        logger.info("✅ IMPORT COMPLETATO CON SUCCESSO!")
        logger.info("=" * 80)
        
        return 0
        
    except Exception as e:
        logger.error(f"\n❌ ERRORE FATALE: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return 1


if __name__ == "__main__":
    sys.exit(main())
