# app/api/endpoints/valuation.py
"""
Endpoint API per valutazione nuda proprietà.
Mia Per Sempre - Marketplace Nuda Proprietà

Endpoint:
- POST /api/v1/valuation/calculate - Calcola valutazione completa
- GET /api/v1/valuation/coefficients - Visualizza coefficienti usufrutto
- GET /api/v1/valuation/zones/{comune} - Lista zone OMI per comune
"""

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field, field_validator
from typing import Optional, Dict, Any, List
from enum import Enum
import logging

# Import dal servizio esistente
from app.services.valuation_service import ValuationService, PropertyData

# Logger
logger = logging.getLogger(__name__)

# Router
router = APIRouter()


# ============================================================
# ENUMS PER REQUEST
# ============================================================

class StatoConservazione(str, Enum):
    DA_RISTRUTTURARE = "da_ristrutturare"
    BUONO = "buono"
    RISTRUTTURATO = "ristrutturato"
    FINEMENTE_RISTRUTTURATO = "finemente_ristrutturato"
    NUOVA_COSTRUZIONE = "nuova_costruzione"


class Luminosita(str, Enum):
    MOLTO_LUMINOSO = "molto_luminoso"
    LUMINOSO = "luminoso"
    MEDIAMENTE_LUMINOSO = "mediamente_luminoso"
    POCO_LUMINOSO = "poco_luminoso"


class TipoVista(str, Enum):
    ESTERNA_PANORAMICA = "esterna_panoramica"
    ESTERNA = "esterna"
    MISTA = "mista"
    INTERNA = "interna"
    COMPLETAMENTE_INTERNA = "completamente_interna"


class StatoEdificio(str, Enum):
    OTTIMO = "ottimo"
    NORMALE = "normale"
    SCADENTE = "scadente"


class TipoRiscaldamento(str, Enum):
    AUTONOMO = "autonomo"
    CENTRALIZZATO_CONTABILIZZATO = "centralizzato_contabilizzato"
    CENTRALIZZATO = "centralizzato"
    ASSENTE = "assente"


# ============================================================
# REQUEST SCHEMA
# ============================================================

