import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Bath, Square, Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  formatCurrency,
  formatSurface,
  translatePropertyType,
} from "@/lib/utils";
import { getPropertyUrl } from "@/lib/seo";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "horizontal";
  showFavoriteButton?: boolean;
  onFavoriteClick?: (id: number) => void;
  isFavorite?: boolean;
}

export function PropertyCard({
  property,
  variant = "default",
  showFavoriteButton = true,
  onFavoriteClick,
  isFavorite = false,
}: PropertyCardProps) {
  const {
    id,
    title,
    city,
    province,
    surface_sqm,
    rooms,
    bathrooms,
    bare_property_value,
    property_type,
    is_featured,
    images,
    usufructuary_age,
  } = property;

  // Ottieni immagine di copertina o placeholder
  const coverImage = images?.find((img) => img.is_cover) || images?.[0];
  const imageUrl = coverImage?.urls?.medium || "/placeholder-property.jpg";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteClick?.(id);
  };

  if (variant === "horizontal") {
    return (
      <Link href={getPropertyUrl(property)}>
        <Card
          variant={is_featured ? "featured" : "default"}
          padding="none"
          className="flex flex-col overflow-hidden sm:flex-row"
        >
          {/* Image */}
          <div className="relative aspect-property w-full sm:aspect-auto sm:h-auto sm:w-72 flex-shrink-0">
            <div className="absolute inset-0 bg-gray-200">
              {coverImage ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 288px"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-100">
                  <Square className="h-12 w-12 text-gray-300" />
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              {is_featured && (
                <Badge variant="featured">
                  <Star className="mr-1 h-3 w-3" /> In Evidenza
                </Badge>
              )}
              <Badge variant="info">Nuda Proprietà</Badge>
            </div>

            {/* Favorite Button */}
            {showFavoriteButton && (
              <button
                onClick={handleFavoriteClick}
                className={cn(
                  "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition-colors",
                  isFavorite
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                )}
                aria-label={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
              >
                <Heart
                  className={cn("h-5 w-5", isFavorite && "fill-current")}
                />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <p className="text-sm text-gray-500">
                {translatePropertyType(property_type)}
              </p>
              <h3 className="mt-1 font-serif text-xl font-bold text-gray-900 line-clamp-1">
                {title}
              </h3>
              <p className="mt-1 flex items-center text-sm text-gray-500">
                <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                {city}, {province}
              </p>

              {/* Features */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {rooms && (
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {rooms} locali
                  </span>
                )}
                {bathrooms && (
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {bathrooms} bagni
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  {formatSurface(surface_sqm)}
                </span>
              </div>
            </div>

            {/* Price & Age */}
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-500">Nuda Proprietà</p>
                <p className="text-2xl font-bold text-primary-800">
                  {formatCurrency(bare_property_value)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Età usufruttuario</p>
                <p className="font-semibold text-gray-700">
                  {usufructuary_age} anni
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Default vertical card
  return (
    <Link href={getPropertyUrl(property)}>
      <Card
        variant={is_featured ? "featured" : "default"}
        padding="none"
        className="overflow-hidden"
      >
        {/* Image */}
        <div className="relative aspect-property">
          <div className="absolute inset-0 bg-gray-200">
            {coverImage ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100">
                <Square className="h-12 w-12 text-gray-300" />
              </div>
            )}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {is_featured && (
              <Badge variant="featured">
                <Star className="mr-1 h-3 w-3" /> In Evidenza
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          {showFavoriteButton && (
            <button
              onClick={handleFavoriteClick}
              className={cn(
                "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition-colors",
                isFavorite
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-500"
              )}
              aria-label={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            >
              <Heart
                className={cn("h-5 w-5", isFavorite && "fill-current")}
              />
            </button>
          )}

          {/* Property Type Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="info">{translatePropertyType(property_type)}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-bold text-gray-900 line-clamp-1">
            {title}
          </h3>

          <p className="mt-1 flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
            {city}, {province}
          </p>

          {/* Features */}
          <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
            {rooms && (
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                {rooms}
              </span>
            )}
            {bathrooms && (
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                {bathrooms}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              {surface_sqm} m²
            </span>
          </div>

          {/* Divider */}
          <hr className="my-4 border-gray-100" />

          {/* Price & Info */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Nuda Proprietà
              </p>
              <p className="text-xl font-bold text-primary-800">
                {formatCurrency(bare_property_value)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Usufrutto</p>
              <p className="text-sm font-medium text-gray-700">
                {usufructuary_age} anni
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
