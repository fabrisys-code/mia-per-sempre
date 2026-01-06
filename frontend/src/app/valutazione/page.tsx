import { Metadata } from "next";
import ValuationCalculator from "./ValuationCalculator";

export const metadata: Metadata = {
  title: "Calcola il Valore della Nuda Proprietà | Mia Per Sempre",
  description:
    "Calcola gratuitamente il valore della nuda proprietà del tuo immobile. Valutazione automatica basata su dati OMI e coefficienti ministeriali 2025.",
  keywords: [
    "calcolo nuda proprietà",
    "valutazione usufrutto",
    "calcolo valore immobile",
    "coefficienti usufrutto 2025",
    "stima nuda proprietà",
  ],
  openGraph: {
    title: "Calcola il Valore della Nuda Proprietà | Mia Per Sempre",
    description:
      "Valutazione gratuita e istantanea del tuo immobile in nuda proprietà.",
    url: "/valutazione",
  },
  alternates: {
    canonical: "/valutazione",
  },
};

// Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calcolatore Nuda Proprietà",
  description:
    "Strumento online gratuito per calcolare il valore della nuda proprietà di un immobile",
  url: "https://miapersempre.it/valutazione",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
};

export default function ValutazionePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ValuationCalculator />
    </>
  );
}
