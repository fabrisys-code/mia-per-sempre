"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import type { PropertyFilters as Filters, PropertyType } from "@/types";

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onSearch: () => void;
  onReset: () => void;
  totalResults?: number;
  isLoading?: boolean;
}

const propertyTypes: Array<{ value: PropertyType | ""; label: string }> = [
  { value: "", label: "Tutti i tipi" },
  { value: "appartamento", label: "Appartamento" },
  { value: "villa", label: "Villa" },
  { value: "villetta", label: "Villetta" },
  { value: "attico", label: "Attico" },
  { value: "loft", label: "Loft" },
  { value: "mansarda", label: "Mansarda" },
  { value: "casa_indipendente", label: "Casa Indipendente" },
  { value: "rustico", label: "Rustico" },
  { value: "castello", label: "Castello" },
  { value: "palazzo", label: "Palazzo" },
];

const priceRanges = [
  { value: "", label: "Qualsiasi prezzo" },
  { value: "50000", label: "Fino a € 50.000" },
  { value: "100000", label: "Fino a € 100.000" },
  { value: "150000", label: "Fino a € 150.000" },
  { value: "200000", label: "Fino a € 200.000" },
  { value: "300000", label: "Fino a € 300.000" },
  { value: "500000", label: "Fino a € 500.000" },
  { value: "750000", label: "Fino a € 750.000" },
  { value: "1000000", label: "Fino a € 1.000.000" },
];

const surfaceRanges = [
  { value: "", label: "Qualsiasi superficie" },
  { value: "50", label: "Almeno 50 m²" },
  { value: "70", label: "Almeno 70 m²" },
  { value: "100", label: "Almeno 100 m²" },
  { value: "150", label: "Almeno 150 m²" },
  { value: "200", label: "Almeno 200 m²" },
];

const roomOptions = [
  { value: "", label: "Qualsiasi" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const regions = [
  { value: "", label: "Tutte le regioni" },
  { value: "Lombardia", label: "Lombardia" },
  { value: "Lazio", label: "Lazio" },
  { value: "Campania", label: "Campania" },
  { value: "Sicilia", label: "Sicilia" },
  { value: "Veneto", label: "Veneto" },
  { value: "Emilia-Romagna", label: "Emilia-Romagna" },
  { value: "Piemonte", label: "Piemonte" },
  { value: "Puglia", label: "Puglia" },
  { value: "Toscana", label: "Toscana" },
  { value: "Calabria", label: "Calabria" },
  { value: "Sardegna", label: "Sardegna" },
  { value: "Liguria", label: "Liguria" },
  { value: "Marche", label: "Marche" },
  { value: "Abruzzo", label: "Abruzzo" },
  { value: "Friuli-Venezia Giulia", label: "Friuli-Venezia Giulia" },
  { value: "Trentino-Alto Adige", label: "Trentino-Alto Adige" },
  { value: "Umbria", label: "Umbria" },
  { value: "Basilicata", label: "Basilicata" },
  { value: "Molise", label: "Molise" },
  { value: "Valle d'Aosta", label: "Valle d'Aosta" },
];

export function PropertyFilters({
  filters,
  onFiltersChange,
  onSearch,
  onReset,
  totalResults,
  isLoading = false,
}: PropertyFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  return (
    <div className="rounded-xl bg-white p-6 shadow-card">
      {/* Main Filters Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Città */}
        <div>
          <Input
            label="Città"
            placeholder="Es. Milano, Roma..."
            value={filters.city || ""}
            onChange={(e) => updateFilter("city", e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Regione */}
        <div>
          <Select
            label="Regione"
            options={regions}
            value={filters.region || ""}
            onChange={(e) => updateFilter("region", e.target.value)}
          />
        </div>

        {/* Tipologia */}
        <div>
          <Select
            label="Tipologia"
            options={propertyTypes}
            value={filters.property_type || ""}
            onChange={(e) =>
              updateFilter("property_type", e.target.value as PropertyType)
            }
          />
        </div>

        {/* Prezzo Max */}
        <div>
          <Select
            label="Prezzo massimo"
            options={priceRanges}
            value={filters.max_price?.toString() || ""}
            onChange={(e) =>
              updateFilter(
                "max_price",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtri avanzati
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              showAdvanced && "rotate-180"
            )}
          />
        </button>

        <div className="flex items-center gap-3">
          {activeFiltersCount > 0 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
              Resetta filtri ({activeFiltersCount})
            </button>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={onSearch}
            isLoading={isLoading}
          >
            <Search className="mr-2 h-4 w-4" />
            Cerca
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 grid gap-4 border-t border-gray-100 pt-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Superficie Min */}
          <Select
            label="Superficie minima"
            options={surfaceRanges}
            value={filters.min_surface?.toString() || ""}
            onChange={(e) =>
              updateFilter(
                "min_surface",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />

          {/* Locali Min */}
          <Select
            label="Locali minimi"
            options={roomOptions}
            value={filters.min_rooms?.toString() || ""}
            onChange={(e) =>
              updateFilter(
                "min_rooms",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />

          {/* Età Usufruttuario Max */}
          <div>
            <Input
              label="Età usufruttuario max"
              type="number"
              placeholder="Es. 80"
              min={60}
              max={100}
              value={filters.max_usufructuary_age || ""}
              onChange={(e) =>
                updateFilter(
                  "max_usufructuary_age",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>

          {/* Checkbox Features */}
          <div>
            <label className="label">Caratteristiche</label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "has_elevator", label: "Ascensore" },
                { key: "has_balcony", label: "Balcone" },
                { key: "has_terrace", label: "Terrazzo" },
                { key: "has_garden", label: "Giardino" },
                { key: "has_parking", label: "Parcheggio" },
                { key: "has_garage", label: "Garage" },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className={cn(
                    "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    filters[key as keyof Filters]
                      ? "border-primary-600 bg-primary-50 text-primary-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={!!filters[key as keyof Filters]}
                    onChange={(e) =>
                      updateFilter(
                        key as keyof Filters,
                        e.target.checked || undefined
                      )
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      {totalResults !== undefined && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{totalResults}</span>{" "}
            immobili trovati
          </p>
        </div>
      )}
    </div>
  );
}
