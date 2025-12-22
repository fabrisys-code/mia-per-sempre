# 📊 Import Dati OMI - Istruzioni Complete

Sistema di import e gestione dati **Osservatorio Mercato Immobiliare** (Agenzia delle Entrate)

**Dataset:** Semestre 1/2025 - elaborazione del 15-DIC-25  
**Records:** 26.991 zone + 157.593 quotazioni

---

## 📋 File Creati

```
backend/
├── omi_database_schema.sql      # Schema database completo
├── import_omi_data.py            # Script import dati CSV → PostgreSQL
├── test_omi_queries.py           # Script test query e funzionalità
└── data/
    └── omi/
        ├── QI_1303065_1_20251_ZONE.csv     # 3.4 MB
        └── QI_1303065_1_20251_VALORI.csv   # 18 MB
```

---

## 🚀 Quick Start

### 1️⃣ Prepara i File

```bash
# Crea directory per i dati OMI
cd ~/miapersempre/backend
mkdir -p data/omi

# Copia i file OMI dalla directory del progetto
cp /mnt/project/QI_*.csv data/omi/

# Verifica
ls -lh data/omi/
```

### 2️⃣ Installa Dipendenze

```bash
# Attiva virtual environment
cd ~/miapersempre/backend
source venv/Scripts/activate

# Installa librerie necessarie
pip install pandas tqdm sqlalchemy psycopg2-binary

# Verifica installazione
python -c "import pandas, tqdm; print('✅ Dipendenze OK')"
```

### 3️⃣ Crea Schema Database

```bash
# Opzione A: Via script Python (consigliato)
python import_omi_data.py

# Opzione B: Manualmente con psql
psql-mia < omi_database_schema.sql
```

### 4️⃣ Import Dati

```bash
# Esegui import completo
python import_omi_data.py

# Output atteso:
# ================================================================================
# 📍 IMPORT ZONE OMI
# ================================================================================
# ✅ Lette 26,991 righe
# 💾 Import in database...
# [Progress bar]
# ✅ Importate 26,991 zone
#
# ================================================================================
# 💰 IMPORT QUOTAZIONI OMI
# ================================================================================
# ✅ Righe da importare: 157,593
# 💾 Import in database...
# [Progress bar]
# ✅ Importate 157,593 quotazioni
```

**⏱️ Tempo stimato:** 5-10 minuti

### 5️⃣ Verifica e Test

```bash
# Esegui test completi
python test_omi_queries.py

# Output mostra:
# - Connessione database
# - Conteggio dati importati
# - Ricerche per città
# - Range prezzi per regione
# - Calcolo valutazione esempio
```

---

## 📊 Struttura Database

### Tabelle Principali

#### **`omi_zones`** (26.991 record)
Informazioni zone OMI

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| id | SERIAL | Primary key |
| area_territoriale | VARCHAR(20) | NORD-OVEST, NORD-EST, CENTRO, SUD, ISOLE |
| regione | VARCHAR(50) | Nome regione |
| provincia | VARCHAR(2) | Sigla provincia (MI, RM, ...) |
| comune_descrizione | VARCHAR(100) | Nome comune |
| fascia | VARCHAR(1) | B=centrale, C=semicentrale, D=periferica, E=suburbana, R=rurale |
| zona_codice | VARCHAR(10) | Codice zona (B1, C2, ...) |
| zona_descrizione | TEXT | Descrizione zona |
| link_zona | VARCHAR(20) | Codice univoco (es. MI00000123) |

**Indici:** comune, provincia, regione, fascia, link_zona

---

#### **`omi_quotations`** (157.593 record)
Quotazioni mercato per zona e tipologia

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| id | SERIAL | Primary key |
| comune_descrizione | VARCHAR(100) | Nome comune |
| fascia | VARCHAR(1) | Fascia zona |
| zona_codice | VARCHAR(10) | Codice zona |
| link_zona | VARCHAR(20) | FK → omi_zones |
| cod_tipologia | INTEGER | Codice tipologia (20=abitazioni civili) |
| descr_tipologia | VARCHAR(100) | Descrizione tipologia |
| stato | VARCHAR(10) | NORMALE, OTTIMO, SCADENTE |
| prezzo_min | DECIMAL | Prezzo minimo €/mq |
| prezzo_max | DECIMAL | Prezzo massimo €/mq |
| locazione_min | DECIMAL | Canone minimo €/mq/mese |
| locazione_max | DECIMAL | Canone massimo €/mq/mese |

