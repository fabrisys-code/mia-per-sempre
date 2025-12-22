"""
Calcolo Superficie Commerciale
Basato su criteri standard del settore immobiliare italiano

La superficie commerciale include:
- Superficie calpestabile (100%)
- Balconi/terrazze (25-50%)
- Giardino/pertinenze (10-25%)
- Box/garage (valori specifici)
- Cantina (25-50%)
"""

from typing import Dict, Optional
from decimal import Decimal


class SurfaceCalculator:
    """Calcola la superficie commerciale di un immobile"""
    
    # Coefficienti standard
    BALCONY_COEFFICIENT = 0.25  # 25% superficie balconi
    TERRACE_COEFFICIENT = 0.35  # 35% superficie terrazze
    GARDEN_COEFFICIENT = 0.15   # 15% superficie giardino
    CELLAR_COEFFICIENT = 0.50   # 50% superficie cantina
    ATTIC_COEFFICIENT = 0.40    # 40% superficie soffitta
    
    # Valori fissi pertinenze (mq equivalenti)
    BOX_VALUE_SQM = 25          # Box = 25 mq commerciali
    GARAGE_VALUE_SQM = 20       # Posto auto coperto = 20 mq
    PARKING_VALUE_SQM = 12      # Posto auto scoperto = 12 mq
    
    def __init__(self):
        pass
    
    def calculate_commercial_surface(
        self,
        main_surface: float,
        balcony_surface: Optional[float] = None,
        terrace_surface: Optional[float] = None,
        garden_surface: Optional[float] = None,
        cellar_surface: Optional[float] = None,
        attic_surface: Optional[float] = None,
        has_box: bool = False,
        num_garages: int = 0,
        num_parking: int = 0
    ) -> Dict[str, float]:
        """
        Calcola superficie commerciale totale
        
        Args:
            main_surface: Superficie calpestabile principale (mq)
            balcony_surface: Superficie balconi (mq)
            terrace_surface: Superficie terrazze (mq)
            garden_surface: Superficie giardino (mq)
            cellar_surface: Superficie cantina (mq)
            attic_surface: Superficie soffitta/mansarda (mq)
            has_box: Presenza box
            num_garages: Numero posti auto coperti
            num_parking: Numero posti auto scoperti
            
        Returns:
            Dict con breakdown dettagliato superficie commerciale
        """
        
        components = {
            "main_surface": main_surface,
            "balcony_commercial": 0.0,
            "terrace_commercial": 0.0,
            "garden_commercial": 0.0,
            "cellar_commercial": 0.0,
            "attic_commercial": 0.0,
            "box_commercial": 0.0,
            "garage_commercial": 0.0,
            "parking_commercial": 0.0
        }
        
        # Calcola ogni componente
        if balcony_surface:
            components["balcony_commercial"] = balcony_surface * self.BALCONY_COEFFICIENT
        
        if terrace_surface:
            components["terrace_commercial"] = terrace_surface * self.TERRACE_COEFFICIENT
        
        if garden_surface:
            components["garden_commercial"] = garden_surface * self.GARDEN_COEFFICIENT
        
        if cellar_surface:
            components["cellar_commercial"] = cellar_surface * self.CELLAR_COEFFICIENT
        
        if attic_surface:
            components["attic_commercial"] = attic_surface * self.ATTIC_COEFFICIENT
        
        if has_box:
            components["box_commercial"] = self.BOX_VALUE_SQM
        
        if num_garages:
            components["garage_commercial"] = num_garages * self.GARAGE_VALUE_SQM
        
        if num_parking:
            components["parking_commercial"] = num_parking * self.PARKING_VALUE_SQM
        
        # Totale
        total_commercial = sum(components.values())
        
        return {
            **components,
            "total_commercial_surface": total_commercial,
            "ratio_commercial_to_main": total_commercial / main_surface if main_surface > 0 else 0
        }
    
    def get_surface_breakdown_text(self, calculation: Dict[str, float]) -> str:
        """
        Genera testo descrittivo del calcolo superficie
        
        Returns:
            Stringa formattata con breakdown
        """
        lines = [
            f"Superficie Principale: {calculation['main_surface']:.0f} mq"
        ]
        
        if calculation['balcony_commercial'] > 0:
            original = calculation['balcony_commercial'] / self.BALCONY_COEFFICIENT
            lines.append(f"Balconi: {original:.0f} mq × {self.BALCONY_COEFFICIENT:.0%} = {calculation['balcony_commercial']:.0f} mq")
        
        if calculation['terrace_commercial'] > 0:
            original = calculation['terrace_commercial'] / self.TERRACE_COEFFICIENT
            lines.append(f"Terrazze: {original:.0f} mq × {self.TERRACE_COEFFICIENT:.0%} = {calculation['terrace_commercial']:.0f} mq")
        
        if calculation['garden_commercial'] > 0:
            original = calculation['garden_commercial'] / self.GARDEN_COEFFICIENT
            lines.append(f"Giardino: {original:.0f} mq × {self.GARDEN_COEFFICIENT:.0%} = {calculation['garden_commercial']:.0f} mq")
        
        if calculation['cellar_commercial'] > 0:
            original = calculation['cellar_commercial'] / self.CELLAR_COEFFICIENT
            lines.append(f"Cantina: {original:.0f} mq × {self.CELLAR_COEFFICIENT:.0%} = {calculation['cellar_commercial']:.0f} mq")
        
        if calculation['box_commercial'] > 0:
            lines.append(f"Box: {calculation['box_commercial']:.0f} mq commerciali")
        
        if calculation['garage_commercial'] > 0:
            num = int(calculation['garage_commercial'] / self.GARAGE_VALUE_SQM)
            lines.append(f"Posti auto coperti ({num}): {calculation['garage_commercial']:.0f} mq commerciali")
        
        if calculation['parking_commercial'] > 0:
            num = int(calculation['parking_commercial'] / self.PARKING_VALUE_SQM)
            lines.append(f"Posti auto scoperti ({num}): {calculation['parking_commercial']:.0f} mq commerciali")
        
        lines.append(f"\n{'='*50}")
        lines.append(f"TOTALE SUPERFICIE COMMERCIALE: {calculation['total_commercial_surface']:.0f} mq")
        lines.append(f"Rapporto: {calculation['ratio_commercial_to_main']:.2f}x")
        
        return "\n".join(lines)


