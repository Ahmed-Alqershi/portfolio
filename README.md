# Portfolio — Ahmed Alqershi

Personal portfolio site. Mathematical modelling, machine learning, and the software around them.

**Live:** _(to be deployed at [aalqershi.com](https://aalqershi.com))_

---

## What's in here

Most of the moving parts were built from scratch — this isn't a template.

- **`Detour`** ([src/components/Detour.tsx](src/components/Detour.tsx), [src/lib/tsp.ts](src/lib/tsp.ts)) — a daily orienteering puzzle (Traveling Salesman + knapsack). Cities and values are seeded from the date; the optimal closed tour and the optimal value-bounded subset are both computed exactly via **Held–Karp** dynamic programming from a single shared DP table. Rendered on raw `<canvas>` with twinkle/glow, star scoring, streak tracking, and a Wordle-style shareable result string. No game engine.
- **`SkillStrip`** ([src/components/SkillStrip.tsx](src/components/SkillStrip.tsx)) — horizontal scroll-snap card strip with hover-visible chevrons, keyboard arrow navigation, focus-into-view scroll on tab, and a wheel-to-horizontal converter that falls through to page scroll at the boundaries.
- **`Experience`** ([src/components/Experience.tsx](src/components/Experience.tsx)) — logo-tile selector + detail panel. The GAMS entry's blurb is JSX with embedded external links to Wikipedia, GAMS docs, and the GAMSPy examples repo — clickable proof embedded in the experience copy.
- **`ParticleField`** ([src/components/ParticleField.tsx](src/components/ParticleField.tsx)) — twinkling starfield via `<canvas>`, biased to the side margins outside the central content column. Per-particle phase and frequency for desynced twinkle; mouse-repel with spring return on pointer-fine devices.
- **Theme system** — 4 palettes (Indigo / Forest / Copper / Plum) × light/dark/system, driven entirely by CSS variables. An inline bootstrap script in [layout.tsx](src/app/layout.tsx) reads the saved theme and writes `data-theme` / `data-mode` to `<html>` **before** the first paint, so there's no flash of unstyled content.
- **`opengraph-image.tsx` + `icon.svg`** ([src/app/](src/app/)) — favicon is a custom monogram path; the OG image is generated dynamically with `next/og`'s `ImageResponse`.
- **Resend contact form** ([src/app/actions.ts](src/app/actions.ts)) — server action with an IP rate limit (5 per 10 minutes), hidden honeypot field, length caps, and CR/LF stripping to close header-injection on `replyTo`.

## Stack

| Layer         | Choice                                                                                  |
| ------------- | --------------------------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, RSC + Server Actions)                                           |
| UI            | React 19 + TypeScript (strict) + Tailwind CSS v4                                        |
| Animation     | `motion/react` for DOM; raw `requestAnimationFrame` + canvas for Detour & ParticleField |
| Smooth scroll | Lenis                                                                                   |
| Email         | Resend                                                                                  |
| Hosting       | Vercel (Hobby tier)                                                                     |

## Project layout

```text
src/
  app/
    actions.ts            Resend contact form server action
    globals.css           Tailwind + 4×2 theme palettes (CSS vars)
    icon.svg              Custom favicon
    layout.tsx            Root layout + metadata + theme bootstrap
    opengraph-image.tsx   Dynamic OG image (1200×630)
    page.tsx              Composes the 7 sections
  components/
    Hero.tsx              Section 00
    About.tsx             Section 01
    Experience.tsx        02 — logo-tile selector + detail panel
    Education.tsx         03 — two-degree horizontal timeline
    Skills.tsx            04 — uses SkillStrip
    SkillStrip.tsx        Reusable accessible scroll strip
    Projects.tsx          05 — alternating image/text rows
    Detour.tsx            06 — the daily puzzle (client component)
    Contact.tsx           07 — the contact form
    Nav.tsx               Sticky top nav with mobile dropdown
    Footer.tsx
    ParticleField.tsx     Full-bleed starfield (fixed, -z-10)
    ScrollProgress.tsx
    ThemeSwitcher.tsx     Bottom-right floating palette picker
    EasterEggPanel.tsx    Konami-code easter egg
    FadeIn.tsx, SectionLabel.tsx, SmoothScroll.tsx
  lib/
    tsp.ts                mulberry32, Held–Karp, orienteering solver
  hooks/
    useKonamiCode.ts
public/
  logos/                  Company logos (used by Experience)
  projects/               Project images (used by Projects)
  ahmed-alqershi-cv.pdf   CV download
```

## Running locally

The project uses a project-local conda env at `code/env/` with Node from conda-forge. Open **cmd.exe** (not PowerShell — conda activate is fragile there):

```cmd
cd C:\Users\alqer\Desktop\personal_page\code
conda activate .\env
cd portfolio
npm run dev
```

Open <http://localhost:3000>. Hot reload is on.

To rehearse the production build locally (this is what Vercel runs):

```cmd
npm run build
npm run start
```

## Deployment

Vercel Hobby tier. `git push` → auto-deploy. Two non-obvious things:

- **Root Directory** in the Vercel project must be set to `code/portfolio` — the Next app isn't at the repo root.
- **`RESEND_API_KEY`** must be added as an environment variable for the contact form to work in production.

See [CONTEXT.md](./CONTEXT.md) for the full project brief and decisions log.

---

Built by Ahmed Alqershi.
