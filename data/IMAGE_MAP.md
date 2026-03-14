# Image Map — AdamOS Portfolio

Reference for every image in `portfolio.json`. Update the **Cloudinary URL** column as you
upload assets. The **Current URL** column is the live source — do not delete it until the
Cloudinary URL is confirmed working in prod.

> **Naming convention for Cloudinary uploads:**
> `portfolio/{piece-id}/{role}--{index}.{ext}`
> e.g. `portfolio/tradeflow/hero.png`, `portfolio/tradeflow/gallery--01.png`

---

## 🎨 parcl-design-system

| Role | Field | Current URL | Status | Cloudinary URL |
|------|-------|-------------|--------|----------------|
| Desktop icon | `icon` | `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3a8.png` | 🟡 placeholder (palette emoji) | — |
| Hero image | `sections[0].src` | `https://framerusercontent.com/images/rw0DoidcCidJvjPaOYPsXDrUPh8.png` | 🔴 WRONG — this is a tradeflow screenshot | — |

**Needs:** Custom hero + gallery images. Suggested shots: component library overview, token spreadsheet/Figma view, agent pipeline diagram, a "before/after" code comparison.

---

## 📈 tradeflow — The $5.6B+ Flow

| Role | Field | Current URL | Status | Cloudinary URL |
|------|-------|-------------|--------|----------------|
| Desktop icon | `icon` | `framerusercontent.com/…/f1ufjmN7MvkOzFP6CFLkIc11w.png` | 🟡 Framer export | — |
| Hero image | `sections[0].src` | `framerusercontent.com/…/f1ufjmN7MvkOzFP6CFLkIc11w.png` | 🟡 same as icon | — |
| Gallery 1 — slide 1 | `sections[2].images[0]` | `framerusercontent.com/…/f1ufjmN7MvkOzFP6CFLkIc11w.png` | 🟡 duplicate of hero | — |
| Gallery 1 — slide 2 | `sections[2].images[1]` | `framerusercontent.com/…/rw0DoidcCidJvjPaOYPsXDrUPh8.png` | 🟡 Framer export | — |
| Gallery 1 — slide 3 | `sections[2].images[2]` | `framerusercontent.com/…/t3KIebnPPKCicz3u39hMhl4.png` | 🟡 Framer export | — |
| Gallery 1 — slide 4 | `sections[2].images[3]` | `framerusercontent.com/…/zo71h6L4DaTNXkvz1m5nzMKYdU.png` | 🟡 Framer export | — |
| Gallery 1 — slide 5 | `sections[2].images[4]` | `framerusercontent.com/…/rCgUtVshrrUXIzfh5kFlt98fgNM.png` | 🟡 Framer export | — |
| Gallery 1 — slide 6 | `sections[2].images[5]` | `framerusercontent.com/…/tFAummfebd9uRdfT3wBA4Iu5YLM.png` | 🟡 Framer export | — |
| Gallery 2 — slide 1 | `sections[4].images[0]` | `framerusercontent.com/…/zo71h6L4DaTNXkvz1m5nzMKYdU.png` | ⚠️ duplicate of gallery-1 slide 4 | — |
| Gallery 2 — slide 2 | `sections[4].images[1]` | `framerusercontent.com/…/xsJAOFMAiVSFTfTJumdtrbHMA.png` | 🟡 Framer export | — |
| Gallery 2 — slide 3 | `sections[4].images[2]` | `framerusercontent.com/…/tFAummfebd9uRdfT3wBA4Iu5YLM.png` | ⚠️ duplicate of gallery-1 slide 6 | — |
| Gallery 2 — slide 4 | `sections[4].images[3]` | `framerusercontent.com/…/RMVhTGI3CoYOTccz7ffI4KR0Mqg.png` | 🟡 Framer export | — |

---

## 🏘️ parcl-reframe — Bridging TradFi & DeFi

| Role | Field | Current URL | Status | Cloudinary URL |
|------|-------|-------------|--------|----------------|
| Desktop icon | `icon` | `framerusercontent.com/…/Kzk5KtwhAowGZgoePDS7aVaSoOA.png` | 🟡 Framer export | — |
| Hero image | `sections[0].src` | `framerusercontent.com/…/Kzk5KtwhAowGZgoePDS7aVaSoOA.png` | 🟡 same as icon | — |
| Gallery 1 — slide 1 | `sections[2].images[0]` | `framerusercontent.com/…/tIwnarMyGu60u6ds6aQ3n8vOo8.png` | 🟡 Framer export | — |
| Gallery 1 — slide 2 | `sections[2].images[1]` | `framerusercontent.com/…/l6DzZIFsuW7caRisom5Qg060zY.png` | 🟡 Framer export | — |
| Gallery 1 — slide 3 | `sections[2].images[2]` | `framerusercontent.com/…/9s9S8G1lU8ATRCLr3k4wemLwJY.png` | 🟡 Framer export | — |
| Gallery 1 — slide 4 | `sections[2].images[3]` | `framerusercontent.com/…/8LvwccVd4Q3iTbxkSgSlm8cw.png` | 🟡 Framer export | — |
| Gallery 1 — slide 5 | `sections[2].images[4]` | `framerusercontent.com/…/NVqFdchhFxI2rT1dQ38hHlcxg.png` | 🟡 Framer export | — |
| Gallery 2 — slide 1 | `sections[4].images[0]` | `framerusercontent.com/…/NVqFdchhFxI2rT1dQ38hHlcxg.png` | ⚠️ duplicate of gallery-1 slide 5 | — |
| Gallery 2 — slide 2 | `sections[4].images[1]` | `framerusercontent.com/…/tIwnarMyGu60u6ds6aQ3n8vOo8.png` | ⚠️ duplicate of gallery-1 slide 1 | — |
| Gallery 2 — slide 3 | `sections[4].images[2]` | `framerusercontent.com/…/l6DzZIFsuW7caRisom5Qg060zY.png` | ⚠️ duplicate of gallery-1 slide 2 | — |
| Gallery 2 — slide 4 | `sections[4].images[3]` | `framerusercontent.com/…/9s9S8G1lU8ATRCLr3k4wemLwJY.png` | ⚠️ duplicate of gallery-1 slide 3 | — |

