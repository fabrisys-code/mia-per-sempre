"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: ("owner" | "investor" | "agency" | "professional")[];
  fallbackUrl?: string;
}

/**
 * ProtectedRoute - Protegge le route che richiedono autenticazione
 * Reindirizza a /auth/login se l'utente non è autenticato
 * Può opzionalmente verificare il tipo di utente
 */
export function ProtectedRoute({
  children,
  requiredUserType,
  fallbackUrl = "/auth/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      // Redirect al login con redirect back
      const currentPath = window.location.pathname;
      router.push(`${fallbackUrl}?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    // Verifica tipo utente se specificato
    if (requiredUserType && user && !requiredUserType.includes(user.user_type)) {
      // Utente autenticato ma tipo sbagliato
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, isLoading, router, fallbackUrl, requiredUserType]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-600" />
          <p className="mt-2 text-sm text-gray-500">Caricamento...</p>
        </div>
      </div>
    );
  }

  // Non autenticato - mostra nulla mentre reindirizza
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-600" />
          <p className="mt-2 text-sm text-gray-500">Reindirizzamento...</p>
        </div>
      </div>
    );
  }

  // Tipo utente sbagliato
  if (requiredUserType && user && !requiredUserType.includes(user.user_type)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Accesso non autorizzato</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * withProtectedRoute - HOC alternativo per proteggere le route
 */
export function withProtectedRoute<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: {
    requiredUserType?: ("owner" | "investor" | "agency" | "professional")[];
    fallbackUrl?: string;
  }
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute
        requiredUserType={options?.requiredUserType}
        fallbackUrl={options?.fallbackUrl}
      >
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
}
