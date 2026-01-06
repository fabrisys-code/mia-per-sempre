"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, ChevronRight, MapPin, TrendingUp } from "lucide-react";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { Pagination } from "@/components/ui/Pagination";
import { useProperties } from "@/hooks/useProperties";
import { Badge } from "@/components/ui/Badge";

interface CityClientPageProps {
  cityName: string;
  citySlug: string;
}

export default function CityClientPage({ cityName, citySlug }: CityClientPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    properties,
    totalResults,
    totalPages,
    currentPage,
    filters,
    setFilters,
    resetFilters,
    sortBy,
    setSortBy,
    setPage,
    isLoading,
    error,
    fetchProperties,
  } = useProperties({
    initialFilters: { city: cityName },
    pageSize: 12,
    autoFetch: true,
  });

  // Mantieni il filtro città sincronizzato
  useEffect(() => {
    if (filters.city !== cityName) {
      setFilters({ ...filters, city: cityName });
    }
  }, [cityName]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 bg-white py-3">
        <div className="container-app">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-primary-600">
                Home
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <li>
              <Link
                href="/nuda-proprieta"
                className="text-gray-500 hover:text-primary-600"
              >
                Nuda Proprietà
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <li>
              <span className="font-medium text-gray-900">{cityName}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="bg-gradient-hero py-12 lg:py-16">
        <div className="container-app">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="featured" className="mb-4">
              <MapPin className="mr-1 h-3 w-3" /> {cityName}
            </Badge>
            <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Nuda Proprietà a {cityName}
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              {totalResults > 0
                ? `${totalResults} immobili con usufrutto vitalizio disponibili a ${cityName}`
                : `Immobili in nuda proprietà a ${cityName}`}
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6">
        <div className="container-app">
          <PropertyFilters
            filters={filters}
            onFiltersChange={(newFilters) => {
              // Mantieni sempre la città
              setFilters({ ...newFilters, city: cityName });
            }}
            onSearch={fetchProperties}
            onReset={() => {
              resetFilters();
              // Ripristina il filtro città dopo il reset
              setTimeout(() => setFilters({ city: cityName }), 0);
            }}
            totalResults={totalResults}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-12">
        <div className="container-app">
          {/* Error State */}
          {error && (
            <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
              <p className="text-red-700">{error}</p>
              <button
                onClick={fetchProperties}
                className="mt-2 text-sm font-medium text-red-600 underline hover:text-red-700"
              >
                Riprova
              </button>
            </div>
          )}

          {/* Properties Grid */}
          <PropertyGrid
            properties={properties}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortChange={setSortBy}
            isLoading={isLoading}
            emptyMessage={`Nessun immobile trovato a ${cityName}`}
          />

          {/* Pagination */}
          {totalPages > 1 && !isLoading && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="border-t border-gray-200 bg-white py-12">
        <div className="container-app">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Nuda Proprietà a {cityName}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Stai cercando un investimento immobiliare a <strong>{cityName}</strong>? 
              La nuda proprietà offre un'opportunità unica: acquistare immobili a prezzi 
              scontati del 30-50% rispetto al valore di mercato, con la garanzia del 
              diritto di usufrutto vitalizio per il venditore.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Su Mia Per Sempre trovi annunci verificati di appartamenti, ville e case 
              in nuda proprietà a {cityName}. Ogni immobile include una valutazione 
              automatica basata sui dati OMI dell'Agenzia delle Entrate.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/nuda-proprieta"
                className="text-primary-700 font-medium hover:text-primary-800 hover:underline"
              >
                ← Tutte le città
              </Link>
              <Link
                href="/come-funziona"
                className="text-primary-700 font-medium hover:text-primary-800 hover:underline"
              >
                Come funziona la nuda proprietà →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="container-app">
          <div className="mx-auto max-w-2xl text-center">
            <TrendingUp className="mx-auto h-10 w-10 text-primary-600" />
            <h2 className="mt-4 font-serif text-2xl font-bold text-gray-900">
              Hai un immobile a {cityName}?
            </h2>
            <p className="mt-2 text-gray-600">
              Scopri quanto vale la tua nuda proprietà con la nostra valutazione gratuita.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/valutazione"
                className="btn-primary inline-flex items-center justify-center"
              >
                Valuta il tuo Immobile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
