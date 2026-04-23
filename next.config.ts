import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // V-ZUG official CDN
      {
        protocol: "https",
        hostname: "www.vzug.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vzug.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.vzug.com",
        pathname: "/**",
      },
      // Placeholder images per product (unique per SKU)
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
