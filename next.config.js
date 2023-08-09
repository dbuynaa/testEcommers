/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.erxes.io',
      },
      {
        protocol: 'https',
        hostname: 'admin.techstore.mn',
      },
      {
        protocol: 'http',
        hostname: '192.168.8.3',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'xos.techstore.mn',
      },
    ],
  },
};

module.exports = nextConfig;
