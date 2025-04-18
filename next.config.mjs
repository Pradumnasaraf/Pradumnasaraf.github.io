/** @type {import('next').NextConfig} */
const nextConfig = {
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
          source: '/cv',
          destination: 'https://www.canva.com/design/DAF_kKnj9WI/IT8NdwVQlzRK3DaMmXm18A/edit?utm_content=DAF_kKnj9WI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
          permanent: true,
        },
        {
          source: '/resume',
          destination: 'https://www.canva.com/design/DAF_kKnj9WI/IT8NdwVQlzRK3DaMmXm18A/edit?utm_content=DAF_kKnj9WI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
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
          source: '/contact',
          destination: 'mailto:pradumnasaraf@gmail.com',
          permanent: true,
        },
      ]
    },
  };
  
  export default nextConfig;