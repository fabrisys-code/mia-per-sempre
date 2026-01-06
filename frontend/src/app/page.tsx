import Link from "next/link";
import {
  Search,
  Home,
  TrendingUp,
  Shield,
  ArrowRight,
  Star,
  MapPin,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// Hero Section
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
      </div>

      <div className="container-app relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="featured" className="mb-6">
            🏠 Il primo marketplace italiano
          </Badge>

          {/* Title */}
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Vendi la tua casa,
            <br />
            <span className="text-secondary-400">continua a viverci</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-gray-200 sm:text-xl max-w-2xl mx-auto">
            Scopri la nuda proprietà: ottieni liquidità dal tuo immobile
            mantenendo il diritto di abitarci per sempre.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/properties">
              <Button variant="secondary" size="lg" rightIcon={<Search className="h-5 w-5" />}>
                Cerca Immobili
              </Button>
            </Link>
            <Link href="/valutazione">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-800"
              >
                Valuta il tuo Immobile
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            {[
              { value: "500+", label: "Immobili" },
              { value: "€50M", label: "Transato" },
              { value: "98%", label: "Soddisfatti" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-secondary-400 lg:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Search Bar Section
function SearchSection() {
  return (
    <section className="relative -mt-8 z-10">
      <div className="container-app">
        <div className="rounded-2xl bg-white p-6 shadow-lg lg:p-8">
          <form className="grid gap-4 lg:grid-cols-5">
            {/* Città */}
            <div className="lg:col-span-2">
              <label className="label">Dove cerchi?</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Città o zona..."
                  className="input pl-12"
                />
              </div>
            </div>

            {/* Tipo Immobile */}
            <div>
              <label className="label">Tipologia</label>
              <select className="input">
                <option value="">Tutti i tipi</option>
                <option value="appartamento">Appartamento</option>
                <option value="villa">Villa</option>
                <option value="casa_indipendente">Casa Indipendente</option>
                <option value="attico">Attico</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="label">Budget max</label>
              <select className="input">
                <option value="">Qualsiasi</option>
                <option value="100000">€ 100.000</option>
                <option value="200000">€ 200.000</option>
                <option value="300000">€ 300.000</option>
                <option value="500000">€ 500.000</option>
              </select>
            </div>

            {/* Submit */}
            <div className="flex items-end">
              <Button variant="primary" className="w-full" type="submit">
                <Search className="mr-2 h-5 w-5" />
                Cerca
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// How it Works Section
function HowItWorksSection() {
  const steps = [
    {
      icon: Home,
      title: "Valuta il tuo immobile",
      description:
        "Ricevi una valutazione gratuita e scopri quanto puoi ottenere dalla vendita della nuda proprietà.",
    },
    {
      icon: Shield,
      title: "Mantieni l'usufrutto",
      description:
        "Continua a vivere nella tua casa con il diritto di usufrutto vitalizio garantito per legge.",
    },
    {
      icon: TrendingUp,
      title: "Ottieni liquidità",
      description:
        "Ricevi subito il capitale dalla vendita, da utilizzare come preferisci.",
    },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="container-app">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="info" className="mb-4">
            Come Funziona
          </Badge>
          <h2 className="section-title">
            La nuda proprietà in{" "}
            <span className="text-primary-600">tre semplici passi</span>
          </h2>
          <p className="section-subtitle">
            Un processo chiaro e trasparente per vendere il tuo immobile
            mantenendo il diritto di viverci.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gray-200 lg:block" />
              )}

              {/* Icon */}
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary-100">
                <step.icon className="h-10 w-10 text-primary-800" />
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary-500 text-sm font-bold text-gray-900">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="mt-6 font-serif text-xl font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-3 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/come-funziona">
            <Button variant="outline" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Scopri di più
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Featured Properties Section
function FeaturedPropertiesSection() {
  // Mock data - da sostituire con chiamata API
  const properties = [
    {
      id: 1,
      title: "Appartamento Milano Centro",
      city: "Milano",
      province: "MI",
      surface: 85,
      rooms: 3,
      price: 185000,
      image: "/placeholder-property-1.jpg",
      isFeatured: true,
    },
    {
      id: 2,
      title: "Villa Firenze Collina",
      city: "Firenze",
      province: "FI",
      surface: 220,
      rooms: 6,
      price: 420000,
      image: "/placeholder-property-2.jpg",
      isFeatured: true,
    },
    {
      id: 3,
      title: "Appartamento Torino Centro",
      city: "Torino",
      province: "TO",
      surface: 95,
      rooms: 4,
      price: 165000,
      image: "/placeholder-property-3.jpg",
      isFeatured: false,
    },
  ];

  return (
    <section className="bg-gray-100 py-20 lg:py-28">
      <div className="container-app">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <Badge variant="featured" className="mb-4">
              ⭐ In Evidenza
            </Badge>
            <h2 className="section-title">Immobili selezionati</h2>
          </div>
          <Link href="/properties">
            <Button variant="outline" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Vedi tutti
            </Button>
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`}>
              <Card
                variant={property.isFeatured ? "featured" : "default"}
                padding="none"
                className="overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-property bg-gray-200">
                  {/* Placeholder - sostituire con Next Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {property.isFeatured && (
                    <Badge variant="featured" className="absolute left-4 top-4">
                      <Star className="mr-1 h-3 w-3" /> Featured
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-gray-900">
                    {property.title}
                  </h3>
                  
                  <p className="mt-1 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    {property.city}, {property.province}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                    <span>{property.rooms} locali</span>
                    <span>•</span>
                    <span>{property.surface} m²</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-800">
                      € {property.price.toLocaleString("it-IT")}
                    </span>
                    <Badge variant="info">Nuda Proprietà</Badge>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Benefits Section
function BenefitsSection() {
  const benefits = {
    proprietari: {
      title: "Per i Proprietari",
      subtitle: "Ottieni liquidità senza lasciare casa tua",
      items: [
        "Valutazione gratuita del tuo immobile",
        "Diritto di usufrutto vitalizio garantito",
        "Nessun costo di intermediazione",
        "Assistenza legale completa",
        "Pagamento sicuro e certificato",
      ],
    },
    investitori: {
      title: "Per gli Investitori",
      subtitle: "Investi nel mattone a prezzi vantaggiosi",
      items: [
        "Immobili a prezzo scontato del 30-50%",
        "Rendimenti potenziali elevati",
        "Diversificazione del portafoglio",
        "Due diligence completa inclusa",
        "Supporto nella gestione",
      ],
    },
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="container-app">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="verified" className="mb-4">
            Vantaggi
          </Badge>
          <h2 className="section-title">
            Perché scegliere{" "}
            <span className="text-primary-600">Mia Per Sempre</span>
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {Object.values(benefits).map((benefit) => (
            <Card key={benefit.title} variant="flat" hover={false} padding="lg">
              <h3 className="font-serif text-2xl font-bold text-gray-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-gray-600">{benefit.subtitle}</p>

              <ul className="mt-6 space-y-4">
                {benefit.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                      <Check className="h-3 w-3 text-primary-800" />
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="bg-gradient-hero py-20">
      <div className="container-app">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-white lg:text-4xl">
            Pronto a scoprire il valore del tuo immobile?
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            Ricevi una valutazione gratuita in 24 ore. Nessun impegno, nessun costo.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/valutazione">
              <Button variant="secondary" size="lg">
                Richiedi Valutazione Gratuita
              </Button>
            </Link>
            <Link href="/contatti">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-800"
              >
                Parla con un Esperto
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <HowItWorksSection />
      <FeaturedPropertiesSection />
      <BenefitsSection />
      <CTASection />
    </>
  );
}
