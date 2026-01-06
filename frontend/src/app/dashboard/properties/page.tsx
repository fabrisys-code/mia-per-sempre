"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Building,
  MapPin,
  Ruler,
  Euro,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

// Status badge mapping
const STATUS_CONFIG: Record<string, { label: string; variant: string; icon: typeof CheckCircle }> = {
  active: { label: "Attivo", variant: "success", icon: CheckCircle },
  pending: { label: "In revisione", variant: "warning", icon: Clock },
  draft: { label: "Bozza", variant: "default", icon: Edit },
  inactive: { label: "Disattivato", variant: "error", icon: AlertCircle },
};

// Property type labels
const PROPERTY_TYPES: Record<string, string> = {
  appartamento: "Appartamento",
  villa: "Villa",
  villetta: "Villetta",
  attico: "Attico",
  loft: "Loft",
  mansarda: "Mansarda",
  casa_indipendente: "Casa indipendente",
  rustico: "Rustico",
  castello: "Castello",
  palazzo: "Palazzo",
};

interface Property {
  id: number;
  title: string;
  slug: string;
  property_type: string;
  city: string;
  province: string;
  surface_sqm: number;
  bare_property_value: number;
  status: string;
  views_count?: number;
  contacts_count?: number;
  created_at: string;
  main_image?: {
    thumbnail_url: string;
  };
}

function MyPropertiesContent() {
  const searchParams = useSearchParams();
  const createdId = searchParams.get("created");

  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreatedBanner, setShowCreatedBanner] = useState(!!createdId);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.properties.myProperties();
      setProperties(data.items || data || []);
    } catch (err: any) {
      setError(err.message || "Errore nel caricamento degli annunci");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.properties.delete(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch (err: any) {
      alert("Errore durante l'eliminazione: " + err.message);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-app">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              I Miei Annunci
            </h1>
            <p className="mt-1 text-gray-600">
              Gestisci i tuoi annunci di nuda proprietà
            </p>
          </div>
          <Link href="/dashboard/properties/new">
            <Button variant="primary">
              <Plus className="mr-2 h-4 w-4" />
              Nuovo Annuncio
            </Button>
          </Link>
        </div>

        {/* Success Banner */}
        {showCreatedBanner && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">
                  Annuncio pubblicato con successo!
                </p>
                <p className="text-sm text-green-700">
                  Il tuo annuncio è ora visibile sul marketplace.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreatedBanner(false)}
              className="text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-red-600" />
            <p className="mt-2 font-medium text-red-800">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={loadProperties}>
              Riprova
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && properties.length === 0 && (
          <Card className="py-16 text-center">
            <CardContent>
              <Building className="mx-auto h-16 w-16 text-gray-300" />
              <h2 className="mt-4 font-serif text-xl font-bold text-gray-900">
                Nessun annuncio ancora
              </h2>
              <p className="mt-2 text-gray-600">
                Inizia a pubblicare il tuo primo annuncio di nuda proprietà
              </p>
              <Link href="/dashboard/properties/new">
                <Button variant="primary" className="mt-6">
                  <Plus className="mr-2 h-4 w-4" />
                  Pubblica il tuo primo annuncio
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Properties List */}
        {!isLoading && properties.length > 0 && (
          <div className="space-y-4">
            {properties.map((property) => {
              const statusConfig = STATUS_CONFIG[property.status] || STATUS_CONFIG.draft;
              const StatusIcon = statusConfig.icon;

              return (
                <Card key={property.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative h-48 w-full sm:h-auto sm:w-48 flex-shrink-0">
                      {property.main_image?.thumbnail_url ? (
                        <img
                          src={property.main_image.thumbnail_url}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <Building className="h-12 w-12 text-gray-300" />
                        </div>
                      )}
                      <Badge
                        variant={statusConfig.variant as any}
                        className="absolute left-2 top-2"
                      >
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {property.title}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {property.city}, {property.province}
                            </span>
                            <span className="flex items-center gap-1">
                              <Ruler className="h-4 w-4" />
                              {property.surface_sqm} mq
                            </span>
                            <span>
                              {PROPERTY_TYPES[property.property_type] || property.property_type}
                            </span>
                          </div>
                        </div>

                        {/* Actions Dropdown */}
                        <div className="relative">
                          <div className="flex items-center gap-2">
                            <Link href={`/nuda-proprieta/${property.city.toLowerCase()}/${property.slug}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/dashboard/properties/${property.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setDeleteConfirm(property.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {property.views_count || 0} visualizzazioni
                          </span>
                          <span>
                            Pubblicato il {formatDate(property.created_at)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-lg font-bold text-primary-700">
                          <Euro className="h-4 w-4" />
                          {formatCurrency(property.bare_property_value)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delete Confirmation */}
                  {deleteConfirm === property.id && (
                    <div className="border-t bg-red-50 p-4">
                      <p className="text-sm text-red-800">
                        Sei sicuro di voler eliminare questo annuncio? L'azione è irreversibile.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          Annulla
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleDelete(property.id)}
                        >
                          Elimina definitivamente
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyPropertiesPage() {
  return (
    <ProtectedRoute>
      <MyPropertiesContent />
    </ProtectedRoute>
  );
}
