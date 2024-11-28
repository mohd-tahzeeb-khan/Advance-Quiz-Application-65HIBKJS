/** @type {import('next').NextConfig} */
const nextConfig = {
// next.config.mjs

    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/",
    },
 
};
  
  
export default nextConfig;