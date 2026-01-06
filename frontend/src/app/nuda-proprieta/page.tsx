import { Metadata } from "next";
import PropertiesClientPage from "./PropertiesClientPage";

// Metadata SEO statica per la pagina principale
export const metadata: Metadata = {
  title: "Nuda Proprietà Italia - Tutti gli Annunci | Mia Per Sempre",
  description:
    "Scopri tutti gli immobili in nuda proprietà in Italia. Appartamenti, ville, case con usufrutto vitalizio. Valutazione automatica, annunci verificati. Il marketplace italiano della nuda proprietà.",
  keywords: [
    "nuda proprietà",
    "usufrutto vitalizio",
    "investimento immobiliare",
    "vendere casa usufrutto",
    "comprare nuda proprietà",
  ],
  openGraph: {
    title: "Nuda Proprietà Italia - Tutti gli Annunci | Mia Per Sempre",
    description:
      "Scopri tutti gli immobili in nuda proprietà in Italia. Il marketplace italiano della nuda proprietà.",
    url: "/nuda-proprieta",
    siteName: "Mia Per Sempre",
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "/nuda-proprieta",
  },
};

// Structured Data JSON-LD per la pagina lista
function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Immobili in Nuda Proprietà in Italia",
    description:
      "Lista di immobili in nuda proprietà con usufrutto vitalizio disponibili in Italia",
    url: "https://miapersempre.it/nuda-proprieta",
    numberOfItems: 0, // Verrà aggiornato dinamicamente
    itemListElement: [], // Verrà popolato dinamicamente
  };
}

export default function NudaProprietaPage() {
  const structuredData = generateStructuredData();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Client Component con la logica interattiva */}
      <PropertiesClientPage />
    </>
  );
}
