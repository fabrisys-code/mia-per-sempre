"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  Home,
  User,
  Euro,
  TrendingUp,
  Info,
  CheckCircle,
  ArrowRight,
  Building,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

// Coefficienti usufrutto vitalizio 2025 (da DM)
const usufructCoefficients: Record<number, { coefficient: number; usufruct: number; bareProperty: number }> = {
  20: { coefficient: 19, usufruct: 95, bareProperty: 5 },
  30: { coefficient: 18, usufruct: 90, bareProperty: 10 },
  40: { coefficient: 17, usufruct: 85, bareProperty: 15 },
  50: { coefficient: 16, usufruct: 80, bareProperty: 20 },
  55: { coefficient: 15, usufruct: 75, bareProperty: 25 },
  60: { coefficient: 14, usufruct: 70, bareProperty: 30 },
  65: { coefficient: 13, usufruct: 65, bareProperty: 35 },
  67: { coefficient: 12.5, usufruct: 62.5, bareProperty: 37.5 },
  70: { coefficient: 12, usufruct: 60, bareProperty: 40 },
  72: { coefficient: 11.5, usufruct: 57.5, bareProperty: 42.5 },
  75: { coefficient: 11, usufruct: 55, bareProperty: 45 },
  77: { coefficient: 10.5, usufruct: 52.5, bareProperty: 47.5 },
  80: { coefficient: 10, usufruct: 50, bareProperty: 50 },
  82: { coefficient: 9.5, usufruct: 47.5, bareProperty: 52.5 },
  85: { coefficient: 9, usufruct: 45, bareProperty: 55 },
  87: { coefficient: 8.5, usufruct: 42.5, bareProperty: 57.5 },
  90: { coefficient: 8, usufruct: 40, bareProperty: 60 },
  92: { coefficient: 7.5, usufruct: 37.5, bareProperty: 62.5 },
  95: { coefficient: 7, usufruct: 35, bareProperty: 65 },
  100: { coefficient: 5, usufruct: 25, bareProperty: 75 },
};

// Trova il coefficiente più vicino per età
function getCoefficient(age: number): { coefficient: number; usufruct: number; bareProperty: number } {
  const ages = Object.keys(usufructCoefficients).map(Number).sort((a, b) => a - b);
  
  // Trova l'età più vicina
  let closestAge = ages[0];
  for (const a of ages) {
    if (a <= age) {
      closestAge = a;
    } else {
      break;
    }
  }
  
  return usufructCoefficients[closestAge];
}

const propertyTypes = [
  { value: "appartamento", label: "Appartamento" },
  { value: "villa", label: "Villa" },
  { value: "villetta", label: "Villetta a schiera" },
  { value: "attico", label: "Attico" },
  { value: "casa_indipendente", label: "Casa indipendente" },
  { value: "rustico", label: "Rustico / Casale" },
];

const conditions = [
  { value: "nuovo", label: "Nuovo / Ristrutturato" },
  { value: "buono", label: "Buone condizioni" },
  { value: "discreto", label: "Discrete condizioni" },
  { value: "da_ristrutturare", label: "Da ristrutturare" },
];

