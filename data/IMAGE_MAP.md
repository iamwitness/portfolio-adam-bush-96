# Image Map — AdamOS Portfolio

Reference for every image in `portfolio.json`.
Cloud name: **`drnrmetws`**
Base URL: `https://res.cloudinary.com/drnrmetws/image/upload/f_auto,q_auto/`

> **Naming convention:** `portfolio/{piece-id}/{role}--{index}`
> e.g. `portfolio/tradeflow/hero`, `portfolio/tradeflow/gallery--01`

---

## 🎨 parcl-design-system

| Role | JSON field | Cloudinary public ID | Status |
|------|-----------|----------------------|--------|
| Desktop icon | `icon` | *(twemoji palette — external, no upload needed)* | 🟡 placeholder |
| Hero image | `sections[0].src` | `portfolio/parcl-design-system/hero` | 🔴 WRONG IMAGE — replace with real design system shot |

**Needs:** Custom hero + gallery. Suggested: component library overview, Figma token view, agent pipeline diagram, before/after code comparison.

---

## 📈 tradeflow — The $5.6B+ Flow

| Role | JSON field | Cloudinary public ID | Status |
|------|-----------|----------------------|--------|
| Desktop icon | `icon` | `portfolio/tradeflow/icon` | ✅ |
| Hero | `sections[0].src` | `portfolio/tradeflow/hero` | ✅ |
| Gallery 1 — slide 1 | `sections[2].images[0]` | `portfolio/tradeflow/gallery--01` | ✅ |
| Gallery 1 — slide 2 | `sections[2].images[1]` | `portfolio/tradeflow/gallery--02` | ✅ |
| Gallery 1 — slide 3 | `sections[2].images[2]` | `portfolio/tradeflow/gallery--03` | ✅ |
| Gallery 1 — slide 4 | `sections[2].images[3]` | `portfolio/tradeflow/gallery--04` | ✅ |
| Gallery 1 — slide 5 | `sections[2].images[4]` | `portfolio/tradeflow/gallery--05` | ✅ |
| Gallery 1 — slide 6 | `sections[2].images[5]` | `portfolio/tradeflow/gallery--06` | ✅ |
| Gallery 2 — slide 1 | `sections[4].images[0]` | `portfolio/tradeflow/gallery--04` | ✅ |
| Gallery 2 — slide 2 | `sections[4].images[1]` | `portfolio/tradeflow/gallery--07` | ✅ |
| Gallery 2 — slide 3 | `sections[4].images[2]` | `portfolio/tradeflow/gallery--06` | ✅ |
| Gallery 2 — slide 4 | `sections[4].images[3]` | `portfolio/tradeflow/gallery--08` | ✅ |

---

## 🏘️ parcl-reframe — Bridging TradFi & DeFi

| Role | JSON field | Cloudinary public ID | Status |
|------|-----------|----------------------|--------|
| Desktop icon | `icon` | `portfolio/parcl-reframe/icon` | ✅ |
| Hero | `sections[0].src` | `portfolio/parcl-reframe/hero` | ✅ |
| Gallery 1 — slide 1 | `sections[2].images[0]` | `portfolio/parcl-reframe/gallery--01` | ✅ |
| Gallery 1 — slide 2 | `sections[2].images[1]` | `portfolio/parcl-reframe/gallery--02` | ✅ |
| Gallery 1 — slide 3 | `sections[2].images[2]` | `portfolio/parcl-reframe/gallery--03` | ✅ |
| Gallery 1 — slide 4 | `sections[2].images[3]` | `portfolio/parcl-reframe/gallery--04` | ✅ |
| Gallery 1 — slide 5 | `sections[2].images[4]` | `portfolio/parcl-reframe/gallery--05` | ✅ |
| Gallery 2 — slide 1 | `sections[4].images[0]` | `portfolio/parcl-reframe/gallery--05` | ✅ |
| Gallery 2 — slide 2 | `sections[4].images[1]` | `portfolio/parcl-reframe/gallery--01` | ✅ |
| Gallery 2 — slide 3 | `sections[4].images[2]` | `portfolio/parcl-reframe/gallery--02` | ✅ |
| Gallery 2 — slide 4 | `sections[4].images[3]` | `portfolio/parcl-reframe/gallery--03` | ✅ |

---

## 🔮 parcl-predictions-markets — Prediction Markets

| Role | JSON field | Cloudinary public ID | Status |
|------|-----------|----------------------|--------|
| Desktop icon | `icon` | `portfolio/parcl-predictions-markets/icon` | ✅ |
| Hero | `sections[0].src` | `portfolio/parcl-predictions-markets/hero` | ✅ |
| Gallery 1 — slide 1 | `sections[2].images[0]` | `portfolio/parcl-predictions-markets/gallery--01` | ✅ |
| Gallery 1 — slide 2 | `sections[2].images[1]` | `portfolio/parcl-predictions-markets/gallery--02` | ✅ |
| Gallery 1 — slide 3 | `sections[2].images[2]` | `portfolio/parcl-predictions-markets/gallery--03` | ✅ |
| Gallery 1 — slide 4 | `sections[2].images[3]` | `portfolio/parcl-predictions-markets/gallery--04` | ✅ |
| Gallery 2 — slide 1 | `sections[4].images[0]` | `portfolio/parcl-predictions-markets/icon` | ✅ |
| Gallery 2 — slide 2 | `sections[4].images[1]` | `portfolio/parcl-predictions-markets/gallery--02` | ✅ |
| Gallery 2 — slide 3 | `sections[4].images[2]` | `portfolio/parcl-predictions-markets/gallery--04` | ✅ |
| Gallery 2 — slide 4 | `sections[4].images[3]` | `portfolio/parcl-predictions-markets/gallery--03` | ✅ |

---

## 🖥️ Local / Public Folder Icons (not on Cloudinary)

| Role | Path | Status |
|------|------|--------|
| About Me desktop icon | `/public/icons/about-me-icon.png` | ✅ real asset |
| My Music desktop icon | `/public/icons/music.webp` | ✅ real asset |

---

## Status Key

| Symbol | Meaning |
|--------|---------|
| ✅ | On Cloudinary, live |
| 🟡 | External placeholder, functional but not ideal |
| 🔴 | Wrong image — needs a real replacement |

---

## Adding a new image

1. Export from Figma at **2x**, save to `assets/cloudinary-upload/portfolio/{piece-id}/`
2. Use naming convention: `icon.png`, `hero.png`, `gallery--01.png` etc.
3. Drag file into Cloudinary Media Library under the matching folder
4. Update `portfolio.json` src with: `https://res.cloudinary.com/drnrmetws/image/upload/f_auto,q_auto/portfolio/{piece-id}/{filename-no-extension}`
5. Update the Status column in this file to ✅
