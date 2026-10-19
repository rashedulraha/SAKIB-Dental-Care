import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  sassOptions: {
    includePaths: ["./src/styles"],
  },
};

export default nextConfig;
