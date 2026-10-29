# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Steffen Aichele (UX/UI Designer and Web Developer) built with Next.js 16, React 19 and SCSS Modules. Two routes: `/` (intro + CV) and `/work` (impressions feed). The imprint is a modal, not a route.

Launch scope is **English only**. All content is static — no CMS or database.

Package manager is **pnpm** (`pnpm build` also runs the TypeScript check).

## Architecture Overview

### Content Model

**Translatable UI text and structured content are separate concerns.**

- `messages/en.json` holds **only UI chrome**: headings, labels, aria-labels, meta titles/descriptions, button text.
- `src/app/data/` holds **structured content**, typed, with English strings inline: CV entries, impressions (`impressions.ts`), case studies (one file per study in `caseStudies/`, registered in `caseStudies/index.ts`).

Consequence: adding or editing content does not touch `messages/`, and a message file never grows arrays of domain objects.

Adding a work impression:
1. Add the image to `public/impressions/`.
2. Add an entry to `src/app/data/impressions.ts`.
3. Add a composition in `src/app/work/items/` and render it from `src/app/work/page.tsx`.

`work/items/*` are deliberately individual — each impression composes and styles itself via the `ImpressionCard` compound slots. The shell carries only what is shared (card surface, hover, zoom behaviour, a11y wiring); `aspect` on the impression entry describes the format, while the actual layout lives in each composition's own SCSS module.

### i18n
- **EN-only at launch.** `locales = ["en"]`, `DEFAULT_LOCALE = "en"` in `src/i18n/config.ts`.
- No locale routes. `src/i18n/request.ts` resolves the locale per request: `NEXT_LOCALE` cookie → default.
- **Bringing DE back post-launch:** add `"de"` to `locales` in `src/i18n/config.ts`, re-add Accept-Language negotiation to `request.ts` (dropped while EN-only, since it could only ever return `"en"`), re-add the DE entry to the `languages` array in `LanguageToggle`, mount `<LanguageToggle />` in the Footer, and add `messages/de.json`.
- `LanguageToggle` and `useLocale` are kept but currently unmounted — do not delete them.

## Design System & Styling

### Global SCSS partials (`src/app/styles/`)
`globals.scss` pulls in the partials; `preflight.css` is the reset. Partials:

- `_colors.scss` — raw palette
- `_tokens.scss` — semantic tokens (`--color-bg`, `--color-text-primary/secondary/tertiary`, item/button/CV/modal/toast tokens)
- `_typography.scss` — `--font-sans`, Areal axis vars, and the `.text-heading` / `.text-body` text styles (literal values, no scale tokens)
- `_motion.scss` — durations and easings, named by purpose
- `_radius.scss`, `_shadow.scss`, `_breakpoints.scss`
- `_modal.scss` — shared `.t-modal` open/close transitions for `<dialog>` (`@starting-style` + `transition-behavior: allow-discrete`)

Component-specific styling goes in the component's own `.module.scss`. Only genuinely shared definitions belong in a global partial.

### Motion
There is **no animation library** (no Framer Motion / `motion` package). Animation is CSS-first:

- Durations and easings are tokens named by **purpose**, not tempo: `--duration-state` (150ms), `--duration-move` (300ms), `--duration-panel` (800ms); `--easing-ui`, `--easing-modal`, `--easing-emphasized`. New cases continue the pattern (`--duration-<purpose>`).
- Components that need a duration in JS **read the CSS custom property** via `getComputedStyle` instead of duplicating the value as a constant (see `CVSection`, `ToastNotification`).
- `src/app/lib/motion.ts` holds the hand-rolled FLIP maths (`readInlineBounds`, `computeFlipTransform`) and `prefersReducedMotion()` — CSS `@media (prefers-reduced-motion)` cannot reach inline styles, so JS paths query it themselves.
- Animate only compositor properties (`transform`, `opacity`, `background-color`); set geometry instantly and apply an inverse transform (FLIP).
- Modals animate purely in CSS: `<dialog>` toggles `[open]`, and `@starting-style` + `transition-behavior: allow-discrete` carry the enter/exit transitions. No class-name juggling in JS.

### Interaction Patterns
- **Selection pill** (`SegmentedControl`): a persistent pill marks the active segment and slides on change via FLIP. Used by the CV tabs and `LanguageToggle`.
- **Zoom modal** (`useZoomModal`): thin wrapper over `<dialog>.showModal()`. The platform provides Escape, the focus trap, focus return to the trigger, background inertness and top-layer placement; the hook adds only the body scroll lock and the state backing `aria-expanded`. `ImpressionCard` and `ImprintModal` both wire it up.

### Typography
- **ABC Areal** (self-hosted variable font, `src/fonts/ABCArealSuperfamilyVariable.woff2`): axes `wght` 400–700, `slnt`, `MONO`, `DRKM`. Loaded in `layout.tsx` as `--areal`; the custom axes are driven by `--font-axis-mono` / `--font-axis-darkmode`.
- **Text styles:** global classes `.text-heading` and `.text-body` in `_typography.scss`, with literal values — no size/line-height/letter-spacing scale tokens. Components apply the class in JSX (`className="text-heading"`); add a new style only when a second use appears.
- `opengraph-image.tsx` (generates the social share image) loads `src/fonts/ABCAreal-Regular.woff` on purpose — satori (`next/og`) cannot read woff2 or variable fonts. It is the variable woff2 instanced at wght 400 with fontTools (`instancer`); regenerate it if the font file changes.

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
- Modals (ImpressionCard zoom, ImprintModal): focus trap, Escape closes, focus returns to trigger, modal semantics — all native to `<dialog>.showModal()`; `useZoomModal` adds the body scroll lock
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
