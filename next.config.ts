import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  headers: async () => {
    return[
      {
        source: '/:path*',
        headers:[
          {
            key: "Autoplay-Policy",
            value: "no-user-gesture-required"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
