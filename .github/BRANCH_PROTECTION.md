# Branch Protection Setup

To prevent accidental commits to main, set up branch protection rules.

## Setup Steps

1. **Go to Branch Protection Settings**:
   https://github.com/steffenaichele/portfolio/settings/branches

2. **Add Branch Protection Rule**:
   - Click "Add branch protection rule"
   - Branch name pattern: `main`

3. **Configure Protection Rules**:

   ### Required Settings:
   - ✅ **Require a pull request before merging**
     - Required number of approvals: 1
     - ✅ Dismiss stale pull request approvals when new commits are pushed
     - ✅ Require review from Code Owners (if you add CODEOWNERS file)

   - ✅ **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
     - Status checks required (add these after first PR):
       - `Build & Type Check`
       - `Accessibility Audit` (when added)
       - `Lighthouse CI` (when added)

   - ✅ **Require conversation resolution before merging**

   - ✅ **Do not allow bypassing the above settings**
     - Ensures even admins follow the workflow

   ### Optional Settings:
   - ⬜ Require signed commits (if you use GPG signing)
   - ⬜ Require linear history (enforces rebase/squash)
   - ⬜ Require deployments to succeed before merging

4. **Click "Create"** to save the protection rule

---

## What This Prevents

With branch protection enabled:

❌ **Cannot do**:
- `git push origin main` (direct push blocked)
- Force push to main
- Delete main branch
- Merge without PR approval

✅ **Must do**:
- Create pull request from develop to main
- Get PR approved (or self-approve if you're the only reviewer)
- Wait for CI checks to pass
- Merge via PR only

---

## Solo Developer Workflow

If you're working alone, you can still use branch protection with self-approval:

1. Set required approvals to 0, OR
2. Set approvals to 1 but allow PR creator to approve

This still prevents accidental direct pushes to main while allowing you to approve your own PRs.

---

## Testing Protection

After setup, try this to verify it's working:

```bash
# This should be BLOCKED
git checkout main
echo "test" >> README.md
git add README.md
git commit -m "test: verify protection"
git push origin main  # ❌ Should fail with protection error
```

Expected error:
```
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: error: Changes must be made through a pull request.
```

If you see this error, protection is working! ✅

---

## Current Workflow (With Protection)

```bash
# 1. Work on develop or feature branch
git checkout develop
git checkout -b feature/my-feature

# 2. Make changes and push
git add .
git commit -m "feat: my feature"
git push -u origin feature/my-feature

# 3. Create PR to develop
gh pr create --base develop

# 4. After testing on develop, create PR to main
git checkout develop
gh pr create --base main --title "Release v0.x.x"

# 5. Approve and merge PR (triggers production deployment)

# 6. Create version tag
git checkout main
git pull origin main
git tag -a v0.x.x -m "Release v0.x.x"
git push origin v0.x.x
```

---

## Recommended: Make Develop the Default Branch

1. Go to: https://github.com/steffenaichele/portfolio/settings
2. Under "Default branch"
3. Switch from `main` to `develop`
4. Click "Update"

**Benefits**:
- New PRs default to develop
- Clones default to develop
- Less chance of accidentally working on main

---

## Emergency: Disable Protection Temporarily

If you need to hotfix production urgently:

1. Go to branch protection settings
2. Uncheck "Do not allow bypassing"
3. Make your emergency commit
4. **Re-enable protection immediately**

**Better approach**: Use the hotfix workflow from WORKFLOW_RULES.md
