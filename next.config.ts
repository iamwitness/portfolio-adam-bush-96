import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // When run via npx, the package lands inside a nested node_modules dir.
  // Next.js 16 Turbopack can pick the wrong workspace root (the npx wrapper)
  // if it detects multiple lockfiles. Pinning turbopack.root to the cwd
  // ensures manifests are written and read from the same place.
  // (bin/adam-os.js always sets cwd to PKG_ROOT before spawning Next.js.)
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