class ValutazioneRequest(BaseModel):
    """
    Request per calcolo valutazione nuda proprietà.
    
    Campi obbligatori:
    - comune: Nome del comune (es. "PESCARA", "MILANO")
    - superficie: Superficie in mq dell'abitazione
    - eta_usufruttuario: Età dell'usufruttuario (0-100)
    """
    
    # === LOCALIZZAZIONE ===
    comune: str = Field(
        ..., 
        description="Nome del comune (es. PESCARA, MILANO)",
        min_length=2,
        max_length=100,
        examples=["PESCARA", "MILANO", "ROMA"]
    )
    
    provincia: Optional[str] = Field(
        default=None,
        description="Sigla provincia (es. PE, MI)",
        max_length=2
    )
    
    fascia: str = Field(
        default="B",
        description="Fascia OMI: B=centrale, C=semicentrale, D=periferica",
        pattern="^[BCD]$"
    )
    
    zona_codice: Optional[str] = Field(
        default=None,
        description="Codice zona OMI specifico (es. B1, C2)"
    )
    
    # === SUPERFICI ===
    superficie: float = Field(
        ...,
        gt=0,
        le=2000,
        description="Superficie principale in mq",
        examples=[85, 100, 120]
    )
    
    superficie_balconi: Optional[float] = Field(
        default=None, 
        ge=0, 
        description="Superficie balconi in mq"
    )
    
    superficie_terrazzi: Optional[float] = Field(
        default=None, 
        ge=0, 
        description="Superficie terrazzi in mq"
    )
    
    superficie_giardino: Optional[float] = Field(
        default=None, 
        ge=0, 
        description="Superficie giardino in mq"
    )
    
    superficie_cantina: Optional[float] = Field(
        default=None, 
        ge=0, 
        description="Superficie cantina in mq"
    )
    
    # === PERTINENZE ===
    has_box: bool = Field(default=False, description="Presenza box auto")
    num_garages: int = Field(default=0, ge=0, description="Numero garage")
    num_parking: int = Field(default=0, ge=0, description="Numero posti auto")
    
    # === CARATTERISTICHE PIANO ===
    piano: int = Field(
        default=2,
        ge=-1,
        le=50,
        description="Numero piano (-1=seminterrato, 0=terra)"
    )
    
    has_ascensore: bool = Field(default=True, description="Presenza ascensore")
    is_attico: bool = Field(default=False, description="È un attico")
    is_ultimo_piano: bool = Field(default=False, description="È ultimo piano")
    has_giardino: bool = Field(default=False, description="Ha giardino privato")
    
    # === STATO E QUALITÀ ===
    stato_conservazione: StatoConservazione = Field(
        default=StatoConservazione.BUONO,
        description="Stato conservazione immobile"
    )
    
    luminosita: Luminosita = Field(
        default=Luminosita.LUMINOSO,
        description="Livello luminosità"
    )
    
    vista: TipoVista = Field(
        default=TipoVista.ESTERNA,
        description="Tipo di vista/esposizione"
    )
    
    # === EDIFICIO ===
    anno_costruzione: Optional[int] = Field(
        default=None,
        ge=1800,
        le=2025,
        description="Anno di costruzione edificio"
    )
    
    anno_ristrutturazione: Optional[int] = Field(
        default=None,
        ge=1900,
        le=2025,
        description="Anno ultima ristrutturazione"
    )
    
    stato_edificio: StatoEdificio = Field(
        default=StatoEdificio.NORMALE,
        description="Stato generale edificio"
    )
    
    # === IMPIANTI ===
    tipo_riscaldamento: TipoRiscaldamento = Field(
        default=TipoRiscaldamento.AUTONOMO,
        description="Tipo riscaldamento"
    )
    
    classe_energetica: Optional[str] = Field(
        default="C",
        description="Classe energetica APE (A4+, A4, A3, A2, A1, B, C, D, E, F, G)"
    )
    
    # === USUFRUTTO ===
    eta_usufruttuario: int = Field(
        ...,
        ge=0,
        le=100,
        description="Età dell'usufruttuario in anni",
        examples=[75, 78, 80]
    )
    
    tipo_usufrutto: str = Field(
        default="vitalizio",
        description="Tipo usufrutto: vitalizio o temporaneo"
    )
    
    # === PREZZO RICHIESTO (opzionale) ===
    prezzo_richiesto: Optional[float] = Field(
        default=None,
        gt=0,
        description="Prezzo richiesto dal venditore (per calcolo deal score)",
        examples=[115000, 185000, 350000]
    )
    
    # === VALIDATORS ===
    @field_validator('comune', mode='before')
    @classmethod
    def normalize_comune(cls, v):
        if isinstance(v, str):
            return v.strip().upper()
        return v
    
    @field_validator('fascia', mode='before')
    @classmethod
    def normalize_fascia(cls, v):
        if isinstance(v, str):
            return v.strip().upper()
        return v

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "comune": "PESCARA",
                    "fascia": "B",
                    "superficie": 100,
                    "superficie_balconi": 15,
                    "has_box": True,
                    "piano": 3,
                    "has_ascensore": True,
                    "stato_conservazione": "buono",
                    "luminosita": "luminoso",
                    "vista": "esterna",
                    "anno_costruzione": 1990,
                    "classe_energetica": "C",
                    "tipo_riscaldamento": "autonomo",
                    "eta_usufruttuario": 78,
                    "prezzo_richiesto": 115000
                }
            ]
        }
    }


# ============================================================
# RESPONSE SCHEMA
# ============================================================

class ValutazioneResponse(BaseModel):
    """Response completa della valutazione"""
    success: bool = True
    valutazione: Dict[str, Any]
    report: Optional[str] = None
    
    model_config = {"from_attributes": True}


# ============================================================
# ENDPOINT PRINCIPALE: CALCOLO VALUTAZIONE
# ============================================================

