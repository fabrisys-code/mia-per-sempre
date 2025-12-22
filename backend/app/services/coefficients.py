"""
Coefficienti di Merito per Valutazione Immobiliare
Basato su standard del settore e best practices italiane

Fonte: Tabelle standard valutazione immobiliare
"""

from typing import Dict, Optional
from enum import Enum


class PropertyCondition(str, Enum):
    """Stato di conservazione immobile"""
    DA_RISTRUTTURARE = "da_ristrutturare"
    BUONO = "buono"
    RISTRUTTURATO = "ristrutturato"
    FINEMENTE_RISTRUTTURATO = "finemente_ristrutturato"
    NUOVA_COSTRUZIONE = "nuova_costruzione"


class Brightness(str, Enum):
    """Livello di luminosità"""
    MOLTO_LUMINOSO = "molto_luminoso"
    LUMINOSO = "luminoso"
    MEDIAMENTE_LUMINOSO = "mediamente_luminoso"
    POCO_LUMINOSO = "poco_luminoso"


class ViewType(str, Enum):
    """Tipo di vista/esposizione"""
    ESTERNA_PANORAMICA = "esterna_panoramica"
    ESTERNA = "esterna"
    MISTA = "mista"
    INTERNA = "interna"
    COMPLETAMENTE_INTERNA = "completamente_interna"


class BuildingCondition(str, Enum):
    """Stato generale edificio"""
    OTTIMO = "ottimo"
    NORMALE = "normale"
    SCADENTE = "scadente"


class HeatingType(str, Enum):
    """Tipo di riscaldamento"""
    AUTONOMO = "autonomo"
    CENTRALIZZATO_CONTABILIZZATO = "centralizzato_contabilizzato"
    CENTRALIZZATO = "centralizzato"
    ASSENTE = "assente"


