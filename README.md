# AdamOS — Adam Bush's Portfolio

> A Windows 95-style desktop portfolio that runs in your browser.
> One command, zero cloning.

---

## Run it (anyone, anywhere)

**Prerequisite: Node.js ≥ 18**

```bash
npx adam-os
```

That's it. On first run it installs dependencies (~60 s), then opens
`http://localhost:3000` in your default browser automatically.

---

## Prerequisites

`npx` ships with **npm**, which ships with **Node.js**.
If you see `command not found: npx` you need to install Node.js first:

| OS | Easiest install |
|----|----------------|
| **macOS** | `brew install node` or [nodejs.org](https://nodejs.org) |
| **Windows** | Download the LTS installer at [nodejs.org](https://nodejs.org) |
| **Linux** | `sudo apt install nodejs npm` or [nvm](https://github.com/nvm-sh/nvm) |

After installing, verify with:
```bash
node --version   # should print v18.x or higher
npx --version    # ships with npm
```

Then run `npx adam-os` again.

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
| `command not found: npx` | Install Node.js from [nodejs.org](https://nodejs.org) |
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
