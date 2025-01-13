/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/monitoring',
          destination: 'https://Pradumnasaraf.github.io/Monitoring',
          permanent: true, // Permanent redirect (301)
        },
      ];
    },
  };
  
  export default nextConfig;