@router.post(
    "/calculate",
    response_model=ValutazioneResponse,
    summary="Calcola valutazione nuda proprietà",
    description="""
    Calcola la valutazione completa di un immobile in nuda proprietà.
    
    ## Valori Calcolati
    
    1. **Valore Piena Proprietà**: Stima OMI base
    2. **Stima Mia Per Sempre**: Con coefficienti di merito
    3. **Valore Fiscale**: Per successioni/donazioni
    4. **Deal Score**: Valutazione affare (se prezzo_richiesto fornito)
    
    ## Esempio Minimo
    
    ```json
    {
        "comune": "PESCARA",
        "superficie": 100,
        "eta_usufruttuario": 78
    }
    ```
    """
)
async def calculate_valuation(request: ValutazioneRequest) -> ValutazioneResponse:
    """Calcola la valutazione completa di un immobile in nuda proprietà."""
    try:
        # Inizializza il servizio
        service = ValuationService()
        
        # Crea PropertyData dal request
        property_data = PropertyData(
            comune=request.comune,
            provincia=request.provincia,
            fascia=request.fascia,
            zona_codice=request.zona_codice,
            surface_sqm=request.superficie,
            balcony_surface=request.superficie_balconi,
            terrace_surface=request.superficie_terrazzi,
            garden_surface=request.superficie_giardino,
            cellar_surface=request.superficie_cantina,
            has_box=request.has_box,
            num_garages=request.num_garages,
            num_parking=request.num_parking,
            floor=request.piano,
            has_elevator=request.has_ascensore,
            is_attic=request.is_attico,
            is_last_floor=request.is_ultimo_piano,
            has_garden=request.has_giardino,
            condition=request.stato_conservazione.value,
            brightness=request.luminosita.value,
            view=request.vista.value,
            building_year=request.anno_costruzione,
            renovation_year=request.anno_ristrutturazione,
            building_condition=request.stato_edificio.value,
            heating_type=request.tipo_riscaldamento.value,
            energy_class=request.classe_energetica,
            usufructuary_age=request.eta_usufruttuario,
            usufruct_type=request.tipo_usufrutto,
            requested_price=request.prezzo_richiesto
        )
        
        # Esegui calcolo
        valuation = service.calculate_complete_valuation(property_data)
        
        # Controlla errori
        if 'error' in valuation:
            raise HTTPException(
                status_code=404,
                detail={
                    "success": False,
                    "error": valuation['error'],
                    "suggestions": [
                        "Verifica il nome del comune",
                        "Prova con una fascia diversa (B, C, D)",
                        f"Comune inserito: {request.comune}"
                    ]
                }
            )
        
        # Genera report testuale
        report = service.format_valuation_report(valuation)
        
        logger.info(f"Valutazione calcolata: {request.comune}, {request.superficie}mq, età {request.eta_usufruttuario}")
        
        return ValutazioneResponse(
            success=True,
            valutazione=valuation,
            report=report
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Errore calcolo valutazione: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "error": f"Errore interno: {str(e)}",
                "suggestions": ["Riprova più tardi", "Contatta il supporto"]
            }
        )


# ============================================================
# ENDPOINT: COEFFICIENTI USUFRUTTO
# ============================================================

@router.get(
    "/coefficients",
    summary="Tabella coefficienti usufrutto",
    description="""
    Restituisce la tabella dei coefficienti per il calcolo dell'usufrutto vitalizio.
    
    Fonte: Agenzia delle Entrate - Aggiornamento 2025 (tasso legale 2.5%)
    """
)
async def get_coefficients():
    """Restituisce la tabella dei coefficienti usufrutto."""
    
    # Coefficienti dalla classe ValuationService
    coefficienti = []
    for (min_age, max_age), (coeff, pct_usuf, pct_nuda) in ValuationService.USUFRUCT_COEFFICIENTS.items():
        coefficienti.append({
            "eta_min": min_age,
            "eta_max": max_age,
            "range_eta": f"{min_age}-{max_age}",
            "coefficiente": coeff,
            "percentuale_usufrutto": pct_usuf,
            "percentuale_nuda_proprieta": pct_nuda
        })
    
    return {
        "success": True,
        "fonte": "Agenzia delle Entrate",
        "anno": 2025,
        "tasso_legale_percentuale": 2.5,
        "note": "Il coefficiente indica la percentuale di nuda proprietà rispetto al valore pieno",
        "coefficienti": coefficienti
    }


