/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/hey',
          destination: '/',
          permanent: true, // Permanent redirect (301)
        },
      ];
    },
  };
  
  export default nextConfig;