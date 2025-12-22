# AGGIORNAMENTI DOCUMENTAZIONE v1.4
## Da integrare in PROJECT_DOCUMENTATION_v1_3.md

---

## 📝 MODIFICHE DA APPLICARE

### 1. HEADER (righe 3-6)

**SOSTITUIRE:**
```
**Versione:** 1.3  
**Data creazione:** 18 Dicembre 2024  
**Ultima modifica:** 19 Dicembre 2024  
**Stato:** Fase di Planning e Design
```

**CON:**
```
**Versione:** 1.4  
**Data creazione:** 18 Dicembre 2024  
**Ultima modifica:** 20 Dicembre 2024  
**Stato:** Fase di Sviluppo Attivo
```

---

### 2. CHANGELOG (Inserire DOPO riga 11, PRIMA di "Changelog v1.3")

```markdown
**Changelog v1.4:** ⭐ DEVELOPMENT UPDATE
- ✅ **Backend Setup Completo** - FastAPI + PostgreSQL + PostGIS funzionanti
- ✅ **User Model & Authentication** - JWT con 3 endpoints (register, login, me)
- ✅ **Property Model Completo** - 40 campi, enums, relationships
- ✅ **Property CRUD & API** - 8 endpoints RESTful funzionanti
- ✅ **Pydantic Validators** - Case-insensitive enum handling
- ✅ **Database Migrations** - Tabelle users + properties create e testate
- ✅ **Git Repository** - Primo commit su GitHub (882 righe di codice)
- ✅ **Test Positivi** - Creazione e gestione immobili verificata via Swagger UI

```

---

### 3. INDICE (riga 52 - Aggiungere voce)

**AGGIUNGERE PRIMA di "Note Importanti":**
```markdown
17. [Note Tecniche Implementazione](#note-tecniche-implementazione) ⭐ NUOVO
```

---

### 4. ROADMAP (Sezione 14 - SOSTITUIRE righe 4612-4641)

**SOSTITUIRE LA FASE 1 CON:**

```markdown
### ✅ Fase 1: FONDAMENTA (Mesi 1-2) - IN CORSO

**Settimane 1-2: Infrastructure** ✅ COMPLETATO
- ✅ Setup server locale (Laragon + PostgreSQL 15 + PostGIS 3.6)
- ✅ Installazione stack (Python 3.13, FastAPI, Redis, Nginx)
- ✅ Setup repository Git + GitHub
- ✅ Dominio registrato miapersempre.it
- ✅ Ambiente sviluppo configurato

**Settimane 3-4: Backend Core** ✅ COMPLETATO
- ✅ Setup FastAPI + PostgreSQL
- ✅ Schema database User (authentication JWT funzionante)
- ✅ Schema database Property (40 campi completi)
- ✅ API autenticazione (JWT) - 3 endpoints
- ✅ API CRUD properties - 8 endpoints
- ✅ Pydantic schemas con validators
- ✅ Test positivi con Swagger UI

**Settimane 5-6: Algoritmo Valutazione** 🔄 PROSSIMO STEP
- ⏳ Import dati OMI (Osservatorio Mercato Immobiliare)
- ⏳ Implementazione algoritmo calcolo nuda proprietà
- ⏳ Integrazione tavole mortalità ISTAT
- ⏳ API endpoint /valuation/calculate
- ⏳ Testing su 100 casi reali

**Stato Attuale (20 Dicembre 2024):**
- ✅ Database: users + properties tables (funzionanti)
- ✅ API Endpoints: 11 totali (3 auth + 8 properties)
- ✅ Test: Creazione e gestione immobili OK
- ✅ Git Commit: 882 righe di codice su GitHub
- 🔄 Prossimo: Algoritmo Valutazione (feature distintiva!)
```

---

### 5. NUOVA SEZIONE 17 (Inserire DOPO Sezione 16, PRIMA della fine)

