"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, TrendingUp, MapPin } from "lucide-react";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { Pagination } from "@/components/ui/Pagination";
import { useProperties } from "@/hooks/useProperties";
import { Badge } from "@/components/ui/Badge";

// Città principali per quick links
const cittaPrincipali = [
  { name: "Milano", slug: "milano" },
  { name: "Roma", slug: "roma" },
  { name: "Torino", slug: "torino" },
  { name: "Firenze", slug: "firenze" },
  { name: "Bologna", slug: "bologna" },
  { name: "Napoli", slug: "napoli" },
  { name: "Genova", slug: "genova" },
  { name: "Venezia", slug: "venezia" },
];

export default function PropertiesClientPage() {
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
    pageSize: 12,
    autoFetch: true,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="bg-gradient-hero py-12 lg:py-16">
        <div className="container-app">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="featured" className="mb-4">
              <Home className="mr-1 h-3 w-3" /> Marketplace Nuda Proprietà
            </Badge>
            <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Immobili in Nuda Proprietà
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              Esplora la nostra selezione di immobili con usufrutto vitalizio in
              tutta Italia
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links Città */}
      <section className="border-b border-gray-200 bg-white py-4">
        <div className="container-app">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="flex-shrink-0 text-sm font-medium text-gray-500">
              <MapPin className="mr-1 inline h-4 w-4" />
              Città:
            </span>
            {cittaPrincipali.map((citta) => (
              <Link
                key={citta.slug}
                href={`/nuda-proprieta/${citta.slug}`}
                className="flex-shrink-0 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
              >
                {citta.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6">
        <div className="container-app">
          <PropertyFilters
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={fetchProperties}
            onReset={resetFilters}
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
            emptyMessage="Nessun immobile corrisponde ai criteri di ricerca"
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
              Cos'è la Nuda Proprietà?
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              La <strong>nuda proprietà</strong> è una forma di proprietà immobiliare 
              in cui il proprietario (nudo proprietario) possiede l'immobile ma non 
              può goderne direttamente, perché il diritto di abitazione (usufrutto) 
              è riservato a un'altra persona, solitamente l'ex proprietario anziano.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Questo tipo di investimento offre vantaggi sia per chi vende (liquidità 
              immediata continuando a vivere nella propria casa) sia per chi acquista 
              (prezzo scontato del 30-50% rispetto al valore di mercato).
            </p>
            <div className="mt-6">
              <Link
                href="/come-funziona"
                className="text-primary-700 font-medium hover:text-primary-800 hover:underline"
              >
                Scopri come funziona la nuda proprietà →
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
              Vuoi vendere il tuo immobile?
            </h2>
            <p className="mt-2 text-gray-600">
              Scopri quanto vale la tua nuda proprietà e pubblica il tuo annuncio
              gratuitamente.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/valutazione"
                className="btn-primary inline-flex items-center justify-center"
              >
                Valuta il tuo Immobile
              </Link>
              <Link
                href="/come-funziona"
                className="btn-outline inline-flex items-center justify-center"
              >
                Come Funziona
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
