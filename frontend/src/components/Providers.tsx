"use client";

import { AuthProvider } from "@/components/auth/AuthProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Providers - Wrapper per tutti i context providers dell'app
 * Include: AuthProvider, QueryClientProvider (futuro), ecc.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
