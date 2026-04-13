# Quick Reference - Pre-PR Checks

## Commands

```bash
/pre-pr-light     # Quick check for develop branch (~30s)
/pre-pr-full      # Full check for main branch (~2min)
```

## When to Use

| Branch   | Command          | Checks                           | Duration |
|----------|------------------|----------------------------------|----------|
| develop  | `/pre-pr-light`  | Critical issues only             | ~30s     |
| main     | `/pre-pr-full`   | All skills + comprehensive audit | 1-2min   |

## What's Checked

### Light (Develop)
- ✓ Critical accessibility (aria-labels, semantic HTML)
- ✓ Animation performance (no transition-all)
- ✓ Common anti-patterns

### Full (Main)
- ✓ Everything from Light
- ✓ Complete accessibility audit (WCAG 2.1)
- ✓ Metadata & SEO (OG tags, favicons)
- ✓ Motion performance (compositor, layout thrashing)
- ✓ Web Interface Guidelines (comprehensive)

## Workflow

```bash
# 1. Before merging feature → develop
git checkout feature/my-feature
/pre-pr-light
# Fix issues, then create PR

# 2. Before merging develop → main
git checkout develop
/pre-pr-full
# Fix issues, then create PR to main
```

## Tips

- Run `/pre-pr-light` frequently (it's fast!)
- Run `/pre-pr-full` only before production releases
- Fix issues immediately - easier than later
- Check the full docs: `.claude/PRE-PR-CHECKS.md`