---

## 🔮 parcl-predictions-markets — Prediction Markets

| Role | Field | Current URL | Status | Cloudinary URL |
|------|-------|-------------|--------|----------------|
| Desktop icon | `icon` | `framerusercontent.com/…/dNrMj9TP5NBsurwezwyzbJk2qL8.png` | 🟡 Framer export | — |
| Hero image | `sections[0].src` | `framerusercontent.com/…/dNrMj9TP5NBsurwezwyzbJk2qL8.png` | 🟡 same as icon | — |
| Gallery 1 — slide 1 | `sections[2].images[0]` | `framerusercontent.com/…/EMFto24ztz5k1iE0BB7VUduGEg.png` | 🟡 Framer export | — |
| Gallery 1 — slide 2 | `sections[2].images[1]` | `framerusercontent.com/…/l7VkTqPawwcmY43UDIZVE00E.jpg` | 🟡 Framer export (.jpg) | — |
| Gallery 1 — slide 3 | `sections[2].images[2]` | `framerusercontent.com/…/g5CRqAAwIJplkdgzz0uFo0CsIXQ.png` | 🟡 Framer export | — |
| Gallery 1 — slide 4 | `sections[2].images[3]` | `framerusercontent.com/…/JmwixxFshWCnXhCPeMbweUcqE.png` | 🟡 Framer export | — |
| Gallery 2 — slide 1 | `sections[4].images[0]` | `framerusercontent.com/…/dNrMj9TP5NBsurwezwyzbJk2qL8.png` | ⚠️ duplicate of hero/icon | — |
| Gallery 2 — slide 2 | `sections[4].images[1]` | `framerusercontent.com/…/l7VkTqPawwcmY43UDIZVE00E.jpg` | ⚠️ duplicate of gallery-1 slide 2 | — |
| Gallery 2 — slide 3 | `sections[4].images[2]` | `framerusercontent.com/…/JmwixxFshWCnXhCPeMbweUcqE.png` | ⚠️ duplicate of gallery-1 slide 4 | — |
| Gallery 2 — slide 4 | `sections[4].images[3]` | `framerusercontent.com/…/g5CRqAAwIJplkdgzz0uFo0CsIXQ.png` | ⚠️ duplicate of gallery-1 slide 3 | — |

---

## 🖥️ Local / Public Folder Icons

| Role | Path | Status |
|------|------|--------|
| About Me desktop icon | `/public/icons/about-me-icon.png` | ✅ real asset (pixel art avatar) |
| My Music desktop icon | `/public/icons/music.webp` | ✅ real asset (LimeWire logo) |

---

## Status Key

| Symbol | Meaning |
|--------|---------|
| ✅ | Real asset, no action needed |
| 🟡 | Framer CDN export — functional but low quality, replace when possible |
| 🔴 | Wrong image — placeholder from another piece, replace ASAP |
| ⚠️ | Duplicate of another image in the same piece — consider replacing with a unique shot |

---

## Cloudinary Upload Checklist

When uploading to Cloudinary, use this folder structure:

```
portfolio/
  parcl-design-system/
    icon.png
    hero.png
    gallery--01.png  ← component library overview
    gallery--02.png  ← token system / Figma view
    gallery--03.png  ← agent pipeline diagram
    gallery--04.png  ← before/after code comparison
  tradeflow/
    icon.png
    hero.png
    gallery--01.png through gallery--06.png
  parcl-reframe/
    icon.png
    hero.png
    gallery--01.png through gallery--05.png
  parcl-predictions-markets/
    icon.png
    hero.png
    gallery--01.png through gallery--04.png
```

After uploading, Cloudinary URLs follow this pattern:
`https://res.cloudinary.com/{your-cloud-name}/image/upload/f_auto,q_auto/portfolio/{piece-id}/{filename}`

The `f_auto,q_auto` transform auto-serves WebP/AVIF and optimizes quality automatically.
