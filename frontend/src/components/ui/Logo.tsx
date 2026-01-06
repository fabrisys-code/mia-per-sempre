import Link from "next/link";
import { cn } from "@/lib/utils";

/* ==========================================================================
   LOGO COMPONENT - WCAG 2.1 AA Compliant
   
   Accessibilità:
   - Testo alternativo per screen reader
   - Link alla home accessibile
   - Payoff sempre presente per SEO
   ========================================================================== */

export interface LogoProps {
  /** Variante: solo simbolo, full con payoff */
  variant?: "symbol" | "full";
  /** Dimensione */
  size?: "sm" | "md" | "lg";
  /** Classe CSS aggiuntiva */
  className?: string;
  /** Link alla home (true di default) */
  asLink?: boolean;
}

export function Logo({
  variant = "full",
  size = "md",
  className,
  asLink = true,
}: LogoProps) {
  const sizeStyles = {
    sm: { logo: "text-lg", payoff: "text-[10px]" },
    md: { logo: "text-xl", payoff: "text-xs" },
    lg: { logo: "text-2xl", payoff: "text-sm" },
  };

  const content = (
    <div className={cn("flex flex-col", className)}>
      {/* Nome brand */}
      <span
        className={cn(
          "font-serif font-bold tracking-tight",
          sizeStyles[size].logo
        )}
      >
        <span className="text-primary-700">Mia</span>{" "}
        <span className="text-secondary-600">Per Sempre</span>
      </span>

      {/* Payoff - sempre visibile per SEO */}
      {variant === "full" && (
        <span
          className={cn(
            "text-gray-500 tracking-wide uppercase",
            sizeStyles[size].payoff
          )}
        >
          Il marketplace italiano della nuda proprietà
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 rounded"
        aria-label="Mia Per Sempre - Torna alla home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

/* ==========================================================================
   LOGO WHITE - Per sfondi scuri (Footer, Header mobile, ecc.)
   ========================================================================== */

export interface LogoWhiteProps {
  /** Variante: solo simbolo, full con payoff */
  variant?: "symbol" | "full";
  /** Dimensione */
  size?: "sm" | "md" | "lg";
  /** Classe CSS aggiuntiva */
  className?: string;
  /** Link alla home (true di default) */
  asLink?: boolean;
}

export function LogoWhite({
  variant = "full",
  size = "md",
  className,
  asLink = true,
}: LogoWhiteProps) {
  const sizeStyles = {
    sm: { logo: "text-lg", payoff: "text-[10px]" },
    md: { logo: "text-xl", payoff: "text-xs" },
    lg: { logo: "text-2xl", payoff: "text-sm" },
  };

  const content = (
    <div className={cn("flex flex-col", className)}>
      {/* Nome brand - colori per sfondo scuro */}
      <span
        className={cn(
          "font-serif font-bold tracking-tight",
          sizeStyles[size].logo
        )}
      >
        <span className="text-white">Mia</span>{" "}
        <span className="text-secondary-400">Per Sempre</span>
      </span>

      {/* Payoff */}
      {variant === "full" && (
        <span
          className={cn(
            "text-gray-300 tracking-wide uppercase",
            sizeStyles[size].payoff
          )}
        >
          Il marketplace italiano della nuda proprietà
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-800 rounded"
        aria-label="Mia Per Sempre - Torna alla home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

/* ==========================================================================
   LOGO ICON - Solo per favicon o spazi ristretti
   ========================================================================== */

export interface LogoIconProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 32, className }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Mia Per Sempre"
    >
      {/* Casa stilizzata */}
      <path
        d="M16 4L4 14v14h24V14L16 4z"
        fill="#2D5016"
        stroke="#2D5016"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Cuore interno */}
      <path
        d="M16 12c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5L16 23l5.5-5.5c1.5-1.5 1.5-4 0-5.5s-4-1.5-5.5 0z"
        fill="#D4AF37"
      />
    </svg>
  );
}
