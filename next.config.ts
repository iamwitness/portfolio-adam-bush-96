import type { NextConfig } from "next";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // When run via npx, the package lands inside a nested node_modules dir.
  // Next.js 16 Turbopack can pick the wrong workspace root (the npx wrapper)
  // if it detects multiple lockfiles. Pinning turbopack.root to *this*
  // directory ensures manifests are written and read from the same place.
  turbopack: {
    root: resolve(__dirname),
  },
};

export default nextConfig;
