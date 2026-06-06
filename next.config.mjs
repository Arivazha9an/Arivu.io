/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  serverExternalPackages: ["@sanity/client", "sanity"],
  experimental: {
    optimizePackageImports: ["react-icons", "@heroicons/react"],
  },
};

export default nextConfig;
