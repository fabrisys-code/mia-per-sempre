"use client";

import { useState, useCallback, useEffect } from "react";
import api, { ApiError } from "@/lib/api";
import type { Property, PropertyFilters, SearchParams } from "@/types";

interface UsePropertiesOptions {
  initialFilters?: PropertyFilters;
  pageSize?: number;
  autoFetch?: boolean;
}

interface UsePropertiesReturn {
  // Data
  properties: Property[];
  totalResults: number;
  totalPages: number;
  currentPage: number;

  // Filters
  filters: PropertyFilters;
  setFilters: (filters: PropertyFilters) => void;
  updateFilter: <K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K]
  ) => void;
  resetFilters: () => void;

  // Sorting
  sortBy: string;
  setSortBy: (sort: string) => void;

  // Pagination
  setPage: (page: number) => void;

  // State
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProperties: () => Promise<void>;
  refresh: () => Promise<void>;
}

const defaultFilters: PropertyFilters = {};

export function useProperties({
  initialFilters = defaultFilters,
  pageSize = 12,
  autoFetch = true,
}: UsePropertiesOptions = {}): UsePropertiesReturn {
  // State
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [sortBy, setSortBy] = useState("date_desc");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / pageSize);

  // Parse sort string to API params
  const parseSortBy = (sort: string): { sort_by: string; sort_order: "asc" | "desc" } => {
    const [field, order] = sort.split("_");
    return {
      sort_by: field === "date" ? "created_at" : field,
      sort_order: order as "asc" | "desc",
    };
  };

  // Fetch properties
  // Helper per convertire URL immagini
  const getImageBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || 
      (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
        ? '' 
        : 'http://localhost:8000');
  };

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { sort_by, sort_order } = parseSortBy(sortBy);

      const params: SearchParams = {
        ...filters,
        page: currentPage,
        page_size: pageSize,
        sort_by: sort_by as "price" | "date" | "surface",
        sort_order,
      };

      // Remove empty values
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([, v]) => v !== undefined && v !== "" && v !== null
        )
      ) as SearchParams;

      const response = await api.properties.search(cleanParams);

      // Supporta sia array diretto che risposta paginata {items, total}
      let propertiesList: Property[];
      let total: number;
      
      if (Array.isArray(response)) {
        propertiesList = response;
        total = response.length;
      } else {
        propertiesList = response.items || response.properties || [];
        total = response.total || response.count || 0;
      }

      // Carica le immagini per ogni property in parallelo
      const imageBaseUrl = getImageBaseUrl();
      const propertiesWithImages = await Promise.all(
        propertiesList.map(async (property) => {
          try {
            const imagesData = await api.images.list(property.id);
            const images = (imagesData.images || []).map((img: any) => ({
              ...img,
              urls: {
                thumbnail: img.urls?.thumbnail ? `${imageBaseUrl}${img.urls.thumbnail}` : null,
                medium: img.urls?.medium ? `${imageBaseUrl}${img.urls.medium}` : null,
                large: img.urls?.large ? `${imageBaseUrl}${img.urls.large}` : null,
              }
            }));
            return { ...property, images };
          } catch {
            return { ...property, images: [] };
          }
        })
      );

      setProperties(propertiesWithImages);
      setTotalResults(total);
    } catch (err) {
      console.error("Error fetching properties:", err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Errore nel caricamento degli immobili");
      }
      setProperties([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, [filters, currentPage, pageSize, sortBy]);

  // Update single filter
  const updateFilter = useCallback(
    <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  }, []);

  // Set page
  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Handle filters change
  const handleFiltersChange = useCallback((newFilters: PropertyFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Refresh
  const refresh = useCallback(async () => {
    await fetchProperties();
  }, [fetchProperties]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchProperties();
    }
  }, [autoFetch, fetchProperties]);

  return {
    // Data
    properties,
    totalResults,
    totalPages,
    currentPage,

    // Filters
    filters,
    setFilters: handleFiltersChange,
    updateFilter,
    resetFilters,

    // Sorting
    sortBy,
    setSortBy: handleSortChange,

    // Pagination
    setPage,

    // State
    isLoading,
    error,

    // Actions
    fetchProperties,
    refresh,
  };
}

// Hook per singola property
export function useProperty(id: number | null) {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      // Carica property e immagini in parallelo
      const [propertyData, imagesData] = await Promise.all([
        api.properties.get(id),
        api.images.list(id).catch(() => ({ images: [] })) // Fallback se fallisce
      ]);
      
      // Base URL per le immagini (backend)
      const imageBaseUrl = process.env.NEXT_PUBLIC_API_URL || 
        (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
          ? '' 
          : 'http://localhost:8000');
      
      // Converti URL relative in assolute
      const imagesWithAbsoluteUrls = (imagesData.images || []).map((img: any) => ({
        ...img,
        urls: {
          thumbnail: img.urls?.thumbnail ? `${imageBaseUrl}${img.urls.thumbnail}` : null,
          medium: img.urls?.medium ? `${imageBaseUrl}${img.urls.medium}` : null,
          large: img.urls?.large ? `${imageBaseUrl}${img.urls.large}` : null,
        }
      }));
      
      // Merge immagini nella property
      const propertyWithImages = {
        ...propertyData,
        images: imagesWithAbsoluteUrls
      };
      
      setProperty(propertyWithImages);
    } catch (err) {
      console.error("Error fetching property:", err);
      if (err instanceof ApiError) {
        if (err.isNotFound()) {
          setError("Immobile non trovato");
        } else {
          setError(err.message);
        }
      } else {
        setError("Errore nel caricamento dell'immobile");
      }
      setProperty(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id, fetchProperty]);

  return {
    property,
    isLoading,
    error,
    refresh: fetchProperty,
  };
}