**Indici:** comune, zona, tipologia, prezzi

---

#### **`omi_property_types`** (~100 record)
Tipologie immobiliari

| Cod | Descrizione | Categoria |
|-----|-------------|-----------|
| 1 | Ville e Villini | RESIDENZIALE |
| 20 | Abitazioni civili | RESIDENZIALE |
| 21 | Abitazioni economiche | RESIDENZIALE |
| 5 | Negozi | COMMERCIALE |
| 6 | Uffici | COMMERCIALE |
| 13 | Box | PERTINENZA |

---

#### **`omi_settings`**
Parametri sistema

| Chiave | Valore | Descrizione |
|--------|--------|-------------|
| tasso_legale_corrente | 0.025 | 2.5% (2025) |
| semestre_omi_corrente | 2025/1 | Semestre dati |

---

## 🔍 Query di Esempio

### Ricerca Quotazioni per Città

```sql
-- Milano centro, abitazioni civili
SELECT 
    fascia,
    zona_codice,
    zona_descrizione,
    prezzo_min,
    prezzo_max,
    (prezzo_min + prezzo_max) / 2 as prezzo_medio
FROM omi_quotations q
LEFT JOIN omi_zones z ON q.link_zona = z.link_zona
WHERE q.comune_descrizione = 'MILANO'
AND q.cod_tipologia = 20
AND q.fascia = 'B'
AND q.stato = 'NORMALE'
ORDER BY zona_codice;
```

### Top Comuni per Prezzo

```sql
-- Top 20 comuni più cari (abitazioni civili)
SELECT 
    comune_descrizione,
    regione,
    AVG((prezzo_min + prezzo_max) / 2) as prezzo_medio,
    COUNT(*) as num_zone
FROM omi_quotations
WHERE cod_tipologia = 20
AND stato = 'NORMALE'
AND prezzo_min IS NOT NULL
GROUP BY comune_descrizione, regione
HAVING COUNT(*) >= 3
ORDER BY prezzo_medio DESC
LIMIT 20;
```

### Usando Funzione

```sql
-- Funzione built-in per ricerca veloce
SELECT * FROM get_quotation_by_comune(
    'PESCARA',    -- comune
    20,           -- cod_tipologia (abitazioni civili)
    'B',          -- fascia (NULL per tutte)
    'NORMALE'     -- stato
);
```

---

## 💡 Utilizzo nell'Algoritmo di Valutazione

### Esempio Completo

```python
from sqlalchemy import create_engine, text

def calcola_valore_immobile(comune, superficie_sqm, eta_usufruttuario):
    """
    Calcola valore completo immobile per nuda proprietà
    
    Returns:
        dict con 4 valori principali
    """
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as conn:
        # 1. Ottieni quotazione OMI
        query = text("""
            SELECT prezzo_min, prezzo_max
            FROM omi_quotations
            WHERE comune_descrizione = :comune
            AND cod_tipologia = 20
            AND fascia = 'B'
            AND stato = 'NORMALE'
            LIMIT 1
        """)
        result = conn.execute(query, {"comune": comune}).fetchone()
        
        if not result:
            raise ValueError(f"Comune {comune} non trovato")
        
        prezzo_min, prezzo_max = result
        
        # 2. Calcola valore piena proprietà
        valore_min = prezzo_min * superficie_sqm
        valore_max = prezzo_max * superficie_sqm
        valore_medio = (valore_min + valore_max) / 2
        
        # 3. Ottieni tasso legale
        query = text("""
            SELECT valore FROM omi_settings 
            WHERE chiave = 'tasso_legale_corrente'
        """)
        tasso_legale = float(conn.execute(query).scalar())
        
        # 4. Calcola valore fiscale usufrutto
        coefficiente = get_coefficiente_eta(eta_usufruttuario)
        annualita = valore_medio * tasso_legale
        valore_usufrutto = annualita * coefficiente
        valore_nuda_proprieta = valore_medio - valore_usufrutto
        
        return {
            "valore_piena_proprieta": {
                "min": valore_min,
                "max": valore_max,
                "medio": valore_medio
            },
            "valore_fiscale": {
                "usufrutto": valore_usufrutto,
                "nuda_proprieta": valore_nuda_proprieta,
                "percentuale_nuda": (valore_nuda_proprieta / valore_medio) * 100
            }
        }


# Esempio utilizzo
valori = calcola_valore_immobile("PESCARA", 100, 78)
print(f"Valore Piena Proprietà: {valori['valore_piena_proprieta']['medio']:,.0f} €")
print(f"Valore Nuda Proprietà: {valori['valore_fiscale']['nuda_proprieta']:,.0f} €")
```

