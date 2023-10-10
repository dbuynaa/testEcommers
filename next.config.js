/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bolovsrol.app.erxes.io',
      },
      {
        protocol: 'https',
        hostname: 'bolovsrol.nmma.co',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'bolovsrol-store.pages.dev',
      },
    ],
  },
};

module.exports = nextConfig;
