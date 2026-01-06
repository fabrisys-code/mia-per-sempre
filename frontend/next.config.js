/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/v1/images/**',
      },
      {
        protocol: 'https',
        hostname: 'miapersempre.it',
        pathname: '/api/v1/images/**',
      },
      {
        protocol: 'https',
        hostname: 'api.miapersempre.it',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