---

## 🛠️ Troubleshooting

### Problema: File non trovati

```bash
# Verifica path
ls -la ~/miapersempre/backend/data/omi/

# Se file mancano
cp /mnt/project/QI_*.csv ~/miapersempre/backend/data/omi/
```

### Problema: Errore connessione database

```bash
# Verifica database attivo
psql-mia -c "SELECT 1"

# Verifica DATABASE_URL
echo $DATABASE_URL
# Dovrebbe essere: postgresql://postgres:postgres@localhost:5432/miapersempre
```

### Problema: Dipendenze mancanti

```bash
# Reinstalla
pip install --upgrade pandas tqdm sqlalchemy psycopg2-binary
```

### Problema: Import lento

- **Normale:** 5-10 minuti per 157k record
- **Se >30 min:** Verifica RAM disponibile
- **Opzione:** Riduci `BATCH_SIZE` da 1000 a 500

---

## 📈 Statistiche Dataset

### Copertura Geografica

- 🏛️ **7.885 comuni** italiani
- 🗺️ **26.991 zone** mappate
- 💰 **157.593 quotazioni** mercato

### Top Regioni per Zone

| Regione | Zone |
|---------|------|
| Lombardia | 4.405 |
| Piemonte | 3.268 |
| Veneto | 2.134 |
| Campania | 2.093 |
| Sicilia | 1.640 |

### Tipologie Immobiliari

| Tipologia | Quotazioni |
|-----------|------------|
| Abitazioni civili | ~50.000 |
| Ville e Villini | ~8.000 |
| Box | ~7.500 |
| Abitazioni economiche | ~7.000 |

### Range Prezzi Nazionale

- **Min:** 60 €/mq (zone rurali)
- **Max:** 29.000 €/mq (centri storici pregio)
- **Media:** 867 - 1.202 €/mq
- **Mediana:** 700 - 960 €/mq

---

## 🔄 Aggiornamento Dati

I dati OMI vengono pubblicati **semestralmente** dall'Agenzia delle Entrate:
- **Semestre 1:** Gennaio-Giugno (pubblicato Dicembre)
- **Semestre 2:** Luglio-Dicembre (pubblicato Giugno)

### Procedura Aggiornamento

```bash
# 1. Scarica nuovi dati da:
# https://www1.agenziaentrate.gov.it/servizi/Consultazione/ricerca.php

# 2. Backup database
pg_dump -U postgres miapersempre > backup_omi_$(date +%Y%m%d).sql

# 3. Truncate tabelle
psql-mia -c "TRUNCATE omi_zones, omi_quotations CASCADE;"

# 4. Import nuovi dati
python import_omi_data.py

# 5. Aggiorna settings
psql-mia -c "UPDATE omi_settings SET valore='2025/2' WHERE chiave='semestre_omi_corrente';"
```

---

## 📞 Support

Per problemi o domande:
1. Verifica log import: `import_omi_data.py` mostra errori dettagliati
2. Testa con: `python test_omi_queries.py`
3. Controlla documentazione PostgreSQL

---

## ✅ Checklist Setup Completo

- [ ] File CSV copiati in `backend/data/omi/`
- [ ] Dipendenze installate (`pandas`, `tqdm`, `sqlalchemy`)
- [ ] Schema database creato
- [ ] Dati importati (26k + 157k record)
- [ ] Test query eseguiti con successo
- [ ] Funzione `get_quotation_by_comune()` testata

**Quando tutti i check sono ✅, sei pronto per implementare l'algoritmo di valutazione!** 🚀
