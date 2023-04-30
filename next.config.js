/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.erxes.io',
      },
      {
        protocol: 'https',
        hostname: 'techstore.nmma.co',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  webpack: (config) => {
    config.optimization.splitChunks.cacheGroups = {
      ...config.optimization.splitChunks.cacheGroups,
      '@sentry': {
        test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
        name: '@sentry',
        priority: 10,
        reuseExistingChunk: false,
      },
    };
    return config;
  },
};

module.exports = nextConfig;
