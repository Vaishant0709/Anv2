import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    outputFileTracingIncludes: {
      // Force Vercel to bundle the figlet fonts into the API route
      "/api/**/*": ["./node_modules/figlet/fonts/**/*"],
    },
};

export default nextConfig;