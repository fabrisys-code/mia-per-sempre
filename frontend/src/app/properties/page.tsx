"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Redirect dalla vecchia URL /properties alla nuova /nuda-proprieta
 * Mantiene compatibilità con eventuali link esterni
 */
export default function PropertiesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/nuda-proprieta");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Reindirizzamento in corso...</p>
    </div>
  );
}