# ============================================================
# ENDPOINT: ZONE OMI PER COMUNE
# ============================================================

@router.get(
    "/zones/{comune}",
    summary="Zone OMI per comune",
    description="Restituisce le zone OMI disponibili per un comune."
)
async def get_zones_by_comune(comune: str):
    """Restituisce le zone OMI per un comune specifico."""
    try:
        service = ValuationService()
        
        # Query per ottenere zone del comune
        from sqlalchemy import text
        with service.engine.connect() as conn:
            result = conn.execute(text("""
                SELECT DISTINCT 
                    zona_codice,
                    link_zona,
                    fascia
                FROM omi_quotations
                WHERE UPPER(comune_descrizione) = UPPER(:comune)
                AND zona_codice IS NOT NULL
                ORDER BY fascia, zona_codice
            """), {"comune": comune.upper()})
            
            zones = []
            for row in result:
                zones.append({
                    "codice": row[0],
                    "descrizione": row[1],
                    "fascia": row[2]
                })
        
        if not zones:
            raise HTTPException(
                status_code=404,
                detail={
                    "success": False,
                    "error": f"Comune '{comune}' non trovato nel database OMI",
                    "suggestions": [
                        "Verifica l'ortografia del comune",
                        "Usa il nome completo in maiuscolo (es. PESCARA)"
                    ]
                }
            )
        
        return {
            "success": True,
            "comune": comune.upper(),
            "zone_count": len(zones),
            "zones": zones
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Errore recupero zone per {comune}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": f"Errore: {str(e)}"}
        )


# ============================================================
# ENDPOINT: QUOTAZIONE RAPIDA
# ============================================================

@router.get(
    "/quick-quote",
    summary="Quotazione rapida OMI",
    description="Quotazione OMI senza calcolo completo."
)
async def get_quick_quote(
    comune: str = Query(..., description="Nome del comune"),
    fascia: str = Query("B", description="Fascia: B, C, D"),
    zona: Optional[str] = Query(None, description="Codice zona OMI"),
    stato: str = Query("NORMALE", description="Stato: OTTIMO, NORMALE, SCADENTE")
):
    """Quotazione rapida senza calcolo completo."""
    try:
        service = ValuationService()
        quote = service.get_omi_quotation(
            comune=comune.upper(),
            fascia=fascia.upper(),
            zona_codice=zona,
            stato=stato.upper()
        )
        
        if not quote:
            raise HTTPException(
                status_code=404,
                detail={
                    "success": False,
                    "error": f"Quotazione non trovata per {comune}",
                    "suggestions": [
                        "Verifica il nome del comune",
                        "Prova con fascia diversa (B, C, D)"
                    ]
                }
            )
        
        return {
            "success": True,
            "comune": comune.upper(),
            "fascia": fascia.upper(),
            "quotazione": quote
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Errore quotazione rapida: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": f"Errore: {str(e)}"}
        )


# ============================================================
# ENDPOINT: CALCOLO COEFFICIENTE PER ETÀ
# ============================================================

@router.get(
    "/coefficient/{eta}",
    summary="Coefficiente per età specifica",
    description="Restituisce il coefficiente usufrutto per un'età specifica."
)
async def get_coefficient_by_age(eta: int):
    """Restituisce coefficiente per età specifica."""
    if eta < 0 or eta > 100:
        raise HTTPException(
            status_code=400,
            detail={"error": "Età deve essere tra 0 e 100"}
        )
    
    service = ValuationService()
    coeff, pct_usuf, pct_nuda = service.get_usufruct_coefficient(eta)
    
    return {
        "success": True,
        "eta": eta,
        "coefficiente": coeff,
        "percentuale_usufrutto": pct_usuf,
        "percentuale_nuda_proprieta": pct_nuda,
        "fonte": "Agenzia Entrate 2025",
        "tasso_legale": "2.5%"
    }
