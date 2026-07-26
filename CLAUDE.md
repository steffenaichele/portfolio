# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Steffen Aichele (UX/UI Designer and Web Developer) built with Next.js 16, React 19 and SCSS Modules. Two routes: `/` (intro + CV) and `/work` (impressions feed). The imprint is a modal, not a route.

Launch scope is **English only**. All content is static — no CMS or database.

## Development Commands

```bash
pnpm dev      # Development server (http://localhost:3000)
pnpm build    # Production build (also runs the TypeScript check)
pnpm start    # Production server
pnpm lint     # ESLint
```

Package manager is **pnpm**.

## Architecture Overview

### Tech Stack
- **Next.js 16.2.10** with App Router (Server Components by default), Turbopack
- **React 19.2** with React Compiler enabled (`reactCompiler: true` in next.config.ts)
- **TypeScript** strict mode
- **SCSS Modules** (`sass`) — no Tailwind, no utility framework
- **next-intl** for i18n (cookie + Accept-Language negotiation, no locale routes)
- **@remixicon/react** for icons, **react-progressive-blur** for blur overlays
- **Vercel** for deployment, analytics, speed insights

### Directory Structure

```
src/
├── app/
│   ├── components/            # One folder per component: <Name>/<Name>.tsx + <Name>.module.scss
│   │   ├── Button/            # Variants + sizes, external links, clipboard
│   │   ├── CVItem/            # Single CV entry (roles, duration, org link)
│   │   ├── CVSection/         # Experience/Education tabs with cross-fading panels
│   │   ├── Footer/            # Meta + ImprintModal
│   │   ├── Header/            # Logo + floating Nav
│   │   ├── ImpressionCard/    # Compound card shell (Header/Media/Zoom slots) + zoom modal
│   │   ├── ImprintModal/      # Imprint as modal (no route)
│   │   ├── LanguageToggle/    # Currently unmounted — returns post-launch with DE
│   │   ├── Logo/
│   │   ├── Nav/               # Floating nav: back, GitHub, LinkedIn, email copy
│   │   ├── SegmentedControl/  # Toggle group with sliding selection pill (FLIP)
│   │   ├── ToastNotification/ # Toast provider + useToast
│   │   └── Icon.tsx           # Flat file — thin wrapper, has no styles of its own
│   ├── data/                  # Structured content, typed (see Content Model)
│   │   ├── cv.ts              # CVRole/CVEntry types + experience, education, skills
│   │   ├── caseStudies.ts     # CaseStudy type + three stubs (bodies are TODO)
│   │   └── impressions.ts     # Impression type + entries, getImpression()
│   ├── hooks/
│   │   ├── useLocale.ts       # Locale read + cookie-based switch
│   │   └── useZoomModal.ts    # Headless modal behaviour (focus trap, Escape, scroll lock)
│   ├── lib/
│   │   ├── clickable.tsx      # Shared link/button helpers, clipboard copy
│   │   └── motion.ts          # FLIP maths + prefers-reduced-motion probe
│   ├── styles/                # Global SCSS partials (see Design System)
│   ├── work/
│   │   ├── page.tsx           # Impressions feed — composes work/items/*
│   │   ├── items/             # One composition per impression, individually styled
│   │   └── snippets/          # Standalone demos (PillFollowDemo)
│   ├── layout.tsx             # Root layout, fonts, metadata, providers
│   ├── page.tsx               # Home: intro + CVSection
│   └── opengraph-image.tsx    # Generated OG image (next/og)
├── fonts/                     # PP Mori + PP Neue Montreal Mono
└── i18n/                      # next-intl config + request-time locale negotiation
messages/
└── en.json                    # UI chrome only — no structured content
```

### Content Model

**Translatable UI text and structured content are separate concerns.**

- `messages/en.json` holds **only UI chrome**: headings, labels, aria-labels, meta titles/descriptions, button text.
- `src/app/data/*.ts` holds **structured content**, typed, with English strings inline: CV entries, impressions, case studies.

Consequence: adding or editing content does not touch `messages/`, and a message file never grows arrays of domain objects.

Adding a work impression:
1. Add the image to `public/impressions/`.
2. Add an entry to `src/app/data/impressions.ts`.
3. Add a composition in `src/app/work/items/` and render it from `src/app/work/page.tsx`.

`work/items/*` are deliberately individual — each impression composes and styles itself via the `ImpressionCard` compound slots. The shell carries only what is shared (card surface, hover, zoom behaviour, a11y wiring); `aspect` on the impression entry describes the format, while the actual layout lives in each composition's own SCSS module.