```markdown

---

## 17. NOTE TECNICHE IMPLEMENTAZIONE

### 17.1 Setup Ambiente Sviluppo

**Stack Locale:**
- **OS:** Windows 11 con Laragon
- **Database:** PostgreSQL 15.10 + PostGIS 3.6
- **Python:** 3.13 con virtual environment
- **IDE:** VS Code + Git Bash
- **Server:** Uvicorn (development)

**Database Connection:**
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/miapersempre
Encoding: UTF-8
Locale: Italian_Italy.1252
Tabelle: users, properties, spatial_ref_sys
```

**Alias Bash Utili:**
```bash
# ~/.bashrc
alias psql-mia='chcp.com 65001 > /dev/null 2>&1 && /c/laragon/bin/postgresql/postgresql/bin/psql.exe -U postgres -d miapersempre'
alias psql='/c/laragon/bin/postgresql/postgresql/bin/psql.exe'
```

---

### 17.2 Problemi Risolti Durante Setup

**1. Bcrypt Compatibility Issue (20 Dic 2024)**
- **Problema:** bcrypt 5.0+ incompatibile con passlib 1.7.4
- **Sintomo:** `ValueError: Invalid salt` durante password hashing
- **Soluzione:** 
  - Downgrade a bcrypt 4.1.2
  - Implementato truncate automatico password a 72 bytes
- **File:** `app/core/security.py`
- **Codice:**
```python
def get_password_hash(password: str) -> str:
    # Bcrypt limite 72 bytes
    if len(password.encode('utf-8')) > 72:
        password = password.encode('utf-8')[:72].decode('utf-8', errors='ignore')
    return pwd_context.hash(password)
```

**2. Pydantic v2 Migration**
- **Problema:** Sintassi Pydantic v1 deprecata
- **Cambiamenti:**
  - `Config` class → `model_config` dict
  - `orm_mode=True` → `from_attributes=True`
  - `@validator` → `@field_validator`
- **Esempio:**
```python
# v1 (old)
class Config:
    orm_mode = True

# v2 (new)
model_config = {"from_attributes": True}
```

**3. Enum Case-Insensitive Validators**
- **Problema:** API rifiutava "APPARTAMENTO", richiedeva "appartamento"
- **Soluzione:** Validators automatici per lowercase conversion
- **File:** `app/schemas/property.py`
- **Codice:**
```python
@field_validator('property_type', mode='before')
@classmethod
def normalize_property_type(cls, v):
    if isinstance(v, str):
        return v.lower()
    return v
```

**4. PostgreSQL Console UTF-8 su Windows**
- **Problema:** psql mostra "Nuda Propriet�" invece di "Nuda Proprietà"
- **Causa:** Console Windows Code Page 850 vs UTF-8
- **Soluzione:** `chcp 65001` prima di aprire psql
- **Nota:** I dati nel DB sono corretti (UTF-8), solo visualizzazione console
- **Verifica:** API restituisce caratteri corretti

**5. Git .gitignore e __pycache__**
- **Problema:** File `__pycache__/*.pyc` tracciati da Git
- **Soluzione:** 
  - Pulito `.gitignore` da caratteri BOM invisibili
  - Aggiunto `__pycache__/` e `*.pyc`
  - Rimossi file già tracciati: `git rm -r --cached`

---

### 17.3 Struttura Progetto Attuale

```
miapersempre/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # FastAPI app + routers
│   │   ├── api/
│   │   │   ├── deps.py                # Dependencies (get_db, get_current_user)
│   │   │   └── endpoints/
│   │   │       ├── auth.py            # POST register, login
│   │   │       ├── users.py           # GET /me
│   │   │       └── properties.py      # 8 endpoints CRUD
│   │   ├── core/
│   │   │   ├── config.py              # Settings (Pydantic BaseSettings)
│   │   │   ├── database.py            # SQLAlchemy engine + session
│   │   │   └── security.py            # JWT + password hashing
│   │   ├── crud/
│   │   │   ├── user.py                # User CRUD operations
│   │   │   └── property.py            # Property CRUD operations
│   │   ├── models/
│   │   │   ├── __init__.py            # Export all models
│   │   │   ├── base.py                # Base + TimestampMixin
│   │   │   ├── user.py                # User model (auth + identity)
│   │   │   └── property.py            # Property model (40 fields)
│   │   └── schemas/
│   │       ├── __init__.py            # Export all schemas
│   │       ├── user.py                # User Pydantic schemas
│   │       └── property.py            # Property Pydantic schemas
│   ├── alembic/                       # Database migrations
│   │   ├── env.py
│   │   └── versions/
│   ├── venv/                          # Virtual environment (not in Git)
│   ├── .env                           # Environment variables (not in Git)
│   ├── .gitignore
│   ├── requirements.txt
│   ├── create_tables.py               # Helper script
│   └── test_*.py                      # Test scripts
├── frontend/                          # DA CREARE
├── .gitignore                         # Root gitignore
├── README.md
└── PROJECT_DOCUMENTATION_v1_4.md
```

