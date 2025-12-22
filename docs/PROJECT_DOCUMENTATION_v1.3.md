# 📋 DOCUMENTAZIONE PROGETTO - MARKETPLACE NUDA PROPRIETÀ

**Versione:** 1.3  
**Data creazione:** 18 Dicembre 2024  
**Ultima modifica:** 19 Dicembre 2024  
**Stato:** Fase di Planning e Design

**NOME PROGETTO:** Mia Per Sempre  
**DOMINIO:** miapersempre.it  
**PAYOFF:** Il marketplace italiano della nuda proprietà

**Changelog v1.3:** ⭐ MAJOR UPDATE
- ✅ **Autenticazione CIE (Carta Identità Elettronica)** - Sistema principale
- ✅ **Sistema Messaggistica Sicura** - Protezione numero telefono venditori
- ✅ **Tier Autenticazione** - Email (browsing) + CIE/SPID (visite)
- ✅ **Gestione Immagini Ottimizzata** - Ridimensionamento automatico + WebP
- ✅ **UX Inserimento Guidato** - Help popup, video tutorial, esempi
- ✅ **Privacy GDPR** - Gestione dati CIE/SPID conforme

**Changelog v1.2:**
- ✅ Nome progetto definitivo: "Mia Per Sempre"
- ✅ Dominio registrato: miapersempre.it
- ✅ Strategia brand e SEO compensativa
- ✅ Guidelines logo e identità visiva
- ✅ Aggiornati tutti gli esempi con brand definitivo

**Changelog v1.1:**
- ✅ Aggiunto Sistema di Sicurezza Appuntamenti completo
- ✅ Sistema IVR automatico per verifica telefonica
- ✅ Badge fisici con codice numerico (no dipendenza QR)
- ✅ Approccio fluido e rassicurante (no chiamate proattive)
- ✅ Aggiornati costi operativi

---

## 📖 INDICE

