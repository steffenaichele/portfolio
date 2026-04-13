# Pre-PR Check (Full) - Main Branch

Run comprehensive UI quality audit before merging to main/production.

## Scope

Run all UI skills against changed files + critical shared files:
- All 4 ibelick UI skills (baseline-ui, fixing-accessibility, fixing-metadata, fixing-motion-performance)
- Web Interface Guidelines
- RAMS accessibility review (critical issues only)

## Steps

1. Get list of changed files:
   ```bash
   git diff --name-only $(git merge-base origin/main HEAD) HEAD | grep -E '\.(tsx?|jsx?)$'
   ```

2. Always include critical files:
   - `src/app/layout.tsx` (metadata, theme)
   - `src/app/styles/globals.css` (typography, animations)

3. Run all checks against files:

   **A. Baseline UI**
   - Typography (text-balance, text-pretty, tabular-nums)
   - Animation rules (duration, easing, compositor props)
   - Layout patterns (z-index scale, safe areas)
   - Design tokens (no custom values without reason)

   **B. Fixing Accessibility**
   - All priority levels (critical → low)
   - Keyboard navigation
   - Screen reader support
   - Focus management
   - ARIA attributes
   - Form validation

   **C. Fixing Metadata**
   - Open Graph tags
   - Twitter cards
   - Canonical URLs
   - Theme color
   - Favicons
   - Structured data (if applicable)

   **D. Fixing Motion Performance**
   - Compositor properties
   - Layout thrashing
   - Scroll performance
   - Will-change usage
   - Blur/filter optimization

   **E. Web Interface Guidelines**
   - All rules (accessibility, forms, animation, typography, etc.)

4. Output comprehensive report:
   ```
   ═══════════════════════════════════════════════════
   PRE-RELEASE AUDIT - Main Branch
   ═══════════════════════════════════════════════════

   Files Changed: 8
   Files Reviewed: 10 (8 changed + 2 critical)

   BASELINE UI
   ───────────
   src/Button.tsx:62 - transition-all → explicit properties
   ✓ 9 files pass

   ACCESSIBILITY
   ─────────────
   ✓ All files pass

   METADATA
   ────────
   src/app/layout.tsx:43 - missing Open Graph image
   ✗ 1 issue

   MOTION PERFORMANCE
   ──────────────────
   ✓ All files pass

   WEB INTERFACE GUIDELINES
   ─────────────────────────
   ✓ All files pass

   ═══════════════════════════════════════════════════
   SUMMARY
   ═══════════════════════════════════════════════════
   Critical:   0 issues
   Serious:    1 issue
   Moderate:   1 issue

   Status: ⚠️  REVIEW RECOMMENDED
   ```

5. If issues found:
   - **Critical/Serious**: Strongly recommend fixing before merge
   - **Moderate**: Optional but recommended
   - Ask: "Fix issues now or proceed with merge?"

## Time Budget

Target: 1-2 minutes for typical feature branch (10-20 files)

## Exit Codes

- 0: All checks pass
- 1: Critical issues found
- 2: Serious issues found
- 3: Moderate issues only
