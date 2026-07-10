# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Steffen Aichele (UX/UI Designer and Full Stack Developer) built with Next.js 16, React 19, and Tailwind CSS 4. The site is a **single page** with two in-page views ("home" and "work") switched via orchestrated transitions — no client-side routing beyond `/`. Content is bilingual (German default, English) via next-intl. All content is static — no CMS or database.

## Development Commands

```bash
pnpm dev      # Development server (http://localhost:3000)
pnpm build    # Production build
pnpm start    # Production server
pnpm lint     # ESLint
```

Package manager is **pnpm**.

## Architecture Overview

### Tech Stack
- **Next.js 16** with App Router (Server Components by default)
- **React 19** with React Compiler enabled
- **TypeScript** strict mode
- **Tailwind CSS 4** using the `@theme` directive
- **next-intl** for i18n (cookie + Accept-Language negotiation, no locale routes)
- **motion** (motion/react) — used only by CVItem; everything else animates via hand-rolled FLIP/CSS
- **Vercel** for deployment, analytics, speed insights

### Directory Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ViewProvider.tsx   # View state ("home"/"work") + orchestrated page transition phases
│   │   ├── MainView.tsx       # Renders active view panel
│   │   ├── Header.tsx         # Sticky header: logo + Home/Work ToggleButton
│   │   ├── Footer.tsx         # Links, email copy button, ImprintModal, LanguageToggle
│   │   ├── ActionWrapper.tsx  # Shared hover-pill effect for clickable children (FLIP)
│   │   ├── ToggleButton.tsx   # Segmented control with sliding selection pill (FLIP)
│   │   ├── Button.tsx         # Variants: filled (default), isLink, ghost; clipboard support
│   │   ├── CVSection.tsx      # Experience/Education tabs
│   │   ├── CVItem.tsx         # Expandable CV entry with staged motion choreography
│   │   ├── ImpressionCard.tsx # Work-grid card + zoom modal
│   │   ├── ImprintModal.tsx   # Imprint as modal (no route)
│   │   └── Icon.tsx, Logo.tsx, LanguageToggle.tsx
│   ├── data/
│   │   ├── content.ts         # Impression list (id, src, square, link)
│   │   └── cv.ts              # CV types (data lives in messages/*.json)
│   ├── hooks/useLocale.ts     # Locale read + cookie-based switch
│   ├── layout.tsx             # Root layout, fonts, metadata, providers
│   ├── page.tsx               # Single page: home + work panels into MainView
│   ├── opengraph-image.tsx    # Generated OG image (next/og)
│   └── styles/globals.css     # Tailwind @theme tokens + transition CSS
├── fonts/                     # PP Neue Montreal (only Book 400 + Medium 500 loaded)
└── i18n/                      # next-intl config + request-time locale negotiation
messages/
├── de.json                    # All copy incl. CV data and impression texts
└── en.json
```

### View Transition System (no routing)

- `ViewProvider` holds the active view and runs an interruptible phase sequence (`exit → hold → enter`) on view change, written to `body[data-phase]` / `body[data-view]`.
- Stagger CSS in `globals.css` (`--pt-dur` / `--pt-stagger`, synced with `DUR`/`STAGGER` constants in ViewProvider) animates `main [data-stagger-group] > *`.
- Body `max-width` transition (styled in layout.tsx) animates the shell between narrow (home) and full (work).

### i18n
- No locale routes. `src/i18n/request.ts` resolves locale per request: `NEXT_LOCALE` cookie → Accept-Language → default `de`.
- Language switch (`useLocale`) sets the cookie and calls `router.refresh()`.
- **All copy lives in `messages/{de,en}.json`** — including CV entries (`cv.experience`/`cv.education` arrays typed via `CVEntry`) and impression texts (`impressions.items[id]`).

### Data Management
- `content.ts` holds only non-translatable impression data (id, image, aspect, link); texts come from messages.
- Adding a work impression: add image to `public/impressions/`, entry to `content.ts`, and `items` entry in both message files.

## Design System & Styling

### Theme (Tailwind 4 `@theme` in globals.css)
- Semantic color tokens: `--color-bg`, `--color-segment-bg`, `--color-surface-bg`, `--color-text-primary/secondary/tertiary`, `--color-interactive-pill*`, button/CV tokens.
- Easing: `--ease-out`, `--ease-in-out`. Shadows: `--shadow`, `--shadow-soft`.

### Interaction Patterns
- **Hover pill** (`ActionWrapper`): single shared pill glides between clickable children via FLIP; children must stay transparent and unrounded (pill carries radius + active state). `data-pill-suppress` hides the pill during CV-item animations.
- **Selection pill** (`ToggleButton`): persistent pill marks the active segment, slides on change.
- Animate only compositor properties (`transform`, `opacity`, `background-color`); geometry set instantly + inverse transform (FLIP).

### Typography
- **PP Neue Montreal** (self-hosted). Only Book (400) and Medium (500) are loaded — add weights in `layout.tsx` only when actually used.

## Git Workflow & Branching

**IMPORTANT**: Strict Git Flow:

```
feature/* → develop → main (production)
```

- **main**: production, protected, auto-deploys to Vercel
- **develop**: default working branch, preview deployments
- **NEVER commit directly to main**
- Run `/pre-pr-light` before PRs to develop, `/pre-pr-full` before merging develop → main
- Releases: tag `v*.*.*` on main triggers the release workflow

## Accessibility Requirements

WCAG 2.1 AA:
- Modals (ImpressionCard, ImprintModal): focus trap, Escape closes, focus returns to trigger, `aria-modal`, body scroll lock
- `aria-expanded`/`aria-controls` on expandable UI (CVItem), `aria-selected` on tabs
- `aria-label` on icon-only buttons; alt text on all images
- Visible focus states (orange-300 outline); skip-to-main link in layout

## Important Notes

- **Bilingual content**: every copy change touches both `messages/de.json` and `messages/en.json`
- **Server Components default**; `"use client"` only for interactivity
- **Static content**: restart dev server after changing data/message files
- **Env**: `NEXT_PUBLIC_EMAIL` (Vercel dashboard / `.env.local`)
- **SVG**: imported as React components via @svgr/webpack (see next.config.ts)

## Documentation References

- `.claude/PRE-PR-CHECKS.md` — quality check documentation
- `.github/workflows/` — CI workflows
