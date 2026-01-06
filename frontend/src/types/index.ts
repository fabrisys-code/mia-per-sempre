// ===== USER TYPES =====
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  user_type: UserType;
  fiscal_code?: string;
  date_of_birth?: string;
  verified_identity: boolean;
  verification_method?: VerificationMethod;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type UserType = "proprietario" | "investitore" | "entrambi" | "agenzia";

export type VerificationMethod = "spid" | "cie" | "manual";

// ===== PROPERTY TYPES =====
export interface Property {
  id: number;
  owner_id: number;

  // Info Base
  title: string;
  description?: string;
  property_type: PropertyType;
  status: PropertyStatus;

  // Location
  address?: string;
  city: string;
  province: string;
  region: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  show_exact_location: boolean;

  // Dettagli
  surface_sqm: number;
  rooms?: number;
  bathrooms?: number;
  floor?: string;
  total_floors?: number;

  // Features
  has_elevator: boolean;
  has_balcony: boolean;
  has_terrace: boolean;
  has_garden: boolean;
  has_parking: boolean;
  has_garage: boolean;
  has_cellar: boolean;

  // Edificio
  building_year?: number;
  renovation_year?: number;
  energy_class?: EnergyClass;
  heating_type?: string;

  // Usufrutto
  usufructuary_age: number;
  usufruct_type: UsufructType;

  // Valori
  full_property_value?: number;
  bare_property_value: number;

  // Pagamento
  payment_preference: PaymentPreference;
  payment_preference_notes?: string;

  // Stats
  is_featured: boolean;
  views_count: number;
  contacts_count: number;

  // Timestamps
  created_at: string;
  updated_at: string;

  // Relations
  images?: PropertyImage[];
}

export type PropertyType =
  | "appartamento"
  | "villa"
  | "villetta"
  | "attico"
  | "loft"
  | "mansarda"
  | "casa_indipendente"
  | "rustico"
  | "castello"
  | "palazzo";

export type PropertyStatus =
  | "draft"
  | "published"
  | "pending"
  | "sold"
  | "suspended"
  | "deleted";

export type EnergyClass =
  | "a4+"
  | "a4"
  | "a3"
  | "a2"
  | "a1"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g";

export type UsufructType = "vitalizio" | "temporaneo";

export type PaymentPreference =
  | "full"
  | "deposit_annuity"
  | "annuity"
  | "other";

// ===== IMAGE TYPES =====
export interface PropertyImage {
  id: number;
  property_id: number;
  display_order: number;
  is_cover: boolean;
  original_filename?: string;
  file_size_kb?: number;
  uploaded_at: string;
  urls: ImageUrls;
}

export interface ImageUrls {
  thumbnail: string; // 300x300 px
  medium: string; // 800x600 px
  large: string; // 1920x1080 px
}

// ===== VALUATION TYPES =====
export interface ValuationRequest {
  comune: string;
  zona_omi?: string;
  superficie_principale: number;
  superficie_balconi?: number;
  superficie_terrazzi?: number;
  superficie_giardino?: number;
  superficie_cantina?: number;
  superficie_garage?: number;
  piano?: string;
  ascensore?: boolean;
  stato_conservazione?: "ottimo" | "buono" | "normale" | "scadente";
  eta_usufruttuario: number;
  prezzo_richiesto?: number;
}

export interface ValuationResponse {
  success: boolean;
  valutazione: {
    timestamp: string;
    property_summary: {
      comune: string;
      superficie: number;
      eta_usufruttuario: number;
    };
    omi_quotation: {
      prezzo_min: number;
      prezzo_max: number;
      prezzo_medio: number;
      zona_codice: string;
    };
    valore_piena_proprieta_base: {
      min: number;
      max: number;
      medio: number;
      prezzo_mq: number;
    };
    valore_fiscale: {
      coefficiente: number;
      valore_usufrutto: number;
      valore_nuda_proprieta: number;
      percentuale_nuda: number;
    };
    deal_score?: DealScore;
  };
  report: string;
}

export interface DealScore {
  score: DealScoreLevel;
  stars: number; // 0-5
  emoji: string;
  discount_percentage: number;
}

export type DealScoreLevel =
  | "AFFARE_ECCEZIONALE"
  | "OTTIMO_AFFARE"
  | "BUON_AFFARE"
  | "PREZZO_GIUSTO"
  | "SOPRAVVALUTATO"
  | "MOLTO_SOPRAVVALUTATO";

// ===== API TYPES =====
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
  phone?: string;
}

// ===== SEARCH / FILTER TYPES =====
export interface PropertyFilters {
  city?: string;
  region?: string;
  property_type?: PropertyType;
  min_price?: number;
  max_price?: number;
  min_surface?: number;
  max_surface?: number;
  min_rooms?: number;
  max_usufructuary_age?: number;
  has_elevator?: boolean;
  has_balcony?: boolean;
  has_terrace?: boolean;
  has_garden?: boolean;
  has_parking?: boolean;
  has_garage?: boolean;
}

export interface SearchParams extends PropertyFilters {
  page?: number;
  page_size?: number;
  sort_by?: "price" | "date" | "surface";
  sort_order?: "asc" | "desc";
}

// ===== OMI TYPES =====
export interface OmiZone {
  zona_codice: string;
  zona_descrizione: string;
  linkzona?: string;
  microzona?: number;
}

export interface OmiQuotation {
  zona_codice: string;
  tipologia: string;
  stato: string;
  prezzo_min: number;
  prezzo_max: number;
  superficie_min?: number;
  superficie_max?: number;
}

// ===== COEFFICIENT TYPES =====
export interface UsufructCoefficient {
  eta: string;
  coefficiente: number;
  percentuale_usufrutto: number;
  percentuale_nuda_proprieta: number;
}
