/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', 
    reactStrictMode: true,
    experimental: {
      appDir: true,  // Ensure app directory support is enabled
    },
    images: {
        unoptimized: true,
      },      
    basePath: '/case-study-portfolio', // <-- replace with your repo name
    assetPrefix: '/case-study-portfolio',
};

export default nextConfig;
