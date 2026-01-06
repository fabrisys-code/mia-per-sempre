import { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Users,
  FileText,
  Shield,
  TrendingUp,
  Calculator,
  CheckCircle,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Come Funziona la Nuda Proprietà | Guida Completa | Mia Per Sempre",
  description:
    "Scopri come funziona la nuda proprietà con usufrutto vitalizio. Guida completa per venditori e investitori: vantaggi, procedura, costi e risposte alle domande frequenti.",
  keywords: [
    "come funziona nuda proprietà",
    "usufrutto vitalizio",
    "vendere casa mantenendo usufrutto",
    "investire in nuda proprietà",
    "guida nuda proprietà",
  ],
  openGraph: {
    title: "Come Funziona la Nuda Proprietà | Mia Per Sempre",
    description:
      "Guida completa alla nuda proprietà con usufrutto vitalizio. Scopri vantaggi, procedura e costi.",
    url: "/come-funziona",
  },
  alternates: {
    canonical: "/come-funziona",
  },
};

// Structured Data FAQ
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Cos'è la nuda proprietà?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La nuda proprietà è il diritto di proprietà su un immobile privato del diritto di godimento (usufrutto). Il nudo proprietario possiede l'immobile ma non può abitarlo né affittarlo finché l'usufruttuario è in vita.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto costa la nuda proprietà rispetto al valore pieno?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il prezzo della nuda proprietà è scontato del 30-50% rispetto al valore di mercato, in base all'età dell'usufruttuario. Più è giovane l'usufruttuario, maggiore è lo sconto.",
      },
    },
    {
      "@type": "Question",
      name: "Chi paga le spese dell'immobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'usufruttuario paga le spese ordinarie (utenze, manutenzione ordinaria, IMU se prima casa). Il nudo proprietario paga le spese straordinarie (rifacimento tetto, facciata, impianti).",
      },
    },
  ],
};

