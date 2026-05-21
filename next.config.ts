import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't pick up an unrelated
  // lockfile in a parent directory.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
