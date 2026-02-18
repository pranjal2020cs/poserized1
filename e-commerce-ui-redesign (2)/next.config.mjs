/** @type {import('next').NextConfig} */
const nextConfig = {
  // React and Development Settings
  reactStrictMode: true,
  
  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Internationalization (if needed in future)
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  // },

  // Headers and Security
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-no-referrer-when-downgrade',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Enable static asset caching
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects
  redirects: async () => {
    return [
      // Add redirects here if needed
    ];
  },

  // Rewrites
  rewrites: async () => {
    return {
      beforeFiles: [
        // Add rewrites here if needed
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['components'],
    // esmExternals: true,
  },

  // Production build settings
  productionBrowserSourceMaps: false,
  
  // Compression
  compress: true,

  // Turbopack configuration (Next.js 16 default)
  turbopack: {
    resolveAlias: {},
  },

  // Logging
  logging: {
    fetches: {
      // Use 'info' for production to reduce noise, 'debug' for development
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  // Trailing slashes
  trailingSlash: false,

  // Powered by header (optional, set to false for security through obscurity)
  poweredByHeader: false,

  // Generate ETags (disable for better performance on Vercel)
  generateEtags: false,
};

export default nextConfig;
