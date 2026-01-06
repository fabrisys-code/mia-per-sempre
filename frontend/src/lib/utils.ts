import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ===== CLASSNAME UTILITY =====
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ===== FORMATTERS =====

/**
 * Formatta un numero come valuta EUR
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formatta un numero con separatore migliaia
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("it-IT").format(value);
}

/**
 * Formatta una data in formato italiano
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...options,
  }).format(d);
}

/**
 * Formatta una data in formato relativo (es. "2 giorni fa")
 */
export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "adesso";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minut${diffInMinutes === 1 ? "o" : "i"} fa`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} or${diffInHours === 1 ? "a" : "e"} fa`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} giorn${diffInDays === 1 ? "o" : "i"} fa`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} mes${diffInMonths === 1 ? "e" : "i"} fa`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ann${diffInYears === 1 ? "o" : "i"} fa`;
}

/**
 * Formatta superficie in mq
 */
export function formatSurface(sqm: number): string {
  return `${formatNumber(sqm)} m²`;
}

// ===== PROPERTY HELPERS =====

/**
 * Traduce il tipo di proprietà
 */
export function translatePropertyType(type: string): string {
  const translations: Record<string, string> = {
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
  return translations[type] || type;
}

/**
 * Traduce lo stato della proprietà
 */
export function translatePropertyStatus(status: string): string {
  const translations: Record<string, string> = {
    draft: "Bozza",
    published: "Pubblicato",
    pending: "In Attesa",
    sold: "Venduto",
    suspended: "Sospeso",
    deleted: "Eliminato",
  };
  return translations[status] || status;
}

/**
 * Traduce la classe energetica
 */
export function translateEnergyClass(energyClass: string): string {
  return energyClass.toUpperCase().replace("A4+", "A4+");
}

/**
 * Genera label per le features
 */
export function getFeatureLabel(feature: string): string {
  const labels: Record<string, string> = {
    has_elevator: "Ascensore",
    has_balcony: "Balcone",
    has_terrace: "Terrazzo",
    has_garden: "Giardino",
    has_parking: "Parcheggio",
    has_garage: "Box/Garage",
    has_cellar: "Cantina",
  };
  return labels[feature] || feature;
}

/**
 * Genera descrizione breve dell'immobile
 */
export function getPropertySummary(property: {
  rooms?: number;
  bathrooms?: number;
  surface_sqm: number;
}): string {
  const parts: string[] = [];
  
  if (property.rooms) {
    parts.push(`${property.rooms} local${property.rooms === 1 ? "e" : "i"}`);
  }
  
  if (property.bathrooms) {
    parts.push(`${property.bathrooms} bagn${property.bathrooms === 1 ? "o" : "i"}`);
  }
  
  parts.push(formatSurface(property.surface_sqm));
  
  return parts.join(" • ");
}

// ===== DEAL SCORE HELPERS =====

/**
 * Ottiene il colore per il deal score
 */
export function getDealScoreColor(score: string): string {
  const colors: Record<string, string> = {
    AFFARE_ECCEZIONALE: "text-green-600",
    OTTIMO_AFFARE: "text-green-500",
    BUON_AFFARE: "text-primary-600",
    PREZZO_GIUSTO: "text-accent-500",
    SOPRAVVALUTATO: "text-warning",
    MOLTO_SOPRAVVALUTATO: "text-error",
  };
  return colors[score] || "text-gray-600";
}

/**
 * Traduce il deal score
 */
export function translateDealScore(score: string): string {
  const translations: Record<string, string> = {
    AFFARE_ECCEZIONALE: "Affare Eccezionale",
    OTTIMO_AFFARE: "Ottimo Affare",
    BUON_AFFARE: "Buon Affare",
    PREZZO_GIUSTO: "Prezzo Giusto",
    SOPRAVVALUTATO: "Sopravvalutato",
    MOLTO_SOPRAVVALUTATO: "Molto Sopravvalutato",
  };
  return translations[score] || score;
}

// ===== VALIDATION HELPERS =====

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida codice fiscale italiano
 */
export function isValidFiscalCode(code: string): boolean {
  const fiscalCodeRegex = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
  return fiscalCodeRegex.test(code);
}

/**
 * Valida numero di telefono italiano
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+39)?[\s.-]?[0-9]{2,4}[\s.-]?[0-9]{6,8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Valida CAP italiano
 */
export function isValidZipCode(zipCode: string): boolean {
  return /^[0-9]{5}$/.test(zipCode);
}

// ===== STRING HELPERS =====

/**
 * Trunca una stringa con ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + "...";
}

/**
 * Capitalizza la prima lettera
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Genera slug da stringa
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ===== URL HELPERS =====

/**
 * Costruisce URL di ricerca con parametri
 */
export function buildSearchUrl(
  baseUrl: string,
  params: Record<string, string | number | boolean | undefined>
): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

// ===== DEBOUNCE =====
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), wait);
  };
}
