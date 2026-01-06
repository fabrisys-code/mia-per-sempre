"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Building,
  Zap,
  Car,
  Trees,
  Home,
  Phone,
  Mail,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  X,
  Check,
  Euro,
  User,
} from "lucide-react";
import { useProperty } from "@/hooks/useProperties";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  formatCurrency,
  formatSurface,
  translatePropertyType,
  translateEnergyClass,
} from "@/lib/utils";
import { cityFromSlug } from "@/lib/seo";

interface PropertyDetailClientProps {
  propertyId: number;
  citySlug: string;
  propertySlug: string;
}

export default function PropertyDetailClient({
  propertyId,
  citySlug,
  propertySlug,
}: PropertyDetailClientProps) {
  const { property, isLoading, error } = useProperty(propertyId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cityName = cityFromSlug(citySlug);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-app py-8">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4" />
            <div className="aspect-video bg-gray-200 rounded-xl mb-8" />
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 w-full bg-gray-200 rounded" />
                <div className="h-6 w-3/4 bg-gray-200 rounded" />
                <div className="h-6 w-1/2 bg-gray-200 rounded" />
              </div>
              <div className="h-64 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Immobile non trovato
          </h1>
          <p className="text-gray-600 mb-4">{error || "L'immobile richiesto non esiste."}</p>
          <Link href="/nuda-proprieta" className="btn-primary">
            Torna agli annunci
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images || [];
  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Features list
  const features = [
    { key: "has_elevator", label: "Ascensore", icon: Building },
    { key: "has_balcony", label: "Balcone", icon: Home },
    { key: "has_terrace", label: "Terrazzo", icon: Home },
    { key: "has_garden", label: "Giardino", icon: Trees },
    { key: "has_parking", label: "Parcheggio", icon: Car },
    { key: "has_garage", label: "Garage", icon: Car },
    { key: "has_cellar", label: "Cantina", icon: Home },
  ];

  const activeFeatures = features.filter(
    (f) => property[f.key as keyof typeof property]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 bg-white py-3">
        <div className="container-app">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
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
              <Link
                href={`/nuda-proprieta/${citySlug}`}
                className="text-gray-500 hover:text-primary-600"
              >
                {cityName}
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <li>
              <span className="font-medium text-gray-900 line-clamp-1">
                {property.title}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-app py-8">
        {/* Title & Actions */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="info">
                {translatePropertyType(property.property_type)}
              </Badge>
              {property.is_featured && (
                <Badge variant="featured">In Evidenza</Badge>
              )}
            </div>
            <h1 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center text-gray-600">
              <MapPin className="mr-1 h-5 w-5" />
              {property.address && property.show_exact_location
                ? `${property.address}, `
                : ""}
              {property.city}, {property.province}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`mr-2 h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
              Salva
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Condividi
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          {images.length > 0 ? (
            <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-200">
              <Image
                src={currentImage?.urls?.large || "/placeholder-property.jpg"}
                alt={property.title}
                fill
                className="object-cover cursor-pointer"
                onClick={() => setShowGallery(true)}
                priority
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center rounded-xl bg-gray-200">
              <Home className="h-16 w-16 text-gray-400" />
            </div>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg ${
                    idx === currentImageIndex
                      ? "ring-2 ring-primary-600"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.urls?.thumbnail || "/placeholder-property.jpg"}
                    alt={`${property.title} - foto ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-white p-4 shadow-sm text-center">
                <Square className="mx-auto h-6 w-6 text-primary-600" />
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {formatSurface(property.surface_sqm)}
                </p>
                <p className="text-sm text-gray-500">Superficie</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm text-center">
                <Bed className="mx-auto h-6 w-6 text-primary-600" />
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {property.rooms || "-"}
                </p>
                <p className="text-sm text-gray-500">Locali</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm text-center">
                <Bath className="mx-auto h-6 w-6 text-primary-600" />
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {property.bathrooms || "-"}
                </p>
                <p className="text-sm text-gray-500">Bagni</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm text-center">
                <Building className="mx-auto h-6 w-6 text-primary-600" />
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {property.floor !== null ? property.floor : "-"}
                </p>
                <p className="text-sm text-gray-500">Piano</p>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Descrizione</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 whitespace-pre-line">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Features */}
            {activeFeatures.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Caratteristiche</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {activeFeatures.map((feature) => (
                      <div
                        key={feature.key}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <Check className="h-5 w-5 text-green-600" />
                        {feature.label}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Dettagli Immobile</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  {property.building_year && (
                    <>
                      <dt className="text-gray-500">Anno costruzione</dt>
                      <dd className="font-medium text-gray-900">
                        {property.building_year}
                      </dd>
                    </>
                  )}
                  {property.renovation_year && (
                    <>
                      <dt className="text-gray-500">Anno ristrutturazione</dt>
                      <dd className="font-medium text-gray-900">
                        {property.renovation_year}
                      </dd>
                    </>
                  )}
                  {property.energy_class && (
                    <>
                      <dt className="text-gray-500">Classe energetica</dt>
                      <dd className="font-medium text-gray-900">
                        {translateEnergyClass(property.energy_class)}
                      </dd>
                    </>
                  )}
                  {property.heating_type && (
                    <>
                      <dt className="text-gray-500">Riscaldamento</dt>
                      <dd className="font-medium text-gray-900">
                        {property.heating_type}
                      </dd>
                    </>
                  )}
                  {property.total_floors && (
                    <>
                      <dt className="text-gray-500">Piani edificio</dt>
                      <dd className="font-medium text-gray-900">
                        {property.total_floors}
                      </dd>
                    </>
                  )}
                </dl>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card variant="featured">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    Nuda Proprietà
                  </p>
                  <p className="mt-2 text-3xl font-bold text-primary-800">
                    {formatCurrency(property.bare_property_value)}
                  </p>

                  {property.full_property_value && (
                    <p className="mt-2 text-sm text-gray-500">
                      Valore piena proprietà:{" "}
                      <span className="line-through">
                        {formatCurrency(property.full_property_value)}
                      </span>
                    </p>
                  )}
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Usufruct Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Età usufruttuario
                    </span>
                    <span className="font-semibold text-gray-900">
                      {property.usufructuary_age} anni
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Tipo usufrutto
                    </span>
                    <span className="font-semibold text-gray-900">
                      {property.usufruct_type === "lifetime"
                        ? "Vitalizio"
                        : "A termine"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Euro className="h-4 w-4" />
                      Prezzo/mq
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(
                        property.bare_property_value / property.surface_sqm
                      )}
                      /mq
                    </span>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Contact CTA */}
                <div className="space-y-3">
                  <Button variant="primary" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Contatta il proprietario
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Richiedi informazioni
                  </Button>
                </div>

                <p className="mt-4 text-xs text-center text-gray-500">
                  Annuncio pubblicato il{" "}
                  {new Date(property.created_at).toLocaleDateString("it-IT")}
                </p>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Link utili
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/come-funziona"
                      className="text-primary-700 hover:underline"
                    >
                      Come funziona la nuda proprietà?
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/valutazione"
                      className="text-primary-700 hover:underline"
                    >
                      Calcola il valore del tuo immobile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/nuda-proprieta/${citySlug}`}
                      className="text-primary-700 hover:underline"
                    >
                      Altri immobili a {cityName}
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      {showGallery && images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex h-full items-center justify-center">
            <button
              onClick={prevImage}
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <div className="relative h-[80vh] w-[90vw]">
              <Image
                src={currentImage?.urls?.large || "/placeholder-property.jpg"}
                alt={property.title}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <ChevronRightIcon className="h-8 w-8" />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
