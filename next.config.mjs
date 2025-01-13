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
          destination: 'https://pradumnasaa.substack.com',
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
          source: '/blog',
          destination: 'https://blog.pradumnasaraf.dev',
          permanent: true,
        }
      ]
    },
  };
  
  export default nextConfig;