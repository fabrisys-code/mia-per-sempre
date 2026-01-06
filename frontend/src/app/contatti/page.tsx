import { Metadata } from "next";
import ContactForm from "./ContactForm";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Contatti | Mia Per Sempre",
  description:
    "Hai domande sulla nuda proprietà? Contattaci! Il nostro team è a disposizione per aiutarti. Email, telefono o compila il form.",
  keywords: [
    "contatti mia per sempre",
    "assistenza nuda proprietà",
    "supporto",
    "email",
    "telefono",
  ],
  openGraph: {
    title: "Contatti | Mia Per Sempre",
    description:
      "Contatta il team di Mia Per Sempre per qualsiasi domanda sulla nuda proprietà.",
    url: "/contatti",
  },
  alternates: {
    canonical: "/contatti",
  },
};

// Structured Data ContactPage
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contatti Mia Per Sempre",
  description: "Pagina contatti di Mia Per Sempre",
  url: "https://miapersempre.it/contatti",
  mainEntity: {
    "@type": "Organization",
    name: "Mia Per Sempre",
    email: "info@miapersempre.it",
    telephone: "+39-XXX-XXXXXXX",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Milano",
      addressCountry: "IT",
    },
  },
};

export default function ContattiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container-app">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="featured" className="mb-4">
                <MessageSquare className="mr-1 h-3 w-3" /> Supporto
              </Badge>
              <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
                Contattaci
              </h1>
              <p className="mt-6 text-xl text-gray-200">
                Hai domande sulla nuda proprietà? Il nostro team è qui per
                aiutarti.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 lg:py-16">
          <div className="container-app">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900">
                  Informazioni di Contatto
                </h2>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Email</h3>
                        <a
                          href="mailto:info@miapersempre.it"
                          className="mt-1 text-primary-700 hover:underline"
                        >
                          info@miapersempre.it
                        </a>
                        <p className="mt-1 text-sm text-gray-500">
                          Risposta entro 24 ore
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Telefono</h3>
                        <a
                          href="tel:+39XXXXXXXXXX"
                          className="mt-1 text-primary-700 hover:underline"
                        >
                          +39 XXX XXX XXXX
                        </a>
                        <p className="mt-1 text-sm text-gray-500">
                          Lun-Ven 9:00-18:00
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Sede</h3>
                        <p className="mt-1 text-gray-600">
                          Milano, Italia
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Solo su appuntamento
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Orari di Supporto
                        </h3>
                        <div className="mt-1 text-gray-600 text-sm space-y-1">
                          <p>Lunedì - Venerdì: 9:00 - 18:00</p>
                          <p>Sabato: 9:00 - 13:00</p>
                          <p>Domenica: Chiuso</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                      Inviaci un Messaggio
                    </h2>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-12 bg-white">
          <div className="container-app">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Domande Frequenti
              </h2>
              <p className="mt-2 text-gray-600">
                Prima di contattarci, potresti trovare la risposta qui:
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Come funziona?",
                    href: "/come-funziona",
                    description: "Guida completa alla nuda proprietà",
                  },
                  {
                    title: "Calcola il valore",
                    href: "/valutazione",
                    description: "Valuta gratuitamente il tuo immobile",
                  },
                  {
                    title: "Chi siamo",
                    href: "/chi-siamo",
                    description: "La nostra storia e missione",
                  },
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="rounded-xl border border-gray-200 p-4 text-left hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900">{link.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {link.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
