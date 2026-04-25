# Workflow Rules

## 🚨 CRITICAL: Never Work Directly on Main Branch

**Main branch triggers automatic production deployment on every commit.**

### Branch Strategy

```
feature/xyz → develop → main (production)
```

### Rules:

1. **NEVER commit directly to main**
   - Every commit to main triggers production deployment
   - Main is only updated via PR from develop

2. **Always work on feature branches**
   - Create from develop: `git checkout -b feature/name`
   - Or use develop directly for small changes

3. **Develop is the default working branch**
   - All development happens on develop or feature branches
   - Test and verify on develop before merging to main

4. **Main is production-only**
   - Only merge develop → main when ready to deploy
   - Always run `/pre-pr-full` before merging to main
   - Create version tag after merging to main

---

## Typical Workflow

### Daily Development

```bash
# Start on develop
git checkout develop
git pull origin develop

# Create feature branch (optional for small changes)
git checkout -b feature/new-feature

# Make changes, commit
git add .
git commit -m "feat: add new feature"

# Push to feature branch
git push -u origin feature/new-feature

# Create PR to develop
gh pr create --base develop --title "feat: add new feature"

# After PR approved, merge to develop
# Develop deploys to Vercel preview automatically
```

### Release to Production

```bash
# On develop, ensure everything is tested
git checkout develop
git pull origin develop

# Run full pre-PR check
# (Quality check, accessibility, performance)

# Merge to main (triggers production deployment)
git checkout main
git pull origin main
git merge develop

# Create version tag
git tag -a v0.x.x -m "Release v0.x.x"
git push origin main --tags

# Production deploys automatically
```

---

## Branch Purposes

| Branch | Purpose | Deployment | Protection |
|--------|---------|------------|------------|
| **main** | Production | ✅ Auto (Vercel) | Protected, PR only |
| **develop** | Development | ✅ Preview (Vercel) | Default branch |
| **feature/** | New features | ❌ Manual testing | Merge to develop |
| **fix/** | Bug fixes | ❌ Manual testing | Merge to develop |
| **test/** | Experiments | ❌ Manual testing | Delete after |

---

## GitHub Actions Behavior

### On Pull Request (to develop or main):
- ✅ Type checking
- ✅ Build verification
- ✅ Accessibility checklist
- ✅ Vercel preview deployment
- ✅ Bundle size check (when configured)
- ✅ Lighthouse CI (when configured)

### On Push to Main:
- ✅ Production deployment (Vercel)
- ✅ Release creation (on version tags)

### Weekly (Mondays):
- ✅ Dependency update check
- ✅ Create GitHub issue if updates available

---

## Important Notes

### Before Merging to Main:
1. Run full quality check
2. Test on Vercel preview (from develop)
3. Review all changes since last release
4. Update version number
5. Prepare release notes

### Emergency Hotfix:
```bash
# If production is broken, hotfix directly
git checkout main
git checkout -b hotfix/critical-bug
# Fix the bug
git commit -m "hotfix: fix critical bug"
git push -u origin hotfix/critical-bug
gh pr create --base main --title "hotfix: critical bug"
# After approval, merge and tag
```

---

## Protected Branches Setup (Recommended)

To enforce this workflow in GitHub:

1. Go to: https://github.com/steffenaichele/portfolio/settings/branches
2. Add branch protection rule for `main`:
   - ✅ Require pull request before merging
   - ✅ Require approvals (1)
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Do not allow bypassing the above settings

---

## Quick Reference

**Starting work:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
```

**Committing:**
```bash
git add .
git commit -m "type: description"
git push -u origin feature/my-feature
```

**Create PR:**
```bash
gh pr create --base develop --title "feat: my feature"
```

**Release to production:**
```bash
git checkout main
git merge develop
git tag -a v0.x.x -m "Release v0.x.x"
git push origin main --tags
```

**Remember**: Main = Production. Never work directly on main!
