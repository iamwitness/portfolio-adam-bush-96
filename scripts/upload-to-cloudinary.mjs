/**
 * upload-to-cloudinary.mjs
 *
 * Uploads every image in assets/cloudinary-upload/portfolio/ to Cloudinary
 * with an explicit public_id so URLs are clean and predictable.
 *
 * Usage: node scripts/upload-to-cloudinary.mjs
 */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ── Load .env.local manually (no dotenv dependency needed) ───────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env.local");

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    process.env[key] = val;
  }
}

// ── Configure Cloudinary ─────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: "drnrmetws",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ── Find all image files to upload ───────────────────────────────────────────
const stagingDir = path.join(root, "assets", "cloudinary-upload", "portfolio");
const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

function collectFiles(dir, fileList = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      collectFiles(full, fileList);
    } else if (IMAGE_EXTS.has(path.extname(entry).toLowerCase())) {
      fileList.push(full);
    }
  }
  return fileList;
}

const files = collectFiles(stagingDir);

if (files.length === 0) {
  console.error("No image files found in", stagingDir);
  process.exit(1);
}

console.log(`\nUploading ${files.length} images to Cloudinary (cloud: drnrmetws)…\n`);

// ── Upload each file ──────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

for (const filePath of files) {
  // Build public_id: portfolio/{piece-id}/{filename-without-ext}
  const relative = path.relative(stagingDir, filePath);          // e.g. tradeflow/hero.png
  const withoutExt = relative.replace(/\.[^.]+$/, "");           // e.g. tradeflow/hero
  const publicId = `portfolio/${withoutExt}`;                    // e.g. portfolio/tradeflow/hero
  const label = publicId.padEnd(55);

  try {
    await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      invalidate: true,       // bust CDN cache for any existing asset
      resource_type: "image",
    });
    console.log(`  ✓  ${label}`);
    passed++;
  } catch (err) {
    console.error(`  ✗  ${label}  ${err.message}`);
    failed++;
  }
}

console.log(`\n${passed} uploaded, ${failed} failed.\n`);

if (failed > 0) process.exit(1);
