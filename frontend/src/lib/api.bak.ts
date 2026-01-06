/**
 * API Client per comunicare con il backend FastAPI
 * Base URL configurabile via env variable
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// ============ TYPES ============
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  user_type: "owner" | "investor" | "agency" | "professional";
}

interface PropertyFilters {
  page?: number;
  limit?: number;
  city?: string;
  province?: string;
  region?: string;
  property_type?: string;
  min_price?: number;
  max_price?: number;
  min_surface?: number;
  max_surface?: number;
  rooms?: number;
}

interface PropertyCreateData {
  title: string;
  description?: string;
  property_type: string;
  address: string;
  city: string;
  province: string;
  region?: string;
  zip_code?: string;
  surface_sqm: number;
  rooms?: number;
  bathrooms?: number;
  floor?: string;
  total_floors?: number;
  building_year?: number;
  energy_class?: string;
  has_elevator?: boolean;
  has_balcony?: boolean;
  has_terrace?: boolean;
  has_garden?: boolean;
  has_parking?: boolean;
  has_garage?: boolean;
  has_cellar?: boolean;
  usufructuary_age: number;
  usufruct_type?: string;
  bare_property_value: number;
  full_property_value?: number;
  payment_preference?: string;
}

// ============ HELPERS ============

/**
 * Get auth token from localStorage
 */
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

/**
 * Make authenticated API request
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle non-JSON responses
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return {} as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.message || "Errore API");
  }

  return data;
}

/**
 * Make multipart form request (for file uploads)
 */
async function uploadRequest<T>(
  endpoint: string,
  formData: FormData
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.message || "Errore upload");
  }

  return data;
}

// ============ API METHODS ============

const api = {
  // --------- AUTH ---------
  auth: {
    async login(credentials: LoginCredentials) {
      const formData = new URLSearchParams();
      formData.append("username", credentials.email);
      formData.append("password", credentials.password);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Credenziali non valide");
      }

      // Save token
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

      return data;
    },

    async register(userData: RegisterData) {
      return apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
    },

    logout() {
      localStorage.removeItem("access_token");
    },

    isAuthenticated(): boolean {
      return !!getToken();
    },
  },

  // --------- USERS ---------
  users: {
    async me() {
      return apiRequest<any>("/users/me");
    },

    async update(data: Partial<RegisterData>) {
      return apiRequest("/users/me", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
  },

  // --------- PROPERTIES ---------
  properties: {
    async list(filters?: PropertyFilters) {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value));
          }
        });
      }
      const query = params.toString() ? `?${params.toString()}` : "";
      return apiRequest<any>(`/properties${query}`);
    },

    async get(id: number) {
      return apiRequest<any>(`/properties/${id}`);
    },

    async getBySlug(city: string, slug: string) {
      return apiRequest<any>(`/properties/nuda-proprieta/${city}/${slug}`);
    },

    async create(data: PropertyCreateData) {
      return apiRequest<any>("/properties", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    async update(id: number, data: Partial<PropertyCreateData>) {
      return apiRequest<any>(`/properties/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },

    async delete(id: number) {
      return apiRequest<void>(`/properties/${id}`, {
        method: "DELETE",
      });
    },

    async myProperties() {
      return apiRequest<any>("/properties/my");
    },

    async search(query: string, filters?: PropertyFilters) {
      const params = new URLSearchParams({ q: query });
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value));
          }
        });
      }
      return apiRequest<any>(`/properties/search?${params.toString()}`);
    },
  },

  // --------- IMAGES ---------
  images: {
    async upload(propertyId: number, files: File[]) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      return uploadRequest<any>(`/images/property/${propertyId}/upload`, formData);
    },

    async list(propertyId: number) {
      return apiRequest<any>(`/images/property/${propertyId}`);
    },

    async delete(imageId: number) {
      return apiRequest<void>(`/images/${imageId}`, {
        method: "DELETE",
      });
    },

    async setMain(propertyId: number, imageId: number) {
      return apiRequest<any>(`/images/property/${propertyId}/main/${imageId}`, {
        method: "PUT",
      });
    },

    async reorder(propertyId: number, imageIds: number[]) {
      return apiRequest<any>(`/images/property/${propertyId}/reorder`, {
        method: "PUT",
        body: JSON.stringify({ image_ids: imageIds }),
      });
    },
  },

  // --------- VALUATION ---------
  valuation: {
    async calculate(params: {
      surface: number;
      city?: string;
      province?: string;
      zone_code?: string;
      usufructuary_age: number;
      usufruct_type?: string;
      property_type?: string;
    }) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      return apiRequest<any>(`/valuation/calculate?${queryParams.toString()}`);
    },

    async getZones(city: string) {
      return apiRequest<any>(`/valuation/zones/${city}`);
    },

    async getCoefficients() {
      return apiRequest<any>("/valuation/coefficients");
    },
  },

  // --------- COMUNI ---------
  comuni: {
    async search(query: string) {
      return apiRequest<any>(`/comuni/search?q=${encodeURIComponent(query)}`);
    },

    async getByCode(code: string) {
      return apiRequest<any>(`/comuni/${code}`);
    },
  },

  // --------- FAVORITES ---------
  favorites: {
    async list() {
      return apiRequest<any>("/favorites");
    },

    async add(propertyId: number) {
      return apiRequest<any>(`/favorites/${propertyId}`, {
        method: "POST",
      });
    },

    async remove(propertyId: number) {
      return apiRequest<void>(`/favorites/${propertyId}`, {
        method: "DELETE",
      });
    },

    async check(propertyId: number) {
      return apiRequest<{ is_favorite: boolean }>(`/favorites/${propertyId}/check`);
    },
  },
};

export default api;
