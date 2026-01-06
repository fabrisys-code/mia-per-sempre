"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider - Inizializza lo stato di autenticazione all'avvio dell'app
 * Verifica se esiste un token valido e recupera i dati utente
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      setIsInitialized(true);
    };

    init();
  }, [checkAuth]);

  // Mostra nulla durante l'inizializzazione per evitare flash
  // In alternativa, potresti mostrare un loader globale
  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
