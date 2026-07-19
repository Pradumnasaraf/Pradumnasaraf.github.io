/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
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
