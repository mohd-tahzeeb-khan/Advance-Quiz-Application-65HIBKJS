/** @type {import('next').NextConfig} */
const nextConfig = {
// next.config.mjs

    reactStrictMode: true,
    // env: {
    //   NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/",
    // },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/:path*', // Proxy to backend
        },
      ];
    }
    
 
};
  
  
export default nextConfig;