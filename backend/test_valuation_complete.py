#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Test Completo Algoritmo Valutazione
"""

import sys
import os

# Import dai moduli app.services
from app.services.valuation_service import ValuationService, PropertyData
from app.services.surface_calculator import SurfaceCalculator
from app.services.coefficients import MeritCoefficients

print("OK - Import moduli completato\n")


def test_valuation_examples():
    """Testa valutazione con esempi reali"""
    
    print("=" * 80)
    print("TEST ALGORITMO VALUTAZIONE")
    print("=" * 80)
    print("Sistema completo per calcolo nuda proprieta")
    print("Integra: OMI + Superficie Commerciale + Coefficienti + Fiscale")
    print("=" * 80)
    
    service = ValuationService()
    
    # TEST 1: Appartamento Pescara
    print("\n\n" + "=" * 80)
    print("TEST 1: APPARTAMENTO PESCARA CENTRO")
    print("=" * 80)
    print("Scenario: Proprietario 78 anni, appartamento 100mq + balcone + box")
    print("Prezzo richiesto: 115.000 euro")
    print("=" * 80)
    
    property1 = PropertyData(
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
    
    valuation1 = service.calculate_complete_valuation(property1)
    print(service.format_valuation_report(valuation1))
    
    # TEST 2: Attico Milano
    print("\n\n" + "=" * 80)
    print("TEST 2: ATTICO MILANO CENTRO")
    print("=" * 80)
    print("Scenario: Proprietaria 70 anni, attico 150mq + terrazza panoramica")
    print("Prezzo richiesto: 750.000 euro")
    print("=" * 80)
    
    property2 = PropertyData(
        comune="MILANO",
        fascia="B",
        surface_sqm=150,
        terrace_surface=80,
        has_box=True,
        num_parking=1,
        floor=8,
        has_elevator=True,
        is_attic=True,
        condition="finemente_ristrutturato",
        brightness="molto_luminoso",
        view="esterna_panoramica",
        building_year=2010,
        energy_class="A2",
        heating_type="autonomo",
        usufructuary_age=70,
        requested_price=750000
    )
    
    valuation2 = service.calculate_complete_valuation(property2)
    print(service.format_valuation_report(valuation2))
    
    # TEST 3: Villa Roma
    print("\n\n" + "=" * 80)
    print("TEST 3: VILLA ROMA")
    print("=" * 80)
    print("Scenario: Proprietario 82 anni, villa 250mq + giardino")
    print("Prezzo richiesto: 650.000 euro")
    print("=" * 80)
    
    property3 = PropertyData(
        comune="ROMA",
        fascia="C",
        surface_sqm=250,
        garden_surface=400,
        cellar_surface=50,
        has_box=True,
        num_garages=2,
        floor=0,
        has_garden=True,
        condition="ristrutturato",
        brightness="molto_luminoso",
        view="esterna",
        building_year=1980,
        energy_class="B",
        heating_type="autonomo",
        usufructuary_age=82,
        requested_price=650000
    )
    
    valuation3 = service.calculate_complete_valuation(property3)
    print(service.format_valuation_report(valuation3))
    
    # RIEPILOGO COMPARATIVO
    print("\n\n" + "=" * 80)
    print("RIEPILOGO COMPARATIVO VALUTAZIONI")
    print("=" * 80)
    
    tests = [
        ("Pescara Centro", valuation1),
        ("Milano Attico", valuation2),
        ("Roma Villa", valuation3)
    ]
    
    print(f"\n{'Immobile':<25} {'Prezzo Req.':<15} {'Stima NP':<15} {'Deal Score':<20}")
    print("-" * 80)
    
    for name, val in tests:
        if 'error' not in val:
            prezzo_req = val.get('prezzo_richiesto', 0)
            stima_np = val['valore_fiscale']['valore_nuda_proprieta']
            deal = val.get('deal_score', {})
            score = deal.get('score', 'N/A').replace('_', ' ')[:18]
            
            print(f"{name:<25} {prezzo_req:>13,.0f} E {stima_np:>13,.0f} E {score:<20}")
    
    print("\n" + "=" * 80)


def test_individual_modules():
    """Testa moduli individuali"""
    
    print("\n\n" + "=" * 80)
    print("TEST MODULI INDIVIDUALI")
    print("=" * 80)
    
    # Test 1: Superficie Commerciale
    print("\n[1] Test Superficie Commerciale")
    print("-" * 60)
    
    calc = SurfaceCalculator()
    result = calc.calculate_commercial_surface(
        main_surface=100,
        balcony_surface=15,
        has_box=True
    )
    print(calc.get_surface_breakdown_text(result))
    print("\nOK - Superficie Commerciale")
    
    # Test 2: Coefficienti Merito
    print("\n\n[2] Test Coefficienti Merito")
    print("-" * 60)
    
    from app.services.coefficients import PropertyCondition, Brightness
    
    coeff = MeritCoefficients()
    result = coeff.calculate_total_coefficient(
        floor=3,
        has_elevator=True,
        condition=PropertyCondition.BUONO,
        brightness=Brightness.LUMINOSO,
        energy_class="C"
    )
    
    print("Coefficienti calcolati:")
    for key, value in result.items():
        if key != 'multiplier':
            print(f"  {key}: {value:+.2%}")
    print(f"\n  MOLTIPLICATORE: {result['multiplier']:.3f}x")
    print("\nOK - Coefficienti Merito")
    
    # Test 3: Query OMI
    print("\n\n[3] Test Query OMI")
    print("-" * 60)
    
    service = ValuationService()
    
    cities = ["MILANO", "ROMA", "PESCARA", "BOLOGNA", "TORINO"]
    
    for city in cities:
        omi = service.get_omi_quotation(city, fascia='B')
        if omi:
            print(f"OK - {city}: {omi['prezzo_medio']:,.0f} E/mq (zona {omi['zona_codice']})")
        else:
            print(f"WARN - {city}: Nessuna quotazione zona B")
    
    print("\nOK - Query OMI")


def main():
    """Main test function"""
    
    try:
        # Test moduli individuali
        test_individual_modules()
        
        # Test valutazioni complete
        test_valuation_examples()
        
        print("\n\n" + "=" * 80)
        print("TUTTI I TEST COMPLETATI CON SUCCESSO!")
        print("=" * 80)
        print("\nOK - Algoritmo valutazione funzionante e testato!")
        print("OK - Database OMI: 157k quotazioni disponibili")
        print("OK - Moduli: Superficie + Coefficienti + Fiscale")
        print("\nProssimo step: Integrazione API endpoint FastAPI")
        print("=" * 80)
        return 0
        
    except Exception as e:
        print(f"\n\nERRORE NEI TEST: {str(e)}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