1. [Panoramica Progetto](#panoramica-progetto)
2. [Modello di Business](#modello-di-business)
3. [Architettura Tecnologica](#architettura-tecnologica)
4. [Funzionalità per Ruolo Utente](#funzionalità-per-ruolo-utente)
5. [Database Design](#database-design)
6. [Algoritmo di Valutazione](#algoritmo-di-valutazione)
7. [Integrazioni Esterne](#integrazioni-esterne)
8. [SEO e Accessibilità](#seo-e-accessibilità)
9. [GDPR e Privacy](#gdpr-e-privacy)
10. [Sistema Autenticazione CIE/SPID](#sistema-autenticazione-cie-spid) ⭐ NUOVO
11. [Sistema Appuntamenti Sicuri](#sistema-appuntamenti-sicuri) ⭐ AGGIORNATO
12. [Gestione Immagini Ottimizzata](#gestione-immagini-ottimizzata) ⭐ NUOVO
13. [UX Inserimento Annunci](#ux-inserimento-annunci) ⭐ NUOVO
14. [Roadmap di Sviluppo](#roadmap-di-sviluppo)
15. [Competitor Analysis](#competitor-analysis)
16. [Note Importanti](#note-importanti)

---

## 1. PANORAMICA PROGETTO

### 1.1 Brand Identity

**Nome:** Mia Per Sempre  
**Dominio:** miapersempre.it  
**Payoff:** Il marketplace italiano della nuda proprietà

**Significato del Nome:**
- **"Mia"** = Proprietà, appartenenza, affetto per la propria casa
- **"Per Sempre"** = Permanenza, sicurezza, vitalizio
- **Messaggio Core:** "La tua casa rimarrà TUA per sempre"

**Perché Questo Nome:**
- ✅ Forte impatto emotivo sul target anziani
- ✅ Comunica il beneficio principale (vivere in casa per sempre)
- ✅ Evita problemi SEO della parola "nuda"
- ✅ Brand memorabile e differenziante
- ✅ Adatto per advertising mainstream (TV, radio, social)
- ✅ Posizionamento empatico (vs competitor tecnici/freddi)

**Identità Visiva:**

*Colori:*
- **Primario:** Verde bosco (#2D5016) - Stabilità, casa, natura, sicurezza
- **Secondario:** Oro caldo (#D4AF37) - Valore, patrimonio, fiducia
- **Accento:** Azzurro (#4A90E2) - Serenità, affidabilità

*Logo Concept:*
```
┌─────────────────────────────────┐
│                                 │
│      Mia Per Sempre            │
│   [font elegante, caldo]       │
│                                 │
│   ───────────────────────────  │
│   Il marketplace italiano      │
│   della nuda proprietà         │
│   [font piccolo, chiaro]       │
│                                 │
└─────────────────────────────────┘
```

*Tone of Voice:*
- Caldo, rassicurante, empatico
- Professionale ma mai freddo
- Parla di "casa" non di "immobile"
- Parla di "futuro sereno" non di "investimento"

### 1.2 Strategia SEO Compensativa

Il nome "Mia Per Sempre" non ha SEO intrinseco, quindi serve strategia aggressiva:

**1. Payoff Sempre Visibile:**
- Logo: sempre con "Il marketplace italiano della nuda proprietà"
- Meta description: sempre include "nuda proprietà"
- Social bio: sempre include keyword

**2. URL Structure Ottimizzata:**
```
Dominio brand: miapersempre.it

MA URL interne keyword-rich:
✅ miapersempre.it/nuda-proprieta
✅ miapersempre.it/nuda-proprieta/milano
✅ miapersempre.it/nuda-proprieta/come-funziona
✅ miapersempre.it/nuda-proprieta/guida-completa
```

**3. Content Marketing:**
- 2-3 articoli blog/settimana
- Tutti ottimizzati "nuda proprietà" + long-tail
- 2.000+ parole per articolo
- Internal linking aggressivo

**4. Google Ads (Primi 6-12 Mesi):**
- Budget: €500-1.000/mese
- Keywords: "nuda proprietà", "usufrutto vitalizio", ecc.
- Obiettivo: brand awareness mentre SEO organico cresce

**5. Timeline Awareness:**
```
Mese 1-3:   100% traffico Ads → SEO in costruzione
Mese 4-6:   60% Ads, 40% Organic
Mese 7-12:  30% Ads, 70% Organic
Anno 2:     10% Ads, 90% Organic + ricerche brand
```

### 1.3 Concept
Piattaforma web marketplace che mette in contatto:
- **Proprietari** di immobili che vogliono vendere la nuda proprietà mantenendo l'usufrutto
- **Investitori** interessati ad acquistare nuda proprietà come investimento a lungo termine
- **Agenzie immobiliari** che operano nel settore della nuda proprietà
- **Professionisti** (notai, commercialisti, periti) come partner certificati

### 1.4 Problema che Risolviamo
- **Per i proprietari (anziani)**: Necessità di liquidità immediata senza dover lasciare la propria casa
- **Per gli investitori**: Difficoltà nel trovare opportunità di nuda proprietà, mancanza di trasparenza sui prezzi
- **Per le agenzie**: Mancanza di una piattaforma specializzata con strumenti dedicati

### 1.5 Soluzione Proposta
Marketplace digitale con:
- Algoritmo di valutazione automatica (dati OMI + tavole mortalità ISTAT)
- Sistema di matching domanda/offerta
- Strumenti professionali per agenzie
- Network di partner certificati (notai, commercialisti)
- Totale trasparenza e legalità (NO intermediazione)

### 1.6 Differenziatori Chiave
- ✅ Primo marketplace puro (non agenzia) dedicato alla nuda proprietà in Italia
- ✅ Algoritmo di valutazione automatica in tempo reale
- ✅ Copertura nazionale completa (dati OMI)
- ✅ Modello freemium scalabile
- ✅ Focus su UX accessibile per utenti senior
- ✅ Sistema di sicurezza appuntamenti avanzato (anti-truffa per anziani)

### 1.7 Mercato Target
- **Venditori**: Principalmente over-65 (66,7% del mercato)
- **Acquirenti**: Investitori 45-54 anni (28,3% del mercato), famiglie che pianificano patrimonio per i figli
- **Geografia**: Italia (focus iniziale grandi città: Milano, Roma, Torino, Bologna, Firenze)
- **Dimensione mercato**: ~27.000 transazioni/anno (3,8% mercato immobiliare), in crescita +12% annuo

---

## 2. MODELLO DI BUSINESS

### 2.1 Posizionamento
**MARKETPLACE** (non intermediario)
- Facilita l'incontro tra domanda e offerta
- NON partecipa alle trattative
- Monetizza attraverso abbonamenti, featured listings e servizi a valore aggiunto

### 2.2 Revenue Streams

#### A. PROPRIETARI PRIVATI
**Base (GRATUITO):**
- Pubblicazione 1 annuncio
- 10 foto
- Visibilità base

**Plus a Pagamento:**
- Featured Listing: €49/mese (appare in cima)
- Notifiche SMS: €9.99/mese
- Privacy Plus: €4.99/mese (nasconde indirizzo)
- Refresh annuncio: €9.99 one-time
- Valutazione certificata: €199 one-time

#### B. INVESTITORI
**Free Tier:**
- Registrazione gratuita
- Visibilità limitata annunci
- Max 5 contatti/mese tramite form

**Premium (€49-79/mese o pacchetti crediti):**
- Visibilità completa annunci
- Contatti diretti (telefono, email)
- Alert automatici
- Export PDF/Excel
- Accesso anticipato annunci
- Badge "Investitore Verificato"

**Pacchetti Crediti (alternativa abbonamento):**
- 10 crediti: €19.99
- 50 crediti: €79.99
- 200 crediti: €249.99

#### C. AGENZIE IMMOBILIARI
**Starter (€99/mese):**
- Max 10 annunci attivi
- Profilo agenzia
- Statistiche base

**Professional (€199/mese):**
- Max 50 annunci
- 5 featured listings
- Analytics avanzati
- Lead management

**Enterprise (€399/mese):**
- Annunci illimitati
- API access
- White label opzionale
- Account manager dedicato

#### D. PARTNER (Consulenti)
- Abbonamento annuale: €299/anno (directory listing)
- Commissione per transazione: €99/transazione
- Modello misto: €299/anno + €99/transazione

#### E. ALTRE FONTI
- Formazione/webinar: €99-499
- Dati & analytics (B2B): €2.000-10.000/anno
- Affiliazioni (mutui, assicurazioni): commissioni

### 2.3 Proiezioni Revenue
**Anno 1:**
- 500 annunci, 2.000 investitori (200 paganti), 20 agenzie, 10 partner
- Revenue mensile: ~€8.500/mese = €102k/anno

**Anno 2:**
- 2.000 annunci, 8.000 investitori (800 paganti), 50 agenzie, 30 partner
- Revenue mensile: ~€35k/mese = €420k/anno

**Anno 3:**
- 5.000+ annunci, 20.000+ investitori (2.500 paganti), 100+ agenzie, 50+ partner
- Revenue: €1-1.5M/anno

---

## 3. ARCHITETTURA TECNOLOGICA

### 3.1 Stack Tecnologico

#### Backend
- **Linguaggio**: Python 3.11+
- **Framework**: FastAPI
- **Database**: PostgreSQL 15+ con PostGIS
- **Cache**: Redis 7+
- **Task Queue**: Celery
- **Process Management**: Supervisor

#### Frontend
- **Framework**: Next.js 14+ (React)
- **Linguaggio**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui (accessibilità built-in)
- **Build**: SSR/SSG per SEO ottimale

#### Infrastructure
- **Server**: VPS Debian 12 (8 vCPU, 24GB RAM, 200GB NVMe)
- **Web Server**: Nginx (reverse proxy + static files)
- **SSL**: Certbot (Let's Encrypt)
- **Panel**: ISPConfig (gestione server)
- **Containerizzazione**: NO Docker (deployment classico per integrazione ISPConfig)

### 3.2 Servizi Esterni

#### Mappe e Geolocalizzazione
- **Provider**: Google Maps API
- **Servizi usati**: Maps JavaScript API, Geocoding API, Places API
- **Costi stimati**: €70-350/mese (in base a traffico)

#### Email
- **Provider**: Amazon SES
- **Costo**: €0.10 per 1.000 email
- **Newsletter**: Sistema integrato nella piattaforma

#### SMS
- **Provider**: Twilio
- **Costo**: €0.055 per SMS (Italia)
- **Uso**: Solo notifiche critiche

#### CDN e Sicurezza
- **Provider**: Cloudflare (piano FREE)
- **Servizi**: CDN, DDoS protection, SSL/TLS, DNS
- **Vendor lock-in**: Minimo (facile migrare)

#### Pagamenti
- **Provider**: Stripe
- **Commissione**: 1.4% + €0.25 per transazione EU
- **Supporta**: Carte, SEPA, abbonamenti ricorrenti

#### Traduzione
- **Provider**: DeepL API
- **Costo**: €5.49 per 1M caratteri
- **Uso**: Traduzioni dinamiche contenuti (IT→EN/DE/FR/ES)

#### Analytics
- **Google Analytics 4**: Tracking standard
- **Dashboard Custom**: Metriche real-time nella piattaforma

### 3.3 Struttura Deployment

```
Nginx (porta 80/443)
  ↓
  ├─→ Next.js (porta 3000) - Frontend
  │   └─ PM2 (process manager)
  │
  └─→ FastAPI (porta 8000) - Backend API
      ├─ Gunicorn (WSGI server)
      └─ Supervisor (process manager)

PostgreSQL (porta 5432)
Redis (porta 6379)
Celery Worker (background tasks)
```

### 3.4 Sicurezza
- HTTPS obbligatorio (certificati Let's Encrypt)
- JWT per autenticazione API
- Rate limiting (protezione DDoS)
- Input sanitization (SQL injection, XSS)
- CORS configurato
- Cloudflare WAF (Web Application Firewall)
- Backup automatici giornalieri database

---

## 4. FUNZIONALITÀ PER RUOLO UTENTE

### 4.1 UTENTE PUBBLICO (Non registrato)

**Può fare:**
- ✅ Navigare annunci (visibilità limitata)
- ✅ Filtri ricerca base (città, prezzo, mq)
- ✅ Vedere prime 3 foto annunci
- ✅ Usare calcolatore nuda proprietà (tool gratuito pubblico)
- ✅ Leggere blog
- ✅ Vedere zona generica su mappa (no indirizzo esatto)

**NON può fare:**
- ❌ Vedere contatti proprietari/agenzie
- ❌ Salvare annunci preferiti
- ❌ Vedere tutte le foto
- ❌ Vedere documenti (planimetrie, APE, visure)
- ❌ Export dati

### 4.2 PROPRIETARIO PRIVATO (Registrato)

**Account Base (GRATUITO):**
- ✅ Pubblicare 1 annuncio
- ✅ Caricare max 10 foto
- ✅ Gestire preferenze privacy (indirizzo, foto visibili)
- ✅ Notifiche email (nuovo interessato)
- ✅ Statistiche base (visualizzazioni totali)
- ✅ Modificare/eliminare annuncio
- ✅ Scegliere modalità pagamento preferita:
  - Pagamento completo all'atto
  - Acconto + vitalizio
  - Solo vitalizio
  - Altro (custom)

**Plus Acquistabili:**
- 💰 Featured Listing (€49/mese)
- 💰 Notifiche SMS (€9.99/mese)
- 💰 Privacy Plus (€4.99/mese)
- 💰 Refresh annuncio (€9.99)
- 💰 Valutazione certificata (€199)

**Dashboard include:**
- Lista annunci pubblicati
- Statistiche dettagliate per annuncio
- Messaggi/contatti ricevuti
- Gestione preferenze
- Storico transazioni

### 4.3 INVESTITORE

**Free Tier:**
- ✅ Registrazione gratuita
- ✅ Visibilità parziale annunci (no contatti, no documenti)
- ✅ Max 5 contatti/mese via form (senza vedere telefono/email)
- ✅ Salvare max 5 annunci preferiti
- ✅ Filtri ricerca base

**Premium (€49-79/mese o pacchetti):**
- ✅ Visibilità COMPLETA annunci
- ✅ Contatti diretti (telefono, email proprietario/agenzia)
- ✅ Annunci preferiti illimitati
- ✅ Alert automatici (email + SMS opzionale)
- ✅ Filtri avanzati (ROI stimato, età usufruttuario, tempo vendita)
- ✅ Export annunci (PDF, Excel)
- ✅ Statistiche mercato (prezzi medi per zona)
- ✅ Badge "Investitore Verificato" (profilo)
- ✅ Accesso anticipato (24h prima annunci nuovi)
- ✅ Storico ribassi prezzo
- ✅ Documenti immobile (planimetrie, APE, visure)

**Dashboard include:**
- Annunci preferiti
- Ricerche salvate + alert
- Messaggi/contatti inviati
- Statistiche ricerche
- Calcolatore ROI personalizzato

### 4.4 AGENZIA IMMOBILIARE

**Piani disponibili:**

| Feature | Starter (€99) | Professional (€199) | Enterprise (€399) |
|---------|---------------|---------------------|-------------------|
| Annunci attivi | 10 | 50 | Illimitati |
| Featured listings | 0 | 5 | Illimitati |
| Profilo agenzia | ✅ | ✅ | ✅ |
| Logo e descrizione | ✅ | ✅ | ✅ |
| Statistiche | Base | Avanzate | Complete |
| Lead management | ❌ | ✅ | ✅ |
| Export contatti | ❌ | ✅ | ✅ |
| Analytics | Base | Avanzato | Pro |
| Badge certificata | ❌ | ✅ | ✅ |
| API access | ❌ | ❌ | ✅ |
| White label | ❌ | ❌ | ✅ (opzionale) |
| Account manager | ❌ | ❌ | ✅ |

**Dashboard include:**
- Gestione multipla annunci (bulk actions)
- CRM integrato (lead tracking)
- Analytics dettagliati:
  - Visualizzazioni per annuncio
  - Click-through rate
  - Lead generati
  - Tasso conversione
- Comparazione performance annunci
- Report mensili automatici
- Calendario appuntamenti

### 4.5 PARTNER (Consulenti)

**Tipologie:**
- Notai
- Commercialisti
- Periti/Geometri
- Avvocati immobiliari
- Assicuratori

**Profilo include:**
- Foto professionale
- Descrizione servizi
- Aree geografiche coperte
- Specializzazioni
- Recensioni/rating
- Badge "Partner Certificato"
- Contatti diretti

**Commissioni:**
- Modello 1: €299/anno (solo listing)
- Modello 2: €99 per transazione (tracking referral)
- Modello 3: €299/anno + €99/transazione (misto)

### 4.6 AMMINISTRATORE

**Accesso completo a:**
- Dashboard analytics globali
- Gestione utenti (blocca, approva, elimina)
- Moderazione annunci (approva, rifiuta, rimuovi)
- Gestione pagamenti/abbonamenti
- Configurazione algoritmo (coefficienti)
- CMS blog
- Email templates
- Directory partner
- Export GDPR
- Log sistema
- Configurazioni generali

---

## 5. DATABASE DESIGN

### 5.1 Tabelle Principali

#### Core Tables

**users**
```sql
id (PK)
email (unique)
password_hash
first_name
last_name
phone
user_type (enum: proprietario, investitore, agenzia, admin)
verified (boolean)
created_at
updated_at
last_login
```

**properties** (Annunci immobili)
```sql
id (PK)
user_id (FK → users)
title
description
property_type (enum: abitazione, villa, box, negozio, ecc)
status (enum: draft, published, pending, sold)
address
city
province
region
zip_code
omi_zone_id (FK → omi_zones)
latitude
longitude
surface_sqm
rooms
bathrooms
floor
has_elevator (boolean)
has_balcony (boolean)
has_terrace (boolean)
has_garden (boolean)
has_box (boolean)
has_parking (boolean)
building_year
renovation_year
energy_class
exposure (enum: nord, sud, est, ovest, doppia, ecc)
usufructuary_age
usufruct_type (enum: vitalizio, temporaneo)
full_property_value (€)
bare_property_value (€)
payment_preference (enum: full, deposit_annuity, annuity, other)
payment_preference_notes
show_exact_location (boolean)
is_featured (boolean)
featured_until (datetime)
views_count
created_at
updated_at
published_at
```

**property_images**
```sql
id (PK)
property_id (FK → properties)
filename
file_path
file_size
order_index
is_cover (boolean)
visible_to_free_users (boolean)
uploaded_at
```

**property_documents**
```sql
id (PK)
property_id (FK → properties)
document_type (enum: planimetria, ape, visura, altro)
filename
file_path
file_size
uploaded_at
```

#### OMI Data Tables

**omi_zones**
```sql
id (PK)
area_territoriale
regione
provincia
comune_istat
comune_cat
comune_amm
comune_descrizione
fascia
zona
zona_descr
link_zona
cod_tip_prev
descr_tip_prev
stato_prev
microzona
```

**omi_values**
```sql
id (PK)
omi_zone_id (FK → omi_zones)
cod_tipologia
descr_tipologia
stato
compr_min (€/mq)
compr_max (€/mq)
loc_min (€/mq)
loc_max (€/mq)
semestre
anno
```

#### Subscriptions & Payments

**subscriptions**
```sql
id (PK)
user_id (FK → users)
plan_type (enum: investitore_premium, agenzia_starter, agenzia_pro, ecc)
status (enum: active, cancelled, expired, trial)
stripe_subscription_id
started_at
expires_at
cancelled_at
created_at
```

**transactions**
```sql
id (PK)
user_id (FK → users)
amount
currency (default: EUR)
type (enum: subscription, plus, featured, credits)
description
stripe_payment_intent_id
status (enum: pending, completed, failed, refunded)
created_at
```

**user_credits** (Sistema crediti alternativo abbonamento)
```sql
id (PK)
user_id (FK → users)
credits_balance
last_purchase_at
updated_at
```

#### Interaction Tables

**favorites**
```sql
id (PK)
user_id (FK → users)
property_id (FK → properties)
created_at
```

**contacts**
```sql
id (PK)
from_user_id (FK → users)
to_user_id (FK → users)
property_id (FK → properties)
message
read_at
created_at
```

**alerts** (Investitori salvano ricerche)
```sql
id (PK)
user_id (FK → users)
name
filters (JSON: città, prezzo_min, prezzo_max, mq_min, età_max, ecc)
email_notification (boolean)
sms_notification (boolean)
frequency (enum: immediate, daily, weekly)
last_sent_at
created_at
```

#### Partners

**partners**
```sql
id (PK)
user_id (FK → users)
company_name
vat_number
professional_type (enum: notaio, commercialista, perito, avvocato)
bio
specializations (JSON array)
covered_provinces (JSON array)
rating_avg
reviews_count
certified (boolean)
subscription_plan (enum: base, premium)
subscription_expires_at
created_at
```

**partner_reviews**
```sql
id (PK)
partner_id (FK → partners)
reviewer_user_id (FK → users)
rating (1-5)
comment
created_at
```

#### Blog

**blog_posts**
```sql
id (PK)
author_user_id (FK → users)
title
slug (unique)
excerpt
content (HTML)
featured_image
category_id (FK → blog_categories)
status (enum: draft, published)
seo_title
seo_description
views_count
published_at
created_at
updated_at
```

**blog_categories**
```sql
id (PK)
name
slug (unique)
description
```

#### Analytics

**property_views**
```sql
id (PK)
property_id (FK → properties)
user_id (FK → users, nullable)
ip_address
user_agent
viewed_at
```

**user_activities**
```sql
id (PK)
user_id (FK → users)
activity_type (enum: login, search, view_property, contact, ecc)
details (JSON)
created_at
```

#### Configuration

**valuation_coefficients** (Pesi algoritmo)
```sql
id (PK)
coefficient_name
coefficient_value
description
updated_at
```

**email_templates**
```sql
id (PK)
template_name (unique)
subject
body_html
body_text
variables (JSON array)
created_at
updated_at
```

**site_settings**
```sql
id (PK)
setting_key (unique)
setting_value
setting_type (enum: string, number, boolean, json)
description
updated_at
```

### 5.2 Relazioni Chiave

```
users (1) → (N) properties
users (1) → (N) subscriptions
users (1) → (N) favorites
users (1) → (N) alerts
users (1) → (1) partners

properties (1) → (N) property_images
properties (1) → (N) property_documents
properties (1) → (N) contacts
properties (1) → (N) property_views
properties (N) → (1) omi_zones

omi_zones (1) → (N) omi_values
```

### 5.3 Indici per Performance

```sql
-- Ricerche frequenti
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_price ON properties(bare_property_value);
CREATE INDEX idx_properties_published_at ON properties(published_at DESC);

-- Query geospaziali
CREATE INDEX idx_properties_location ON properties USING GIST(ST_MakePoint(longitude, latitude));

-- Foreign keys
CREATE INDEX idx_properties_user_id ON properties(user_id);
CREATE INDEX idx_properties_omi_zone_id ON properties(omi_zone_id);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_contacts_property_id ON contacts(property_id);
```

---

## 6. ALGORITMO DI VALUTAZIONE

### 6.1 Overview
L'algoritmo calcola il valore della nuda proprietà in tempo reale basandosi su:
1. Dati OMI (Osservatorio Mercato Immobiliare) - prezzi medi per zona
2. Caratteristiche immobile (mq, piano, esposizione, stato, ecc)
3. Età usufruttuario → Tavole mortalità ISTAT → Coefficiente usufrutto

### 6.2 Formula Base

```
Valore Nuda Proprietà = Valore Piena Proprietà × (1 - Coefficiente Usufrutto)

Dove:
Valore Piena Proprietà = Superficie × Prezzo/mq Base × Π Coefficienti Aggiustamento
Coefficiente Usufrutto = f(età usufruttuario, tavole ISTAT)
```

### 6.3 Step 1: Valutazione Base (da OMI)

```python
# Recupera prezzo medio zona da database
prezzo_min_zona, prezzo_max_zona = get_omi_values(
    comune=property.city,
    zona=property.omi_zone,
    tipologia=property.property_type
)

# Prezzo base medio
prezzo_base_mq = (prezzo_min_zona + prezzo_max_zona) / 2

# Valore base
valore_base = property.surface_sqm * prezzo_base_mq
```

### 6.4 Step 2: Coefficienti di Aggiustamento

```python
coefficienti = {
    # Piano
    'K_piano': {
        'seminterrato': 0.75,
        'piano_terra': 0.85,
        'primo_piano': 1.10,
        'secondo_piano': 1.05,
        'terzo_piano': 1.00,
        'attico': 1.15
    },
    
    # Esposizione
    'K_esposizione': {
        'nord': 0.95,
        'sud': 1.05,
        'est': 1.00,
        'ovest': 1.00,
        'doppia': 1.10
    },
    
    # Stato conservazione (da anno edificazione/ristrutturazione)
    'K_stato': lambda anni_da_costruzione, anni_da_ristrutturazione: (
        1.20 if anni_da_ristrutturazione < 5 else
        1.10 if anni_da_ristrutturazione < 10 else
        1.00 if anni_da_costruzione < 20 else
        0.90 if anni_da_costruzione < 40 else
        0.80
    ),
    
    # Pertinenze
    'K_pertinenze': {
        'box': 30000,  # Valore aggiunto fisso €
        'posto_auto': 15000,
        'balcone': 1.05,  # Moltiplicatore
        'terrazzo': 1.15,
        'giardino': 1.20
    },
    
    # Ascensore (se edificio >2 piani)
    'K_ascensore': 1.08 if has_elevator and floors > 2 else 1.00,
    
    # Classe energetica
    'K_energia': {
        'A4': 1.15,
        'A3': 1.12,
        'A2': 1.10,
        'A1': 1.08,
        'B': 1.05,
        'C': 1.00,
        'D': 0.95,
        'E': 0.90,
        'F': 0.85,
        'G': 0.80
    }
}

# Applica coefficienti moltiplicativi
valore_aggiustato = valore_base
valore_aggiustato *= coefficienti['K_piano'][property.floor]
valore_aggiustato *= coefficienti['K_esposizione'][property.exposure]
valore_aggiustato *= coefficienti['K_stato'](anni_costruzione, anni_ristrutturazione)
valore_aggiustato *= coefficienti['K_energia'][property.energy_class]

# Aggiungi valori fissi pertinenze
if property.has_box:
    valore_aggiustato += coefficienti['K_pertinenze']['box']
if property.has_parking:
    valore_aggiustato += coefficienti['K_pertinenze']['posto_auto']

# Applica moltiplicatori pertinenze
if property.has_balcony:
    valore_aggiustato *= coefficienti['K_pertinenze']['balcone']
if property.has_terrace:
    valore_aggiustato *= coefficienti['K_pertinenze']['terrazzo']
if property.has_garden:
    valore_aggiustato *= coefficienti['K_pertinenze']['giardino']
```

### 6.5 Step 3: Calcolo Coefficiente Usufrutto

```python
# Tavole ISTAT - Speranza di vita per età
# Fonte: https://www.istat.it/it/archivio/tavole+di+mortalit%C3%A0
# Esempio semplificato (va usata tabella completa ISTAT)

def get_life_expectancy(age, gender='M'):
    """
    Ritorna speranza di vita residua in anni
    """
    # Tabella semplificata (usare dati ISTAT completi)
    life_expectancy_table = {
        60: 23.5, 61: 22.6, 62: 21.7, 63: 20.8, 64: 19.9,
        65: 19.0, 66: 18.2, 67: 17.3, 68: 16.5, 69: 15.7,
        70: 14.9, 71: 14.1, 72: 13.3, 73: 12.6, 74: 11.9,
        75: 11.2, 76: 10.5, 77: 9.9, 78: 9.3, 79: 8.7,
        80: 8.1, 81: 7.6, 82: 7.1, 83: 6.6, 84: 6.2,
        85: 5.8, 86: 5.4, 87: 5.0, 88: 4.7, 89: 4.4,
        90: 4.1
    }
    return life_expectancy_table.get(age, 4.0)

# Calcolo coefficiente usufrutto (formula Agenzia Entrate)
tasso_legale = 0.05  # 5% (aggiornato annualmente)
eta_usufruttuario = property.usufructuary_age
aspettativa_vita = get_life_expectancy(eta_usufruttuario)

# Formula: Valore Usufrutto = Rendita annua × [(1 - (1 + i)^-n) / i]
# Dove:
# - Rendita annua = Valore immobile × tasso legale
# - n = aspettativa vita
# - i = tasso legale

rendita_annua = valore_aggiustato * tasso_legale
coefficiente_usufrutto = rendita_annua * (
    (1 - (1 + tasso_legale) ** -aspettativa_vita) / tasso_legale
) / valore_aggiustato

# Limita coefficiente (sanity check)
coefficiente_usufrutto = max(0.20, min(0.85, coefficiente_usufrutto))
```

### 6.6 Step 4: Valore Finale Nuda Proprietà

```python
# Calcolo finale
valore_nuda_proprieta = valore_aggiustato * (1 - coefficiente_usufrutto)

# Output
risultato = {
    'valore_piena_proprieta': round(valore_aggiustato, 2),
    'valore_nuda_proprieta': round(valore_nuda_proprieta, 2),
    'sconto_percentuale': round(coefficiente_usufrutto * 100, 2),
    'eta_usufruttuario': eta_usufruttuario,
    'aspettativa_vita_anni': aspettativa_vita,
    'dettaglio_calcolo': {
        'valore_base_omi': valore_base,
        'coefficienti_applicati': {...},
        'valore_dopo_aggiustamenti': valore_aggiustato,
        'coefficiente_usufrutto': coefficiente_usufrutto
    }
}
```

### 6.7 Configurazione Dinamica

I coefficienti sono salvati in database (tabella `valuation_coefficients`) e modificabili da admin in base a feedback mercato:

```python
# Admin può modificare pesi in tempo reale
UPDATE valuation_coefficients 
SET coefficient_value = 1.12 
WHERE coefficient_name = 'K_piano_primo';

# Algoritmo legge sempre da DB
coefficienti = load_coefficients_from_db()
```

### 6.8 API Endpoint Valutazione

```
POST /api/valuation/calculate
Body: {
    "city": "Milano",
    "omi_zone": "B1",
    "property_type": "abitazione_civile",
    "surface_sqm": 85,
    "floor": "primo_piano",
    "exposure": "sud",
    "building_year": 1980,
    "renovation_year": 2020,
    "has_elevator": true,
    "has_box": true,
    "energy_class": "B",
    "usufructuary_age": 75
}

Response: {
    "success": true,
    "valuation": {
        "full_property_value": 350000,
        "bare_property_value": 192500,
        "discount_percentage": 45,
        "life_expectancy_years": 11.2
    },
    "calculation_details": {...}
}
```

---

## 7. INTEGRAZIONI ESTERNE

### 7.1 Google Maps

**Servizi usati:**
1. **Maps JavaScript API**: Visualizzazione mappe interattive
2. **Geocoding API**: Conversione indirizzo → lat/long
3. **Places API**: POI nelle vicinanze (scuole, ospedali, trasporti)

**Implementazione:**

```javascript
// Geocoding indirizzo
const geocodeAddress = async (address) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
  );
  const data = await response.json();
  return {
    lat: data.results[0].geometry.location.lat,
    lng: data.results[0].geometry.location.lng
  };
};

// Places nelle vicinanze
const getNearbyPlaces = async (lat, lng, type) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=${type}&key=${API_KEY}`
  );
  return response.json();
};

// Visualizzazione mappa con area generica o pin esatto
const showMap = (lat, lng, showExact) => {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: showExact ? 17 : 14
  });
  
  if (showExact) {
    new google.maps.Marker({
      position: { lat, lng },
      map: map
    });
  } else {
    // Cerchio area generica (raggio 500m)
    new google.maps.Circle({
      map: map,
      center: { lat, lng },
      radius: 500,
      fillColor: '#FF0000',
      fillOpacity: 0.2,
      strokeWeight: 0
    });
  }
};
```

**Caching:**
- Geocoding results cachati in database (tabella `locations`)
- TTL: 1 anno (indirizzi non cambiano frequentemente)

### 7.2 AWS SES (Email)

**Setup:**
1. Verifica dominio (DNS records: SPF, DKIM, DMARC)
2. Request production access (uscire da sandbox)
3. Configure SMTP credentials o usa SDK

**Implementazione Python:**

```python
import boto3
from botocore.exceptions import ClientError

ses_client = boto3.client('ses', region_name='eu-west-1')

def send_email(to_email, subject, body_html, body_text):
    try:
        response = ses_client.send_email(
            Source='noreply@miapersempre.it',
            Destination={'ToAddresses': [to_email]},
            Message={
                'Subject': {'Data': subject},
                'Body': {
                    'Html': {'Data': body_html},
                    'Text': {'Data': body_text}
                }
            }
        )
        return response['MessageId']
    except ClientError as e:
        logger.error(f"Email send error: {e.response['Error']['Message']}")
        return None

# Template email
def send_new_contact_notification(owner, investor, property):
    template = load_email_template('new_contact_notification')
    body_html = template.render(
        owner_name=owner.first_name,
        investor_name=f"{investor.first_name} {investor.last_name}",
        property_title=property.title,
        property_url=f"https://miapersempre.it/annunci/{property.id}"
    )
    send_email(
        to_email=owner.email,
        subject="Nuovo investitore interessato al tuo immobile",
        body_html=body_html,
        body_text=strip_html(body_html)
    )
```

**Email Templates** (salvati in DB):
- Welcome new user
- Email verification
- Password reset
- New contact notification (owner)
- New listing published (investors con alert)
- Subscription expiring
- Payment received
- ecc.

### 7.3 Twilio (SMS + Voice)

**Servizi Utilizzati:**
1. **SMS API**: Notifiche, conferme appuntamenti
2. **Voice API**: IVR automatico verifica appuntamenti 24/7

#### SMS Implementation

```python
from twilio.rest import Client

twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def send_sms(to_phone, message):
    try:
        message = twilio_client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=to_phone
        )
        return message.sid
    except Exception as e:
        logger.error(f"SMS send error: {e}")
        return None

# Conferma appuntamento
def send_appointment_confirmation(appointment):
    message = (
        f"Mia Per Sempre\n"
        f"Appuntamento confermato:\n"
        f"📅 {appointment.date.strftime('%d/%m/%Y')} ore {appointment.time}\n"
        f"👤 {appointment.partner.name}\n"
        f"Badge VERDE - Codice: {appointment.verification_code}\n"
        f"Verifica: 800-123456"
    )
    send_sms(appointment.owner.phone, message)
```

**Use cases SMS:**
- Conferma appuntamenti con codice verifica
- Notifica nuovo contatto (se abilitato)
- OTP per verifica telefono
- Alert critici
- Promemoria appuntamenti

#### Voice/IVR Implementation

```python
from twilio.twiml.voice_response import VoiceResponse, Gather

@app.post("/api/voice/ivr-menu")
def ivr_menu():
    """Menu principale IVR per verifica appuntamenti"""
    response = VoiceResponse()
    
    gather = Gather(
        num_digits=1,
        action='/api/voice/handle-menu',
        method='POST'
    )
    
    gather.say(
        "Benvenuto in Mia Per Sempre. "
        "Per verificare un appuntamento, prema 1. "
        "Per parlare con un operatore, prema 0.",
        language='it-IT',
        voice='Carla'  # Amazon Polly Neural (voce naturale)
    )
    
    response.append(gather)
    response.redirect('/api/voice/ivr-menu')
    
    return str(response)

@app.post("/api/voice/verify-code")
def verify_code():
    """Richiede codice verifica"""
    response = VoiceResponse()
    
    gather = Gather(
        num_digits=8,
        timeout=10,
        action='/api/voice/check-code',
        method='POST'
    )
    
    gather.say(
        "Digiti il codice di verifica che trova sul badge. "
        "Otto cifre.",
        language='it-IT',
        voice='Carla'
    )
    
    response.append(gather)
    return str(response)

@app.post("/api/voice/check-code")
def check_code(request):
    """Verifica codice nel database"""
    digits = request.form.get('Digits')
    code = f"{digits[:4]}-{digits[4:]}"
    
    appointment = db.query(Appointment).filter(
        Appointment.verification_code == code,
        func.date(Appointment.appointment_date) == date.today()
    ).first()
    
    response = VoiceResponse()
    
    if appointment:
        # ✅ Codice corretto
        response.say(
            f"Codice verificato con successo! "
            f"Appuntamento con {appointment.partner.name}, "
            f"{appointment.partner.professional_type}. "
            f"Tutto è in ordine. Può aprire in sicurezza.",
            language='it-IT',
            voice='Carla'
        )
        log_verification(appointment.id, 'success', code)
    else:
        # ❌ Codice errato
        response.say(
            "ATTENZIONE: codice non corretto. "
            "Trasferimento a operatore.",
            language='it-IT',
            voice='Carla'
        )
        response.dial(OPERATOR_PHONE_NUMBER)
        log_verification(None, 'failed', code)
    
    return str(response)
```

**Use cases Voice:**
- Verifica appuntamenti 24/7 (IVR automatico)
- Fallback operatore umano
- Multilingua (futuro: IT, EN, DE, FR)

**Voci disponibili:**
- `alice`: Standard Twilio
- `Carla`: Amazon Polly Neural (preferita - naturale)
- `Giorgio`: Amazon Polly Neural (voce maschile)

### 7.4 Stripe (Pagamenti)

**Setup:**
- Account Stripe business
- Webhook endpoint configurato
- Prodotti e prezzi creati in dashboard

**Implementazione:**

```python
import stripe

stripe.api_key = STRIPE_SECRET_KEY

# Crea checkout session per abbonamento
def create_subscription_checkout(user, plan_type):
    checkout_session = stripe.checkout.Session.create(
        customer_email=user.email,
        payment_method_types=['card', 'sepa_debit'],
        mode='subscription',
        line_items=[{
            'price': PLAN_PRICE_IDS[plan_type],
            'quantity': 1
        }],
        success_url=f"https://miapersempre.it/dashboard?success=true",
        cancel_url=f"https://miapersempre.it/pricing?cancelled=true",
        metadata={
            'user_id': user.id,
            'plan_type': plan_type
        }
    )
    return checkout_session.url

# Gestisci webhook
@app.post("/api/webhooks/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    event = stripe.Webhook.construct_event(
        payload, sig_header, STRIPE_WEBHOOK_SECRET
    )
    
    if event.type == 'checkout.session.completed':
        session = event.data.object
        # Attiva abbonamento utente
        activate_subscription(session.metadata['user_id'], session.metadata['plan_type'])
    
    elif event.type == 'customer.subscription.deleted':
        subscription = event.data.object
        # Disattiva abbonamento
        deactivate_subscription(subscription.id)
    
    return {"status": "success"}
```

**Prodotti Stripe:**
- Investitore Premium (€49/mese o €490/anno)
- Agenzia Starter (€99/mese)
- Agenzia Professional (€199/mese)
- Agenzia Enterprise (€399/mese)
- Featured Listing (€49/mese)
- Privacy Plus (€4.99/mese)
- Pacchetti crediti (one-time)

### 7.5 DeepL (Traduzione)

**Implementazione:**

```python
import requests

def translate_text(text, source_lang='IT', target_lang='EN'):
    # Check cache first
    cache_key = f"translation:{source_lang}:{target_lang}:{hash(text)}"
    cached = redis_client.get(cache_key)
    if cached:
        return cached
    
    # Call DeepL API
    response = requests.post(
        'https://api.deepl.com/v2/translate',
        headers={'Authorization': f'DeepL-Auth-Key {DEEPL_API_KEY}'},
        data={
            'text': text,
            'source_lang': source_lang,
            'target_lang': target_lang
        }
    )
    
    translated = response.json()['translations'][0]['text']
    
    # Cache for 24h
    redis_client.setex(cache_key, 86400, translated)
    
    return translated

# Traduci contenuti annuncio on-the-fly
def get_property_localized(property_id, lang):
    property = db.query(Property).get(property_id)
    
    if lang == 'it':
        return property  # Lingua originale
    
    return {
        'title': translate_text(property.title, target_lang=lang.upper()),
        'description': translate_text(property.description, target_lang=lang.upper()),
        # Altri campi non tradotti (prezzo, mq, ecc.)
        'price': property.bare_property_value,
        'surface_sqm': property.surface_sqm,
        ...
    }
```

**Lingue supportate:**
- Italiano (default)
- Inglese
- Tedesco
- Francese
- Spagnolo

---

## 8. SEO E ACCESSIBILITÀ

### 8.1 SEO Strategy

#### Technical SEO

**URL Structure:**
```
https://miapersempre.it/
https://miapersempre.it/proprieta-usufrutto-vitalizio
https://miapersempre.it/proprieta/milano
https://miapersempre.it/proprieta/milano/centro-storico
https://miapersempre.it/proprieta/[id]/[slug]
https://miapersempre.it/blog/[categoria]/[slug-articolo]
```

**Meta Tags Dinamici:**
```html
<!-- Homepage -->
<title>[NOME] - Piattaforma Italiana Proprietà con Usufrutto Vitalizio</title>
<meta name="description" content="Marketplace per investire in proprietà con usufrutto vitalizio. Valutazione automatica, annunci verificati, transazioni sicure." />

<!-- Listing page -->
<title>Appartamento Milano Centro - Proprietà Usufrutto - [NOME]</title>
<meta name="description" content="Bilocale 65mq Milano Centro in proprietà con usufrutto. Valutazione €185.000. Investimento sicuro a lungo termine." />

<!-- City page -->
<title>Proprietà con Usufrutto Vitalizio a Milano - 143 annunci | [NOME]</title>
<meta name="description" content="Trova opportunità di investimento in proprietà con usufrutto vitalizio a Milano. 143 annunci verificati, valutazione automatica, transazioni sicure." />
```

**Schema.org Markup:**
```json
{
  "@context": "https://schema.org/",
  "@type": "RealEstateListing",
  "name": "Appartamento Milano Centro - Proprietà Usufrutto",
  "description": "...",
  "url": "https://miapersempre.it/proprieta/12345/appartamento-milano-centro",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via Roma 1",
    "addressLocality": "Milano",
    "addressRegion": "Lombardia",
    "postalCode": "20121",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.4642",
    "longitude": "9.1900"
  },
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": "65",
    "unitCode": "MTK"
  },
  "numberOfRooms": 2,
  "image": [
    "https://miapersempre.it/images/properties/12345/1.jpg",
    "https://miapersempre.it/images/properties/12345/2.jpg"
  ],
  "offers": {
    "@type": "Offer",
    "price": "185000",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

**Sitemap Dinamico:**
```xml
<!-- Generato automaticamente ogni notte -->
/sitemap.xml
  /sitemap-pages.xml (pagine statiche)
  /sitemap-properties.xml (annunci)
  /sitemap-cities.xml (pagine città)
  /sitemap-blog.xml (articoli)
```

**Robots.txt:**
```
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /admin/
Disallow: /api/

Sitemap: https://miapersempre.it/sitemap.xml
```

#### Content SEO

**Keywords Target:**
- Primary: "proprietà usufrutto vitalizio", "investire usufrutto", "vendere casa usufrutto"
- Secondary: "nuda proprietà", "vitalizio immobiliare", "usufrutto vita"
- Long-tail: "come funziona usufrutto vitalizio", "conviene investire usufrutto", "calcolo valore usufrutto"

**Content Strategy:**
- Blog: 2-3 articoli/settimana (2000+ parole)
- Guide: "Guida completa proprietà con usufrutto 2025"
- FAQ ricche
- Video tutorial (YouTube + embed)
- Calcolatori interattivi (link magnet)

**Internal Linking:**
- Ogni annuncio linka a:
  - Città/zona
  - Articoli correlati ("Come investire in usufrutto a Milano")
  - Calcolatore valutazione
- Blog linka ad annunci rilevanti

### 8.2 Accessibilità (WCAG 2.1 Level AA)

#### Conformità Obbligatoria (EAA)

**Colori e Contrasto:**
- Ratio minimo 4.5:1 per testo normale
- Ratio minimo 3:1 per testo grande (18pt+)
- Tool: WebAIM Contrast Checker

**Navigazione Tastiera:**
```html
<!-- Skip navigation -->
<a href="#main-content" class="skip-link">Salta al contenuto principale</a>

<!-- Focus visibile -->
:focus {
  outline: 3px solid #0066CC;
  outline-offset: 2px;
}

<!-- Tab order logico -->
<button tabindex="0">Pulsante 1</button>
<button tabindex="0">Pulsante 2</button>
```

**ARIA Labels:**
```html
<!-- Form fields -->
<label for="email">Email</label>
<input type="email" id="email" aria-required="true" aria-describedby="email-help" />
<span id="email-help">Inserisci una email valida</span>

<!-- Landmark regions -->
<nav aria-label="Navigazione principale">...</nav>
<main id="main-content" aria-label="Contenuto principale">...</main>
<aside aria-label="Barra laterale">...</aside>

<!-- Dynamic content -->
<div role="alert" aria-live="polite">Annuncio salvato nei preferiti</div>
```

**Immagini:**
```html
<!-- Alt text descrittivo -->
<img src="appartamento.jpg" alt="Soggiorno luminoso con finestre su strada, parquet e camino" />

<!-- Immagini decorative -->
<img src="decoration.svg" alt="" role="presentation" />
```

**Form Accessibili:**
```html
<form>
  <!-- Fieldset per raggruppare -->
  <fieldset>
    <legend>Informazioni immobile</legend>
    
    <div class="form-group">
      <label for="surface">Superficie (mq)</label>
      <input 
        type="number" 
        id="surface" 
        name="surface"
        aria-required="true"
        aria-invalid="false"
        aria-describedby="surface-error"
      />
      <span id="surface-error" class="error" aria-live="polite"></span>
    </div>
  </fieldset>
  
  <!-- Errori chiari -->
  <div role="alert" aria-live="assertive" class="form-errors">
    <h2>Correggi i seguenti errori:</h2>
    <ul>
      <li><a href="#email">Email non valida</a></li>
    </ul>
  </div>
</form>
```

**Testing Tools:**
- axe DevTools (Chrome extension)
- WAVE (WebAIM)
- Lighthouse audit
- Screen reader testing (NVDA/JAWS)

---

## 9. GDPR E PRIVACY

### 9.1 Conformità GDPR

**Dati Personali Raccolti:**
- Identificativi: nome, cognome, email, telefono
- Localizzazione: indirizzo (per proprietari)
- Finanziari: dati carta (via Stripe, non salvati)
- Tecnici: IP, cookies, user agent

**Basi Giuridiche:**
- Consenso esplicito (marketing, profilazione)
- Esecuzione contratto (fornitura servizio)
- Legittimo interesse (fraud prevention, analytics)

**Diritti Utente:**
- Accesso ai dati
- Rettifica
- Cancellazione ("diritto all'oblio")
- Portabilità
- Opposizione trattamento
- Limitazione trattamento

**Implementazione Tecnica:**

```python
# Export dati utente (GDPR compliance)
@app.get("/api/user/export-data")
async def export_user_data(current_user: User):
    data = {
        'profile': {
            'email': current_user.email,
            'name': f"{current_user.first_name} {current_user.last_name}",
            'phone': current_user.phone,
            'created_at': current_user.created_at.isoformat()
        },
        'properties': [p.to_dict() for p in current_user.properties],
        'favorites': [f.property_id for f in current_user.favorites],
        'contacts': [c.to_dict() for c in current_user.sent_contacts],
        'subscriptions': [s.to_dict() for s in current_user.subscriptions]
    }
    
    # Create ZIP file
    zip_buffer = create_zip(data)
    
    return FileResponse(
        zip_buffer,
        media_type='application/zip',
        filename=f'my-data-{current_user.id}.zip'
    )

# Cancellazione account
@app.delete("/api/user/delete-account")
async def delete_account(current_user: User, confirm: bool):
    if not confirm:
        raise HTTPException(400, "Confirmation required")
    
    # Anonimizza invece di cancellare (per mantenere integrità)
    current_user.email = f"deleted-{current_user.id}@deleted.local"
    current_user.first_name = "DELETED"
    current_user.last_name = "USER"
    current_user.phone = None
    current_user.deleted_at = datetime.now()
    
    # Rimuovi annunci
    for property in current_user.properties:
        property.status = 'deleted'
    
    db.commit()
    
    return {"message": "Account deleted successfully"}
```

### 9.2 Cookie Management

**Categorie:**

**Necessari** (sempre attivi):
- Session cookie (autenticazione)
- CSRF token
- Preferenze lingua

**Funzionali** (consenso):
- Filtri ricerca salvati
- Preferenze UI
- Geolocalizzazione

**Analytics** (consenso):
- Google Analytics
- Tracking visualizzazioni annunci

**Marketing** (consenso):
- Pixel remarketing
- Affiliate tracking

**Implementazione:**
```javascript
// Cookie consent banner (usando CookieYes o custom)
window.addEventListener('load', function() {
  if (!hasConsentCookie()) {
    showCookieBanner();
  } else {
    loadScriptsBasedOnConsent();
  }
});

function loadScriptsBasedOnConsent() {
  const consent = getConsentPreferences();
  
  if (consent.analytics) {
    loadGoogleAnalytics();
  }
  
  if (consent.marketing) {
    loadMarketingPixels();
  }
}
```

### 9.3 Privacy Policy

**Contenuti obbligatori:**
1. Titolare trattamento (dati azienda)
2. Tipologie dati raccolti
3. Finalità trattamento
4. Base giuridica
5. Destinatari dati (Stripe, AWS, Google, ecc)
6. Trasferimenti extra-UE (se presenti)
7. Periodo conservazione
8. Diritti interessato
9. Come esercitare diritti
10. Diritto di reclamo al Garante Privacy

**Tool consigliato:** Iubenda (€27-100/anno)
- Genera privacy policy conforme
- Mantiene storico versioni
- Notifica utenti quando cambia

### 9.4 Sicurezza Dati

**Crittografia:**
- HTTPS obbligatorio (TLS 1.3)
- Password hashing (bcrypt con salt)
- Dati sensibili crittografati a riposo

**Access Control:**
- JWT con expire (24h)
- Refresh token (30 giorni)
- Rate limiting API (protezione brute force)
- RBAC (Role-Based Access Control)

**Backup:**
- Database backup automatici giornalieri
- Retention: 30 giorni
- Backup crittografati
- Test recovery mensili

**Audit Log:**
- Log accessi admin
- Log modifiche dati sensibili
- Log eliminazioni account
- Retention: 2 anni

---


## 10. SISTEMA AUTENTICAZIONE CIE/SPID

### 10.1 Panoramica

**Obiettivo:** Garantire identità certa degli utenti per proteggere proprietari anziani da truffe e comportamenti malevoli.

**Sistema Implementato:** Autenticazione tramite **CIE (Carta d'Identità Elettronica)** come metodo principale, con supporto SPID come fallback durante periodo transizione (2024-2027).

**Perché CIE:**
- ✅ Sistema ufficiale del governo italiano
- ✅ Tutti gli italiani ce l'hanno (o la otterranno)
- ✅ Più sicura di SPID (carta fisica + NFC)
- ✅ È il futuro (SPID in dismissione da Ottobre 2024)
- ✅ Integrata con strategia europea EUDI Wallet
- ✅ Dati certificati dal Ministero dell'Interno

---

### 10.2 Tier System Autenticazione

Sistema a livelli progressivi per bilanciare conversione e sicurezza:

```
LIVELLO 0 - Anonimo (Nessuna registrazione)
├─ Accesso: Homepage, blog, "Come funziona"
└─ NON può: Vedere annunci completi

LIVELLO 1 - Registrato Email ⭐ Per Browsing
├─ Registrazione: Email + password
├─ Verifica: Email OTP
├─ Accesso: 
│   ✓ Vedere tutti annunci completi
│   ✓ Salvare preferiti
│   ✓ Creare alert ricerca
│   ✓ Dashboard personale
└─ NON può: Contattare proprietari, richiedere visite

LIVELLO 2 - Verificato CIE/SPID ⭐ Per Visite (OBBLIGATORIO)
├─ Verifica: CIE o SPID Livello 2
├─ Dati ottenuti:
│   • Codice fiscale (univoco)
│   • Nome e cognome (certificati)
│   • Data e luogo di nascita
│   • Genere
│   • Email e telefono (se forniti)
├─ Accesso:
│   ✓ Tutto di Livello 1 +
│   ✓ Richiedere visite immobili
│   ✓ Messaggi diretti proprietari
│   ✓ Badge "✓ Verificato CIE"
│   ✓ Priorità nelle richieste
└─ Garanzia: Identità certificata Ministero Interno
```

**Rationale Scelta:**
- Email sufficiente per browsing (barrier bassa → più traffico)
- CIE/SPID richiesto SOLO quando serve davvero (protezione anziani)
- Funnel conversion ottimizzato
- Sicurezza massima dove conta

---

### 10.3 Integrazione Tecnica CIE

**Protocollo:** OpenID Connect (OIDC) - standard moderno vs SAML di SPID

#### **Backend Implementation (Python/FastAPI)**

```python
# backend/app/services/cie_auth.py

from authlib.integrations.starlette_client import OAuth
from fastapi import FastAPI, Request, Depends
from starlette.config import Config
from sqlalchemy.orm import Session

# Configurazione OAuth per CIE
config = Config('.env')
oauth = OAuth(config)

# Registra CIE come provider OAuth
oauth.register(
    name='cie',
    server_metadata_url='https://idserver.servizicie.interno.gov.it/.well-known/openid-configuration',
    client_id=os.getenv('CIE_CLIENT_ID'),
    client_secret=os.getenv('CIE_CLIENT_SECRET'),
    client_kwargs={
        'scope': 'openid profile email',
        'code_challenge_method': 'S256'  # PKCE per sicurezza
    }
)

@app.get('/api/auth/cie/login')
async def cie_login(request: Request):
    """
    Inizia flusso autenticazione CIE
    Reindirizza a sistema CIE per autenticazione
    """
    redirect_uri = request.url_for('cie_callback')
    return await oauth.cie.authorize_redirect(request, redirect_uri)


@app.get('/api/auth/cie/callback')
async def cie_callback(request: Request, db: Session = Depends(get_db)):
    """
    Callback dopo autenticazione CIE
    Riceve dati certificati e crea/aggiorna utente
    """
    try:
        # Ottieni token da CIE
        token = await oauth.cie.authorize_access_token(request)
        user_info = token.get('userinfo')
        
        # Estrai dati certificati (dal Ministero Interno!)
        cie_data = {
            'fiscal_code': user_info['fiscalNumber'],
            'name': user_info['given_name'],
            'surname': user_info['family_name'],
            'birth_date': user_info['birthdate'],
            'birth_place': user_info.get('place_of_birth'),
            'gender': user_info['gender'],
            'email': user_info.get('email'),
            'phone': user_info.get('phone_number'),
            'address': user_info.get('address'),
            'cie_number': user_info['document_number'],
            'cie_expiry': user_info['document_expires']
        }
        
        # Cerca utente esistente
        user = db.query(User).filter(
            User.fiscal_code == cie_data['fiscal_code']
        ).first()
        
        if not user:
            # Nuovo utente - registrazione automatica
            user = User(
                fiscal_code=cie_data['fiscal_code'],
                name=cie_data['name'],
                surname=cie_data['surname'],
                email=cie_data['email'],
                phone=cie_data['phone'],
                date_of_birth=cie_data['birth_date'],
                place_of_birth=cie_data['birth_place'],
                gender=cie_data['gender'],
                
                # Verifica identità
                verified_identity=True,
                verification_method='cie',
                verification_level=3,  # Massimo livello
                verified_at=datetime.utcnow(),
                
                # Documento
                document_type='cie',
                document_number=cie_data['cie_number'],
                document_expiry=cie_data['cie_expiry']
            )
            db.add(user)
            logger.info(f"Nuovo utente via CIE: {user.fiscal_code}")
        else:
            # Aggiorna ultimo accesso e dati
            user.last_login = datetime.utcnow()
            user.name = cie_data['name']
            user.surname = cie_data['surname']
            user.email = cie_data['email'] or user.email
        
        db.commit()
        
        # Crea JWT session token
        access_token = create_access_token(
            data={"sub": str(user.id), "verified": True}
        )
        
        # Redirect a dashboard
        return RedirectResponse(
            url=f"/dashboard?token={access_token}",
            status_code=302
        )
        
    except Exception as e:
        logger.error(f"Errore autenticazione CIE: {e}")
        return RedirectResponse(
            url="/login?error=cie_failed",
            status_code=302
        )
```

#### **Database Schema**

```python
# backend/app/models/user.py

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    
    # Dati personali (da CIE/SPID)
    fiscal_code = Column(String(16), unique=True, index=True, nullable=True)
    name = Column(String(100))
    surname = Column(String(100))
    email = Column(String(255), unique=True, index=True)
    phone = Column(String(20))
    
    date_of_birth = Column(Date)
    place_of_birth = Column(String(255))
    gender = Column(Enum('M', 'F', 'X'))
    
    # Verifica identità
    verified_identity = Column(Boolean, default=False)
    verification_method = Column(
        Enum('none', 'email', 'document', 'spid', 'cie'),
        default='none'
    )
    verification_level = Column(Integer, default=0)  # 0=none, 1=email, 2=document, 3=cie/spid
    verified_at = Column(DateTime)
    
    # Documento identità
    document_type = Column(Enum('cie', 'passport', 'id_card', 'spid'))
    document_number = Column(String(50))
    document_expiry = Column(Date)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)
    deleted_at = Column(DateTime)  # Per soft delete GDPR
    
    # Relazioni
    properties = relationship("Property", back_populates="owner")
    visit_requests_sent = relationship(
        "VisitRequest", 
        foreign_keys="VisitRequest.requester_id",
        back_populates="requester"
    )
    visit_requests_received = relationship(
        "VisitRequest",
        foreign_keys="VisitRequest.owner_id", 
        back_populates="owner"
    )
```

---

### 10.4 Frontend - UX Autenticazione

#### **Schermata Pre-Autenticazione (Spiegazione Sicurezza)**

```tsx
// components/CIEVerificationExplainer.tsx

export function CIEVerificationExplainer() {
  return (
    <div className="verification-explainer">
      {/* Hero */}
      <div className="hero-security bg-gradient-primary text-white p-12 rounded-xl">
        <h2 className="text-4xl font-bold mb-4">
          🛡️ La Tua Sicurezza è la Nostra Priorità
        </h2>
        <p className="text-xl opacity-90">
          Per proteggere i proprietari (spesso persone anziane) dalle truffe,
          verifichiamo l'identità di tutti con la Carta d'Identità Elettronica.
        </p>
      </div>
      
      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="benefit-card bg-green-50 p-6 rounded-xl">
          <div className="text-4xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-2">Identità Certificata</h3>
          <p className="text-gray-700">
            I tuoi dati sono verificati dal <strong>Ministero dell'Interno</strong>.
            Nessuna possibilità di false identità.
          </p>
        </div>
        
        <div className="benefit-card bg-blue-50 p-6 rounded-xl">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Privacy Protetta</h3>
          <p className="text-gray-700">
            Il tuo numero di telefono <strong>NON è visibile</strong> fino a quando 
            non viene confermato un appuntamento.
          </p>
        </div>
        
        <div className="benefit-card bg-gold-50 p-6 rounded-xl">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-bold mb-2">Badge di Fiducia</h3>
          <p className="text-gray-700">
            Ottieni il badge <strong>"Verificato CIE"</strong> che aumenta 
            la fiducia dei proprietari.
          </p>
        </div>
        
        <div className="benefit-card bg-green-50 p-6 rounded-xl">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-bold mb-2">Tutti Protetti</h3>
          <p className="text-gray-700">
            La verifica protegge <strong>sia acquirenti che venditori</strong>,
            creando un ambiente sicuro per entrambi.
          </p>
        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center mt-12">
        <button 
          onClick={() => window.location.href = '/api/auth/cie/login'}
          className="bg-secondary hover:bg-gold-700 text-gray-900 px-12 py-4 rounded-xl font-bold text-lg transition-all"
        >
          🎯 Verifica con CIE (2 minuti)
        </button>
        <p className="mt-4 text-gray-600">
          Processo veloce e sicuro • Nessun costo • Una sola volta
        </p>
      </div>
      
      {/* Security Badges */}
      <div className="flex justify-center items-center gap-8 mt-12 opacity-70">
        <img src="/badge-ministero-interno.svg" alt="Ministero Interno" className="h-12" />
        <img src="/badge-gdpr.svg" alt="GDPR Compliant" className="h-12" />
        <img src="/badge-ssl.svg" alt="SSL Secure" className="h-12" />
      </div>
    </div>
  )
}
```

#### **Bottone "Entra con CIE"**

```tsx
// components/CIELoginButton.tsx

export function CIELoginButton() {
  const [showModal, setShowModal] = useState(false)
  
  return (
    <>
      <button
        onClick={() => window.location.href = '/api/auth/cie/login'}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-3 font-semibold"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/>
        </svg>
        Entra con CIE
      </button>
      
      <button
        onClick={() => setShowModal(true)}
        className="text-sm text-blue-600 hover:underline mt-2"
      >
        Come funziona?
      </button>
      
      {/* Modal con istruzioni dettagliate */}
      {showModal && <CIEInstructionsModal onClose={() => setShowModal(false)} />}
    </>
  )
}
```

#### **Badge Utente Verificato**

```tsx
// components/VerificationBadge.tsx

export function VerificationBadge({ user }: { user: User }) {
  if (!user.verified_identity) return null
  
  const badgeConfig = {
    cie: {
      color: 'bg-gold-100 border-gold-500 text-gold-900',
      icon: '🏆',
      label: 'IDENTITÀ VERIFICATA CIE',
      subtitle: 'Certificato Ministero dell\'Interno'
    },
    spid: {
      color: 'bg-blue-100 border-blue-500 text-blue-900',
      icon: '✓',
      label: 'IDENTITÀ VERIFICATA SPID',
      subtitle: 'Sistema Pubblico Identità Digitale'
    }
  }
  
  const config = badgeConfig[user.verification_method] || badgeConfig.cie
  
  return (
    <div className={`verification-badge ${config.color} border-2 px-4 py-2 rounded-lg flex items-center gap-3`}>
      <span className="text-2xl">{config.icon}</span>
      <div>
        <div className="font-bold text-sm">{config.label}</div>
        <div className="text-xs opacity-80">{config.subtitle}</div>
      </div>
      
      {/* Tooltip */}
      <div className="tooltip hidden group-hover:block">
        Questa persona ha verificato la sua identità con la 
        Carta d'Identità Elettronica. I dati (nome, cognome, 
        codice fiscale) sono certificati e autentici.
      </div>
    </div>
  )
}
```

---

### 10.5 Privacy e GDPR

**Dati Salvati da CIE/SPID:**
```
✓ Salvati nel database:
- Codice fiscale (identificatore univoco)
- Nome e cognome
- Data e luogo di nascita
- Genere
- Email e telefono (se forniti dall'utente)
- Numero documento e scadenza

✗ MAI salvati:
- PIN CIE (mai trasmesso al sistema)
- Token di sessione CIE/SPID (temporanei)
- Altri dati sensibili non necessari
```

**Informativa Privacy (da mostrare PRIMA di autenticazione):**

```
INFORMATIVA PRIVACY - AUTENTICAZIONE CIE/SPID

Raccogliamo i seguenti dati dalla tua CIE/SPID:
• Nome e Cognome
• Codice Fiscale
• Data e luogo di nascita
• Email e telefono (se forniti)

PERCHÉ:
• Verificare la tua identità
• Proteggere proprietari anziani da truffe
• Permetterti di richiedere visite
• Conformità normative (anti-riciclaggio)

COME LI USIAMO:
• Mostrati a proprietari quando richiedi visita
• Sistema rating e recensioni
• Tracciabilità appuntamenti
• Supporto clienti

NON LI CONDIVIDIAMO con terzi (tranne obblighi legge).

PUOI:
• Accedere ai tuoi dati
• Modificarli
• Cancellarli (diritto all'oblio)

[Privacy Policy Completa] [Cookie Policy]

☐ Accetto il trattamento dati per verifica identità (obbligatorio)
☐ Accetto comunicazioni marketing (opzionale)

[Procedi con Verifica CIE] [Annulla]
```

**Cancellazione Account (GDPR Right to be Forgotten):**

```python
@router.delete("/api/account")
async def delete_account(
    current_user: User, 
    confirm: str,
    db: Session = Depends(get_db)
):
    """
    Cancella account e tutti i dati personali (GDPR)
    """
    if confirm != "DELETE":
        raise HTTPException(400, "Conferma richiesta")
    
    # Soft delete: anonimizza dati mantenendo integrità referenziale
    current_user.fiscal_code = f"DELETED_{current_user.id}"
    current_user.name = "Utente"
    current_user.surname = "Cancellato"
    current_user.email = f"deleted_{current_user.id}@deleted.local"
    current_user.phone = None
    current_user.date_of_birth = None
    current_user.place_of_birth = None
    current_user.deleted_at = datetime.utcnow()
    current_user.verified_identity = False
    
    # Rimuovi annunci attivi
    for property in current_user.properties:
        if property.status == 'active':
            property.status = 'deleted'
    
    db.commit()
    
    return {"message": "Account eliminato con successo"}
```

---

### 10.6 Processo Accreditamento Ministero Interno

Per integrare CIE serve accreditamento presso il Ministero dell'Interno:

**Step Accreditamento:**

1. **Preparazione Tecnica (Settimane 1-2)**
   - Implementa integrazione OIDC
   - Setup ambiente test CIE
   - Prepara metadata applicazione
   - Ottieni certificati digitali (€200-300)

2. **Richiesta Accreditamento (Settimana 3)**
   - Registrazione su portale: https://www.cartaidentita.interno.gov.it
   - Compila modulo service provider
   - Carica certificati digitali
   - Fornisci informazioni azienda

3. **Test Ambiente Collaudo (Settimane 4-5)**
   - Ministero fornisce credenziali test
   - Esegui test flow completo
   - Verifica tutti gli scenari
   - Fix eventuali problemi

4. **Approvazione e Produzione (Settimane 6-8)**
   - Ministero effettua audit
   - Approvazione finale (10-30 giorni)
   - Ricevi credenziali produzione
   - Go live!

**Tempo Totale:** 6-10 settimane  
**Costo:** €200-400 (certificati) + sviluppo (già coperto)

---

### 10.7 CIE vs SPID - Confronto

| Aspetto | CIE | SPID |
|---------|-----|------|
| **Status** | Sistema ufficiale ✅ | In dismissione ⚠️ |
| **Futuro** | Sistema principale | Non più rilasciato dal 2024 |
| **Diffusione** | 40M+ italiani | 35M italiani |
| **Sicurezza** | Carta fisica + NFC 🏆 | Username + Password + OTP |
| **UX Mobile** | App + NFC (fluida) 🏆 | Browser (meno fluida) |
| **UX Desktop** | QR + mobile | Browser nativo 🏆 |
| **Costi** | Gratuito | Gratuito |
| **Setup tecnico** | OIDC (moderno) 🏆 | SAML (vecchio) |
| **Dati ottenibili** | Più completi 🏆 | Standard |
| **Accreditamento** | Ministero Interno | AgID |

**Raccomandazione:** Implementare **CIE come principale** + SPID come fallback (periodo transizione 2024-2027).

---

### 10.8 Frasi Efficaci Marketing

**Homepage Hero:**
> "🛡️ La piattaforma più sicura d'Italia per la nuda proprietà.  
> Identità verificata con Carta d'Identità Elettronica."

**Nelle Richieste Visita:**
> "🏆 IDENTITÀ CERTIFICATA DAL MINISTERO DELL'INTERNO"

**Email a Proprietari:**
> "✓ Dati verificati e certificati. Codice fiscale autentico. Documenti controllati."

**Landing Page:**
> "**Sicurezza Garantita**  
> Tutti gli utenti verificano la loro identità con CIE.  
> Zero possibilità di false identità.  
> I tuoi dati sono al sicuro."

---

### 10.9 Metriche e KPI

**Da Monitorare:**
```
- Tasso conversione registrazione Email → CIE
- Tempo medio completamento verifica CIE
- Abbandoni durante flusso CIE
- Problemi tecnici / errori CIE
- Richieste supporto verifica identità
- Feedback utenti su processo verifica
```

**Target:**
- 70%+ utenti completano verifica CIE
- <5 minuti tempo medio verifica
- <10% tasso abbandono
- 95%+ successo tecnico

---

## 11. SISTEMA APPUNTAMENTI SICURI

### 11.1 Panoramica e Obiettivi

**Problema Critico:** Proprietari anziani esposti a rischi quando sconosciuti dal web richiedono visite a domicilio.

**Soluzione:** Sistema multi-livello che protegge numero telefono proprietario e garantisce identità certa dell'acquirente PRIMA del primo incontro.

**Principi Core:**
1. **Privacy First:** Numero proprietario NON visibile fino conferma appuntamento
2. **Identità Certa:** Verifica CIE/SPID obbligatoria per richiedere visite
3. **Comunicazione Tracciata:** Tutto passa da piattaforma (messaggistica interna)
4. **Controllo Proprietario:** Decide sempre quando/a chi dare il suo numero
5. **Trasparenza Totale:** Dati acquirente certificati visibili a proprietario

---

### 11.2 Flow Completo Richiesta Visita

```
STEP 1: Acquirente Trova Annuncio
├─ Naviga annunci (serve solo Livello 1 - Email)
├─ Trova appartamento interessante
└─ Click "Richiedi Visita"

STEP 2: Sistema Richiede Verifica Identità
├─ Se già verificato CIE/SPID → procede
├─ Se non verificato → modale:
│   ┌────────────────────────────────────────┐
│   │ 🛡️ Protezione Proprietari              │
│   │                                        │
│   │ Per richiedere visite devi verificare │
│   │ la tua identità con CIE/SPID.         │
│   │                                        │
│   │ Questo protegge i proprietari (spesso │
│   │ anziani) da truffe e comportamenti    │
│   │ scorretti.                             │
│   │                                        │
│   │ [Verifica con CIE] [Verifica con SPID]│
│   └────────────────────────────────────────┘
└─ Dopo verifica → ritorna a form richiesta

STEP 3: Compilazione Form Richiesta
┌─────────────────────────────────────────┐
│ Richiedi Visita - Appartamento Milano   │
│                                         │
│ Date Preferite:                         │
│ ☐ Sab 21 Dic ore 15:00                 │
│ ☐ Dom 22 Dic ore 10:00                 │
│ ☐ Lun 23 Dic ore 18:00                 │
│                                         │
│ Il Tuo Numero: +39 333 1234567         │
│ ☑ Condividi con proprietario           │
│                                         │
│ Messaggio (opzionale):                  │
│ [Buongiorno, sono interessato...]       │
│                                         │
│ ℹ️ Il proprietario vedrà:               │
│ • I tuoi dati CIE verificati           │
│ • Il tuo numero (solo se condividi)    │
│ • Il tuo messaggio                      │
│                                         │
│ ⚠️ Il numero del proprietario ti sarà   │
│   comunicato SOLO dopo conferma.        │
│                                         │
│ [Invia Richiesta]                       │
└─────────────────────────────────────────┘

STEP 4: Notifica Proprietario (Email + SMS)
┌─────────────────────────────────────────┐
│ 🏠 Nuova Richiesta Visita               │
│                                         │
│ 👤 MARIO ROSSI                          │
│    🏆 IDENTITÀ VERIFICATA CIE           │
│    (Ministero dell'Interno)             │
│                                         │
│ Dati Certificati:                       │
│ • CF: RSSMRA80A01H501Z                 │
│ • Nato: 01/01/1980 (44 anni)           │
│ • Email: mario@email.com               │
│ • Tel: +39 333 1234567                 │
│ • Rating: ⭐⭐⭐⭐⭐ 4.8/5              │
│                                         │
│ Date Proposte:                          │
│ • Sabato 21 Dic ore 15:00              │
│ • Domenica 22 Dic ore 10:00            │
│                                         │
│ Messaggio:                              │
│ "Buongiorno, sono molto interessato..." │
│                                         │
│ 🛡️ Garanzie Sicurezza:                 │
│ ✓ Identità certificata governo         │
│ ✓ Codice fiscale verificato            │
│ ✓ Tutte comunicazioni tracciate        │
│ ✓ Sistema rating feedback              │
│                                         │
│ [Rispondi su Piattaforma]              │
│ [Chiama Direttamente: +39 333...]      │
│                                         │
│ ℹ️ Il TUO numero NON è ancora visibile │
│   all'acquirente. Lo sarà solo dopo    │
│   che confermi l'appuntamento.          │
│                                         │
│ In caso dubbi: 800-123456              │
└─────────────────────────────────────────┘

STEP 5: Proprietario Risponde
┌─ OPZIONE A: Accetta Date Proposte
│  ├─ Click su data → Conferma
│  ├─ Sistema crea appuntamento
│  ├─ Numero proprietario ORA visibile ad acquirente
│  └─ Entrambi ricevono conferma
│
├─ OPZIONE B: Propone Date Alternative
│  ├─ Apre calendario
│  ├─ Seleziona alternative: Mer 25 ore 14:00
│  ├─ Acquirente riceve notifica
│  ├─ Può accettare o proporre altro
│  └─ Numero ancora NON visibile
│
├─ OPZIONE C: Messaggio Interno
│  ├─ Scrive messaggio su piattaforma
│  ├─ Acquirente riceve notifica
│  ├─ Conversazione continua interno
│  └─ Numero ancora NON visibile
│
└─ OPZIONE D: Chiama Direttamente (ha numero)
   ├─ Può decidere di chiamare acquirente
   ├─ Accordi telefonici diretti
   └─ Sistema non traccia (out of band)

STEP 6: Appuntamento Confermato
├─ Data/ora fissata
├─ Sistema crea evento calendario
├─ Genera codice verifica (come partner)
└─ Numeri telefono ORA visibili ad entrambi

STEP 7: Reminder Pre-Visita (24h prima)
┌─ SMS/Email ad Acquirente:
│  "Domani visita ore 15:00
│   Indirizzo: Via Roma 12, Milano
│   Proprietario: Sig.ra Rossi - tel. +39 333...
│   Porta documento identità
│   Codice verifica: 1234-5678"
│
└─ SMS/Email a Proprietario:
   "Domani visita ore 15:00
    Visitatore: Mario Rossi (Verificato CIE)
    Tel: +39 333...
    Verifica documento all'arrivo
    In caso dubbi chiama: 800-123456"

STEP 8: Check-in Visita
├─ Acquirente arriva → click "Sono arrivato"
├─ GPS timestamp registrato
├─ SMS a proprietario: "Mario è arrivato"
└─ Sistema monitora (alert se problemi)

STEP 9: Check-out Visita
├─ Visita terminata → click "Visita completata"
├─ Timestamp registrato
└─ 4h dopo → SMS rating reciproco

STEP 10: Rating Post-Visita
├─ Proprietario valuta acquirente
├─ Acquirente valuta proprietario/immobile
├─ Rating influenza future richieste
└─ Rating <3 stelle → review manuale
```

---

### 11.3 Database Schema

```python
# backend/app/models/visit_request.py

class VisitRequest(Base):
    """Richieste visita con protezione privacy"""
    __tablename__ = "visit_requests"
    
    id = Column(Integer, primary_key=True)
    property_id = Column(Integer, ForeignKey('properties.id'))
    requester_id = Column(Integer, ForeignKey('users.id'))  # Acquirente
    owner_id = Column(Integer, ForeignKey('users.id'))      # Proprietario
    
    # Stato richiesta
    status = Column(Enum(
        'pending',       # In attesa risposta proprietario
        'accepted',      # Proprietario ha accettato
        'scheduled',     # Appuntamento fissato (numero visibile)
        'in_progress',   # Visita in corso
        'completed',     # Visita completata
        'cancelled_requester',  # Annullato da acquirente
        'cancelled_owner',      # Annullato da proprietario
        'rejected'       # Rifiutato da proprietario
    ), default='pending')
    
    # Proposta acquirente
    preferred_dates = Column(JSON)  # [{"date": "2024-12-21", "time": "15:00"}]
    message = Column(Text)
    requester_phone = Column(String(20))
    
    # Risposta proprietario
    confirmed_date = Column(DateTime)
    owner_response_message = Column(Text)
    owner_alternative_dates = Column(JSON)
    
    # Privacy control (CRITICO)
    phone_shared_with_owner = Column(Boolean, default=True)
    phone_shared_with_requester = Column(Boolean, default=False)  # Solo dopo conferma!
    
    # Check-in/out
    checked_in_at = Column(DateTime)
    checked_in_location = Column(Geography(geometry_type='POINT', srid=4326))
    checked_out_at = Column(DateTime)
    
    # Codice verifica (come partner)
    verification_code = Column(String(10))
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    responded_at = Column(DateTime)
    confirmed_at = Column(DateTime)
    
    # Relazioni
    property = relationship("Property", back_populates="visit_requests")
    requester = relationship("User", foreign_keys=[requester_id])
    owner = relationship("User", foreign_keys=[owner_id])
    messages = relationship("VisitMessage", back_populates="visit_request", cascade="all, delete-orphan")
    ratings = relationship("VisitRating", back_populates="visit_request")


class VisitMessage(Base):
    """Messaggistica sicura interna"""
    __tablename__ = "visit_messages"
    
    id = Column(Integer, primary_key=True)
    visit_request_id = Column(Integer, ForeignKey('visit_requests.id'))
    sender_id = Column(Integer, ForeignKey('users.id'))
    message = Column(Text, nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    read_at = Column(DateTime)
    
    visit_request = relationship("VisitRequest", back_populates="messages")
    sender = relationship("User")


class VisitRating(Base):
    """Rating bidirezionale post-visita"""
    __tablename__ = "visit_ratings"
    
    id = Column(Integer, primary_key=True)
    visit_request_id = Column(Integer, ForeignKey('visit_requests.id'))
    rater_id = Column(Integer, ForeignKey('users.id'))
    rated_id = Column(Integer, ForeignKey('users.id'))
    
    # Rating (1-5 stelle)
    rating = Column(Integer, CheckConstraint('rating >= 1 AND rating <= 5'))
    
    # Domande specifiche
    was_punctual = Column(Boolean)
    was_respectful = Column(Boolean)
    would_recommend = Column(Boolean)
    property_as_described = Column(Boolean)  # Solo per acquirente
    
    # Commento
    comment = Column(Text)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    visit_request = relationship("VisitRequest", back_populates="ratings")
```

---

### 11.4 API Endpoints

```python
# backend/app/api/endpoints/visit_requests.py

@router.post("/properties/{property_id}/request-visit")
async def request_visit(
    property_id: int,
    request_data: VisitRequestCreate,
    current_user: User = Depends(get_current_verified_user),  # CIE/SPID obbligatorio!
    db: Session = Depends(get_db)
):
    """
    Crea richiesta visita
    SOLO utenti verificati CIE/SPID possono chiamare questo endpoint
    """
    # Verifica identità
    if not current_user.verified_identity:
        raise HTTPException(
            403,
            detail={
                "error": "identity_verification_required",
                "message": "Devi verificare la tua identità con CIE/SPID per richiedere visite",
                "action": "redirect_to_verification"
            }
        )
    
    # Trova immobile
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPException(404, "Immobile non trovato")
    
    # Non può richiedere visita al proprio immobile
    if property.owner_id == current_user.id:
        raise HTTPException(400, "Non puoi richiedere visita al tuo immobile")
    
    # Crea richiesta
    visit_request = VisitRequest(
        property_id=property_id,
        requester_id=current_user.id,
        owner_id=property.owner_id,
        preferred_dates=request_data.preferred_dates,
        message=request_data.message,
        requester_phone=request_data.phone if request_data.share_phone else None,
        phone_shared_with_owner=request_data.share_phone,
        phone_shared_with_requester=False,  # IMPORTANTE: ancora non visibile!
        verification_code=generate_verification_code(),
        status='pending'
    )
    
    db.add(visit_request)
    db.commit()
    db.refresh(visit_request)
    
    # Notifica proprietario via email + SMS
    await notify_owner_new_visit_request(visit_request, db)
    
    return {
        "message": "Richiesta inviata con successo",
        "request_id": visit_request.id,
        "status": "pending",
        "next_steps": (
            "Il proprietario riceverà la tua richiesta verificata CIE. "
            "Riceverai notifica quando risponde. Il suo numero ti sarà "
            "comunicato solo dopo conferma appuntamento."
        )
    }


@router.get("/visit-requests/{request_id}")
async def get_visit_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Visualizza dettagli richiesta visita
    Con controllo privacy numero telefono
    """
    visit_req = db.query(VisitRequest).filter(
        VisitRequest.id == request_id
    ).first()
    
    if not visit_req:
        raise HTTPException(404, "Richiesta non trovata")
    
    # Solo acquirente o proprietario
    if current_user.id not in [visit_req.requester_id, visit_req.owner_id]:
        raise HTTPException(403, "Non autorizzato")
    
    is_owner = (current_user.id == visit_req.owner_id)
    
    return {
        "id": visit_req.id,
        "status": visit_req.status,
        "property": {
            "id": visit_req.property.id,
            "title": visit_req.property.title,
            "address": visit_req.property.full_address if visit_req.status == 'scheduled' else visit_req.property.city
        },
        "requester": {
            "id": visit_req.requester.id,
            "name": f"{visit_req.requester.name} {visit_req.requester.surname}",
            "verified": visit_req.requester.verified_identity,
            "verification_method": visit_req.requester.verification_method,
            "fiscal_code": visit_req.requester.fiscal_code if is_owner else None,
            "rating": visit_req.requester.average_rating,
            # Telefono acquirente: visibile a proprietario se condiviso
            "phone": (
                visit_req.requester_phone
                if is_owner and visit_req.phone_shared_with_owner
                else None
            )
        },
        "owner": {
            "id": visit_req.owner.id,
            "name": f"{visit_req.owner.name} {visit_req.owner.surname}",
            # Telefono proprietario: visibile ad acquirente SOLO se appuntamento confermato
            "phone": (
                visit_req.owner.phone
                if not is_owner and visit_req.phone_shared_with_requester and visit_req.status == 'scheduled'
                else None
            ),
            "phone_will_be_visible_after_confirmation": (
                not is_owner and visit_req.status == 'pending'
            )
        },
        "preferred_dates": visit_req.preferred_dates,
        "confirmed_date": visit_req.confirmed_date,
        "verification_code": visit_req.verification_code if visit_req.status == 'scheduled' else None,
        "messages": [
            {
                "sender_name": msg.sender.name,
                "message": msg.message,
                "created_at": msg.created_at,
                "is_mine": msg.sender_id == current_user.id
            }
            for msg in visit_req.messages
        ]
    }


@router.post("/visit-requests/{request_id}/respond")
async def respond_visit_request(
    request_id: int,
    response_data: VisitResponseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Proprietario risponde a richiesta
    """
    visit_req = db.query(VisitRequest).filter(
        VisitRequest.id == request_id
    ).first()
    
    if current_user.id != visit_req.owner_id:
        raise HTTPException(403, "Solo il proprietario può rispondere")
    
    if response_data.action == 'accept':
        # ACCETTA e CONFERMA appuntamento
        visit_req.status = 'scheduled'
        visit_req.confirmed_date = response_data.confirmed_date
        visit_req.responded_at = datetime.utcnow()
        visit_req.confirmed_at = datetime.utcnow()
        
        # IMPORTANTE: Ora proprietario condivide il suo numero
        visit_req.phone_shared_with_requester = True
        
        db.commit()
        
        # Notifica acquirente con numero proprietario
        await notify_requester_visit_confirmed(visit_req, db)
        
        # Crea reminder automatici
        await schedule_visit_reminders(visit_req)
        
        return {
            "message": "Appuntamento confermato!",
            "confirmed_date": visit_req.confirmed_date,
            "your_phone_is_now_visible": True,
            "requester_can_now_call_you": True
        }
    
    elif response_data.action == 'propose_alternatives':
        visit_req.owner_alternative_dates = response_data.alternative_dates
        visit_req.owner_response_message = response_data.message
        visit_req.responded_at = datetime.utcnow()
        # Numero ancora NON condiviso
        
        db.commit()
        
        await notify_requester_alternative_dates(visit_req, db)
        
        return {
            "message": "Proposte alternative inviate",
            "your_phone_still_hidden": True
        }
    
    elif response_data.action == 'reject':
        visit_req.status = 'rejected'
        visit_req.owner_response_message = response_data.message
        visit_req.responded_at = datetime.utcnow()
        
        db.commit()
        
        await notify_requester_visit_rejected(visit_req, db)
        
        return {"message": "Richiesta rifiutata"}


@router.post("/visit-requests/{request_id}/messages")
async def send_internal_message(
    request_id: int,
    message_data: MessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Sistema messaggistica sicura interno
    Alternative a scambio numeri telefono
    """
    visit_req = db.query(VisitRequest).filter(
        VisitRequest.id == request_id
    ).first()
    
    if current_user.id not in [visit_req.requester_id, visit_req.owner_id]:
        raise HTTPException(403, "Non autorizzato")
    
    message = VisitMessage(
        visit_request_id=request_id,
        sender_id=current_user.id,
        message=message_data.message
    )
    
    db.add(message)
    db.commit()
    
    # Notifica destinatario
    recipient_id = (
        visit_req.owner_id if current_user.id == visit_req.requester_id
        else visit_req.requester_id
    )
    
    await notify_new_internal_message(recipient_id, message, visit_req, db)
    
    return {
        "message": "Messaggio inviato",
        "recipient_will_receive_notification": True
    }


@router.post("/visit-requests/{request_id}/check-in")
async def check_in_visit(
    request_id: int,
    location: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Check-in all'arrivo (solo acquirente)
    """
    visit_req = db.query(VisitRequest).filter(
        VisitRequest.id == request_id
    ).first()
    
    if current_user.id != visit_req.requester_id:
        raise HTTPException(403, "Solo l'acquirente può fare check-in")
    
    if visit_req.status != 'scheduled':
        raise HTTPException(400, "Appuntamento non confermato")
    
    visit_req.checked_in_at = datetime.utcnow()
    visit_req.checked_in_location = f"POINT({location['lng']} {location['lat']})"
    visit_req.status = 'in_progress'
    
    db.commit()
    
    # SMS a proprietario
    await send_sms(
        to=visit_req.owner.phone,
        message=f"{visit_req.requester.name} è arrivato per la visita."
    )
    
    return {"message": "Check-in effettuato"}


@router.post("/visit-requests/{request_id}/rate")
async def rate_visit(
    request_id: int,
    rating_data: VisitRatingCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Rating post-visita (bidirezionale)
    """
    visit_req = db.query(VisitRequest).filter(
        VisitRequest.id == request_id
    ).first()
    
    if visit_req.status != 'completed':
        raise HTTPException(400, "La visita deve essere completata")
    
    # Determina chi sta valutando chi
    if current_user.id == visit_req.requester_id:
        rated_id = visit_req.owner_id
    elif current_user.id == visit_req.owner_id:
        rated_id = visit_req.requester_id
    else:
        raise HTTPException(403, "Non autorizzato")
    
    # Crea rating
    rating = VisitRating(
        visit_request_id=request_id,
        rater_id=current_user.id,
        rated_id=rated_id,
        rating=rating_data.rating,
        was_punctual=rating_data.was_punctual,
        was_respectful=rating_data.was_respectful,
        would_recommend=rating_data.would_recommend,
        property_as_described=rating_data.property_as_described,
        comment=rating_data.comment
    )
    
    db.add(rating)
    
    # Aggiorna rating medio utente
    await update_user_average_rating(rated_id, db)
    
    # Se rating molto basso → alert
    if rating.rating <= 2:
        await alert_low_rating(rating, db)
    
    db.commit()
    
    return {"message": "Grazie per il feedback!"}
```

---

### 11.5 Notifiche Email/SMS

**Template Email a Proprietario (Nuova Richiesta):**

[Vedere il template completo nella conversazione precedente - troppo lungo per riportarlo qui]

**Key Points:**
- Badge oro "VERIFICATO CIE" molto visibile
- Dati certificati (CF, età, rating)
- Telefono acquirente visibile (se condiviso)
- Garanzie sicurezza evidenziate
- Consigli sicurezza in box giallo
- Note: "Il TUO numero NON è visibile fino conferma"

---

### 11.6 Protezione Aggiuntive

**1. Rate Limiting:**
```python
# Max 5 richieste/giorno per acquirente
@rate_limit(key="user:{user_id}:visit_requests", rate="5/day")
async def request_visit(...):
    ...
```

**2. Spam Detection:**
```python
# Blocca se messaggio identico inviato a 3+ proprietari
if is_spam_message(message, requester_id):
    raise HTTPException(429, "Messaggio sospetto")
```

**3. Buddy System:**
```
Proprietario può flaggare:
☑ "Richiedi sempre presenza familiare durante visite"
```

**4. Video-Verifica Pre-Visita (Opzionale):**
```
"Prima della visita fisica, vuoi una video-chiamata 
 di 5 min con l'acquirente?"
 
[Sì, prenota video-call]
```

---

### 11.7 Metriche e Monitoraggio

**KPI Da Tracciare:**
```
- Richieste visita inviate
- Tasso accettazione proprietari
- Tempo medio risposta proprietario
- Tasso completamento visite
- Rating medio visite
- Numero conversazioni messaggistica interna
- Tasso utilizzo chiamata diretta vs messaggi
- Problemi segnalati / dispute
```

**Alert Automatici:**
- Rating <3 stelle → review manuale
- Check-in mancato dopo 30 min → SMS reminder
- Check-out mancato dopo 2h → SMS "Tutto ok?"
- 3+ richieste rifiutate consecutivamente → analisi account

---

## 12. GESTIONE IMMAGINI OTTIMIZZATA

### 12.1 Il Problema

**Scenario Tipico Senza Ottimizzazione:**

```
IMMAGINE SMARTPHONE MODERNA:
- Risoluzione: 4000×3000 px (12 MP)
- Dimensione: 3-8 MB (JPEG)
- Formato: JPEG o HEIC

ANNUNCIO CON 15 FOTO:
- Spazio: 45-120 MB per annuncio
- 1.000 annunci = 45-120 GB storage
- 10.000 annunci = 450 GB - 1.2 TB storage

BANDWIDTH:
- 10k visite/giorno = ~1.8 TB/mese
- COSTO: €180-300/mese SOLO bandwidth
```

**Con 10.000 annunci il progetto diventa INSOSTENIBILE** senza ottimizzazione! 💸

---

### 12.2 Soluzione Implementata

**Sistema a 3 Componenti:**
1. ✅ **Ridimensionamento automatico** (3 versioni per uso)
2. ✅ **Conversione WebP** (risparmio 65-88%)
3. ✅ **Eliminazione automatica** (cleanup quando annuncio rimosso)

---

### 12.3 Ridimensionamento Automatico

**Creazione Multiple Versioni:**

```python
# backend/app/services/image_processing.py

from PIL import Image
import io
from pathlib import Path

class ImageProcessor:
    """Processa e ottimizza immagini caricate"""
    
    # Dimensioni target per ogni caso d'uso
    SIZES = {
        'thumbnail': (300, 300),      # Card preview, listing grid
        'medium': (800, 600),          # Dettaglio mobile, gallery
        'large': (1920, 1440),         # Full screen desktop, zoom
    }
    
    def process_property_image(
        self, 
        uploaded_file, 
        property_id: int,
        image_index: int
    ) -> dict:
        """
        Processa immagine caricata:
        1. Apre e converte in RGB
        2. Auto-ruota in base a EXIF
        3. Crea 3 versioni ridimensionate
        4. Salva come WebP ottimizzato
        5. Ritorna paths
        """
        # Apri immagine
        img = Image.open(uploaded_file)
        
        # Converti in RGB (rimuove alpha, HEIC, ecc)
        if img.mode in ('RGBA', 'LA', 'P'):
            img = img.convert('RGB')
        
        # Auto-rotate da EXIF (smartphone spesso salvano ruotate)
        img = self._auto_rotate(img)
        
        # Crea directory per questo immobile
        base_path = Path(f'/mnt/user-data/uploads/properties/{property_id}')
        base_path.mkdir(parents=True, exist_ok=True)
        
        results = {}
        
        # Genera ogni versione
        for size_name, dimensions in self.SIZES.items():
            # Ridimensiona mantenendo aspect ratio
            resized = self._resize_image(img, dimensions)
            
            # Salva come WebP
            filename = f'img_{image_index}_{size_name}.webp'
            filepath = base_path / filename
            
            resized.save(
                filepath,
                'WEBP',
                quality=85,  # Ottimo compromesso qualità/dimensione
                method=6     # Compressione massima (più lenta ma migliore)
            )
            
            results[size_name] = str(filepath)
        
        return results
    
    def _resize_image(self, img: Image, target_size: tuple) -> Image:
        """
        Ridimensiona mantenendo aspect ratio
        Per thumbnail quadrati: crea canvas e centra
        """
        img_copy = img.copy()
        img_copy.thumbnail(target_size, Image.Resampling.LANCZOS)
        
        # Se target è quadrato (thumbnail), centra su canvas
        if target_size[0] == target_size[1]:
            canvas = Image.new('RGB', target_size, (255, 255, 255))
            offset = (
                (target_size[0] - img_copy.width) // 2,
                (target_size[1] - img_copy.height) // 2
            )
            canvas.paste(img_copy, offset)
            return canvas
        
        return img_copy
    
    def _auto_rotate(self, img: Image) -> Image:
        """
        Ruota automaticamente in base a dati EXIF
        (Molti smartphone salvano foto ruotate con flag EXIF)
        """
        try:
            from PIL.ExifTags import TAGS
            
            exif = img._getexif()
            if exif is not None:
                for tag, value in exif.items():
                    if TAGS.get(tag) == 'Orientation':
                        if value == 3:
                            img = img.rotate(180, expand=True)
                        elif value == 6:
                            img = img.rotate(270, expand=True)
                        elif value == 8:
                            img = img.rotate(90, expand=True)
        except:
            pass  # Ignora errori EXIF
        
        return img
    
    def get_file_sizes(self, paths: dict) -> dict:
        """Ritorna dimensioni file in KB"""
        return {
            name: Path(path).stat().st_size / 1024
            for name, path in paths.items()
        }
```

**Risultato:**
```
ORIGINALE:     4000×3000 px → 3.5 MB (JPEG)

DOPO PROCESSING:
├─ large:      1920×1440 px → 300 KB (WebP) ← Full screen
├─ medium:     800×600 px   → 80 KB (WebP)  ← Gallery
└─ thumbnail:  300×300 px   → 15 KB (WebP)  ← Card preview

RISPARMIO: 3.5 MB → 395 KB (89% saving!) 🎉
```

---

### 12.4 Conversione WebP

**Perché WebP:**
- ✅ **65-88% più leggero** di JPEG/PNG a parità qualità
- ✅ **Supporto browser 97%+** (Chrome, Firefox, Safari, Edge)
- ✅ **Compressione lossy + lossless** (flessibile)
- ✅ **Trasparenza** supportata (se serve in futuro)

**Confronto Reale:**
```
JPEG 1920×1440 quality 85: ~500 KB
WebP 1920×1440 quality 85: ~180 KB (64% risparmio)

PNG 800×600: ~450 KB
WebP 800×600: ~60 KB (87% risparmio)
```

**Browser Support (2024):**
- Chrome/Edge: ✅ 100% (dal 2010)
- Firefox: ✅ 100% (dal 2019)
- Safari: ✅ 100% (dal iOS 14/macOS Big Sur, 2020)
- **Copertura totale: 97%+ utenti**

**Fallback (non necessario nel 2024, ma possibile):**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.webp" alt="...">
</picture>
```

---

### 12.5 API Upload Immagini

```python
# backend/app/api/endpoints/properties.py

from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.image_processing import ImageProcessor

router = APIRouter()
processor = ImageProcessor()

@router.post("/properties/{property_id}/images")
async def upload_property_images(
    property_id: int,
    files: list[UploadFile] = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Upload multiple immagini per immobile
    Validazione + processing automatico
    """
    # Verifica proprietà appartiene all'utente
    property = db.query(Property).filter(
        Property.id == property_id,
        Property.owner_id == current_user.id
    ).first()
    
    if not property:
        raise HTTPException(404, "Immobile non trovato")
    
    # Validazioni
    if len(files) > 30:
        raise HTTPException(400, "Massimo 30 immagini per annuncio")
    
    uploaded_images = []
    
    for index, file in enumerate(files):
        # Valida tipo file
        if not file.content_type.startswith('image/'):
            raise HTTPException(
                400, 
                f"{file.filename} non è un'immagine valida"
            )
        
        # Valida dimensione (max 20MB originale)
        file.file.seek(0, 2)  # Fine file
        size_mb = file.file.tell() / (1024 * 1024)
        file.file.seek(0)  # Inizio file
        
        if size_mb > 20:
            raise HTTPException(
                400,
                f"{file.filename} troppo grande (max 20MB, è {size_mb:.1f}MB)"
            )
        
        # Processa immagine
        try:
            results = processor.process_property_image(
                file.file,
                property_id,
                index
            )
            
            sizes = processor.get_file_sizes(results)
            
            # Salva nel database
            image = PropertyImage(
                property_id=property_id,
                thumbnail_path=results['thumbnail'],
                medium_path=results['medium'],
                large_path=results['large'],
                original_filename=file.filename,
                file_size_kb=sum(sizes.values()),
                order=index
            )
            
            db.add(image)
            uploaded_images.append({
                'id': image.id,
                'order': index,
                'original_filename': file.filename,
                'sizes_kb': sizes,
                'total_saved_kb': size_mb * 1024 - sum(sizes.values()),
                'urls': {
                    'thumbnail': f'/api/images/{property_id}/img_{index}_thumbnail.webp',
                    'medium': f'/api/images/{property_id}/img_{index}_medium.webp',
                    'large': f'/api/images/{property_id}/img_{index}_large.webp'
                }
            })
            
        except Exception as e:
            logger.error(f"Errore processando {file.filename}: {e}")
            raise HTTPException(
                500,
                f"Errore processando {file.filename}"
            )
    
    db.commit()
    
    total_saved_mb = sum(
        img['total_saved_kb'] for img in uploaded_images
    ) / 1024
    
    return {
        'message': f'{len(files)} immagini caricate e ottimizzate',
        'images': uploaded_images,
        'total_space_saved_mb': round(total_saved_mb, 2),
        'optimization_applied': {
            'resized': True,
            'converted_to_webp': True,
            'compression_level': 85
        }
    }


@router.get("/images/{property_id}/{filename}")
async def serve_image(property_id: int, filename: str):
    """
    Serve immagine ottimizzata
    """
    filepath = Path(f'/mnt/user-data/uploads/properties/{property_id}/{filename}')
    
    if not filepath.exists():
        raise HTTPException(404, "Immagine non trovata")
    
    return FileResponse(
        filepath,
        media_type='image/webp',
        headers={
            'Cache-Control': 'public, max-age=31536000',  # Cache 1 anno
            'Vary': 'Accept-Encoding'
        }
    )
```

---

### 12.6 Eliminazione Automatica

**Due Livelli di Protezione:**

#### **Livello 1: Cascade Delete (Immediato)**

```python
# backend/app/models/property.py

from sqlalchemy import event
from pathlib import Path
import shutil

class Property(Base):
    __tablename__ = "properties"
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    # ...
    
    # Relazione con cascade delete
    images = relationship(
        "PropertyImage",
        back_populates="property",
        cascade="all, delete-orphan"  # ← CRITICO!
    )


class PropertyImage(Base):
    __tablename__ = "property_images"
    
    id = Column(Integer, primary_key=True)
    property_id = Column(Integer, ForeignKey('properties.id'))
    thumbnail_path = Column(String)
    medium_path = Column(String)
    large_path = Column(String)
    order = Column(Integer)
    
    property = relationship("Property", back_populates="images")


# Event Listener: Elimina file fisici quando record eliminato
@event.listens_for(PropertyImage, 'before_delete')
def delete_image_files(mapper, connection, target):
    """
    Elimina files fisici quando PropertyImage eliminata dal DB
    """
    for path in [target.thumbnail_path, target.medium_path, target.large_path]:
        if path and Path(path).exists():
            try:
                Path(path).unlink()
                logger.info(f"Deleted image: {path}")
            except Exception as e:
                logger.error(f"Error deleting {path}: {e}")


# Event Listener: Elimina intera cartella quando Property eliminata
@event.listens_for(Property, 'after_delete')
def delete_property_folder(mapper, connection, target):
    """
    Elimina cartella completa immobile dopo delete
    """
    folder = Path(f'/mnt/user-data/uploads/properties/{target.id}')
    
    if folder.exists():
        try:
            shutil.rmtree(folder)
            logger.info(f"Deleted property folder: {folder}")
        except Exception as e:
            logger.error(f"Error deleting folder {folder}: {e}")
```

#### **Livello 2: Cleanup Job Notturno (Sicurezza)**

```python
# backend/app/tasks/cleanup.py

from pathlib import Path
import shutil
import logging
from sqlalchemy import select

logger = logging.getLogger(__name__)

async def cleanup_orphaned_images():
    """
    Job periodico (ogni notte 3 AM) che trova e elimina immagini orfane
    Sicurezza extra nel caso ci siano problemi con cascade delete
    """
    upload_dir = Path('/mnt/user-data/uploads/properties')
    
    # Get tutti gli ID immobili attivi nel database
    active_property_ids = {
        row[0] for row in db.execute(
            select(Property.id)
        ).fetchall()
    }
    
    deleted_count = 0
    freed_space_mb = 0
    
    # Scansiona cartelle fisiche
    for property_folder in upload_dir.iterdir():
        if not property_folder.is_dir():
            continue
        
        try:
            property_id = int(property_folder.name)
        except ValueError:
            continue
        
        # Se cartella NON corrisponde a immobile attivo → elimina
        if property_id not in active_property_ids:
            # Calcola spazio occupato
            folder_size = sum(
                f.stat().st_size
                for f in property_folder.rglob('*')
                if f.is_file()
            )
            
            # Elimina cartella
            shutil.rmtree(property_folder)
            
            deleted_count += 1
            freed_space_mb += folder_size / (1024 * 1024)
            
            logger.info(f"Deleted orphaned folder: {property_folder}")
    
    logger.info(
        f"Cleanup completato: {deleted_count} cartelle eliminate, "
        f"{freed_space_mb:.2f} MB liberati"
    )
    
    # Salva statistiche
    await save_cleanup_stats(deleted_count, freed_space_mb)
    
    return {
        'deleted_folders': deleted_count,
        'freed_space_mb': round(freed_space_mb, 2)
    }


# Schedule con APScheduler
from apscheduler.schedulers.asyncio import AsyncIOScheduler

scheduler = AsyncIOScheduler()
scheduler.add_job(
    cleanup_orphaned_images,
    'cron',
    hour=3,  # Ogni notte alle 3 AM
    minute=0
)
scheduler.start()
```

---

### 12.7 Database Schema

```python
# backend/app/models/property_image.py

class PropertyImage(Base):
    __tablename__ = "property_images"
    
    id = Column(Integer, primary_key=True)
    property_id = Column(Integer, ForeignKey('properties.id'))
    
    # Paths per ogni versione
    thumbnail_path = Column(String, nullable=False)
    medium_path = Column(String, nullable=False)
    large_path = Column(String, nullable=False)
    
    # Metadata
    original_filename = Column(String)
    file_size_kb = Column(Float)  # Totale tutte versioni
    width = Column(Integer)  # Larghezza originale
    height = Column(Integer)  # Altezza originale
    order = Column(Integer, default=0)  # Ordine visualizzazione
    
    # Timestamps
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    
    # Relazione
    property = relationship("Property", back_populates="images")
```

---

### 12.8 Frontend - Upload con Preview

```tsx
// components/ImageUpload.tsx

import { useState } from 'react'

export function ImageUpload({ propertyId }: { propertyId: number }) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    
    // Validazione client-side
    const validFiles = selectedFiles.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} non è un'immagine`)
        return false
      }
      if (file.size > 20 * 1024 * 1024) {
        alert(`${file.name} è troppo grande (max 20MB)`)
        return false
      }
      return true
    })
    
    setFiles(prev => [...prev, ...validFiles].slice(0, 30))
  }
  
  const handleUpload = async () => {
    if (files.length === 0) return
    
    setUploading(true)
    
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    
    try {
      const response = await fetch(
        `/api/properties/${propertyId}/images`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        }
      )
      
      if (response.ok) {
        const result = await response.json()
        alert(
          `✓ ${result.images.length} immagini caricate!\n` +
          `Spazio risparmiato: ${result.total_space_saved_mb.toFixed(1)} MB`
        )
        setFiles([])
        // Reload images
        window.location.reload()
      } else {
        const error = await response.json()
        alert(`Errore: ${error.detail}`)
      }
    } catch (error) {
      alert('Errore durante caricamento')
    } finally {
      setUploading(false)
    }
  }
  
  return (
    <div className="image-upload">
      <div className="upload-area">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="upload-button bg-primary text-white px-6 py-3 rounded-lg cursor-pointer"
        >
          📸 Seleziona Foto (max 30)
        </label>
      </div>
      
      {/* Preview Grid */}
      {files.length > 0 && (
        <div className="preview-grid grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
          {files.map((file, i) => (
            <div key={i} className="preview-item relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${i + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6"
              >
                ×
              </button>
              <div className="text-xs mt-1 text-gray-600 text-center">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </div>
            </div>
          ))}
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-6">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-secondary text-gray-900 px-8 py-4 rounded-lg font-bold w-full"
          >
            {uploading
              ? '⏳ Caricamento e ottimizzazione...'
              : `🚀 Carica ${files.length} Foto`}
          </button>
          
          <p className="text-sm text-gray-600 text-center mt-3">
            💡 Le immagini saranno automaticamente ottimizzate e convertite in WebP
          </p>
        </div>
      )}
    </div>
  )
}
```

---

### 12.9 Risparmio Spazio - Confronto

```
SCENARIO: Marketplace con 10.000 annunci (15 foto ciascuno)

SENZA OTTIMIZZAZIONE:
├─ 1 foto: ~4 MB (JPEG originale)
├─ 15 foto/annuncio: 60 MB
├─ 10.000 annunci: 600 GB storage
├─ Bandwidth (10k visite/giorno): ~1.8 TB/mese
└─ COSTI: €60-100/mese storage + €180-300/mese bandwidth = €240-400/mese

CON OTTIMIZZAZIONE (WebP + Ridimensionamento):
├─ 1 foto: 3 versioni = 395 KB (WebP ottimizzato)
├─ 15 foto/annuncio: ~6 MB
├─ 10.000 annunci: 60 GB storage (90% risparmio!)
├─ Bandwidth: ~180 GB/mese (90% risparmio!)
└─ COSTI: €10-15/mese storage + €20-40/mese bandwidth = €30-55/mese

RISPARMIO TOTALE: €210-345/mese (85-88%) 🎉
```

**Su 3 anni:** Risparmio €7.500-12.500! 💰

---

### 12.10 Dipendenze e Setup

```bash
# Requirements
pip install Pillow --break-system-packages  # Image processing
pip install python-magic --break-system-packages  # File type detection

# Verifica supporto WebP in Pillow
python3 -c "from PIL import Image; print(Image.SAVE.get('WEBP'))"
# Should print: <built-in function webp_encoder>
```

---

### 12.11 Monitoring e Metriche

**KPI Da Monitorare:**
```python
# Dashboard Admin
{
    'total_images': 45000,
    'total_storage_gb': 62.5,
    'average_compression_rate': 87.2,  # %
    'total_bandwidth_saved_tb': 5.4,
    'cleanup_runs_last_month': 30,
    'orphaned_images_deleted': 145,
    'space_freed_mb': 1250
}
```

**Alert da Configurare:**
- Storage usage >80% → upgrade necessario
- Cleanup job failed → manuale review
- Upload error rate >5% → investiga

---

## 13. UX INSERIMENTO ANNUNCI GUIDATO

### 13.1 Obiettivo

**Problema:** Target anziani (65-80 anni) spesso hanno difficoltà con form complessi online.

**Soluzione:** Sistema guidato step-by-step con:
- ✅ Help inline sempre disponibile
- ✅ Popup con spiegazioni dettagliate
- ✅ Video tutorial per campi complessi
- ✅ Esempi visivi
- ✅ Preview live dell'annuncio
- ✅ Linguaggio semplice e chiaro
- ✅ Possibilità di salvare e continuare dopo

**Principio:** "Nessuno resta bloccato" - aiuto disponibile per ogni campo.

---

### 13.2 Wizard Multi-Step

**5 Step con Progress Bar Visibile:**

```tsx
// components/PropertyWizard.tsx

const STEPS = [
  { id: 1, title: 'Dati Base', icon: '🏠' },
  { id: 2, title: 'Caratteristiche', icon: '📐' },
  { id: 3, title: 'Foto', icon: '📸' },
  { id: 4, title: 'Documenti', icon: '📄' },
  { id: 5, title: 'Pubblica', icon: '✅' }
]

export function PropertyWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  
  return (
    <div className="wizard-container max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="progress-bar flex justify-between mb-12">
        {STEPS.map(step => (
          <div
            key={step.id}
            className={`step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-number">{step.id}</div>
            <div className="step-label">{step.title}</div>
          </div>
        ))}
      </div>
      
      {/* Step Content */}
      <div className="step-content bg-white p-8 rounded-xl shadow-md">
        {currentStep === 1 && <Step1DatiBase data={formData} onChange={setFormData} />}
        {currentStep === 2 && <Step2Caratteristiche data={formData} onChange={setFormData} />}
        {currentStep === 3 && <Step3Foto data={formData} onChange={setFormData} />}
        {currentStep === 4 && <Step4Documenti data={formData} onChange={setFormData} />}
        {currentStep === 5 && <Step5Pubblica data={formData} />}
      </div>
      
      {/* Navigation */}
      <div className="wizard-navigation flex justify-between mt-8">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="btn-secondary"
          >
            ← Indietro
          </button>
        )}
        
        <button
          onClick={() => saveAndExit()}
          className="btn-outline"
        >
          💾 Salva e Continua Dopo
        </button>
        
        {currentStep < 5 && (
          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="btn-primary"
          >
            Avanti →
          </button>
        )}
        
        {currentStep === 5 && (
          <button
            onClick={() => publishProperty()}
            className="btn-primary bg-secondary"
          >
            ✅ Pubblica Annuncio
          </button>
        )}
      </div>
    </div>
  )
}
```

---

### 13.3 Sistema Help Inline + Popup

**Ogni Campo con Aiuto Disponibile:**

```tsx
// components/FormFieldWithHelp.tsx

export function FormFieldWithHelp({
  label,
  name,
  type = 'text',
  helpContent,
  placeholder,
  value,
  onChange
}) {
  const [showHelp, setShowHelp] = useState(false)
  
  return (
    <div className="form-field mb-6">
      {/* Label con Help Icon */}
      <label className="block font-semibold mb-2 flex items-center gap-2">
        {label}
        <button
          type="button"
          onClick={() => setShowHelp(true)}
          className="help-icon w-6 h-6 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          title="Clicca per aiuto"
        >
          ?
        </button>
      </label>
      
      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      
      {/* Inline Hint */}
      {helpContent.inlineHint && (
        <div className="inline-hint text-sm text-gray-600 mt-2 flex items-start gap-2">
          <span>💡</span>
          <span>{helpContent.inlineHint}</span>
        </div>
      )}
      
      {/* Help Popup */}
      {showHelp && (
        <HelpPopup
          title={helpContent.title}
          content={helpContent}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  )
}
```

**Popup Help Completo:**

```tsx
// components/HelpPopup.tsx

export function HelpPopup({ title, content, onClose }) {
  return (
    <div className="help-popup-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="help-popup-content bg-white rounded-xl max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="popup-header bg-primary text-white p-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-3xl hover:bg-white/20 w-10 h-10 rounded-full"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="popup-body p-6">
          {/* Descrizione */}
          <div className="description text-gray-700 mb-6">
            {content.description}
          </div>
          
          {/* Esempio Visivo */}
          {content.example && (
            <div className="example-box bg-green-50 p-6 rounded-lg mb-6">
              <h4 className="font-bold mb-3">📝 Esempio:</h4>
              {typeof content.example === 'string' ? (
                <p>{content.example}</p>
              ) : (
                content.example  // Può essere componente React
              )}
            </div>
          )}
          
          {/* Dove Trovare Info */}
          {content.whereToFind && (
            <div className="where-to-find mb-6">
              <h4 className="font-bold mb-3">📄 Dove Trovarlo:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {content.whereToFind.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {content.whereToFindImage && (
                <img
                  src={content.whereToFindImage}
                  alt="Dove trovare"
                  className="mt-4 rounded-lg border border-gray-300"
                />
              )}
            </div>
          )}
          
          {/* Video Tutorial */}
          {content.videoUrl && (
            <div className="video-tutorial mb-6">
              <h4 className="font-bold mb-3">🎥 Video Guida (2 min):</h4>
              <video
                controls
                poster={content.videoPoster}
                className="w-full rounded-lg"
              >
                <source src={content.videoUrl} type="video/mp4" />
              </video>
            </div>
          )}
          
          {/* Tips */}
          {content.tips && (
            <div className="tips bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">💡 Consigli:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {content.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="popup-footer p-6 border-t">
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold"
          >
            ✓ Ho Capito
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

### 13.4 Contenuti Help per Campi Complessi

**Esempio: Superficie Commerciale**

```typescript
const HELP_SUPERFICIE_COMMERCIALE = {
  title: "Cos'è la Superficie Commerciale?",
  
  description: `
    È la superficie totale dell'immobile calcolata secondo criteri catastali. 
    Include gli spazi interni e una percentuale di balconi, terrazze e pertinenze.
  `,
  
  inlineHint: "La superficie che trovi sulla planimetria catastale",
  
  example: (
    <table className="w-full">
      <tbody>
        <tr>
          <td>Appartamento</td>
          <td className="text-right">75 mq</td>
        </tr>
        <tr>
          <td>Balcone 10 mq × 30%</td>
          <td className="text-right">3 mq</td>
        </tr>
        <tr>
          <td>Cantina 15 mq × 50%</td>
          <td className="text-right">7.5 mq</td>
        </tr>
        <tr className="font-bold border-t-2 border-primary">
          <td>Superficie Commerciale</td>
          <td className="text-right">85.5 mq</td>
        </tr>
      </tbody>
    </table>
  ),
  
  whereToFind: [
    "Planimetria catastale (sezione 'Dati Metrici')",
    "Atto di compravendita",
    "Perizia tecnica"
  ],
  
  whereToFindImage: "/examples/planimetria-catastale-superficie.jpg",
  
  videoUrl: "/tutorials/come-calcolare-superficie-commerciale.mp4",
  videoPoster: "/thumbnails/superficie.jpg",
  
  tips: [
    "Puoi richiedere la planimetria catastale online (costa ~€1.35)",
    "Se non sei sicuro, lascia vuoto e lo calcoleremo noi dalla planimetria",
    "La superficie commerciale è diversa dalla superficie calpestabile"
  ]
}
```

**Esempio: Classe Energetica**

```typescript
const HELP_CLASSE_ENERGETICA = {
  title: "Classe Energetica dell'Immobile",
  
  description: `
    Indica l'efficienza energetica dell'immobile. 
    Trovi questa informazione nell'APE (Attestato Prestazione Energetica), 
    obbligatorio per legge per vendere o affittare.
  `,
  
  inlineHint: "Dall'APE - varia da A+ (ottima) a G (pessima)",
  
  example: (
    <div className="energy-scale space-y-2">
      <div className="class bg-green-600 text-white p-2 rounded">A+ Ottima</div>
      <div className="class bg-green-500 text-white p-2 rounded">A Buona</div>
      <div className="class bg-green-400 text-white p-2 rounded">B Discreta</div>
      <div className="class bg-yellow-400 text-gray-900 p-2 rounded">C Media</div>
      <div className="class bg-yellow-500 text-gray-900 p-2 rounded">D Bassa</div>
      <div className="class bg-orange-500 text-white p-2 rounded">E Scarsa</div>
      <div className="class bg-red-500 text-white p-2 rounded">F Pessima</div>
      <div className="class bg-red-700 text-white p-2 rounded">G Pessima</div>
    </div>
  ),
  
  whereToFind: [
    "APE (Attestato Prestazione Energetica)",
    "Se non ce l'hai, devi richiederlo a un tecnico abilitato"
  ],
  
  whereToFindImage: "/examples/ape-classe-energetica.jpg",
  
  tips: [
    "L'APE è obbligatorio per vendere",
    "Costa circa €150-300 farlo",
    "Ha validità 10 anni",
    "Molti tecnici lo fanno in 3-5 giorni"
  ],
  
  externalLink: {
    label: "Trova un tecnico abilitato",
    url: "https://www.cti2000.it/certificatori-energetici/"
  }
}
```

**Esempio: Rendita Catastale**

```typescript
const HELP_RENDITA_CATASTALE = {
  title: "Rendita Catastale",
  
  description: `
    È un valore fiscale attribuito dall'Agenzia delle Entrate al tuo immobile.
    Serve per calcolare imposte come IMU e per la vendita.
  `,
  
  inlineHint: "Valore fiscale - trovi su visura catastale o atto",
  
  whereToFind: [
    "Visura catastale",
    "Atto di compravendita",
    "Bolletta IMU"
  ],
  
  whereToFindImage: "/examples/visura-catastale-rendita.jpg",
  
  onlineService: {
    title: "🌐 Richiedila Online",
    description: "Puoi richiedere la visura catastale sul sito dell'Agenzia delle Entrate",
    cost: "Costa €1.35",
    requirements: "Serve SPID o CIE",
    url: "https://www.agenziaentrate.gov.it/portale/schede/fabbricatiterreni/visura-catastale-online"
  },
  
  tips: [
    "Se non ce l'hai, richiedila online (è veloce)",
    "È un dato pubblico del tuo immobile",
    "Può essere diversa dalla rendita presunta (che usiamo per valutazione)"
  ]
}
```

---

### 13.5 Video Tutorial Embedded

**Video per Step Complessi:**

```tsx
// components/VideoTutorialSection.tsx

export function VideoTutorialSection({ stepTitle, videoId }) {
  const [showVideo, setShowVideo] = useState(false)
  
  const videos = {
    'fotografare-casa': {
      url: '/tutorials/come-fotografare-immobile.mp4',
      title: 'Come Fotografare l\'Immobile per l\'Annuncio',
      duration: '2:30',
      tips: [
        'Fotografa di giorno con luce naturale',
        'Ogni stanza da almeno 2 angolazioni',
        'Riordina e pulisci prima di fotografare',
        'Min 10 foto, max 30 foto',
        'Includi: esterno, ogni stanza, bagno, cucina, balcone'
      ]
    },
    'documenti-necessari': {
      url: '/tutorials/documenti-per-vendere-casa.mp4',
      title: 'Quali Documenti Servono per Vendere',
      duration: '3:45',
      tips: [
        'APE (Attestato Prestazione Energetica)',
        'Planimetria catastale',
        'Visura catastale',
        'Atto di proprietà',
        'Certificato di agibilità (se presente)'
      ]
    }
  }
  
  const video = videos[videoId]
  
  return (
    <div className="video-tutorial-section mb-8">
      <button
        onClick={() => setShowVideo(true)}
        className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold text-blue-900 transition-colors"
      >
        <span className="text-2xl">▶️</span>
        <span>Guarda Tutorial: {stepTitle}</span>
        <span className="text-sm opacity-70">({video.duration})</span>
      </button>
      
      {showVideo && (
        <div className="video-modal fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="video-container bg-white rounded-xl p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{video.title}</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-3xl hover:bg-gray-100 w-10 h-10 rounded-full"
              >
                ×
              </button>
            </div>
            
            <video
              controls
              autoPlay
              className="w-full rounded-lg mb-4"
            >
              <source src={video.url} type="video/mp4" />
            </video>
            
            <div className="tips bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">💡 Punti Chiave:</h4>
              <ul className="list-disc list-inside space-y-1">
                {video.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

**Uso nello Step Foto:**

```tsx
function Step3Foto({ data, onChange }) {
  return (
    <div className="step-content">
      <h2 className="text-3xl font-bold mb-6">
        📸 Carica le Foto dell'Immobile
      </h2>
      
      {/* Video Tutorial */}
      <VideoTutorialSection
        stepTitle="Come Fotografare l'Immobile"
        videoId="fotografare-casa"
      />
      
      {/* Upload Component */}
      <ImageUpload
        propertyId={data.propertyId}
        onUploadComplete={(images) => onChange({ ...data, images })}
      />
      
      {/* Tips Box */}
      <div className="tips-box bg-yellow-50 p-6 rounded-lg mt-6">
        <h4 className="font-bold mb-3">⚡ Consigli Rapidi:</h4>
        <ul className="space-y-2">
          <li>✓ Prima foto = copertina annuncio (scegli la migliore!)</li>
          <li>✓ Foto chiare e luminose vendono meglio</li>
          <li>✓ Mostra i punti di forza (vista, luminosità, spazi)</li>
          <li>✓ Evita foto con persone o oggetti personali</li>
        </ul>
      </div>
    </div>
  )
}
```

---

### 13.6 Preview Live Annuncio

**Due Colonne: Form + Preview**

```tsx
// components/PropertyFormWithPreview.tsx

export function PropertyFormWithPreview() {
  const [formData, setFormData] = useState({})
  
  return (
    <div className="form-with-preview grid lg:grid-cols-2 gap-8">
      {/* Left Column: Form */}
      <div className="form-column">
        <h2 className="text-2xl font-bold mb-6">Modifica Annuncio</h2>
        
        <FormFieldWithHelp
          label="Titolo Annuncio"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Es: Appartamento luminoso in centro"
          helpContent={HELP_TITOLO}
        />
        
        <FormFieldWithHelp
          label="Prezzo (€)"
          name="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="Es: 185000"
          helpContent={HELP_PREZZO}
        />
        
        {/* Altri campi... */}
      </div>
      
      {/* Right Column: Live Preview (Sticky) */}
      <div className="preview-column">
        <div className="sticky top-24">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>👁️</span>
            <span>Anteprima Live</span>
          </h3>
          
          <div className="preview-card bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
            {/* Property Card Preview */}
            <PropertyCard property={formData} isPreview={true} />
          </div>
          
          <p className="text-sm text-gray-600 mt-4 text-center">
            Questo è come vedranno il tuo annuncio gli utenti
          </p>
        </div>
      </div>
    </div>
  )
}
```

---

### 13.7 Salvataggio Progressivo

**Auto-Save + Manuale:**

```tsx
// Hook per auto-save
function useAutoSave(data, delay = 30000) {
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (data.propertyId) {
        await fetch(`/api/properties/${data.propertyId}/draft`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        
        // Toast notification
        toast.success('✓ Bozza salvata automaticamente')
      }
    }, delay)
    
    return () => clearTimeout(timer)
  }, [data, delay])
}

// Nel wizard
function PropertyWizard() {
  const [formData, setFormData] = useState({})
  
  // Auto-save ogni 30 secondi
  useAutoSave(formData, 30000)
  
  const saveAndExit = async () => {
    await saveDraft(formData)
    toast.success('✓ Bozza salvata! Puoi continuare in seguito')
    router.push('/dashboard')
  }
  
  // ...
}
```

---

### 13.8 Validazione User-Friendly

**Messaggi Chiari e Costruttivi:**

```tsx
// NO ❌
<p>Campo required</p>

// SÌ ✅
<p className="error">
  💡 Inserisci il titolo dell'annuncio. 
  Questo aiuta gli acquirenti a trovare la tua casa.
</p>

// NO ❌
<p>Invalid email</p>

// SÌ ✅
<p className="error">
  📧 L'email sembra non essere corretta. 
  Controlla che sia nel formato: tuonome@example.com
</p>

// NO ❌
<p>Price must be number</p>

// SÌ ✅
<p className="error">
  💰 Il prezzo deve essere un numero (solo cifre, senza €).
  Es: 185000
</p>
```

---

### 13.9 Accessibility per Anziani

**Design Choices:**

```css
/* Font size più grandi */
body {
  font-size: 18px;  /* vs standard 16px */
}

h1 { font-size: 48px; }
h2 { font-size: 36px; }

/* Bottoni grandi con target area ampia */
.btn {
  min-height: 48px;  /* Touch-friendly */
  padding: 16px 32px;
  font-size: 18px;
}

/* Contrasti elevati */
/* Rispetta WCAG AAA (7:1) dove possibile */

/* Spazi generosi */
.form-field {
  margin-bottom: 32px;  /* vs 16px */
}

/* Input grandi */
input, select, textarea {
  font-size: 18px;
  padding: 16px;
  min-height: 56px;
}

/* Help icon molto visibile */
.help-icon {
  width: 32px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
}
```

---

### 13.10 Testing con Target

**Before Launch:**

```
Test con 5 utenti reali target (65-80 anni):

1. Osserva dove si bloccano
2. Annota domande frequenti
3. Migliora help inline
4. Aggiungi esempi dove manca
5. Semplifica linguaggio

Metriche:
- Tasso completamento wizard: >80%
- Tempo medio: <15 minuti
- Click su help: quale campo?
- Abbandoni: quale step?
```

---

## 14. ROADMAP DI SVILUPPO

*Vedi documento separato GANTT_TIMELINE.xlsx per timeline dettagliata che include anche attività non-sviluppo (legal, marketing, fundraising)*

### Fase 1: FONDAMENTA (Mesi 1-2)

**Settimane 1-2: Infrastructure**
- Setup server Debian
- Configurazione ISPConfig
- Installazione stack (Python, PostgreSQL, Redis, Nginx)
- Setup repository Git
- Registrazione dominio + SSL

**Settimane 3-4: Backend Core**
- Setup FastAPI + PostgreSQL
- Schema database completo
- Import dati OMI
- API autenticazione (JWT)
- API CRUD base

**Settimane 5-6: Algoritmo Valutazione**
- Implementazione algoritmo calcolo nuda proprietà
- Integrazione dati OMI + tavole ISTAT
- API endpoint valutazione
- Testing su 100 casi reali

**Settimane 7-8: Frontend Base**
- Setup Next.js + TypeScript
- Design system (Tailwind)
- Homepage
- Pagina ricerca annunci
- Pagina dettaglio annuncio
- Form registrazione/login

### Fase 2: FUNZIONALITÀ CORE (Mesi 3-4)

**Settimane 9-10: Gestione Annunci**
- Form inserimento annuncio (multi-step)
- Upload foto + compressione
- Upload documenti
- Dashboard proprietario
- Moderazione admin

**Settimane 11-12: Sistema Pagamenti**
- Integrazione Stripe
- Gestione abbonamenti
- Plus a pagamento
- Featured listings
- Dashboard billing

**Settimane 13-14: Mappe e Geolocalizzazione**
- Integrazione Google Maps
- Geocoding indirizzi
- Visualizzazione aree/pin
- Ricerca geografica
- POI nelle vicinanze

**Settimane 15-16: Sistema Contatti**
- Form contatto proprietario
- Email notifications (AWS SES)
- SMS notifications (Twilio)
- Dashboard conversazioni

### Fase 3: FUNZIONALITÀ AVANZATE (Mesi 5-6)

**Settimane 17-18: Investitori Premium**
- Dashboard investitore
- Filtri ricerca avanzati
- Sistema alerts
- Annunci preferiti
- Export PDF/Excel

**Settimane 19-20: Agenzie**
- Dashboard agenzia
- Gestione multipla annunci
- Analytics per agenzia
- Lead management

**Settimane 21-22: Partner & Blog**
- Directory partner
- CMS blog
- SEO optimization blog
- Newsletter system

**Settimane 23-24: Accessibilità & i18n**
- Audit accessibilità
- Fix WCAG 2.1 Level AA
- Sistema multilingua
- Integrazione DeepL

### Fase 4: POLISH & LANCIO (Mesi 7-8)

**Settimane 25-26: GDPR & Privacy**
- Cookie banner
- Privacy policy completa
- Export dati utente
- Cancellazione account

**Settimane 27-28: Analytics & SEO**
- Google Analytics 4
- Dashboard admin analytics
- SEO optimization completo
- Schema.org markup

**Settimane 29-30: Testing & Bug Fixing**
- Testing completo
- Security audit
- Performance optimization
- Mobile testing

**Settimane 31-32: Lancio Beta**
- Onboarding 20 agenzie
- 50+ annunci seed
- Marketing materials
- **LANCIO BETA**

---

## 15. COMPETITOR ANALYSIS

### 11.1 Competitor Diretti

#### Casanuda.it
- **Modello**: Agenzia immobiliare specializzata + portale
- **Presenza**: Milano e zone limitrofe
- **Punti forza**: Brand consolidato, expertise settore, servizi completi
- **Punti deboli**: 
  - Modello agenzia tradizionale (non marketplace)
  - Presenza geografica limitata
  - No algoritmo valutazione pubblico
  - No piattaforma per agenzie esterne
- **Conclusione**: Competitor ma con modello diverso (B2C vs B2B)

#### Preatoni Nuda Proprietà
- **Modello**: Investitore diretto (comprano e rivendono)
- **NON è marketplace** - acquistano direttamente immobili
- **Conclusione**: NON competitor diretto (modello completamente diverso)

### 11.2 Competitor Indiretti

#### Idealista.it, Immobiliare.it
- Hanno sezioni "nuda proprietà" con migliaia di annunci
- **NON specializzati** - è solo una categoria tra tante
- **Punti forza**: Enorme traffico, brand awareness
- **Punti deboli**: 
  - Nessuna specializzazione
  - Nessun tool dedicato
  - Nessun algoritmo valutazione
- **Opportunità**: Possiamo offrire esperienza superiore per questo segmento

### 11.3 Nostri Vantaggi Competitivi

**NON ESISTE ancora in Italia un marketplace puro dedicato alla nuda proprietà con:**
- ✅ Algoritmo valutazione automatica real-time
- ✅ Piattaforma SaaS per agenzie
- ✅ Network partner certificati integrato
- ✅ Freemium model scalabile
- ✅ Copertura nazionale completa
- ✅ Focus UX accessibile (senior-friendly)
- ✅ Tools avanzati (matching, alert, analytics)

**First-mover advantage** su questo segmento specifico!

### 11.4 Barriere all'Ingresso (Nostre Difese)

1. **Network effects**: Più annunci → più utenti → più annunci
2. **Brand**: Diventare IL brand di riferimento
3. **Partnerships**: Contratti esclusivi con agenzie top
4. **Technology**: Algoritmo proprietario in continuo miglioramento
5. **Community**: Base utenti fedele
6. **Data**: Database OMI + storico transazioni = insights unici

### 11.5 Dati Mercato

- **Volume**: ~27.000 transazioni/anno (3,8% mercato immobiliare)
- **Crescita**: +12% domanda, +11% offerta (anno 2025 vs 2024)
- **Trend ricerche**: +142% in 5 anni (Google Trends)
- **Prezzo medio**: €2.034/mq vs €2.109/mq mercato tradizionale
- **Venditori**: 66,7% over-65
- **Acquirenti**: 28,3% età 45-54 anni
- **Regioni top**: Lazio (Roma), Lombardia (Milano), Veneto, Toscana

---

## 16. NOTE IMPORTANTI

### 13.1 Costi Operativi Anno 1 (Aggiornati)

**Setup Iniziale:**
```
Server VPS: €200-500
Badge partner: €500-800 (100 badge)
Dominio + SSL: €50
Consulenze legali: €2.000-3.000
TOTALE Setup: ~€3.000-5.000
```

**Costi Mensili (1.000 appuntamenti):**
```
Hosting VPS: €200-500/mese
Google Maps API: €70-350/mese
SMS (Twilio): €110/mese (2 SMS/appuntamento)
IVR Voice (Twilio): €2/mese (200 verifiche)
Numero Verde 800: €50/mese
Email (AWS SES): <€10/mese
Operatore part-time: €1.000/mese
Stripe fees: ~2% revenue
Background checks: €200/mese
Assicurazione: €400/mese
DeepL API: <€10/mese

TOTALE: ~€2.200-3.200/mese = €26.400-38.400/anno
```

**vs Stime Iniziali (senza IVR):**
- Prima: €30.000+/anno
- Ora: €26.400-38.400/anno
- Sistema IVR risparmia: €3.600-5.000/anno (vs tutto operatori)

**Marketing Anno 1 (Brand Building + SEO):**
```
Google Ads (primi 6-12 mesi): €6.000-12.000/anno
Content Marketing (copywriter): €6.000-10.000/anno
SEO Tools (Semrush/Ahrefs): €1.200/anno
Social Media Ads: €3.000-6.000/anno
Brand Identity (logo, materiali): €1.500-3.000 (one-time)

TOTALE Marketing Anno 1: €17.700-32.200
```

**TOTALE COSTI ANNO 1:**
```
Operativi: €26.400-38.400
Marketing: €17.700-32.200
Setup iniziale: €3.000-5.000

TOTALE: €47.100-75.600/anno
```

**Break-even:**
- Con 200 investitori premium (€49/mese) + 20 agenzie (€199/mese) = €13.780/mese
- Revenue mensile necessario: ~€4.000-6.300/mese
- Break-even: Mese 12-18 (considerando crescita graduale)

**Note Brand "Mia Per Sempre":**
- Costi marketing più alti anno 1 (vs nome keyword-rich)
- Investimento in brand awareness recuperato anno 2-3
- Brand forte = margini migliori long-term

### 13.2 Aspetti Legali da Verificare

**CRITICI (prima del lancio):**
1. ✅ Consulenza avvocato immobiliare: Confermare che modello marketplace non richiede licenza intermediazione
2. ✅ Consulenza commercialista: Implicazioni fiscali, fatturazione B2B vs B2C
3. ✅ Privacy policy certificata: Iubenda o avvocato specializzato
4. ✅ Termini e condizioni: Limitazioni responsabilità, cosa possiamo/non possiamo fare
5. ✅ Assicurazione per sistema sicurezza appuntamenti

**IMPORTANTI (primi 6 mesi):**
- Assicurazione RC professionale (€500-1.000/anno)
- Assicurazione visite partner (€2.000-5.000/anno)
- DPO (Data Protection Officer) se necessario
- Registro imprese (startup innovativa)

### 13.3 Rischi e Mitigazioni

**Rischio 1: Competitor grandi copiano features**
- Mitigazione: Speed to market, specializzazione, community, sistema sicurezza come differenziatore

**Rischio 2: Compliance legale non corretta**
- Mitigazione: Consulenze prima del lancio, T&C chiari

**Rischio 3: Bassa adozione utenti**
- Mitigazione: Validazione con 20+ interviste, beta chiusa con agenzie, sistema sicurezza come USP

**Rischio 4: Costi marketing troppo alti**
- Mitigazione: Focus SEO organic, partnerships, referral program

**Rischio 5: Problemi tecnici/sicurezza**
- Mitigazione: Security audit, backup, monitoring

**Rischio 6: Truffe o incidenti durante visite**
- Mitigazione: Sistema verifica multi-livello, background check obbligatorio, assicurazione

### 13.4 Metriche di Successo (KPI)

**Mese 1-3 (Beta):**
- 20 agenzie registrate
- 100+ annunci pubblicati
- 1.000+ utenti registrati
- 50+ contatti facilitati

**Mese 6:**
- 50 agenzie
- 500 annunci
- 5.000 utenti
- 200+ transazioni facilitate
- €10k MRR

**Anno 1:**
- 100+ agenzie
- 2.000+ annunci
- 20.000+ utenti
- 1.000+ transazioni
- €100k ARR

**Anno 2:**
- 500+ annunci
- €420k ARR
- Break-even

### 13.5 Team Necessario (Roadmap Assunzioni)

**Anno 1 (Bootstrap):**
- Founder (tu) - Full-time
- Sviluppatore (Claude!) - Collaborazione
- [Opzionale] Freelance design per UI/UX

**Anno 2 (Post-fundraising):**
- Customer Success Manager (1)
- Marketing Manager (1)
- Developer Full-stack (1)
- Commerciale B2B (1)

**Anno 3 (Scaling):**
- + Content Writer/SEO (1)
- + Sales Team (2-3)
- + Customer Support (2)
- + Developer (1)

### 13.6 Fundraising Strategy

**Fase 1: Bootstrap (€10-25k)**
- Fondi propri / Friends & Family
- Obiettivo: MVP + primi clienti

**Fase 2: Pre-seed (€100-300k)**
- Equity Crowdfunding (Mamacrowd, CrowdFundMe)
- Business Angels (Italian Angels for Growth)
- Momento: Dopo traction (100+ annunci, 500+ utenti)

**Fase 3: Seed (€500k-2M)**
- VC + Business Angels
- Momento: Break-even in vista, scaling

**Bandi Pubblici (parallelo):**
- Smart&Start Italia (Invitalia) - €1.5M (70% fondo perduto)
- Bandi regionali

### 13.7 Prossimi Step Immediati

**✅ COMPLETATI:**
1. ✅ Nome definitivo: **Mia Per Sempre**
2. ✅ Dominio registrato: **miapersempre.it**

**DA FARE QUESTA SETTIMANA:**
1. [ ] Registrare social @miapersempre (Instagram, Facebook, LinkedIn)
2. [ ] Brief designer per logo (con payoff)
3. [ ] Consultare avvocato immobiliare (2-3 ore)
4. [ ] Intervistare 5 agenzie per feedback concept
5. [ ] Setup ambiente sviluppo locale (Laragon + PostgreSQL)

**PROSSIME 2 SETTIMANE:**
1. [ ] Logo e brand identity finalizzati
2. [ ] Setup server Debian + ISPConfig (produzione)
3. [ ] Creare repository Git
4. [ ] Setup database + import OMI
5. [ ] Implementare algoritmo valutazione
6. [ ] Primo test funzionante

**PROSSIMO MESE:**
1. [ ] Backend API completo
2. [ ] Frontend homepage + ricerca
3. [ ] Setup Google Ads account
4. [ ] Piano content 30 primi articoli blog
5. [ ] Onboarding 5 agenzie beta
6. [ ] Primo annuncio reale pubblicato

---

## 📞 CONTATTI E RISORSE

**Repository:** [DA CREARE]  
**Staging:** [DA CONFIGURARE]  
**Production:** [DA CONFIGURARE]

**Servizi Esterni:**
- Google Cloud Console: [URL]
- AWS Console: [URL]
- Stripe Dashboard: [URL]
- Twilio Console: [URL]
- DeepL API: [URL]
- Cloudflare Dashboard: [URL]

**Documentazione Tecnica:**
- FastAPI: https://fastapi.tiangolo.com/
- Next.js: https://nextjs.org/docs
- PostgreSQL: https://www.postgresql.org/docs/
- TailwindCSS: https://tailwindcss.com/docs

**Tools:**
- Figma (Design): [URL]
- Notion (Project Management): [URL]
- GitHub Issues (Bug Tracking): [URL]

---

**FINE DOCUMENTAZIONE**

*Questa documentazione è un documento vivo e sarà aggiornata man mano che il progetto evolve. Versione corrente: 1.2*

---

**Brand:** Mia Per Sempre  
**Dominio:** miapersempre.it  
**Status:** Ready to Build 🚀
