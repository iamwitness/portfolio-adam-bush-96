# AdamOS — Adam Bush's Portfolio

> A Windows 95-style desktop portfolio that runs in your browser.
> One command, zero cloning.

---

## Run it (anyone, anywhere)

### Already have Node.js ≥ 18?

```bash
npx adam-os
```

### Don't have Node.js? Use the one-line installer

**macOS / Linux** — installs Node automatically then launches the portfolio:
```bash
curl -fsSL https://raw.githubusercontent.com/iamwitness/portfolio-adam-bush-96/main/install.sh | bash
```

**Windows** — open PowerShell and run:
```powershell
irm https://raw.githubusercontent.com/iamwitness/portfolio-adam-bush-96/main/install.ps1 | iex
```

The installer detects your OS, installs Node.js via the best available method (Homebrew, apt, winget, etc.), then launches AdamOS automatically. On first run it also installs app dependencies (~60 s); subsequent runs are instant.

---

## Options

```bash
npx adam-os                  # dev mode (live reload) — default
npx adam-os --prod           # production build then serve
npx adam-os --port=8080      # use a specific port (auto-increments if taken)
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `command not found: npx` | Use the one-line installer above — it handles Node.js for you |
| `EACCES` permission error | Use `nvm` to manage Node versions without sudo |
| Port already in use | AdamOS auto-picks the next free port — no action needed |
| Slow first run (~60 s) | Normal — installs Next.js deps once; subsequent runs are instant |
| `.next/dev/lock` error | You already have a dev server running in this directory |

---

## Local development (for contributors)

```bash
git clone https://github.com/iamwitness/portfolio-adam-bush-96.git
cd portfolio-adam-bush-96
npm install
npm run dev       # http://localhost:3000
npm run build     # production build check
```

All personal data lives in [`site.config.ts`](./site.config.ts) — fork and swap it out to make this your own.

---

## Tech

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** + custom Win95 CSS variables
- **No database** — portfolio content in `data/portfolio.json`
- **CLI runner** — `bin/adam-os.js` (pure Node.js, zero extra deps)

---

## License

MIT — fork it, theme it, ship it.
