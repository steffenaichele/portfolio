# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Steffen Aichele (UX/UI Designer and Full Stack Developer) built with Next.js 16, React 19, and Tailwind CSS 4. The site is German-language and showcases projects, career history, and contact information. All content is static (no CMS/database) stored in TypeScript files for type safety.

## Development Commands

```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint
```

## Architecture Overview

### Tech Stack
- **Next.js 16.2.1** with App Router (Server Components by default)
- **React 19.2.3** with React Compiler enabled for automatic optimization
- **TypeScript** with strict mode
- **Tailwind CSS 4.2.1** using new `@theme` directive
- **Vercel** for deployment, analytics, and speed insights
- **Node.js 20** required

### Directory Structure

```
src/app/
├── components/          # React components
│   ├── Header.tsx       # Fixed header with navigation (client component)
│   ├── Footer.tsx       # Site footer
│   ├── Button.tsx       # Button with variants (primary, cta) and clipboard support
│   ├── MobileNavigation.tsx  # Animated mobile menu (client component)
│   ├── ProjectCard.tsx  # Project preview cards
│   └── ...
├── data/               # Static data files (TypeScript)
│   ├── projects.ts     # Project portfolio data with types
│   └── cv.ts           # CV/resume data with types
├── projects/
│   ├── page.tsx        # Projects listing
│   └── [slug]/page.tsx # Dynamic project pages (uses generateStaticParams)
├── about-me/page.tsx
├── imprint/page.tsx
├── layout.tsx          # Root layout with Header, Footer, Analytics
├── page.tsx            # Home page (Hero + Projects + CV)
└── styles/globals.css  # Tailwind + custom theme tokens
```

### Routing Structure

- `/` - Home (Hero + Projects + CV)
- `/projects` - Projects listing
- `/projects/[slug]` - Individual project pages (inkcal, museum-exhibit, gewohnheiten)
- `/about-me` - About page
- `/imprint` - Legal imprint

## Key Architectural Patterns

### Next.js Patterns
- **Server Components** are the default (most components are RSC)
- **Client Components** only where needed: Button, MobileNavigation, Header
- **Dynamic Routes** with `generateStaticParams()` for static generation at build time
- **Async Route Parameters** following Next.js 15+ pattern: `const { slug } = await params`
- **Static Generation** for all pages (no SSR or ISR currently)

### Data Management
- All content lives in TypeScript files under `/src/app/data/`
- Strongly typed with exported interfaces: `Project`, `CVEntry`, `CVRole`
- Utility functions: `getPublicProjects()`, `getProjectBySlug()`, `getYearRange()`
- No database or CMS - content is static at build time

### Component Patterns
- **Server Components** for data fetching and static content
- **Client Components** (`"use client"`) for:
  - Interactive UI (Button, MobileNavigation)
  - Browser APIs (clipboard, window events)
  - React hooks (useState, useEffect)
- **Async Server Components** for data loading where needed

## Design System & Styling

### Squircle UI System
This portfolio uses a unique **squircle** (superellipse) design system throughout:
- Powered by `@toolwind/corner-shape` plugin
- CSS variable `--radius-multiplier: 2` controls squircle vs normal radius
- Apply with `corner-squircle` utility class (e.g., `rounded-2xl corner-squircle`)
- Graceful fallback to normal border-radius in unsupported browsers
- Used on cards, buttons, images, and containers for iOS-style aesthetic

### Theme System (Tailwind 4 `@theme` directive)
All design tokens are defined in `src/app/styles/globals.css` using CSS custom properties:
- **Colors**: `--color-text-primary`, `--color-button-primary-bg`, etc.
- **Typography**: Custom font scale with responsive sizes (changes at 80rem breakpoint)
- **Spacing**: Consistent layout grid with `--padding`, `--whitespace`, `--gap` variables
- **Shadows**: Semantic shadow scale from `--shadow-sm` to `--shadow-2xl`
- **Button variants**: `primary` (blue) and `cta` (orange)
- **Badge variants**: Experience (orange) vs education (blue)

