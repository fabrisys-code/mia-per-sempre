"""
Modulo Principale Valutazione Immobiliare
Sistema completo per calcolo valore nuda proprietà

Implementa i 4 valori principali:
1. Valore Piena Proprietà (Stima OMI)
2. Valore Fiscale (usufrutto/nuda proprietà)
3. Prezzo Richiesto (input venditore)
4. Stima "Mia Per Sempre" (algoritmo avanzato)
"""

import os
from typing import Dict, Optional, Tuple
from decimal import Decimal
from datetime import datetime
from sqlalchemy import create_engine, text
from dataclasses import dataclass

# Import moduli locali (quando saranno in app/services/)
# from .surface_calculator import SurfaceCalculator
# from .coefficients import MeritCoefficients, PropertyCondition, Brightness, etc.


@dataclass
class PropertyData:
    """Dati immobile per valutazione"""
    # Localizzazione
    comune: str
    provincia: Optional[str] = None
    fascia: str = 'B'  # B=centrale, C=semicentrale, D=periferica
    zona_codice: Optional[str] = None
    
    # Superficie
    surface_sqm: float = 100
    balcony_surface: Optional[float] = None
    terrace_surface: Optional[float] = None
    garden_surface: Optional[float] = None
    cellar_surface: Optional[float] = None
    
    # Pertinenze
    has_box: bool = False
    num_garages: int = 0
    num_parking: int = 0
    
    # Caratteristiche
    floor: int = 2
    has_elevator: bool = True
    is_attic: bool = False
    is_last_floor: bool = False
    has_garden: bool = False
    
    # Stato/Qualità
    condition: str = "buono"  # da_ristrutturare, buono, ristrutturato, finemente_ristrutturato, nuova_costruzione
    brightness: str = "luminoso"  # molto_luminoso, luminoso, mediamente_luminoso, poco_luminoso
    view: str = "esterna"  # esterna_panoramica, esterna, mista, interna, completamente_interna
    
    # Edificio
    building_year: Optional[int] = None
    renovation_year: Optional[int] = None
    building_condition: str = "normale"  # ottimo, normale, scadente
    
    # Impianti
    heating_type: str = "autonomo"  # autonomo, centralizzato_contabilizzato, centralizzato, assente
    energy_class: Optional[str] = "C"  # A4+, A4, A3, A2, A1, B, C, D, E, F, G
    
    # Usufrutto
    usufructuary_age: int = 75
    usufruct_type: str = "vitalizio"  # vitalizio, temporaneo
    
    # Prezzo richiesto (opzionale)
    requested_price: Optional[float] = None


