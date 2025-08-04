import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Use 'export' for static export
  distDir: 'out', // Output directory for the static files
  images: { // Disable image optimization for static export
    unoptimized: true,
  },
  basePath: '', // Base path for the application
  assetPrefix: './', // Asset prefix for static files
  trailingSlash: true, // Add trailing slash to URLs
};

export default nextConfig;
