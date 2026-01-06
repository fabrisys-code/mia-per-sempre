import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";
import type { User } from "@/types";

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  user_type: "owner" | "investor" | "agency" | "professional";
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.auth.login({ email, password });

          // Il token viene salvato automaticamente da api.auth.login
          // Ora recuperiamo i dati utente
          const user = await api.users.me();

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (err: any) {
          const errorMessage =
            err.message || "Credenziali non valide. Riprova.";
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          return false;
        }
      },

      // Register
      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          await api.auth.register(data);

          // Dopo la registrazione, effettua login automatico
          const loginSuccess = await get().login(data.email, data.password);

          if (!loginSuccess) {
            set({
              isLoading: false,
              error: "Registrazione completata. Effettua il login.",
            });
          }

          return loginSuccess;
        } catch (err: any) {
          const errorMessage =
            err.message || "Errore durante la registrazione. Riprova.";
          set({
            isLoading: false,
            error: errorMessage,
          });
          return false;
        }
      },

      // Logout
      logout: () => {
        api.auth.logout();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      // Check auth status (on app load)
      checkAuth: async () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
          set({ user: null, isAuthenticated: false });
          return;
        }

        set({ isLoading: true });

        try {
          const user = await api.users.me();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          // Token non valido o scaduto
          api.auth.logout();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Set user manually (useful for updates)
      setUser: (user: User | null) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Persisti solo user e isAuthenticated, non loading/error
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Hook helper per verificare se l'utente è autenticato
export function useIsAuthenticated() {
  return useAuthStore((state) => state.isAuthenticated);
}

// Hook helper per ottenere l'utente corrente
export function useCurrentUser() {
  return useAuthStore((state) => state.user);
}

// Hook helper per ottenere lo stato di loading
export function useAuthLoading() {
  return useAuthStore((state) => state.isLoading);
}