### Responsive Grid System
Custom 12-column grid with responsive behavior:
- **Mobile** (< 80rem): 4 columns with padding/whitespace
- **Desktop** (≥ 80rem): 12 equal columns
- Use `.layout-grid` class and span with `col-start-*` / `col-span-*`

### Typography
- **Font**: Instrument Sans (self-hosted, 5 weights: 400-700)
- **OpenType features**: Stylistic sets (ss01-ss12) enabled
- **Text wrapping**: `balance` for headings, `pretty` for paragraphs
- **Tabular numbers** for consistent number display
- Responsive font sizes defined in theme

## Git Workflow & Branching

**IMPORTANT**: Follow strict Git Flow branching strategy:

```
feature/* → develop → main (production)
```

### Branch Rules
- **main**: Production branch, protected, auto-deploys to Vercel on push
- **develop**: Default working branch, preview deployments on push
- **feature/***: Feature branches merge to develop via PR
- **NEVER work directly on main** - all changes go through develop first

### Recommended Workflow
```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "feat: your change description"

# 4. Run pre-PR checks (see Quality Checks section)
/pre-pr-light

# 5. Push and create PR to develop
git push origin feature/your-feature-name
gh pr create --base develop

# 6. After merge to develop, test on preview deployment

# 7. Before production release (develop → main):
git checkout develop
/pre-pr-full  # Run comprehensive checks

# 8. Merge to main (triggers production deploy)
git checkout main
git merge develop
git push origin main

# 9. Tag release
git tag -a v0.x.x -m "Release v0.x.x"
git push origin --tags  # Triggers release workflow
```

## Quality Checks & Testing

### Pre-PR Checks (Claude Code Commands)
Run these checks before creating pull requests:

**`/pre-pr-light`** (30 seconds)
- Quick accessibility scan
- Animation performance check
- Common UI anti-patterns
- Use before merging to **develop**

**`/pre-pr-full`** (1-2 minutes)
- Comprehensive UI audit (baseline-ui, accessibility, metadata, motion)
- Web Interface Guidelines compliance
- RAMS accessibility audit (WCAG 2.1 AA)
- Use before merging to **main/production**

### Other Useful Commands
- `/web-interface-guidelines <file>` - Check specific file against Vercel guidelines
- `/rams` - Run comprehensive accessibility and visual design review

### GitHub Actions Workflows

**1. Quality Check** (on PR to develop/main, push to develop/main)
- TypeScript type checking
- Next.js build verification
- Adds accessibility checklist comment to PRs
- Creates Vercel preview deployment
- Comments preview URL on PR

**2. Dependency Update** (weekly Mondays 9 AM UTC, or manual)
- Checks `npm outdated`
- Creates/updates GitHub issue with dependency update table
- Auto-labels with `dependencies`

**3. Release** (on version tag push `v*.*.*`)
- Creates GitHub Release with auto-generated changelog
- Deploys to Vercel production

## Accessibility Requirements

This project follows **WCAG 2.1 AA** standards:
- Semantic HTML structure required
- ARIA labels on icon buttons (`aria-label`, `aria-labelledby`)
- `aria-expanded`, `aria-controls` on expandable UI (mobile nav)
- Visible focus states (orange-300 outline)
- Keyboard navigation support (Escape closes menus, Tab navigation)
- Alt text on all images
- Skip to main content link in header

**Every PR triggers accessibility checklist** - review and address before merging.

## Performance Considerations

### Built-in Optimizations
- **React Compiler** enabled (`reactCompiler: true` in next.config.ts) - automatic memoization
- **Static Generation** via `generateStaticParams()` for project pages
- **Next.js Image** component (`next/image`) for automatic optimization
- **Font optimization** with `next/font/local` and preload
- **Vercel Speed Insights** and Analytics monitoring in production

### Animation Performance
- Avoid animating `width`, `height`, `top`, `left` - use `transform` instead
- Prefer `opacity` and `transform` for smooth 60fps animations
- Mobile nav uses `transform` and `opacity` for staggered entrance
- Button active state uses `scale(0.98)` transform

## External Integrations

### Vercel Platform
- **Deployment**: Automatic on push to main (production) and develop (preview)
- **Analytics**: Real user monitoring enabled via `@vercel/analytics`
- **Speed Insights**: Performance tracking via `@vercel/speed-insights`
- **Environment Variables**: Managed via Vercel dashboard (`.env.local` for local dev)

### Linear (Task Management)
- **MCP Server**: `@hatcloud/linear-mcp` installed
- **Setup guide**: See `.github/LINEAR_SETUP.md`
- Can create/update Linear issues directly from Claude Code

## Component Guidelines

### Button Component
```tsx
<Button
  variant="primary" | "cta"
  content="text" | "iconOnly" | "iconRight"
  href="..."           // Link button
  onClick={...}        // Regular button
  copyToClipboard="..." // Clipboard copy with toast
  aria-label="..."     // Required for iconOnly
>
  Button Text
</Button>
```

### Project Data Structure
```typescript
interface Project {
  public: boolean;      // Show in listings
  slug: string;         // URL slug for /projects/[slug]
  title: string;
  description: string;
  coverImage: string;   // Path relative to /public
  year: number;
}
```

### CV Data Structure
```typescript
interface CVEntry {
  organization: string;
  organizationShort: string;
  location: string;
  roles: CVRole[];      // Multiple roles per organization
  description?: string[];
}

interface CVRole {
  title: string;
  startMonth: number;   // 1-12
  startYear: number;
  endMonth?: number;    // Optional for current role
  endYear?: number;
}
```

## Common Tasks

### Adding a New Project
1. Add project data to `src/app/data/projects.ts`
2. Add project images to `public/images/`
3. Create project page at `src/app/projects/[slug]/page.tsx` (copy existing pattern)
4. Set `public: true` to show in listings
5. Project page will auto-generate at build time via `generateStaticParams()`

### Adding a New Page
1. Create directory under `src/app/` (e.g., `src/app/new-page/`)
2. Add `page.tsx` inside (Server Component by default)
3. Use `layout.tsx` pattern if page needs custom layout
4. Add route to header navigation in `src/app/components/Header.tsx`
5. Consider mobile navigation in `src/app/components/MobileNavigation.tsx`

### Modifying Theme/Styles
1. Edit `src/app/styles/globals.css`
2. Modify `@theme` variables for global changes
3. Colors use semantic naming (e.g., `--color-text-primary` not `--color-gray-900`)
4. Test in light/dark modes if applicable
5. Ensure squircle styling remains consistent with `corner-squircle` class

### Updating Dependencies
1. Check weekly dependency update issue (auto-created Mondays)
2. Test locally: `npm outdated` then `npm update`
3. For major updates, read changelogs and migration guides
4. Run build: `npm run build` to catch breaking changes
5. Test dev server: `npm run dev`
6. Run `/pre-pr-full` before merging

## Important Notes

- **Language**: All content is in German - maintain consistency
- **No Database**: Content is static TypeScript files - restart dev server after data changes
- **Type Safety**: Always export and use TypeScript interfaces for data structures
- **Server Components**: Default to Server Components, only add `"use client"` when necessary
- **Accessibility First**: Every interactive element needs proper ARIA labels and keyboard support
- **Squircle Styling**: Use `corner-squircle` class alongside `rounded-*` for consistent UI
- **Git Flow**: Never commit directly to main - always go through develop branch
- **Pre-PR Checks**: Run `/pre-pr-light` before develop PRs, `/pre-pr-full` before main PRs

## Documentation References

- `.github/WORKFLOW_RULES.md` - Detailed Git workflow and branch protection
- `.github/BRANCH_PROTECTION_GUIDE.md` - GitHub branch protection setup
- `.github/LINEAR_SETUP.md` - Linear MCP integration guide
- `.claude/PRE-PR-CHECKS.md` - Quality check documentation
- `.github/workflows/` - GitHub Actions workflows source