### i18n
- **EN-only at launch.** `locales = ["en"]`, `DEFAULT_LOCALE = "en"` in `src/i18n/config.ts`.
- No locale routes. `src/i18n/request.ts` resolves the locale per request: `NEXT_LOCALE` cookie → Accept-Language → default.
- **Bringing DE back post-launch:** add `"de"` to `locales` in `src/i18n/config.ts`, restore the `de` branch in the Accept-Language negotiation, re-add the DE entry to the `languages` array in `LanguageToggle`, mount `<LanguageToggle />` in the Footer, and add `messages/de.json`.
- `LanguageToggle` and `useLocale` are kept but currently unmounted — do not delete them.

## Design System & Styling

### Global SCSS partials (`src/app/styles/`)
`globals.scss` pulls in the partials; `preflight.css` is the reset. Partials:

- `_colors.scss` — raw palette
- `_tokens.scss` — semantic tokens (`--color-bg`, `--color-text-primary/secondary/tertiary`, item/button/CV/modal/toast tokens)
- `_typography.scss` — `--font-sans` / `--font-mono`, size/line-height/letter-spacing scale
- `_motion.scss` — durations and easings, named by purpose
- `_radius.scss`, `_shadow.scss`, `_breakpoints.scss`
- `_content-grid.scss` — the `.content-grid` layout utility with `.breakout` / `.full-width` escape hatches
- `_modal.scss` — shared `.t-modal` / `.t-modal-backdrop` open/close transitions

Component-specific styling goes in the component's own `.module.scss`. Only genuinely shared definitions belong in a global partial.

### Motion
There is **no animation library** (no Framer Motion / `motion` package). Animation is CSS-first:

- Durations and easings are tokens named by **purpose**, not tempo: `--duration-state` (150ms), `--duration-move` (300ms), `--duration-panel` (800ms); `--easing-ui`, `--easing-modal`, `--easing-emphasized`. New cases continue the pattern (`--duration-<purpose>`).
- Components that need a duration in JS **read the CSS custom property** via `getComputedStyle` instead of duplicating the value as a constant (see `CVSection`, `useZoomModal`).
- `src/app/lib/motion.ts` holds the hand-rolled FLIP maths (`readInlineBounds`, `computeFlipTransform`) and `prefersReducedMotion()` — CSS `@media (prefers-reduced-motion)` cannot reach inline styles, so JS paths query it themselves.
- Animate only compositor properties (`transform`, `opacity`, `background-color`); set geometry instantly and apply an inverse transform (FLIP).
- Modals toggle the `is-open` / `is-closing` class-name literals directly in JS against the shared `_modal.scss` definitions.

### Interaction Patterns
- **Selection pill** (`SegmentedControl`): a persistent pill marks the active segment and slides on change via FLIP. Used by the CV tabs and `LanguageToggle`.
- **Zoom modal** (`useZoomModal`): headless behaviour — open/close timing from `--duration-state`, Escape to close, body scroll lock, focus trap, focus returned to the trigger. `ImpressionCard` and `ImprintModal` both wire it up.

### Typography
- **PP Mori** (sans, self-hosted): Regular 400 + Extrabold 800.
- **PP Neue Montreal Mono**: Regular 400 + Medium 500.
- Add weights in `layout.tsx` only when actually used.
- `opengraph-image.tsx` loads the **woff** variant on purpose — satori (`next/og`) cannot read woff2.

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
- Modals (ImpressionCard zoom, ImprintModal): focus trap, Escape closes, focus returns to trigger, `aria-modal`, body scroll lock — all provided by `useZoomModal`
- `aria-selected` / `aria-controls` on the CV tabs, `aria-expanded` on expandable UI
- `aria-label` on icon-only buttons; alt text on all images
- External links announce themselves via an sr-only suffix (`lib/clickable.tsx`)
- Visible focus states; skip-to-main link in layout

## Important Notes

- **Server Components default**; `"use client"` only for interactivity
- **Static content**: restart the dev server after changing data or message files
- **Env**: `NEXT_PUBLIC_EMAIL` (Vercel dashboard / `.env.local`)
- **SVG**: imported as React components via @svgr/webpack — configured for both Turbopack and webpack in next.config.ts
- `pnpm build` runs the TypeScript check, so it catches type errors in files nothing imports yet

## Documentation References

- `.claude/PRE-PR-CHECKS.md` — quality check documentation
- `docs/architecture.md`, `docs/ui-ux.md`, `docs/backlog.md`
- `.github/workflows/` — CI workflows
