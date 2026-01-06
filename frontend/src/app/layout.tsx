import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";
import "@/styles/accessibility.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink, AccessibilityWidget } from "@/components/a11y";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

// Metadata
export const metadata: Metadata = {
  title: {
    default: "Mia Per Sempre - Il marketplace italiano della nuda proprietà",
    template: "%s | Mia Per Sempre",
  },
  description:
    "Scopri il primo marketplace italiano dedicato alla compravendita di nuda proprietà. Trova immobili o vendi la tua casa mantenendo il diritto di usufrutto.",
  keywords: [
    "nuda proprietà",
    "usufrutto",
    "vendita immobili",
    "investimento immobiliare",
    "marketplace immobiliare",
    "Italia",
  ],
  authors: [{ name: "Mia Per Sempre S.r.l." }],
  creator: "Mia Per Sempre",
  publisher: "Mia Per Sempre S.r.l.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://miapersempre.it"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: "Mia Per Sempre",
    title: "Mia Per Sempre - Il marketplace italiano della nuda proprietà",
    description:
      "Scopri il primo marketplace italiano dedicato alla compravendita di nuda proprietà.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mia Per Sempre - Nuda Proprietà",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mia Per Sempre - Il marketplace italiano della nuda proprietà",
    description:
      "Scopri il primo marketplace italiano dedicato alla compravendita di nuda proprietà.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#2D5016",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <Providers>
          {/* Skip Link per accessibilità - visibile solo su Tab */}
          <SkipLink />
          
          {/* Widget accessibilità - bottone floating in basso a sinistra */}
          <AccessibilityWidget />
          
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
