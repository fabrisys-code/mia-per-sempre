"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LiveRegionProps {
  /** Messaggio da annunciare */
  message: string;
  /** Tipo di annuncio: polite (non interrompe), assertive (interrompe) */
  politeness?: "polite" | "assertive";
  /** Tipo di contenuto che cambia */
  atomic?: boolean;
  /** Classe CSS aggiuntiva */
  className?: string;
}

/**
 * LiveRegion - Annuncia dinamicamente contenuto agli screen reader
 * 
 * WCAG 2.1 AA - 4.1.3 Status Messages
 * Permette di comunicare aggiornamenti di stato senza spostare il focus.
 * 
 * Uso:
 * - "polite": per notifiche non urgenti (es. "3 risultati trovati")
 * - "assertive": per messaggi urgenti (es. errori di validazione)
 */
export function LiveRegion({
  message,
  politeness = "polite",
  atomic = true,
  className,
}: LiveRegionProps) {
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (message) {
      // Clear e re-set per assicurare che venga annunciato
      setAnnouncement("");
      const timeout = setTimeout(() => {
        setAnnouncement(message);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      className={cn(
        // Visivamente nascosto ma accessibile agli screen reader
        "sr-only",
        className
      )}
    >
      {announcement}
    </div>
  );
}

/**
 * useAnnounce - Hook per annunci dinamici
 */
export function useAnnounce() {
  const [message, setMessage] = useState("");
  const [politeness, setPoliteness] = useState<"polite" | "assertive">("polite");

  const announce = (msg: string, type: "polite" | "assertive" = "polite") => {
    setPoliteness(type);
    setMessage(msg);
  };

  const clear = () => setMessage("");

  return {
    message,
    politeness,
    announce,
    clear,
    LiveRegion: () => <LiveRegion message={message} politeness={politeness} />,
  };
}

/**
 * VisuallyHidden - Nasconde visivamente ma rimane accessibile
 * 
 * Utile per aggiungere contesto agli screen reader senza
 * mostrare testo visibile.
 */
interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export function VisuallyHidden({
  children,
  as: Component = "span",
}: VisuallyHiddenProps) {
  return (
    <Component className="sr-only">
      {children}
    </Component>
  );
}