---

### 17.4 API Endpoints Disponibili

**Base URL:** `http://localhost:8000`  
**Swagger UI:** `http://localhost:8000/docs`  
**API Prefix:** `/api/v1`

#### Authentication Endpoints (3)

| Method | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | ❌ | Registrazione nuovo utente |
| POST | `/api/v1/auth/login` | ❌ | Login (restituisce JWT token) |
| GET | `/api/v1/users/me` | ✅ | Profilo utente corrente |

**Esempio Login:**
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@test.com&password=Pass1234"

# Response:
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

#### Properties Endpoints (8)

| Method | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| GET | `/api/v1/properties/` | ❌ | Lista immobili (pubblicati) |
| GET | `/api/v1/properties/my` | ✅ | Miei immobili |
| GET | `/api/v1/properties/search` | ❌ | Ricerca avanzata |
| GET | `/api/v1/properties/{id}` | ❌ | Dettaglio immobile (+ view count) |
| POST | `/api/v1/properties/` | ✅ | Crea immobile |
| PUT | `/api/v1/properties/{id}` | ✅ | Aggiorna immobile |
| DELETE | `/api/v1/properties/{id}` | ✅ | Elimina immobile (soft delete) |
| POST | `/api/v1/properties/{id}/publish` | ✅ | Pubblica immobile |

**Esempio Creazione Immobile:**
```bash
# 1. Ottieni token
TOKEN="eyJ..."

# 2. Crea immobile
curl -X POST "http://localhost:8000/api/v1/properties/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Appartamento Milano Centro",
    "property_type": "appartamento",
    "city": "Milano",
    "province": "MI",
    "region": "Lombardia",
    "surface_sqm": 85,
    "usufructuary_age": 75,
    "bare_property_value": 185000
  }'
```

---

### 17.5 Database Schema

**Tabella: users**
- Campi principali: email, password_hash, first_name, last_name, phone
- Identity: fiscal_code, date_of_birth, place_of_birth
- Verification: verified_identity, verification_method (CIE/SPID), verification_level
- Document: document_type, document_number, document_expiry
- Account: is_active, is_superuser, email_verified
- Relazioni: → properties (one-to-many)

**Tabella: properties**
- Owner: owner_id → users.id (FK)
- Basic: title, description, property_type, status
- Location: city, province, region, address, latitude, longitude
- Details: surface_sqm, rooms, bathrooms, floor, total_floors
- Features: has_elevator, has_balcony, has_terrace, has_garden, has_parking, has_garage, has_cellar
- Building: building_year, renovation_year, energy_class, heating_type
- Usufruct: usufructuary_age, usufruct_type (vitalizio/temporaneo)
- Valuation: full_property_value, bare_property_value
- Payment: payment_preference, payment_preference_notes
- Stats: is_featured, views_count, contacts_count
- Timestamps: created_at, updated_at

**Enums:**
- PropertyType: appartamento, villa, villetta, attico, loft, mansarda, casa_indipendente, rustico, castello, palazzo
- PropertyStatus: draft, published, pending, sold, suspended, deleted
- EnergyClass: a4+, a4, a3, a2, a1, b, c, d, e, f, g
- UsufructType: vitalizio, temporaneo
- PaymentPreference: full, deposit_annuity, annuity, other

---

### 17.6 Testing e Validazione

**Test Eseguiti con Successo:**