class MeritCoefficients:
    """Gestisce calcolo coefficienti di merito per valutazione immobiliare"""
    
    # Coefficienti Piano (con/senza ascensore)
    FLOOR_COEFFICIENTS = {
        # floor: (with_elevator, without_elevator)
        -1: (-0.25, -0.25),  # Seminterrato
        0: (-0.10, -0.10),   # Piano terra (può variare -10% a -20% se senza giardino)
        1: (-0.10, -0.10),   # Primo piano
        2: (-0.03, -0.15),   # Secondo piano
        3: (0.00, -0.20),    # Terzo piano
        4: (0.05, -0.30),    # Piani superiori
        5: (0.05, -0.30),
        6: (0.05, -0.30),
        98: (0.10, -0.30),   # Ultimo piano (non attico)
        99: (0.20, -0.20),   # Attico
    }
    
    # Coefficienti Stato Conservazione
    CONDITION_COEFFICIENTS = {
        PropertyCondition.DA_RISTRUTTURARE: -0.10,
        PropertyCondition.BUONO: 0.00,
        PropertyCondition.RISTRUTTURATO: 0.05,
        PropertyCondition.FINEMENTE_RISTRUTTURATO: 0.10,
        PropertyCondition.NUOVA_COSTRUZIONE: 0.10,
    }
    
    # Coefficienti Luminosità
    BRIGHTNESS_COEFFICIENTS = {
        Brightness.MOLTO_LUMINOSO: 0.10,
        Brightness.LUMINOSO: 0.05,
        Brightness.MEDIAMENTE_LUMINOSO: 0.00,
        Brightness.POCO_LUMINOSO: -0.05,
    }
    
    # Coefficienti Vista/Esposizione
    VIEW_COEFFICIENTS = {
        ViewType.ESTERNA_PANORAMICA: 0.10,
        ViewType.ESTERNA: 0.05,
        ViewType.MISTA: 0.00,
        ViewType.INTERNA: -0.05,
        ViewType.COMPLETAMENTE_INTERNA: -0.10,
    }
    
    # Coefficienti Età Edificio (in base a stato)
    BUILDING_AGE_COEFFICIENTS = {
        # (anni, stato_edificio): coefficiente
        (20, BuildingCondition.OTTIMO): 0.00,
        (20, BuildingCondition.NORMALE): 0.00,
        (20, BuildingCondition.SCADENTE): -0.05,
        (40, BuildingCondition.OTTIMO): 0.05,
        (40, BuildingCondition.NORMALE): 0.00,
        (40, BuildingCondition.SCADENTE): -0.10,
        (100, BuildingCondition.OTTIMO): 0.10,  # Oltre 40 anni
        (100, BuildingCondition.NORMALE): 0.00,
        (100, BuildingCondition.SCADENTE): -0.15,
    }
    
    # Coefficienti Riscaldamento
    HEATING_COEFFICIENTS = {
        HeatingType.AUTONOMO: 0.05,
        HeatingType.CENTRALIZZATO_CONTABILIZZATO: 0.02,
        HeatingType.CENTRALIZZATO: 0.00,
        HeatingType.ASSENTE: -0.05,
    }
    
    # Coefficienti Classe Energetica
    ENERGY_CLASS_COEFFICIENTS = {
        "A4+": 0.15,
        "A4": 0.12,
        "A3": 0.10,
        "A2": 0.08,
        "A1": 0.05,
        "B": 0.03,
        "C": 0.00,
        "D": -0.03,
        "E": -0.05,
        "F": -0.08,
        "G": -0.10,
    }
    
    def __init__(self):
        pass
    
    def get_floor_coefficient(
        self,
        floor: int,
        has_elevator: bool,
        is_attic: bool = False,
        is_last_floor: bool = False,
        has_garden: bool = False
    ) -> float:
        """
        Calcola coefficiente per piano
        
        Args:
            floor: Numero piano (-1=seminterrato, 0=terra, etc.)
            has_elevator: Presenza ascensore
            is_attic: È un attico
            is_last_floor: È ultimo piano (non attico)
            has_garden: Ha giardino (per piano terra)
            
        Returns:
            Coefficiente da applicare
        """
        # Casi speciali
        if is_attic:
            floor_key = 99
        elif is_last_floor:
            floor_key = 98
        elif floor <= -1:
            floor_key = -1
        elif floor >= 4:
            floor_key = 4
        else:
            floor_key = floor
        
        coeff_with, coeff_without = self.FLOOR_COEFFICIENTS[floor_key]
        base_coeff = coeff_with if has_elevator else coeff_without
        
        # Piano terra senza giardino: penalizzazione extra -10%
        if floor == 0 and not has_garden:
            base_coeff -= 0.10
        
        return base_coeff
    
    def get_condition_coefficient(self, condition: PropertyCondition) -> float:
        """Coefficiente stato conservazione"""
        return self.CONDITION_COEFFICIENTS.get(condition, 0.00)
    
    def get_brightness_coefficient(self, brightness: Brightness) -> float:
        """Coefficiente luminosità"""
        return self.BRIGHTNESS_COEFFICIENTS.get(brightness, 0.00)
    
    def get_view_coefficient(self, view: ViewType) -> float:
        """Coefficiente vista/esposizione"""
        return self.VIEW_COEFFICIENTS.get(view, 0.00)
    
    def get_building_age_coefficient(
        self,
        building_year: int,
        current_year: int,
        building_condition: BuildingCondition
    ) -> float:
        """
        Coefficiente età edificio
        
        Args:
            building_year: Anno costruzione
            current_year: Anno corrente
            building_condition: Stato edificio
        """
        age = current_year - building_year
        
        if age <= 20:
            age_key = 20
        elif age <= 40:
            age_key = 40
        else:
            age_key = 100
        
        return self.BUILDING_AGE_COEFFICIENTS.get(
            (age_key, building_condition),
            0.00
        )
    
    def get_heating_coefficient(self, heating: HeatingType) -> float:
        """Coefficiente tipo riscaldamento"""
        return self.HEATING_COEFFICIENTS.get(heating, 0.00)
    
    def get_energy_class_coefficient(self, energy_class: str) -> float:
        """Coefficiente classe energetica"""
        energy_class_upper = energy_class.upper().replace("_", "")
        return self.ENERGY_CLASS_COEFFICIENTS.get(energy_class_upper, 0.00)
    
    def calculate_total_coefficient(
        self,
        floor: int = 0,
        has_elevator: bool = False,
        is_attic: bool = False,
        is_last_floor: bool = False,
        has_garden: bool = False,
        condition: Optional[PropertyCondition] = None,
        brightness: Optional[Brightness] = None,
        view: Optional[ViewType] = None,
        building_year: Optional[int] = None,
        current_year: int = 2025,
        building_condition: BuildingCondition = BuildingCondition.NORMALE,
        heating: Optional[HeatingType] = None,
        energy_class: Optional[str] = None
    ) -> Dict[str, float]:
        """
        Calcola coefficiente totale sommando tutti i fattori
        
        Returns:
            Dict con breakdown coefficienti e totale
        """
        coefficients = {}
        
        # Piano
        coefficients['floor'] = self.get_floor_coefficient(
            floor, has_elevator, is_attic, is_last_floor, has_garden
        )
        
        # Stato conservazione
        if condition:
            coefficients['condition'] = self.get_condition_coefficient(condition)
        
        # Luminosità
        if brightness:
            coefficients['brightness'] = self.get_brightness_coefficient(brightness)
        
        # Vista
        if view:
            coefficients['view'] = self.get_view_coefficient(view)
        
        # Età edificio
        if building_year:
            coefficients['building_age'] = self.get_building_age_coefficient(
                building_year, current_year, building_condition
            )
        
        # Riscaldamento
        if heating:
            coefficients['heating'] = self.get_heating_coefficient(heating)
        
        # Classe energetica
        if energy_class:
            coefficients['energy_class'] = self.get_energy_class_coefficient(energy_class)
        
        # Totale
        total = sum(coefficients.values())
        
        return {
            **coefficients,
            'total': total,
            'multiplier': 1 + total  # Es: +10% = 1.10
        }


