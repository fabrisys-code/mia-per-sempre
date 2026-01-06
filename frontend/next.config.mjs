/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurazione immagini per il backend
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/api/v1/images/**",
      },
      {
        protocol: "https",
        hostname: "api.miapersempre.it",
        pathname: "/api/v1/images/**",
      },
    ],
    // Formati supportati
    formats: ["image/webp", "image/avif"],
  },

  // Environment variables pubbliche
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    NEXT_PUBLIC_SITE_NAME: "Mia Per Sempre",
    NEXT_PUBLIC_SITE_DESCRIPTION:
      "Il marketplace italiano della nuda proprietà",
  },

  // Redirect e rewrite (per produzione)
  async rewrites() {
    return [
      // Proxy API calls in development
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
