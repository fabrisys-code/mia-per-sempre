import { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Target,
  Heart,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Chi Siamo | Mia Per Sempre - Il Marketplace della Nuda Proprietà",
  description:
    "Scopri Mia Per Sempre: il primo marketplace italiano dedicato alla nuda proprietà. La nostra missione, i nostri valori e perché sceglierci.",
  keywords: [
    "mia per sempre",
    "marketplace nuda proprietà",
    "chi siamo",
    "azienda",
    "mission",
  ],
  openGraph: {
    title: "Chi Siamo | Mia Per Sempre",
    description:
      "Il primo marketplace italiano dedicato alla nuda proprietà. Scopri la nostra storia e missione.",
    url: "/chi-siamo",
  },
  alternates: {
    canonical: "/chi-siamo",
  },
};

// Structured Data Organization
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mia Per Sempre",
  description: "Il marketplace italiano della nuda proprietà",
  url: "https://miapersempre.it",
  logo: "https://miapersempre.it/logo.png",
  sameAs: [
    "https://www.facebook.com/miapersempre",
    "https://www.instagram.com/miapersempre",
    "https://www.linkedin.com/company/miapersempre",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+39-XXX-XXXXXXX",
    contactType: "customer service",
    availableLanguage: "Italian",
  },
};

export default function ChiSiamoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 lg:py-24">
          <div className="container-app">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="featured" className="mb-4">
                <Users className="mr-1 h-3 w-3" /> La Nostra Storia
              </Badge>
              <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
                Rendiamo accessibile la nuda proprietà
              </h1>
              <p className="mt-6 text-xl text-gray-200">
                Mia Per Sempre nasce per creare un ponte tra chi desidera
                liquidità senza lasciare la propria casa e chi cerca
                investimenti immobiliari sicuri.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container-app">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900">
                  La Nostra Missione
                </h2>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  Crediamo che ogni persona meriti di vivere serenamente nella
                  propria casa, indipendentemente dalla situazione economica. La
                  nuda proprietà è uno strumento potente ma spesso poco conosciuto
                  e difficile da navigare.
                </p>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  La nostra missione è{" "}
                  <strong>
                    democratizzare l'accesso alla nuda proprietà
                  </strong>
                  , offrendo una piattaforma trasparente, sicura e facile da usare
                  che metta in contatto venditori e investitori.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-primary-700">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Trasparenza totale</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-700">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Valutazioni certificate</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-700">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Sicurezza garantita</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "27.000+", label: "Transazioni/anno in Italia" },
                  { value: "+12%", label: "Crescita mercato annua" },
                  { value: "30-50%", label: "Risparmio medio acquirenti" },
                  { value: "66%", label: "Venditori over 65" },
                ].map((stat, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6 text-center">
                      <p className="text-3xl font-bold text-primary-600">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900">
                I Nostri Valori
              </h2>
              <p className="mt-4 text-gray-600">
                Principi che guidano ogni nostra decisione
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Shield,
                  title: "Sicurezza",
                  description:
                    "Verifichiamo ogni utente con SPID/CIE e proteggiamo le informazioni sensibili.",
                },
                {
                  icon: Heart,
                  title: "Empatia",
                  description:
                    "Comprendiamo le esigenze dei nostri utenti, specialmente gli anziani che affidano a noi la loro casa.",
                },
                {
                  icon: Target,
                  title: "Trasparenza",
                  description:
                    "Prezzi chiari, valutazioni basate su dati pubblici OMI, nessun costo nascosto.",
                },
                {
                  icon: Award,
                  title: "Qualità",
                  description:
                    "Solo annunci verificati, supporto dedicato e partner professionisti selezionati.",
                },
              ].map((value, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
                      <value.icon className="h-7 w-7 text-primary-600" />
                    </div>
                    <h3 className="mt-4 font-semibold text-lg text-gray-900">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container-app">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-3xl font-bold text-gray-900 text-center">
                Perché Scegliere Mia Per Sempre
              </h2>

              <div className="mt-12 space-y-8">
                {[
                  {
                    icon: TrendingUp,
                    title: "Primo marketplace dedicato",
                    description:
                      "Non siamo un'agenzia immobiliare. Siamo una piattaforma tecnologica specializzata esclusivamente in nuda proprietà, con strumenti pensati per questo mercato specifico.",
                  },
                  {
                    icon: Shield,
                    title: "Sicurezza al primo posto",
                    description:
                      "Verifica identità con SPID/CIE, sistema anti-truffa per proteggere gli anziani, appuntamenti verificati e supporto dedicato in ogni fase.",
                  },
                  {
                    icon: Target,
                    title: "Valutazioni automatiche certificate",
                    description:
                      "Il nostro algoritmo utilizza i dati OMI dell'Agenzia delle Entrate e i coefficienti ministeriali per fornirti valutazioni accurate e trasparenti.",
                  },
                  {
                    icon: Users,
                    title: "Community di professionisti",
                    description:
                      "Accedi a una rete di notai, commercialisti e consulenti specializzati in nuda proprietà, pronti ad assisterti nella transazione.",
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section (Placeholder) */}
        <section className="py-16 bg-gray-50">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900">
                Il Team
              </h2>
              <p className="mt-4 text-gray-600">
                Professionisti appassionati di innovazione e real estate
              </p>
            </div>

            <div className="mx-auto max-w-2xl">
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                    <Users className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="mt-6 font-semibold text-lg text-gray-900">
                    Un team in crescita
                  </h3>
                  <p className="mt-2 text-gray-600 max-w-md mx-auto">
                    Stiamo costruendo una squadra di talenti. Se sei appassionato
                    di PropTech e vuoi fare la differenza, contattaci!
                  </p>
                  <Link href="/contatti" className="mt-4 inline-block">
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Contattaci
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container-app">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-white">
                Pronto a Iniziare?
              </h2>
              <p className="mt-4 text-lg text-gray-200">
                Unisciti a migliaia di italiani che hanno scelto Mia Per Sempre
                per vendere o investire in nuda proprietà.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/nuda-proprieta">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Esplora gli Annunci
                  </Button>
                </Link>
                <Link href="/valutazione">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-800"
                  >
                    Valuta il Tuo Immobile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
