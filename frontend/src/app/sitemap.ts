import { MetadataRoute } from "next";

const BASE_URL = "https://miapersempre.it";

// Città principali per le pagine statiche
const cittaPrincipali = [
  "milano",
  "roma",
  "torino",
  "firenze",
  "bologna",
  "napoli",
  "genova",
  "venezia",
  "palermo",
  "bari",
  "catania",
  "verona",
  "padova",
  "trieste",
  "brescia",
  "parma",
  "modena",
  "reggio-emilia",
  "perugia",
  "cagliari",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pagine statiche
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/nuda-proprieta`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/come-funziona`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/valutazione`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/chi-siamo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contatti`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/termini`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Pagine città
  const cityPages: MetadataRoute.Sitemap = cittaPrincipali.map((city) => ({
    url: `${BASE_URL}/nuda-proprieta/${city}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // TODO: In produzione, fetch degli immobili dal database per generare URL dinamici
  // const properties = await fetchAllPublishedProperties();
  // const propertyPages = properties.map((p) => ({
  //   url: `${BASE_URL}${getPropertyUrl(p)}`,
  //   lastModified: new Date(p.updated_at),
  //   changeFrequency: "weekly" as const,
  //   priority: 0.7,
  // }));

  return [...staticPages, ...cityPages];
}