1. ✅ **Database Connection**
   - PostgreSQL connessione OK
   - PostGIS extension attiva
   - Encoding UTF-8 verificato

2. ✅ **User Registration & Login**
   - Registrazione user: test@test.com
   - Password hashing funzionante (bcrypt)
   - JWT token generato correttamente
   - Endpoint `/me` ritorna user autenticato

3. ✅ **Property CRUD**
   - Creazione immobile con tutti i campi
   - Validators case-insensitive funzionanti
   - Foreign key user → property OK
   - Status default "draft" applicato
   - Views counter incremento automatico

4. ✅ **API via Swagger UI**
   - Tutti gli endpoint accessibili
   - Documentazione auto-generata corretta
   - Authorization flow funzionante
   - Response schemas validi

**Command Utili:**

```bash
# Avvia server development
cd ~/miapersempre/backend
source venv/Scripts/activate
python -m app.main

# Test database
psql-mia
\dt                           # Lista tabelle
\d properties                 # Struttura table
SELECT COUNT(*) FROM users;   # Conta records

# Test API
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/properties/

# Git status
git status
git log --oneline -5
```

---

### 17.7 Dipendenze Python Installate

```txt
# Core Framework
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6

# Database
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.12.1

# Authentication
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
bcrypt==4.1.2                 # ⚠️ Versione specifica per compatibility
python-multipart==0.0.6

# Validation
pydantic==2.5.0
pydantic-settings==2.1.0
email-validator==2.1.0

# Environment
python-dotenv==1.0.0
```

---

### 17.8 Prossimi Step Tecnici

**Immediate (Questa Settimana):**
1. ⏳ Import dati OMI in database
2. ⏳ Implementare algoritmo valutazione
3. ⏳ API endpoint `/valuation/calculate`
4. ⏳ Testing algoritmo con casi reali

**Short-term (Prossime 2 Settimane):**
1. ⏳ Sistema upload immagini
2. ⏳ Ottimizzazione immagini (WebP + resize)
3. ⏳ Frontend Next.js - Setup iniziale
4. ⏳ Homepage + ricerca base

**Medium-term (Prossimo Mese):**
1. ⏳ Google Maps integration
2. ⏳ Sistema contatti/messaggi
3. ⏳ Dashboard proprietario
4. ⏳ Dashboard investitore

---

### 17.9 Note Deployment (Futuro)

**Quando passeremo a produzione:**

**Server Requirements:**
- VPS Debian 12
- 8 vCPU, 24GB RAM, 200GB NVMe
- Nginx reverse proxy
- Gunicorn WSGI server
- Supervisor process manager
- Certbot SSL (Let's Encrypt)

**Database Production:**
- PostgreSQL 15+ con replica
- Backup automatici giornalieri
- Retention 30 giorni
- Test recovery mensili

**Environment Variables Production:**
```bash
DEBUG=False
ALLOWED_HOSTS=miapersempre.it,www.miapersempre.it
DATABASE_URL=postgresql://user:pass@localhost:5432/miapersempre_prod
SECRET_KEY=[generare nuovo!]
JWT_SECRET_KEY=[generare nuovo!]
```

**Monitoring:**
- Uptime monitoring (UptimeRobot)
- Error tracking (Sentry)
- Performance monitoring (New Relic / DataDog)
- Log aggregation (CloudWatch / ELK)

---

**FINE AGGIORNAMENTI v1.4**

---

## 📋 CHECKLIST INTEGRAZIONE

- [ ] Aggiornare header (versione 1.4, data 20 Dic, stato "Sviluppo Attivo")
- [ ] Inserire Changelog v1.4 dopo riga 11
- [ ] Aggiungere voce Sezione 17 nell'Indice
- [ ] Sostituire Roadmap Fase 1 con versione aggiornata
- [ ] Aggiungere intera Sezione 17 prima della fine del documento
- [ ] Salvare come PROJECT_DOCUMENTATION_v1_4.md
- [ ] Commit su Git

---

**Data creazione aggiornamenti:** 20 Dicembre 2024  
**Autore:** Fasys + Claude
```
