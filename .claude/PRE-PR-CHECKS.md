# Pre-PR Quality Checks

Automated UI quality checks for your portfolio project.

## Quick Start

```bash
# Before merging to develop (quick check)
/pre-pr-light

# Before merging to main (comprehensive check)
/pre-pr-full
```

## Two-Tier System

### 🟡 Light Check → Develop Branch

**When to use**: Before every merge to `develop`

**What it checks**:
- Critical accessibility issues only
- Animation performance anti-patterns
- Common UI mistakes

**Duration**: ~30 seconds

**Command**: `/pre-pr-light`

**Perfect for**:
- Feature branches
- Bug fixes
- Quick iterations
- Daily development workflow

---

### 🔴 Full Check → Main Branch

**When to use**: Before merging to `main` or releasing to production

**What it checks**:
- All 4 UI skills (baseline-ui, accessibility, metadata, motion-performance)
- Web Interface Guidelines (comprehensive)
- RAMS accessibility audit
- SEO metadata completeness
- Production readiness

**Duration**: 1-2 minutes

**Command**: `/pre-pr-full`

**Perfect for**:
- Production releases
- Main branch merges
- Before deploying
- Pre-release verification

---

## Workflow Integration

### Recommended Git Workflow

```bash
# Working on feature branch
git checkout -b feature/new-button

# ... make changes ...
git add .
git commit -m "Add new button component"

# Before creating PR to develop
/pre-pr-light
# Fix any issues found
# Push and create PR

# Later, before merging develop → main
git checkout develop
git pull
/pre-pr-full
# Fix any issues found
# Create PR to main
```

### Git Hooks (Optional)

Add to `.git/hooks/pre-push`:

```bash
#!/bin/bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ "$BRANCH" == "main" ]]; then
  echo "🔴 Running full pre-PR check for main branch..."
  # You'd need to integrate with Claude Code here
  exit 1
fi
```

---

## What Gets Checked

### Light Check (Critical Only)

✓ **Accessibility**
- Icon buttons have `aria-label`
- Form inputs have labels
- Semantic HTML usage
- Focus state exists

✓ **Performance**
- No `transition-all`
- Compositor properties only
- No layout reads in render

✓ **Anti-Patterns**
- No `outline-none` without replacement
- No `<div onClick>` without keyboard support

### Full Check (Everything)

Everything from Light Check, plus:

✓ **Baseline UI**
- Typography scale compliance
- Animation timing and easing
- Layout patterns
- Design token consistency
- Custom CSS justification

✓ **Accessibility (Complete)**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- ARIA usage
- Focus trapping
- Color contrast
- Alt text quality

✓ **Metadata & SEO**
- Open Graph tags
- Twitter cards
- Canonical URLs
- Theme color
- Favicons
- Page titles/descriptions
- Structured data

✓ **Motion Performance**
- Compositor properties
- Layout thrashing detection
- Scroll performance
- Will-change usage
- Blur/filter optimization
- Animation interruption

✓ **Web Interface Guidelines**
- Forms (autocomplete, types, validation)
- Typography (quotes, nbsp, tabular-nums)
- Images (dimensions, lazy loading)
- Touch interaction
- Dark mode
- Hydration safety

---

## Output Examples

### Light Check Output

```
## Quick Check Results

✓ src/app/components/Button.tsx - pass
✗ src/app/components/Modal.tsx
  Line 42: icon button missing aria-label
  Line 55: transition-all → transition-[opacity,transform]

✓ 2/3 files pass
⚠️  2 issues found

Fix these issues before PR?
```

### Full Check Output

```
═══════════════════════════════════════════════════
PRE-RELEASE AUDIT - Main Branch
═══════════════════════════════════════════════════

Files: 8 changed, 10 reviewed

BASELINE UI ..................... ✓ Pass
ACCESSIBILITY ................... ✓ Pass
METADATA ........................ ⚠️  1 issue
  src/app/layout.tsx:43 - missing og:image

MOTION PERFORMANCE .............. ✓ Pass
WEB INTERFACE GUIDELINES ........ ✓ Pass

═══════════════════════════════════════════════════
Score: 95/100
Status: ⚠️  REVIEW RECOMMENDED

1 moderate issue found
Fix now or proceed with merge?
```

---

## Customization

### Skip Checks

Add to commit message to skip light check:
```bash
git commit -m "fix: typo [skip-ui-check]"
```

### Check Specific Files

```bash
/pre-pr-light src/app/components/Button.tsx
```

### Force Full Check on Develop

```bash
/pre-pr-full
```

---

## Tips

1. **Run light check often** - It's fast, catch issues early
2. **Run full check before release** - Comprehensive safety net
3. **Fix issues immediately** - Easier than fixing later
4. **Use in CI/CD** - Automate with GitHub Actions (see below)

---

## GitHub Actions Integration (Optional)

Create `.github/workflows/ui-quality-check.yml`:

```yaml
name: UI Quality Check

on:
  pull_request:
    branches: [develop, main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Light Check (Develop)
        if: github.base_ref == 'develop'
        run: |
          echo "Running light UI check..."
          # Integrate with Claude Code API or run locally

      - name: Full Check (Main)
        if: github.base_ref == 'main'
        run: |
          echo "Running full UI check..."
          # Integrate with Claude Code API or run locally
```

---

## Troubleshooting

**Q: Command not found**
A: Make sure you're in Claude Code and the commands are in `.claude/commands/`

**Q: Takes too long**
A: Use `/pre-pr-light` for quick checks, `/pre-pr-full` only for main

**Q: Too many false positives**
A: Review the guidelines and adjust your code patterns

**Q: Want to add custom checks**
A: Edit `.claude/commands/pre-pr-*.md` files

---

## Skills Used

- `baseline-ui` - UI best practices
- `fixing-accessibility` - WCAG compliance
- `fixing-metadata` - SEO & social cards
- `fixing-motion-performance` - Animation performance
- `web-design-guidelines` - Vercel's Web Interface Guidelines
- `web-design-guidelines` (RAMS mode) - Accessibility audit

All skills from [ibelick/ui-skills](https://github.com/ibelick/ui-skills)
