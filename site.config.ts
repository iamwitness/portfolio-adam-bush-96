// site.config.ts
// Single source of truth for all personal data in AdamOS.
// ─────────────────────────────────────────────────────────

const siteConfig = {
  // ── Identity ─────────────────────────────────────────────
  name: "Adam Bush",
  title: "Design Lead @ Parcl",
  titleFull: "Design Lead @ Parcl | I Build Intelligent Design Systems | AI Consulting | UI Eng",
  location: "Naples, FL",
  locationLine: "Naples, FL · adamchrisbush@gmail.com · 440-708-8593",

  // ── OS Branding ──────────────────────────────────────────
  osName: "AdamOS",
  osVersion: "1.0 (based on Win95)",

  // ── Contact ──────────────────────────────────────────────
  email: "adamchrisbush@gmail.com",
  phone: "440-708-8593",

  // ── Links ────────────────────────────────────────────────
  github: "https://github.com/adambush",
  linkedin: "https://www.linkedin.com/in/adam-bush/",
  resumeUrl: "/resume.pdf",
  avatar: "/pro-pic.jpg",

  // ── Page Metadata ────────────────────────────────────────
  metaTitle: "AdamOS — Adam Bush Portfolio",
  metaDescription: "Product designer portfolio. Windows 95-style desktop environment in the browser.",
  metaOgTitle: "AdamOS — Adam Bush Portfolio",
  metaOgDescription: "Product designer portfolio built as a Windows 95 desktop.",

  // ── CDN Base URL ─────────────────────────────────────────
  // Set to your Vercel deployment URL after first deploy, e.g. "https://adam-os.vercel.app"
  // Leave empty during local dev — the CLI runner reads this and injects it as
  // NEXT_PUBLIC_CDN_BASE so asset paths resolve against the CDN, not localhost.
  cdnBase: "",
} as const;

export default siteConfig;
