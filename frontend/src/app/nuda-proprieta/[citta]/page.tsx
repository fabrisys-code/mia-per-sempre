import { Metadata } from "next";
import { notFound } from "next/navigation";
import CityClientPage from "./CityClientPage";
import { cityFromSlug, generateCityTitle, generateCityDescription } from "@/lib/seo";

interface CityPageProps {
  params: {
    citta: string;
  };
}

// Lista città valide (in futuro da API/database)
const cittaValide = [
  "milano", "roma", "torino", "firenze", "bologna", "napoli", 
  "genova", "venezia", "palermo", "bari", "catania", "verona",
  "padova", "trieste", "brescia", "parma", "modena", "reggio-emilia",
  "perugia", "cagliari", "livorno", "ravenna", "rimini", "pesaro",
  "ancona", "bergamo", "como", "varese", "monza", "pavia"
];

// Genera metadata dinamiche per SEO
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const citySlug = params.citta;
  const cityName = cityFromSlug(citySlug);
  
  // TODO: Fetch count reale da API
  const count = undefined; // Verrà mostrato senza numero se non disponibile
  
  const title = generateCityTitle(cityName, count);
  const description = generateCityDescription(cityName, count);
  
  return {
    title,
    description,
    keywords: [
      `nuda proprietà ${cityName}`,
      `usufrutto vitalizio ${cityName}`,
      `immobili ${cityName}`,
      `investimento immobiliare ${cityName}`,
      `case nuda proprietà ${cityName}`,
    ],
    openGraph: {
      title,
      description,
      url: `/nuda-proprieta/${citySlug}`,
      siteName: "Mia Per Sempre",
      locale: "it_IT",
      type: "website",
    },
    alternates: {
      canonical: `/nuda-proprieta/${citySlug}`,
    },
  };
}

// Genera static params per le città principali (ISR)
export async function generateStaticParams() {
  return cittaValide.map((citta) => ({
    citta,
  }));
}

// Structured Data per la pagina città
function generateStructuredData(cityName: string, citySlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Immobili in Nuda Proprietà a ${cityName}`,
    description: `Lista di immobili in nuda proprietà con usufrutto vitalizio disponibili a ${cityName}`,
    url: `https://miapersempre.it/nuda-proprieta/${citySlug}`,
    itemListOrder: "https://schema.org/ItemListUnordered",
  };
}

export default function CityPage({ params }: CityPageProps) {
  const citySlug = params.citta;
  const cityName = cityFromSlug(citySlug);
  
  // Verifica se la città è valida (in futuro controllo più sofisticato)
  // Per ora accettiamo tutte le città
  
  const structuredData = generateStructuredData(cityName, citySlug);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Client Component */}
      <CityClientPage cityName={cityName} citySlug={citySlug} />
    </>
  );
}
