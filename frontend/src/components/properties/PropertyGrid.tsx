"use client";

import { LayoutGrid, List, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PropertyCard } from "./PropertyCard";
import type { Property } from "@/types";

interface PropertyGridProps {
  properties: Property[];
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

const sortOptions = [
  { value: "date_desc", label: "Più recenti" },
  { value: "date_asc", label: "Meno recenti" },
  { value: "price_asc", label: "Prezzo crescente" },
  { value: "price_desc", label: "Prezzo decrescente" },
  { value: "surface_desc", label: "Superficie maggiore" },
  { value: "surface_asc", label: "Superficie minore" },
];

export function PropertyGrid({
  properties,
  viewMode = "grid",
  onViewModeChange,
  sortBy = "date_desc",
  onSortChange,
  isLoading = false,
  emptyMessage = "Nessun immobile trovato",
}: PropertyGridProps) {
  // Loading skeleton
  if (isLoading) {
    return (
      <div>
        {/* Toolbar skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>

        {/* Grid skeleton */}
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          )}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl bg-white shadow-card"
            >
              <div className="aspect-property bg-gray-200 rounded-t-xl" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="pt-3 border-t">
                  <div className="h-6 w-1/3 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <LayoutGrid className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="font-serif text-xl font-bold text-gray-900">
          {emptyMessage}
        </h3>
        <p className="mt-2 max-w-sm text-gray-500">
          Prova a modificare i filtri di ricerca per trovare altri immobili.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Results count */}
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">
            {properties.length}
          </span>{" "}
          risultati
        </p>

        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          {onSortChange && (
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* View mode toggle */}
          {onViewModeChange && (
            <div className="flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                onClick={() => onViewModeChange("grid")}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-400 hover:text-gray-600"
                )}
                aria-label="Vista griglia"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  viewMode === "list"
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-400 hover:text-gray-600"
                )}
                aria-label="Vista lista"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Properties Grid/List */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            variant={viewMode === "list" ? "horizontal" : "default"}
          />
        ))}
      </div>
    </div>
  );
}