export default function ValuationCalculator() {
  // Form state
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [usufructuaryAge, setUsufructuaryAge] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [surface, setSurface] = useState<string>("");
  const [condition, setCondition] = useState<string>("");

  // Results
  const [showResults, setShowResults] = useState(false);

  // Calculate values
  const calculations = useMemo(() => {
    const value = parseFloat(propertyValue) || 0;
    const age = parseInt(usufructuaryAge) || 0;

    if (value <= 0 || age < 20 || age > 100) {
      return null;
    }

    const coeff = getCoefficient(age);
    const barePropertyValue = value * (coeff.bareProperty / 100);
    const usufructValue = value * (coeff.usufruct / 100);
    const savings = value - barePropertyValue;

    return {
      fullValue: value,
      barePropertyValue,
      usufructValue,
      savings,
      barePropertyPct: coeff.bareProperty,
      usufructPct: coeff.usufruct,
      coefficient: coeff.coefficient,
    };
  }, [propertyValue, usufructuaryAge]);

  const handleCalculate = () => {
    if (calculations) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setPropertyValue("");
    setUsufructuaryAge("");
    setPropertyType("");
    setCity("");
    setSurface("");
    setCondition("");
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container-app">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="featured" className="mb-4">
              <Calculator className="mr-1 h-3 w-3" /> Strumento Gratuito
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              Calcola il Valore della Nuda Proprietà
            </h1>
            <p className="mt-6 text-xl text-gray-200">
              Scopri in pochi secondi quanto vale il tuo immobile in nuda
              proprietà con il nostro calcolatore gratuito.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 lg:py-16">
        <div className="container-app">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary-600" />
                  Dati dell'Immobile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Value */}
                <div>
                  <Input
                    label="Valore di mercato dell'immobile *"
                    type="number"
                    placeholder="Es. 300000"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    leftIcon={<Euro className="h-4 w-4" />}
                    hint="Il valore stimato a piena proprietà"
                  />
                </div>

                {/* Age */}
                <div>
                  <Input
                    label="Età dell'usufruttuario *"
                    type="number"
                    placeholder="Es. 75"
                    min={20}
                    max={100}
                    value={usufructuaryAge}
                    onChange={(e) => setUsufructuaryAge(e.target.value)}
                    leftIcon={<User className="h-4 w-4" />}
                    hint="L'età di chi manterrà l'usufrutto"
                  />
                </div>

                <hr className="border-gray-200" />

                {/* Optional Fields */}
                <p className="text-sm text-gray-500">
                  Campi opzionali per una valutazione più precisa:
                </p>

                {/* Property Type */}
                <Select
                  label="Tipologia immobile"
                  options={[
                    { value: "", label: "Seleziona..." },
                    ...propertyTypes,
                  ]}
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                />

                {/* City */}
                <Input
                  label="Città"
                  placeholder="Es. Milano"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  leftIcon={<MapPin className="h-4 w-4" />}
                />

                {/* Surface */}
                <Input
                  label="Superficie (mq)"
                  type="number"
                  placeholder="Es. 85"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  leftIcon={<Building className="h-4 w-4" />}
                />

                {/* Condition */}
                <Select
                  label="Stato dell'immobile"
                  options={[{ value: "", label: "Seleziona..." }, ...conditions]}
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                />

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={handleCalculate}
                    disabled={!propertyValue || !usufructuaryAge}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcola Valore
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {showResults && calculations ? (
                <>
                  {/* Main Result Card */}
                  <Card variant="featured">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 uppercase tracking-wide">
                          Valore Nuda Proprietà Stimato
                        </p>
                        <p className="mt-2 text-4xl font-bold text-primary-800">
                          {formatCurrency(calculations.barePropertyValue)}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                          Pari al {calculations.barePropertyPct}% del valore pieno
                        </p>
                      </div>

                      <hr className="my-6 border-gray-200" />

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Valore piena proprietà
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(calculations.fullValue)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Valore usufrutto</span>
                          <span className="font-semibold">
                            {formatCurrency(calculations.usufructValue)} (
                            {calculations.usufructPct}%)
                          </span>
                        </div>
                        <div className="flex justify-between text-green-700">
                          <span className="font-medium">
                            Risparmio per l'acquirente
                          </span>
                          <span className="font-bold">
                            -{formatCurrency(calculations.savings)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Coefficient Info */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-accent-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">
                            Coefficiente applicato: {calculations.coefficient}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            Per un usufruttuario di {usufructuaryAge} anni, il
                            coefficiente ministeriale 2025 prevede che la nuda
                            proprietà valga il {calculations.barePropertyPct}%
                            del valore pieno.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="bg-primary-50 border-primary-200">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-gray-900">
                        Vuoi una valutazione professionale?
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        Pubblica gratuitamente il tuo annuncio su Mia Per Sempre e
                        raggiungi migliaia di investitori interessati.
                      </p>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <Link href="/auth/register">
                          <Button variant="primary" size="sm">
                            Pubblica Annuncio Gratis
                          </Button>
                        </Link>
                        <Link href="/nuda-proprieta">
                          <Button variant="outline" size="sm">
                            Esplora Annunci
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                /* Placeholder when no results */
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <Calculator className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="mt-4 font-semibold text-gray-900">
                        Inserisci i dati dell'immobile
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Compila il valore di mercato e l'età dell'usufruttuario
                        per calcolare il valore della nuda proprietà.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info Box */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Info className="h-5 w-5 text-accent-600" />
                    Come funziona il calcolo?
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Il calcolo usa i coefficienti del DM Economia 2025
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Più anziano è l'usufruttuario, più alto è il valore della
                        nuda proprietà
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Il valore reale può variare in base a zona e condizioni
                      </span>
                    </li>
                  </ul>
                  <Link
                    href="/come-funziona"
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary-700 hover:text-primary-800"
                  >
                    Scopri di più sulla nuda proprietà
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Coefficient Table Section */}
      <section className="py-12 bg-white">
        <div className="container-app">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-gray-900 text-center">
              Tabella Coefficienti Usufrutto 2025
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Coefficienti ministeriali per il calcolo del valore dell'usufrutto
              vitalizio
            </p>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left font-medium text-gray-500">
                      Età
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-gray-500">
                      Coefficiente
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-gray-500">
                      % Usufrutto
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-gray-500">
                      % Nuda Proprietà
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(usufructCoefficients)
                    .filter(([age]) => parseInt(age) >= 60)
                    .map(([age, data]) => (
                      <tr key={age} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {age} anni
                        </td>
                        <td className="px-4 py-3 text-right text-gray-600">
                          {data.coefficient}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-600">
                          {data.usufruct}%
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-primary-700">
                          {data.bareProperty}%
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container-app">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white">
              Pronto a Vendere o Investire?
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              Mia Per Sempre è il marketplace italiano specializzato in nuda
              proprietà. Pubblica o trova il tuo immobile ideale.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Registrati Gratis
                </Button>
              </Link>
              <Link href="/nuda-proprieta">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-800"
                >
                  Esplora Annunci
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
