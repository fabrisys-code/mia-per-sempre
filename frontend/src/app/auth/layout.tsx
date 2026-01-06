import { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Accedi | Mia Per Sempre",
  description:
    "Accedi al tuo account Mia Per Sempre per gestire i tuoi annunci di nuda proprietà.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero flex-col justify-between p-12">
        <div>
          <Link href="/">
            <Logo variant="full" className="text-white" />
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="font-serif text-4xl font-bold text-white leading-tight">
            Il marketplace italiano
            <br />
            della nuda proprietà
          </h1>
          <p className="text-lg text-gray-200 max-w-md">
            Compra, vendi o valuta immobili in nuda proprietà con usufrutto
            vitalizio. Trasparenza, sicurezza e valutazioni automatiche.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <svg
                  className="h-5 w-5 text-secondary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Annunci Verificati</h3>
                <p className="text-sm text-gray-300">
                  Controllo qualità su ogni immobile
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <svg
                  className="h-5 w-5 text-secondary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Valutazione Gratuita</h3>
                <p className="text-sm text-gray-300">
                  Algoritmo basato su dati OMI
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <svg
                  className="h-5 w-5 text-secondary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">100% Sicuro</h3>
                <p className="text-sm text-gray-300">
                  Identità verificata SPID/CIE
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <svg
                  className="h-5 w-5 text-secondary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Supporto Dedicato</h3>
                <p className="text-sm text-gray-300">
                  Assistenza in ogni fase
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Mia Per Sempre. Tutti i diritti riservati.
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden p-4 border-b">
          <Link href="/">
            <Logo variant="full" />
          </Link>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Mobile footer */}
        <div className="lg:hidden p-4 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} Mia Per Sempre
        </div>
      </div>
    </div>
  );
}
