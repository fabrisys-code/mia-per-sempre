import Link from "next/link";
import { LogoWhite } from "@/components/ui/Logo";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  marketplace: {
    title: "Marketplace",
    links: [
      { name: "Cerca Immobili", href: "/properties" },
      { name: "Pubblica Annuncio", href: "/dashboard/properties/new" },
      { name: "Valutazione Gratuita", href: "/valutazione" },
      { name: "Zone Coperte", href: "/zone" },
    ],
  },
  informazioni: {
    title: "Informazioni",
    links: [
      { name: "Come Funziona", href: "/come-funziona" },
      { name: "Cos'è la Nuda Proprietà", href: "/nuda-proprieta" },
      { name: "Domande Frequenti", href: "/faq" },
      { name: "Blog", href: "/blog" },
    ],
  },
  azienda: {
    title: "Azienda",
    links: [
      { name: "Chi Siamo", href: "/chi-siamo" },
      { name: "Contatti", href: "/contatti" },
      { name: "Lavora con Noi", href: "/lavora-con-noi" },
      { name: "Press", href: "/press" },
    ],
  },
  legale: {
    title: "Legale",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Termini di Servizio", href: "/termini" },
      { name: "Cookie Policy", href: "/cookie" },
      { name: "Note Legali", href: "/note-legali" },
    ],
  },
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/miapersempre" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/miapersempre" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/miapersempre" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-hero text-white">
      {/* Main Footer */}
      <div className="container-app py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <LogoWhite variant="full" size="lg" href="/" />
            
            <p className="mt-6 text-sm text-gray-300 leading-relaxed max-w-sm">
              Il primo marketplace italiano dedicato alla compravendita di nuda proprietà. 
              Aiutiamo proprietari e investitori a trovare la soluzione giusta per le loro esigenze.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a
                href="mailto:info@miapersempre.it"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                info@miapersempre.it
              </a>
              <a
                href="tel:+390123456789"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                +39 012 345 6789
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                Milano, Italia
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-secondary-500 hover:text-gray-900"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-app py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              © {currentYear} Mia Per Sempre S.r.l. - P.IVA 12345678901 - Tutti i diritti riservati
            </p>
            
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-500">
                Made with ❤️ in Italy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
