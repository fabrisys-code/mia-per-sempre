"use client";

import { cn } from "@/lib/utils";

interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * SkipLink - Link per saltare al contenuto principale
 * 
 * WCAG 2.1 AA - 2.4.1 Bypass Blocks
 * Permette agli utenti che navigano con tastiera di saltare
 * direttamente al contenuto principale, bypassando header e navigazione.
 * 
 * Il link è visibile solo quando riceve focus (Tab).
 */
export function SkipLink({
  href = "#main-content",
  children = "Salta al contenuto principale",
  className,
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        // Posizione fissa in alto a sinistra
        "fixed left-4 top-4 z-[9999]",
        // Stile del link
        "rounded-lg bg-primary-800 px-4 py-3 text-sm font-medium text-white",
        "shadow-lg ring-2 ring-white",
        // Nascosto di default, visibile su focus
        "transform -translate-y-20 opacity-0",
        "focus:translate-y-0 focus:opacity-100",
        // Transizione fluida
        "transition-all duration-200 ease-in-out",
        // Focus ring accessibile
        "focus:outline-none focus:ring-4 focus:ring-primary-300",
        className
      )}
    >
      {children}
    </a>
  );
}

/**
 * SkipLinks - Gruppo di skip links per navigazione complessa
 */
interface SkipLinksProps {
  links?: Array<{ href: string; label: string }>;
}

export function SkipLinks({ links }: SkipLinksProps) {
  const defaultLinks = [
    { href: "#main-content", label: "Salta al contenuto principale" },
    { href: "#main-navigation", label: "Salta alla navigazione" },
    { href: "#footer", label: "Salta al footer" },
  ];

  const skipLinks = links || defaultLinks;

  return (
    <div className="skip-links">
      {skipLinks.map((link, index) => (
        <SkipLink key={index} href={link.href}>
          {link.label}
        </SkipLink>
      ))}
    </div>
  );
}
