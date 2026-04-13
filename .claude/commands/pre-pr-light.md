# Pre-PR Check (Light) - Develop Branch

Run a quick UI quality check before merging to develop.

## Scope

Check all modified/staged files for:
- Critical accessibility issues (icon labels, keyboard nav, focus states)
- Animation performance (transition-all, compositor properties)
- Common anti-patterns (outline-none, missing labels)

## Steps

1. Get list of changed files:
   ```bash
   git diff --name-only --cached --diff-filter=ACM | grep -E '\.(tsx?|jsx?)$'
   ```

   If no staged files, use:
   ```bash
   git diff --name-only HEAD | grep -E '\.(tsx?|jsx?)$'
   ```

2. For each changed file, check against:
   - **Accessibility (Critical only)**:
     - Icon-only buttons have `aria-label`
     - Form inputs have labels
     - Interactive elements use semantic HTML (`<button>`, `<a>`)
     - No `outline-none` without replacement

   - **Performance (Critical only)**:
     - No `transition-all` (use explicit properties)
     - Animations use `transform`/`opacity` only
     - No layout reads in render

3. Output in terse format:
   ```
   ## Quick Check Results

   src/Button.tsx:42 - icon button missing aria-label
   src/Modal.tsx:55 - transition-all → transition-[opacity,transform]

   ✓ 3 files checked
   ✗ 2 issues found
   ```

4. If issues found, ask: "Fix these issues before PR?"

## Time Budget

Target: < 30 seconds for typical changeset (5-10 files)
