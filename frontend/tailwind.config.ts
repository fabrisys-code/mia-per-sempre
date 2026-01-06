import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Verde Bosco - Primary
        primary: {
          DEFAULT: "#2D5016",
          50: "#F5FAF2",
          100: "#E8F5E0",
          200: "#D1EBC1",
          300: "#B0DC96",
          400: "#8CC966",
          500: "#5FA12D",
          600: "#4A8625",
          700: "#3A6B1E",
          800: "#2D5016",
          900: "#1A2F0D",
        },
        // Oro Caldo - Secondary
        secondary: {
          DEFAULT: "#D4AF37",
          50: "#FDFBF4",
          100: "#FBF6E8",
          200: "#F5EBCC",
          300: "#EDD9A1",
          400: "#E4C76B",
          500: "#D4AF37",
          600: "#C09B2B",
          700: "#A78423",
          800: "#8B7324",
          900: "#6B5719",
        },
        // Azzurro - Accent
        accent: {
          DEFAULT: "#4A90E2",
          50: "#F2F8FD",
          100: "#E3F0FB",
          200: "#C7E1F7",
          300: "#A0CBEF",
          400: "#6BA3E8",
          500: "#4A90E2",
          600: "#3679CC",
          700: "#2C5A8E",
          800: "#234A73",
          900: "#1A3654",
        },
        // Grigi
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#CCCCCC",
          500: "#999999",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
        },
        // Semantici
        success: "#4CAF50",
        warning: "#FF9800",
        error: "#F44336",
        info: "#2196F3",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(45, 80, 22, 0.15)",
        "card-hover": "0 8px 24px rgba(45, 80, 22, 0.2)",
        "card-gold": "0 4px 12px rgba(212, 175, 55, 0.25)",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #1A2F0D 0%, #2D5016 50%, #3A6B1E 100%)",
        "gradient-primary": "linear-gradient(135deg, #2D5016, #3A6B1E)",
        "gradient-secondary": "linear-gradient(135deg, #D4AF37, #E4C76B)",
        "gradient-gold-shine":
          "linear-gradient(135deg, #8B7324, #D4AF37, #EDD9A1)",
      },
      borderRadius: {
        card: "12px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