# Example usage
if __name__ == "__main__":
    print("TEST COEFFICIENTI DI MERITO")
    print("=" * 80)
    
    calc = MeritCoefficients()
    
    # Test 1: Appartamento standard
    print("\n🏠 Test 1: Appartamento 3° piano con ascensore, buono stato")
    result = calc.calculate_total_coefficient(
        floor=3,
        has_elevator=True,
        condition=PropertyCondition.BUONO,
        brightness=Brightness.LUMINOSO,
        view=ViewType.ESTERNA,
        building_year=1990,
        heating=HeatingType.AUTONOMO,
        energy_class="C"
    )
    
    print("\nCoefficienti:")
    for key, value in result.items():
        if key != 'multiplier':
            print(f"  {key}: {value:+.2%}")
    print(f"\n  TOTALE: {result['total']:+.2%}")
    print(f"  MOLTIPLICATORE: {result['multiplier']:.3f}x")
    
    # Test 2: Attico di lusso
    print("\n\n🏢 Test 2: Attico con ascensore, finemente ristrutturato")
    result = calc.calculate_total_coefficient(
        floor=5,
        has_elevator=True,
        is_attic=True,
        condition=PropertyCondition.FINEMENTE_RISTRUTTURATO,
        brightness=Brightness.MOLTO_LUMINOSO,
        view=ViewType.ESTERNA_PANORAMICA,
        building_year=2020,
        heating=HeatingType.AUTONOMO,
        energy_class="A3"
    )
    
    print("\nCoefficienti:")
    for key, value in result.items():
        if key != 'multiplier':
            print(f"  {key}: {value:+.2%}")
    print(f"\n  TOTALE: {result['total']:+.2%}")
    print(f"  MOLTIPLICATORE: {result['multiplier']:.3f}x")
    
    # Test 3: Seminterrato da ristrutturare
    print("\n\n🔧 Test 3: Seminterrato senza ascensore, da ristrutturare")
    result = calc.calculate_total_coefficient(
        floor=-1,
        has_elevator=False,
        condition=PropertyCondition.DA_RISTRUTTURARE,
        brightness=Brightness.POCO_LUMINOSO,
        view=ViewType.INTERNA,
        building_year=1970,
        building_condition=BuildingCondition.SCADENTE,
        heating=HeatingType.ASSENTE,
        energy_class="G"
    )
    
    print("\nCoefficienti:")
    for key, value in result.items():
        if key != 'multiplier':
            print(f"  {key}: {value:+.2%}")
    print(f"\n  TOTALE: {result['total']:+.2%}")
    print(f"  MOLTIPLICATORE: {result['multiplier']:.3f}x")
