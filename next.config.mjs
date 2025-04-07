/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', 
    reactStrictMode: true,
    experimental: {
      appDir: true,  // Ensure app directory support is enabled
    },
};

export default nextConfig;
