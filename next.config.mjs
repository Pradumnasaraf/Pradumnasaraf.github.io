/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // The blog pipeline reads image headers from public/ at build time, which
  // makes file tracing copy all of public/ into every server function that
  // imports it. Vercel serves public/ as static files, so the functions do not
  // need it at runtime. Without this, each deployment stored hundreds of MB of
  // duplicated images and filled the Hobby Function Storage limit.
  outputFileTracingExcludes: {
    '/*': ['./public/**/*'],
  },
  images: {
    // Gallery photos come from Google Drive; keep optimized copies cached for
    // a month so visitors are served from Vercel instead of hitting Drive.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/thumbnail/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/monitoring',
        destination: 'https://Pradumnasaraf.github.io/Monitoring',
        permanent: true,
      },
      {
        source: '/newsletter',
        destination: 'https://pradumnasaraf.substack.com',
        permanent: true,
      },
      {
        source: '/getcv',
        destination:
          'https://www.canva.com/design/DAF_kKnj9WI/IT8NdwVQlzRK3DaMmXm18A/edit?utm_content=DAF_kKnj9WI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        permanent: true,
      },
      {
        source: '/services',
        destination: 'https://rebasemedia.com',
        permanent: true,
      },
      {
        source: '/services/bundle',
        destination: 'https://rebasemedia.com/bundle',
        permanent: true,
      },
      {
        source: '/services/payment',
        destination: 'https://rebasemedia.com/payment',
        permanent: true,
      },
      {
        source: '/camera',
        destination: '/photography',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // /cv and /contact already send `noindex` in their metadata. The header
      // repeats it so the directive also applies to non-HTML fetches and to
      // crawlers that never parse the document head.
      {
        source: '/cv',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/contact',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