# Helper function
def calculate_commercial_surface(
    main_surface: float,
    **kwargs
) -> Dict[str, float]:
    """
    Funzione helper per calcolo rapido
    
    Usage:
        result = calculate_commercial_surface(
            main_surface=100,
            balcony_surface=10,
            has_box=True
        )
    """
    calculator = SurfaceCalculator()
    return calculator.calculate_commercial_surface(main_surface, **kwargs)


# Example usage
if __name__ == "__main__":
    # Test calcolo
    calculator = SurfaceCalculator()
    
    print("TEST CALCOLO SUPERFICIE COMMERCIALE")
    print("=" * 60)
    
    # Esempio 1: Appartamento base
    print("\n📐 Esempio 1: Appartamento 100 mq + balcone + box")
    result = calculator.calculate_commercial_surface(
        main_surface=100,
        balcony_surface=15,
        has_box=True
    )
    print(calculator.get_surface_breakdown_text(result))
    
    # Esempio 2: Villa con giardino
    print("\n\n📐 Esempio 2: Villa 200 mq + giardino + box + garage")
    result = calculator.calculate_commercial_surface(
        main_surface=200,
        terrace_surface=40,
        garden_surface=300,
        cellar_surface=30,
        has_box=True,
        num_garages=1,
        num_parking=2
    )
    print(calculator.get_surface_breakdown_text(result))
    
    # Esempio 3: Attico
    print("\n\n📐 Esempio 3: Attico 150 mq + terrazza panoramica")
    result = calculator.calculate_commercial_surface(
        main_surface=150,
        terrace_surface=80,
        has_box=True,
        num_parking=1
    )
    print(calculator.get_surface_breakdown_text(result))