export default function ComeFunzionaPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 lg:py-24">
          <div className="container-app">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="featured" className="mb-4">
                <HelpCircle className="mr-1 h-3 w-3" /> Guida Completa
              </Badge>
              <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
                Come Funziona la Nuda Proprietà
              </h1>
              <p className="mt-6 text-xl text-gray-200">
                Tutto quello che devi sapere sulla nuda proprietà con usufrutto
                vitalizio: vantaggi, procedura e risposte alle tue domande.
              </p>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="container-app">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-3xl font-bold text-gray-900">
                Cos'è la Nuda Proprietà?
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                La <strong>nuda proprietà</strong> è una forma di proprietà immobiliare
                in cui si acquista un immobile a prezzo scontato (30-50% in meno),
                con la condizione che il venditore (solitamente anziano) continui
                ad abitarci per tutta la vita grazie al diritto di{" "}
                <strong>usufrutto vitalizio</strong>.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                È una soluzione vantaggiosa per entrambe le parti: il venditore
                ottiene liquidità immediata senza dover lasciare la propria casa,
                mentre l'acquirente fa un investimento a lungo termine a prezzo
                ridotto.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Steps */}
        <section className="py-16 bg-gray-50">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900">
                Come Funziona in 4 Passi
              </h2>
              <p className="mt-4 text-gray-600">
                Il processo di compravendita della nuda proprietà è semplice e sicuro
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  icon: Calculator,
                  title: "Valutazione",
                  description:
                    "Il valore della nuda proprietà viene calcolato in base al valore di mercato dell'immobile e all'età dell'usufruttuario, usando coefficienti ministeriali.",
                },
                {
                  step: "02",
                  icon: Users,
                  title: "Incontro",
                  description:
                    "Venditore e acquirente si incontrano, visitano l'immobile e concordano le condizioni della vendita con trasparenza.",
                },
                {
                  step: "03",
                  icon: FileText,
                  title: "Atto Notarile",
                  description:
                    "Si stipula l'atto di vendita dal notaio. L'acquirente diventa nudo proprietario, il venditore mantiene l'usufrutto vitalizio.",
                },
                {
                  step: "04",
                  icon: Shield,
                  title: "Sicurezza",
                  description:
                    "Il venditore continua a vivere nella sua casa. Alla cessazione dell'usufrutto, l'acquirente ottiene la piena proprietà.",
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="rounded-xl bg-white p-6 shadow-card h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl font-bold text-primary-200">
                        {item.step}
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                        <item.icon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900">
                I Vantaggi della Nuda Proprietà
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Per chi vende */}
              <Card className="border-2 border-primary-100">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                      <Home className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900">
                      Per chi Vende
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Liquidità immediata senza lasciare casa",
                      "Continui a vivere nel tuo immobile a vita",
                      "Nessun affitto da pagare",
                      "Mantieni l'indipendenza e le tue abitudini",
                      "Puoi affittare l'immobile (usufrutto con facoltà di locazione)",
                      "Sicurezza economica per il futuro",
                    ].map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Per chi compra */}
              <Card className="border-2 border-secondary-100">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100">
                      <TrendingUp className="h-6 w-6 text-secondary-600" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900">
                      Per chi Compra
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Prezzo scontato del 30-50% sul valore di mercato",
                      "Investimento sicuro nel mattone",
                      "Nessuna gestione dell'immobile (a carico dell'usufruttuario)",
                      "Rivalutazione nel tempo",
                      "Imposte ridotte (calcolate sul valore della nuda proprietà)",
                      "Pianificazione patrimoniale per i figli",
                    ].map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Calculation Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-app">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-3xl font-bold text-gray-900 text-center">
                Come si Calcola il Valore?
              </h2>
              <p className="mt-4 text-center text-gray-600">
                Il valore della nuda proprietà dipende da due fattori principali
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-6 shadow-card">
                  <h3 className="font-semibold text-lg text-gray-900">
                    1. Valore di Mercato
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Il valore dell'immobile a piena proprietà, determinato dalla
                    zona, metratura, stato e caratteristiche.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-card">
                  <h3 className="font-semibold text-lg text-gray-900">
                    2. Età dell'Usufruttuario
                  </h3>
                  <p className="mt-2 text-gray-600">
                    I coefficienti ministeriali determinano la percentuale di
                    sconto in base all'aspettativa di vita dell'usufruttuario.
                  </p>
                </div>
              </div>

              {/* Example Table */}
              <div className="mt-8 rounded-xl bg-white p-6 shadow-card overflow-x-auto">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  Esempio di Calcolo (Immobile da €300.000)
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium text-gray-500">
                        Età Usufruttuario
                      </th>
                      <th className="text-right py-2 font-medium text-gray-500">
                        % Nuda Proprietà
                      </th>
                      <th className="text-right py-2 font-medium text-gray-500">
                        Prezzo Nuda Proprietà
                      </th>
                      <th className="text-right py-2 font-medium text-gray-500">
                        Risparmio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { age: "65 anni", pct: 52.5, price: 157500, save: 142500 },
                      { age: "70 anni", pct: 60, price: 180000, save: 120000 },
                      { age: "75 anni", pct: 67.5, price: 202500, save: 97500 },
                      { age: "80 anni", pct: 75, price: 225000, save: 75000 },
                      { age: "85 anni", pct: 82.5, price: 247500, save: 52500 },
                    ].map((row) => (
                      <tr key={row.age} className="border-b last:border-0">
                        <td className="py-3 font-medium text-gray-900">
                          {row.age}
                        </td>
                        <td className="py-3 text-right text-gray-600">
                          {row.pct}%
                        </td>
                        <td className="py-3 text-right font-medium text-primary-700">
                          €{row.price.toLocaleString("it-IT")}
                        </td>
                        <td className="py-3 text-right text-green-600">
                          -€{row.save.toLocaleString("it-IT")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-center">
                <Link href="/valutazione">
                  <Button variant="primary" size="lg">
                    <Calculator className="mr-2 h-5 w-5" />
                    Calcola il Valore del Tuo Immobile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container-app">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-3xl font-bold text-gray-900 text-center">
                Domande Frequenti
              </h2>

              <div className="mt-8 space-y-6">
                {[
                  {
                    q: "Cos'è la nuda proprietà?",
                    a: "La nuda proprietà è il diritto di proprietà su un immobile privato del diritto di godimento (usufrutto). Il nudo proprietario possiede l'immobile ma non può abitarlo né affittarlo finché l'usufruttuario è in vita.",
                  },
                  {
                    q: "Quanto costa la nuda proprietà rispetto al valore pieno?",
                    a: "Il prezzo della nuda proprietà è scontato del 30-50% rispetto al valore di mercato, in base all'età dell'usufruttuario. Più è giovane l'usufruttuario, maggiore è lo sconto.",
                  },
                  {
                    q: "Chi paga le spese dell'immobile?",
                    a: "L'usufruttuario paga le spese ordinarie (utenze, manutenzione ordinaria, IMU se prima casa). Il nudo proprietario paga le spese straordinarie (rifacimento tetto, facciata, impianti).",
                  },
                  {
                    q: "L'usufruttuario può affittare l'immobile?",
                    a: "Sì, se nell'atto è prevista la 'facoltà di locazione'. In questo caso l'usufruttuario può affittare l'immobile e percepire il canone.",
                  },
                  {
                    q: "Cosa succede alla morte dell'usufruttuario?",
                    a: "L'usufrutto si estingue automaticamente e il nudo proprietario diventa pieno proprietario dell'immobile, senza ulteriori costi o formalità.",
                  },
                  {
                    q: "È possibile vendere la nuda proprietà?",
                    a: "Sì, il nudo proprietario può rivendere la sua quota in qualsiasi momento. Il nuovo acquirente subentra alle stesse condizioni.",
                  },
                ].map((faq, idx) => (
                  <details
                    key={idx}
                    className="group rounded-xl bg-gray-50 p-6"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                      {faq.q}
                      <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-4 text-gray-600">{faq.a}</p>
                  </details>
                ))}
              </div>
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
                Scopri le opportunità di nuda proprietà o valuta il tuo immobile
                gratuitamente.
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
