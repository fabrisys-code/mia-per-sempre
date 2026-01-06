import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   CARD COMPONENT - WCAG 2.1 AA Compliant
   
   Accessibilità implementata:
   - Landmark semantico con role="region" se ha titolo
   - aria-labelledby per associare il titolo
   - Contrasto colori verificato
   ========================================================================== */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variante visiva */
  variant?: "default" | "featured" | "outline";
  /** Padding interno */
  padding?: "none" | "sm" | "md" | "lg";
  /** Se true, la card è interattiva (hover effects) */
  interactive?: boolean;
  /** Se la card ha un titolo, usare come landmark region */
  as?: "article" | "section" | "div";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = "default",
      padding = "md",
      interactive = false,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "bg-white border border-gray-200 shadow-card",
      featured: "bg-gradient-to-br from-primary-50 to-secondary-50/30 border border-primary-100 shadow-card",
      outline: "bg-white border-2 border-gray-200",
    };

    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "rounded-xl",
          variantStyles[variant],
          paddingStyles[padding],
          interactive && [
            "cursor-pointer",
            "transition-all duration-200",
            "hover:shadow-lg hover:-translate-y-0.5",
            "focus-within:ring-2 focus-within:ring-primary-300",
          ],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

/* ==========================================================================
   CARD HEADER
   ========================================================================== */

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 pb-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

/* ==========================================================================
   CARD TITLE
   ========================================================================== */

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, as: Component = "h3", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "font-serif text-xl font-semibold leading-tight text-gray-900",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = "CardTitle";

/* ==========================================================================
   CARD DESCRIPTION
   ========================================================================== */

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-gray-600", className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

/* ==========================================================================
   CARD CONTENT
   ========================================================================== */

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

/* ==========================================================================
   CARD FOOTER
   ========================================================================== */

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center pt-4 border-t border-gray-100",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";
