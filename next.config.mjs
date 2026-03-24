export default {
  experimental: {
    appDir: true,
    runtime: 'nodejs',
    serverComponents: true,
  },
  future: {
    strictPostcssConfiguration: true,
  },
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  tailwindcss: {},
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}