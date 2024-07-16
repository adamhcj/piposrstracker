/** @type {import('next').NextConfig} */

const nextConfig = {
    basePath: "/piposrstracker",
    transpilePackages: ['@mui/x-charts'],
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
};

export default nextConfig;