class ValuationService:
    """Servizio completo valutazione immobiliare"""
    
    # Tabella coefficienti usufrutto vitalizio 2025
    USUFRUCT_COEFFICIENTS = {
        (0, 20): (38, 95, 5),
        (21, 30): (36, 90, 10),
        (31, 40): (34, 85, 15),
        (41, 45): (32, 80, 20),
        (46, 50): (30, 75, 25),
        (51, 53): (28, 70, 30),
        (54, 56): (26, 65, 35),
        (57, 60): (24, 60, 40),
        (61, 63): (22, 55, 45),
        (64, 66): (20, 50, 50),
        (67, 69): (18, 45, 55),
        (70, 72): (16, 40, 60),
        (73, 75): (14, 35, 65),
        (76, 78): (12, 30, 70),
        (79, 82): (10, 25, 75),
        (83, 86): (8, 20, 80),
        (87, 92): (6, 15, 85),
        (93, 99): (4, 10, 90),
    }
    
    # Tasso legale corrente (sarà letto da DB)
    LEGAL_RATE_2025 = 0.025  # 2.5%
    
    def __init__(self, database_url: Optional[str] = None):
        """
        Inizializza servizio valutazione
        
        Args:
            database_url: Connessione database (se None usa env)
        """
        if database_url is None:
            database_url = os.getenv(
                'DATABASE_URL',
                'postgresql://postgres:postgres@localhost:5432/miapersempre'
            )
        
        self.engine = create_engine(database_url, echo=False)
        
        # Import moduli (se in locale)
        try:
            from surface_calculator import SurfaceCalculator
            from coefficients import MeritCoefficients
            self.surface_calc = SurfaceCalculator()
            self.coeff_calc = MeritCoefficients()
        except ImportError:
            # Fallback: usiamo versioni semplificate
            self.surface_calc = None
            self.coeff_calc = None
    
    def get_usufruct_coefficient(self, age: int) -> Tuple[int, int, int]:
        """
        Ottiene coefficiente usufrutto per età
        
        Returns:
            (coefficiente, % usufrutto, % nuda proprietà)
        """
        for (min_age, max_age), values in self.USUFRUCT_COEFFICIENTS.items():
            if min_age <= age <= max_age:
                return values
        
        # Fallback per età fuori range
        return (4, 10, 90)
    
    def get_legal_rate(self) -> float:
        """Ottiene tasso legale corrente dal database"""
        try:
            with self.engine.connect() as conn:
                result = conn.execute(text("""
                    SELECT valore FROM omi_settings 
                    WHERE chiave = 'tasso_legale_corrente'
                """))
                rate = result.scalar()
                if rate:
                    return float(rate)
        except Exception:
            pass
        
        return self.LEGAL_RATE_2025
    
    def get_omi_quotation(
        self,
        comune: str,
        fascia: str = 'B',
        zona_codice: Optional[str] = None,
        cod_tipologia: int = 20,  # Abitazioni civili
        stato: str = 'NORMALE'
    ) -> Optional[Dict[str, float]]:
        """
        Ottiene quotazione OMI dal database
        
        Returns:
            Dict con prezzo_min, prezzo_max, prezzo_medio o None
        """
        try:
            with self.engine.connect() as conn:
                # Query base
                query = """
                    SELECT 
                        prezzo_min,
                        prezzo_max,
                        (prezzo_min + prezzo_max) / 2 as prezzo_medio,
                        zona_codice,
                        link_zona
                    FROM omi_quotations
                    WHERE UPPER(comune_descrizione) = UPPER(:comune)
                    AND cod_tipologia = :cod_tipologia
                    AND stato = :stato
                    AND prezzo_min IS NOT NULL
                """
                
                params = {
                    'comune': comune,
                    'cod_tipologia': str(cod_tipologia),
                    'stato': stato
                }
                
                # Filtro zona se specificata
                if zona_codice:
                    query += " AND zona_codice = :zona_codice"
                    params['zona_codice'] = zona_codice
                else:
                    query += " AND fascia = :fascia"
                    params['fascia'] = fascia
                
                query += " ORDER BY fascia, zona_codice LIMIT 1"
                
                result = conn.execute(text(query), params).fetchone()
                
                if result:
                    return {
                        'prezzo_min': float(result[0]),
                        'prezzo_max': float(result[1]),
                        'prezzo_medio': float(result[2]),
                        'zona_codice': result[3],
                        'link_zona': result[4]
                    }
        
        except Exception as e:
            print(f"Errore query OMI: {e}")
        
        return None
    
    def calculate_fiscal_value(
        self,
        full_property_value: float,
        usufructuary_age: int
    ) -> Dict[str, float]:
        """
        Calcola valore fiscale usufrutto e nuda proprietà
        
        Args:
            full_property_value: Valore piena proprietà
            usufructuary_age: Età usufruttuario
            
        Returns:
            Dict con valori fiscali
        """
        # Ottieni coefficiente
        coefficiente, perc_usufrutto, perc_nuda = self.get_usufruct_coefficient(
            usufructuary_age
        )
        
        # Tasso legale
        tasso_legale = self.get_legal_rate()
        
        # Calcolo ministeriale
        annualita = full_property_value * tasso_legale
        valore_usufrutto = annualita * coefficiente
        valore_nuda_proprieta = full_property_value - valore_usufrutto
        
        return {
            'tasso_legale': tasso_legale,
            'coefficiente': coefficiente,
            'annualita': annualita,
            'valore_usufrutto': valore_usufrutto,
            'valore_nuda_proprieta': valore_nuda_proprieta,
            'percentuale_usufrutto': perc_usufrutto,
            'percentuale_nuda': perc_nuda
        }
    
    def calculate_deal_score(
        self,
        requested_price: float,
        estimated_value: float
    ) -> Dict[str, any]:
        """
        Calcola Deal Score (gamification)
        
        Args:
            requested_price: Prezzo richiesto venditore
            estimated_value: Valore stimato
            
        Returns:
            Dict con score e dettagli
        """
        # Calcola scarto percentuale
        scarto = ((requested_price - estimated_value) / estimated_value) * 100
        
        # Determina score
        if scarto <= -10:
            return {
                'score': 'AFFARE_ECCEZIONALE',
                'stars': 5,
                'color': 'green',
                'emoji': '🟢',
                'message': 'Prezzo molto inferiore alla stima di mercato!',
                'discount_percentage': abs(scarto)
            }
        elif scarto <= -5:
            return {
                'score': 'OTTIMO_AFFARE',
                'stars': 4,
                'color': 'green',
                'emoji': '🟢',
                'message': 'Prezzo inferiore al valore stimato',
                'discount_percentage': abs(scarto)
            }
        elif scarto <= 5:
            return {
                'score': 'IN_LINEA',
                'stars': 3,
                'color': 'yellow',
                'emoji': '🟡',
                'message': 'Prezzo allineato al mercato',
                'discount_percentage': abs(scarto) if scarto < 0 else -scarto
            }
        elif scarto <= 15:
            return {
                'score': 'MARGINE_TRATTATIVA',
                'stars': 2,
                'color': 'orange',
                'emoji': '🟠',
                'message': 'Prezzo leggermente alto, possibile negoziazione',
                'discount_percentage': -scarto
            }
        else:
            return {
                'score': 'SOPRAVVALUTATO',
                'stars': 1,
                'color': 'red',
                'emoji': '🔴',
                'message': 'Prezzo significativamente superiore al valore',
                'discount_percentage': -scarto
            }
    
    def calculate_complete_valuation(
        self,
        property_data: PropertyData
    ) -> Dict[str, any]:
        """
        Calcolo completo valutazione immobile
        
        Returns:
            Dict con tutti i 4 valori principali + dettagli
        """
        result = {
            'timestamp': datetime.now().isoformat(),
            'property_summary': {
                'comune': property_data.comune,
                'superficie': property_data.surface_sqm,
                'eta_usufruttuario': property_data.usufructuary_age
            }
        }
        
        # 1. QUOTAZIONE OMI
        omi_data = self.get_omi_quotation(
            comune=property_data.comune,
            fascia=property_data.fascia,
            zona_codice=property_data.zona_codice
        )
        
        if not omi_data:
            result['error'] = f"Nessuna quotazione OMI trovata per {property_data.comune}"
            return result
        
        result['omi_quotation'] = omi_data
        
        # 2. SUPERFICIE COMMERCIALE
        if self.surface_calc:
            surface_data = self.surface_calc.calculate_commercial_surface(
                main_surface=property_data.surface_sqm,
                balcony_surface=property_data.balcony_surface,
                terrace_surface=property_data.terrace_surface,
                garden_surface=property_data.garden_surface,
                cellar_surface=property_data.cellar_surface,
                has_box=property_data.has_box,
                num_garages=property_data.num_garages,
                num_parking=property_data.num_parking
            )
            result['superficie_commerciale'] = surface_data
            superficie_calcolo = surface_data['total_commercial_surface']
        else:
            superficie_calcolo = property_data.surface_sqm
        
        # 3. VALORE PIENA PROPRIETÀ (Base OMI)
        valore_base_min = omi_data['prezzo_min'] * superficie_calcolo
        valore_base_max = omi_data['prezzo_max'] * superficie_calcolo
        valore_base_medio = omi_data['prezzo_medio'] * superficie_calcolo
        
        result['valore_piena_proprieta_base'] = {
            'min': valore_base_min,
            'max': valore_base_max,
            'medio': valore_base_medio,
            'prezzo_mq': omi_data['prezzo_medio'],
            'superficie_utilizzata': superficie_calcolo,
            'fonte': 'OMI Semestre 2025/1'
        }
        
        # 4. COEFFICIENTI DI MERITO
        if self.coeff_calc:
            try:
                # Import enums
                from coefficients import (
                    PropertyCondition, Brightness, ViewType,
                    BuildingCondition, HeatingType
                )
                
                # Converti stringhe in enums
                condition_map = {
                    'da_ristrutturare': PropertyCondition.DA_RISTRUTTURARE,
                    'buono': PropertyCondition.BUONO,
                    'ristrutturato': PropertyCondition.RISTRUTTURATO,
                    'finemente_ristrutturato': PropertyCondition.FINEMENTE_RISTRUTTURATO,
                    'nuova_costruzione': PropertyCondition.NUOVA_COSTRUZIONE
                }
                
                brightness_map = {
                    'molto_luminoso': Brightness.MOLTO_LUMINOSO,
                    'luminoso': Brightness.LUMINOSO,
                    'mediamente_luminoso': Brightness.MEDIAMENTE_LUMINOSO,
                    'poco_luminoso': Brightness.POCO_LUMINOSO
                }
                
                view_map = {
                    'esterna_panoramica': ViewType.ESTERNA_PANORAMICA,
                    'esterna': ViewType.ESTERNA,
                    'mista': ViewType.MISTA,
                    'interna': ViewType.INTERNA,
                    'completamente_interna': ViewType.COMPLETAMENTE_INTERNA
                }
                
                building_cond_map = {
                    'ottimo': BuildingCondition.OTTIMO,
                    'normale': BuildingCondition.NORMALE,
                    'scadente': BuildingCondition.SCADENTE
                }
                
                heating_map = {
                    'autonomo': HeatingType.AUTONOMO,
                    'centralizzato_contabilizzato': HeatingType.CENTRALIZZATO_CONTABILIZZATO,
                    'centralizzato': HeatingType.CENTRALIZZATO,
                    'assente': HeatingType.ASSENTE
                }
                
                coefficients = self.coeff_calc.calculate_total_coefficient(
                    floor=property_data.floor,
                    has_elevator=property_data.has_elevator,
                    is_attic=property_data.is_attic,
                    is_last_floor=property_data.is_last_floor,
                    has_garden=property_data.has_garden,
                    condition=condition_map.get(property_data.condition),
                    brightness=brightness_map.get(property_data.brightness),
                    view=view_map.get(property_data.view),
                    building_year=property_data.building_year,
                    building_condition=building_cond_map.get(property_data.building_condition),
                    heating=heating_map.get(property_data.heating_type),
                    energy_class=property_data.energy_class
                )
                
                result['coefficienti_merito'] = coefficients
                moltiplicatore = coefficients['multiplier']
                
            except Exception as e:
                print(f"Errore calcolo coefficienti: {e}")
                moltiplicatore = 1.0
        else:
            moltiplicatore = 1.0
        
        # 5. STIMA "MIA PER SEMPRE" (con coefficienti)
        valore_stimato_min = valore_base_min * moltiplicatore
        valore_stimato_max = valore_base_max * moltiplicatore
        valore_stimato_medio = valore_base_medio * moltiplicatore
        
        result['stima_miapersempre'] = {
            'min': valore_stimato_min,
            'max': valore_stimato_max,
            'medio': valore_stimato_medio,
            'moltiplicatore_applicato': moltiplicatore,
            'variazione_percentuale': (moltiplicatore - 1) * 100
        }
        
        # 6. VALORE FISCALE (Nuda Proprietà)
        fiscal_data = self.calculate_fiscal_value(
            full_property_value=valore_stimato_medio,
            usufructuary_age=property_data.usufructuary_age
        )
        
        result['valore_fiscale'] = fiscal_data
        
        # 7. DEAL SCORE (se prezzo richiesto disponibile)
        if property_data.requested_price:
            result['prezzo_richiesto'] = property_data.requested_price
            
            deal_score = self.calculate_deal_score(
                requested_price=property_data.requested_price,
                estimated_value=fiscal_data['valore_nuda_proprieta']
            )
            
            result['deal_score'] = deal_score
        
        return result
    
    def format_valuation_report(self, valuation: Dict) -> str:
        """
        Formatta valutazione in report leggibile
        
        Returns:
            Stringa formattata con report completo
        """
        if 'error' in valuation:
            return f"❌ ERRORE: {valuation['error']}"
        
        lines = []
        lines.append("=" * 80)
        lines.append("📊 REPORT VALUTAZIONE IMMOBILE")
        lines.append("=" * 80)
        
        # Intestazione
        prop = valuation['property_summary']
        lines.append(f"\n🏠 Immobile: {prop['comune']} - {prop['superficie']:.0f} mq")
        lines.append(f"👴 Età usufruttuario: {prop['eta_usufruttuario']} anni")
        lines.append(f"📅 Data valutazione: {valuation['timestamp'][:10]}")
        
        # 1. Valore Piena Proprietà
        lines.append(f"\n{'='*80}")
        lines.append("1️⃣  VALORE PIENA PROPRIETÀ (Stima OMI Base)")
        lines.append("-" * 80)
        vpp = valuation['valore_piena_proprieta_base']
        lines.append(f"Quotazione OMI: {vpp['prezzo_mq']:,.0f} €/mq")
        lines.append(f"Superficie utilizzata: {vpp['superficie_utilizzata']:.0f} mq")
        lines.append(f"\n➜ Valore Range: {vpp['min']:,.0f} - {vpp['max']:,.0f} €")
        lines.append(f"➜ Valore Medio: {vpp['medio']:,.0f} €")
        
        # 2. Coefficienti Merito
        if 'coefficienti_merito' in valuation:
            lines.append(f"\n{'='*80}")
            lines.append("2️⃣  COEFFICIENTI DI MERITO")
            lines.append("-" * 80)
            coeff = valuation['coefficienti_merito']
            for key, value in coeff.items():
                if key not in ['total', 'multiplier']:
                    lines.append(f"  {key}: {value:+.1%}")
            lines.append(f"\n  TOTALE: {coeff['total']:+.1%}")
            lines.append(f"  MOLTIPLICATORE: {coeff['multiplier']:.3f}x")
        
        # 3. Stima Mia Per Sempre
        lines.append(f"\n{'='*80}")
        lines.append("3️⃣  STIMA MIA PER SEMPRE (Algoritmo Avanzato)")
        lines.append("-" * 80)
        smp = valuation['stima_miapersempre']
        lines.append(f"Valore base × Coefficienti merito")
        lines.append(f"Variazione: {smp['variazione_percentuale']:+.1f}%")
        lines.append(f"\n➜ Valore Range: {smp['min']:,.0f} - {smp['max']:,.0f} €")
        lines.append(f"➜ Valore Medio: {smp['medio']:,.0f} €")
        
        # 4. Valore Fiscale
        lines.append(f"\n{'='*80}")
        lines.append("4️⃣  VALORE FISCALE (Riferimento Tasse)")
        lines.append("-" * 80)
        fiscal = valuation['valore_fiscale']
        lines.append(f"Tasso legale: {fiscal['tasso_legale']*100:.2f}%")
        lines.append(f"Coefficiente età {prop['eta_usufruttuario']}: {fiscal['coefficiente']}")
        lines.append(f"Annualità: {fiscal['annualita']:,.0f} €")
        lines.append(f"\n➜ Valore Usufrutto ({fiscal['percentuale_usufrutto']}%): {fiscal['valore_usufrutto']:,.0f} €")
        lines.append(f"➜ Valore Nuda Proprietà ({fiscal['percentuale_nuda']}%): {fiscal['valore_nuda_proprieta']:,.0f} €")
        
        # 5. Prezzo Richiesto e Deal Score
        if 'prezzo_richiesto' in valuation:
            lines.append(f"\n{'='*80}")
            lines.append("5️⃣  PREZZO RICHIESTO & DEAL SCORE")
            lines.append("-" * 80)
            lines.append(f"Prezzo richiesto: {valuation['prezzo_richiesto']:,.0f} €")
            
            deal = valuation['deal_score']
            stars = "⭐" * deal['stars']
            lines.append(f"\n{deal['emoji']} {stars} {deal['score'].replace('_', ' ')}")
            lines.append(f"   {deal['message']}")
            lines.append(f"   Scarto: {deal['discount_percentage']:+.1f}%")
        
        lines.append(f"\n{'='*80}")
        
        return "\n".join(lines)


# Example usage standalone
if __name__ == "__main__":
    print("VALUTAZIONE IMMOBILE - TEST")
    print("=" * 80)
    
    # Crea servizio
    service = ValuationService()
    
    # Test: Appartamento Pescara
    print("\n\n🏠 TEST 1: Appartamento Pescara, Centro")
    print("-" * 80)
    
    property_data = PropertyData(
        comune="PESCARA",
        fascia="B",
        surface_sqm=100,
        balcony_surface=15,
        has_box=True,
        floor=3,
        has_elevator=True,
        condition="buono",
        brightness="luminoso",
        view="esterna",
        building_year=1990,
        energy_class="C",
        heating_type="autonomo",
        usufructuary_age=78,
        requested_price=115000
    )
    
    valuation = service.calculate_complete_valuation(property_data)
    print(service.format_valuation_report(valuation))
