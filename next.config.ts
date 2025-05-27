import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  // Generate output directory structure with trailing slash
  trailingSlash: true,
  // Configure Next.js to better handle static assets
  distDir: process.env.NODE_ENV === 'production' ? '.next' : '.next',
  // Improved asset handling for containerized environments
  experimental: {
    optimizeServerReact: true
  }
};

export default nextConfig;
