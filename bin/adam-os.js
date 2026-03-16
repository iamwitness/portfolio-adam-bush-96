#!/usr/bin/env node
// bin/adam-os.js — AdamOS CLI runner
// Pure Node.js — no external dependencies required beyond what Next.js needs.
"use strict";

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const net = require("net");

// ── Working directory is always the package root (not wherever the user ran the command) ──
const PKG_ROOT = path.resolve(__dirname, "..");

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function checkNodeVersion() {
  const major = parseInt(process.version.slice(1).split(".")[0], 10);
  if (major < 18) {
    console.error(
      `\n  ✗ AdamOS requires Node.js >= 18. You have ${process.version}.\n` +
      `    Download the latest LTS: https://nodejs.org\n`
    );
    process.exit(1);
  }
}

function ensureDeps() {
  const sentinel = path.join(PKG_ROOT, "node_modules", ".bin", "next");
  if (!fs.existsSync(sentinel)) {
    console.log("\n  Installing dependencies (first run — this takes ~60 seconds)...\n");
    execSync("npm install", { cwd: PKG_ROOT, stdio: "inherit" });
    console.log("");
  }
}

// A .next left behind by an interrupted run can be missing internal manifests,
// causing a hard crash on the next startup. Detect and remove it so Next.js
// gets a clean slate. Only deletes .next — node_modules is untouched.
function clearStaleNextDir() {
  const nextDir = path.join(PKG_ROOT, ".next");
  if (!fs.existsSync(nextDir)) return;

  const buildManifest = path.join(nextDir, "build-manifest.json");
  const devLock       = path.join(nextDir, "dev", "lock");

  const isStale =
    // dev lock still present from a crashed run
    fs.existsSync(devLock) ||
    // .next exists but the top-level build-manifest is missing (incomplete build)
    !fs.existsSync(buildManifest);

  if (isStale) {
    console.log("  ✦ Clearing stale .next cache...\n");
    fs.rmSync(nextDir, { recursive: true, force: true });
  }
}

// Returns true if the port is available on all interfaces (same as Next.js binds)
function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => server.close(() => resolve(true)));
    server.listen(port); // no host — binds to all interfaces, matching Next.js behaviour
  });
}

async function findFreePort(start) {
  for (let port = start; port < start + 20; port++) {
    if (await isPortFree(port)) return port;
  }
  console.error(`\n  ✗ No free port found starting at ${start}.\n`);
  process.exit(1);
}

function openBrowser(url) {
  const cmd =
    process.platform === "darwin" ? `open "${url}"` :
    process.platform === "win32"  ? `start "" "${url}"` :
                                    `xdg-open "${url}"`;
  try { execSync(cmd, { stdio: "ignore" }); } catch (_) { /* best-effort */ }
}

// Read cdnBase from site.config.ts via simple regex (no ts-node needed)
function readCdnBase() {
  try {
    const src = fs.readFileSync(path.join(PKG_ROOT, "site.config.ts"), "utf-8");
    const match = src.match(/cdnBase:\s*["']([^"']*)["']/);
    return match?.[1] ?? "";
  } catch (_) {
    return "";
  }
}

function printBanner(url, mode) {
  const pad = (s, n) => s + " ".repeat(Math.max(0, n - s.length));
  console.log([
    "",
    "  ╔══════════════════════════════════════════╗",
    `  ║       AdamOS — Portfolio Runner          ║`,
    "  ╠══════════════════════════════════════════╣",
    `  ║  Mode  : ${pad(mode, 32)}║`,
    `  ║  URL   : ${pad(url, 32)}║`,
    "  ║  Stop  : Ctrl+C                          ║",
    "  ╚══════════════════════════════════════════╝",
    "",
  ].join("\n"));
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  checkNodeVersion();

  const isProd = process.argv.includes("--prod");
  const portArg = process.argv.find((a) => a.startsWith("--port="));
  const basePort = portArg ? parseInt(portArg.split("=")[1], 10) : 3000;

  console.log("\n  AdamOS is starting up...");
  ensureDeps();
  clearStaleNextDir();

  const port = await findFreePort(basePort);
  const url = `http://localhost:${port}`;
  const nextBin = path.join(PKG_ROOT, "node_modules", ".bin", "next");
  const cdnBase = readCdnBase();
  const env = {
    ...process.env,
    ...(cdnBase ? { NEXT_PUBLIC_CDN_BASE: cdnBase } : {}),
  };

  // Forward signals cleanly
  process.on("SIGINT", () => process.exit(0));
  process.on("SIGTERM", () => process.exit(0));

  if (isProd) {
    console.log("\n  Building production bundle (this takes ~30 seconds)...\n");
    try {
      execSync(`"${nextBin}" build`, { cwd: PKG_ROOT, stdio: "inherit", env });
    } catch (_) {
      console.error("\n  ✗ Build failed. Try dev mode: npx adam-os\n");
      process.exit(1);
    }
    printBanner(url, "Production");
    const server = spawn(nextBin, ["start", "--port", String(port)], {
      cwd: PKG_ROOT, stdio: "inherit", env,
    });
    setTimeout(() => openBrowser(url), 2000);
    server.on("exit", (code) => process.exit(code ?? 0));
  } else {
    printBanner(url, "Development (live reload)");
    const server = spawn(nextBin, ["dev", "--port", String(port), "--no-turbopack"], {
      cwd: PKG_ROOT, stdio: "inherit", env,
    });
    setTimeout(() => openBrowser(url), 3500);
    server.on("exit", (code) => process.exit(code ?? 0));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
