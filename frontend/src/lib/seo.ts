import type { Property } from "@/types";

/**
 * Genera uno slug SEO-friendly per un immobile
 * Formato: tipo-caratteristiche-mqX-ID
 * Esempio: appartamento-3-locali-85mq-42
 * L'ID alla fine garantisce unicità e permette lookup diretto
 */
export function generatePropertySlug(property: Property): string {
  const parts: string[] = [];

  // 1. Tipo immobile
  if (property.property_type) {
    parts.push(property.property_type.replace(/_/g, "-"));
  }

  // 2. Indirizzo o zona (se disponibile e visibile)
  if (property.address && property.show_exact_location) {
    // Estrai solo via/piazza senza numero civico
    const streetMatch = property.address.match(/^(via|piazza|corso|viale|largo)\s+[a-zA-ZÀ-ÿ\s]+/i);
    if (streetMatch) {
      parts.push(slugify(streetMatch[0]));
    }
  }

  // 3. Numero locali
  if (property.rooms) {
    parts.push(`${property.rooms}-locali`);
  }

  // 4. Superficie
  if (property.surface_sqm) {
    parts.push(`${Math.round(property.surface_sqm)}mq`);
  }

  // Genera slug base
  let slug = parts.join("-");

  // Se slug è troppo corto, aggiungi la città
  if (slug.length < 10) {
    slug = `${slugify(property.property_type || "immobile")}-${slugify(property.city)}`;
    if (property.rooms) {
      slug += `-${property.rooms}-locali`;
    }
  }

  // 5. Aggiungi ID alla fine per garantire unicità
  slug += `-${property.id}`;

  return slug;
}

/**
 * Estrae l'ID dell'immobile dallo slug
 * Esempio: "appartamento-3-locali-85mq-42" → 42
 */
export function extractIdFromSlug(slug: string): number | null {
  const match = slug.match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Converte una stringa in slug URL-safe
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Rimuovi accenti
    .replace(/[^a-z0-9\s-]/g, "") // Rimuovi caratteri speciali
    .replace(/\s+/g, "-") // Spazi → trattini
    .replace(/-+/g, "-") // Rimuovi trattini multipli
    .replace(/^-|-$/g, ""); // Rimuovi trattini iniziali/finali
}

/**
 * Genera slug per la città (URL-safe)
 */
export function generateCitySlug(city: string): string {
  return slugify(city);
}

/**
 * Ricostruisce il nome città dallo slug
 * Esempio: "san-giovanni-valdarno" → "San Giovanni Valdarno"
 */
export function cityFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Costruisce l'URL completo per un immobile
 */
export function getPropertyUrl(property: Property): string {
  const citySlug = generateCitySlug(property.city);
  const propertySlug = generatePropertySlug(property);
  return `/nuda-proprieta/${citySlug}/${propertySlug}`;
}

/**
 * Costruisce l'URL per la pagina città
 */
export function getCityUrl(city: string): string {
  return `/nuda-proprieta/${generateCitySlug(city)}`;
}

/**
 * Estrae città e slug dall'URL
 */
export function parsePropertyUrl(url: string): { city: string; slug: string } | null {
  const match = url.match(/\/nuda-proprieta\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  
  return {
    city: cityFromSlug(match[1]),
    slug: match[2],
  };
}

/**
 * Mappa dei tipi immobile per meta description
 */
export const propertyTypeLabels: Record<string, string> = {
  appartamento: "Appartamento",
  villa: "Villa",
  villetta: "Villetta",
  attico: "Attico",
  loft: "Loft",
  mansarda: "Mansarda",
  casa_indipendente: "Casa Indipendente",
  rustico: "Rustico",
  castello: "Castello",
  palazzo: "Palazzo",
};

/**
 * Genera titolo SEO per pagina immobile
 */
export function generatePropertyTitle(property: Property): string {
  const type = propertyTypeLabels[property.property_type] || "Immobile";
  const location = property.city;
  const rooms = property.rooms ? `${property.rooms} locali` : "";
  const surface = `${Math.round(property.surface_sqm)} mq`;
  
  return `${type} ${location} ${rooms} ${surface} - Nuda Proprietà | Mia Per Sempre`.trim().replace(/\s+/g, " ");
}

/**
 * Genera meta description SEO per pagina immobile
 */
export function generatePropertyDescription(property: Property): string {
  const type = propertyTypeLabels[property.property_type] || "Immobile";
  const price = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(property.bare_property_value);
  
  const features: string[] = [];
  if (property.rooms) features.push(`${property.rooms} locali`);
  if (property.bathrooms) features.push(`${property.bathrooms} bagni`);
  features.push(`${Math.round(property.surface_sqm)} mq`);
  
  return `${type} in nuda proprietà a ${property.city}. ${features.join(", ")}. Prezzo: ${price}. Usufrutto vitalizio, investimento sicuro. Scopri su Mia Per Sempre.`;
}

/**
 * Genera titolo SEO per pagina città
 */
export function generateCityTitle(city: string, count?: number): string {
  const countStr = count ? `${count} annunci` : "Annunci";
  return `Nuda Proprietà ${city} - ${countStr} | Mia Per Sempre`;
}

/**
 * Genera meta description SEO per pagina città
 */
export function generateCityDescription(city: string, count?: number): string {
  const countStr = count ? `${count} immobili` : "Immobili";
  return `${countStr} in nuda proprietà a ${city}. Appartamenti, ville e case con usufrutto vitalizio. Valutazione automatica, annunci verificati. Il marketplace italiano della nuda proprietà.`;
}
