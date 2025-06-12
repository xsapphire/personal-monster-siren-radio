import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://web.hycdn.cn/**")],
  },
};

export default nextConfig;
