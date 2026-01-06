import { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetailClient from "./PropertyDetailClient";
import {
  cityFromSlug,
  extractIdFromSlug,
  generatePropertyTitle,
  generatePropertyDescription,
} from "@/lib/seo";
import { getServerApiUrl, API_PREFIX } from "@/lib/config";

interface PropertyPageProps {
  params: {
    citta: string;
    slug: string;
  };
}

// Questa funzione recupera i dati dell'immobile per le metadata
async function getPropertyBySlug(citySlug: string, propertySlug: string) {
  try {
    const baseUrl = getServerApiUrl() + API_PREFIX;
    
    // Estrai l'ID dallo slug (es: "appartamento-3-locali-85mq-42" → 42)
    const propertyId = extractIdFromSlug(propertySlug);
    
    if (propertyId) {
      // Lookup diretto per ID (più veloce e affidabile)
      console.log("[DEBUG] Fetching property by ID:", propertyId);
      const res = await fetch(`${baseUrl}/properties/${propertyId}`, {
        next: { revalidate: 60 }
      });
      
      if (res.ok) {
        const property = await res.json();
        // Verifica che la città corrisponda (sicurezza URL)
        const expectedCity = cityFromSlug(citySlug).toLowerCase();
        if (property.city?.toLowerCase() === expectedCity) {
          return property;
        }
        console.log("[DEBUG] City mismatch:", property.city, "vs", expectedCity);
      }
    }
    
    // Fallback: ricerca per città (per URL legacy senza ID)
    console.log("[DEBUG] Fallback: searching by city");
    const cityName = cityFromSlug(citySlug);
    const res = await fetch(
      `${baseUrl}/properties/search?city=${encodeURIComponent(cityName)}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const properties = Array.isArray(data) ? data : (data.items || data.properties || []);
    
    if (properties.length > 0) {
      // Matching fuzzy per URL legacy
      const slugParts = propertySlug.toLowerCase();
      
      const property = properties.find((p: any) => {
        const typeMatch = slugParts.includes(p.property_type?.toLowerCase());
        const roomsMatch = slugParts.includes(`${p.rooms}-locali`);
        const surfaceMatch = slugParts.includes(`${Math.round(p.surface_sqm)}mq`);
        return [typeMatch, roomsMatch, surfaceMatch].filter(Boolean).length >= 2;
      });

      return property || properties[0];
    }

    return null;
  } catch (error) {
    console.error("[DEBUG] Error fetching property:", error);
    return null;
  }
}

// Genera metadata dinamiche per SEO
export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const property = await getPropertyBySlug(params.citta, params.slug);

  if (!property) {
    return {
      title: "Immobile non trovato | Mia Per Sempre",
      description: "L'immobile richiesto non è stato trovato.",
    };
  }

  const title = generatePropertyTitle(property);
  const description = generatePropertyDescription(property);

  return {
    title,
    description,
    keywords: [
      `nuda proprietà ${property.city}`,
      `${property.property_type} ${property.city}`,
      `usufrutto vitalizio ${property.city}`,
      `investimento immobiliare ${property.city}`,
    ],
    openGraph: {
      title,
      description,
      url: `/nuda-proprieta/${params.citta}/${params.slug}`,
      siteName: "Mia Per Sempre",
      locale: "it_IT",
      type: "website",
      images: property.images?.[0]?.urls?.large
        ? [
            {
              url: property.images[0].urls.large,
              width: 1200,
              height: 630,
              alt: property.title,
            },
          ]
        : [],
    },
    alternates: {
      canonical: `/nuda-proprieta/${params.citta}/${params.slug}`,
    },
  };
}

// Structured Data JSON-LD per l'immobile
function generateStructuredData(property: any, citySlug: string, propertySlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description || generatePropertyDescription(property),
    url: `https://miapersempre.it/nuda-proprieta/${citySlug}/${propertySlug}`,
    datePosted: property.created_at,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address || "",
      addressLocality: property.city,
      addressRegion: property.region || "",
      postalCode: property.zip_code || "",
      addressCountry: "IT",
    },
    geo: property.latitude && property.longitude
      ? {
          "@type": "GeoCoordinates",
          latitude: property.latitude,
          longitude: property.longitude,
        }
      : undefined,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.surface_sqm,
      unitCode: "MTK",
    },
    numberOfRooms: property.rooms,
    numberOfBathroomsTotal: property.bathrooms,
    image: property.images?.map((img: any) => img.urls?.large).filter(Boolean) || [],
    offers: {
      "@type": "Offer",
      price: property.bare_property_value,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getPropertyBySlug(params.citta, params.slug);

  if (!property) {
    notFound();
  }

  const structuredData = generateStructuredData(property, params.citta, params.slug);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Client Component */}
      <PropertyDetailClient
        propertyId={property.id}
        citySlug={params.citta}
        propertySlug={params.slug}
      />
    </>
  );
}
