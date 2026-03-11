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

// Returns true if the port is available
function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => server.close(() => resolve(true)));
    server.listen(port, "127.0.0.1");
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
    const server = spawn(nextBin, ["dev", "--port", String(port)], {
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
