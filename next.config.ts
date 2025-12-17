import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ebrazclinic.ir"
      }
    ],
  }
};

export default nextConfig;
