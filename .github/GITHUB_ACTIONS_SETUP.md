# GitHub Actions Setup Guide

This project uses GitHub Actions for automated quality checks, deployments, and maintenance.

## Required Secrets

Before the workflows can run, you need to add these secrets to your GitHub repository:

### 1. Navigate to Repository Settings
Go to: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

### 2. Add Required Secrets

#### NEXT_PUBLIC_EMAIL
- **Value**: `hi@steffenaichele.xyz`
- **Used by**: Build workflow

#### VERCEL_TOKEN
- **How to get**:
  1. Go to https://vercel.com/account/tokens
  2. Create new token with name "GitHub Actions"
  3. Copy the token value
- **Used by**: All deployment workflows

#### VERCEL_ORG_ID
- **How to get**: Run `vercel project ls` in terminal
- **Format**: Looks like `team_xxxxxxxxxxxxx` or `user_xxxxxxxxxxxxx`
- **Used by**: All deployment workflows

#### VERCEL_PROJECT_ID
- **How to get**: Run `vercel project ls` in terminal
- **Format**: Looks like `prj_xxxxxxxxxxxxx`
- **Used by**: All deployment workflows

## Workflows

### 1. Quality Check (`quality-check.yml`)
**Triggers**: On pull requests and pushes to develop/main

**Jobs**:
- ✓ Type checking with TypeScript
- ✓ Build verification
- ✓ Accessibility checklist comment on PRs
- ✓ Vercel preview deployment
- ✓ Preview URL comment on PRs

### 2. Release (`release.yml`)
**Triggers**: When pushing version tags (v*.*.*)

**Jobs**:
- ✓ Creates GitHub Release with changelog
- ✓ Deploys to Vercel production
- ✓ Generates release notes automatically

### 3. Dependency Update Check (`dependency-update.yml`)
**Triggers**: Weekly on Mondays at 9 AM UTC, or manually

**Jobs**:
- ✓ Checks for outdated packages
- ✓ Creates/updates GitHub issue with update list
- ✓ Provides update commands

## Testing the Workflows

### Test Quality Check
```bash
# Create a new branch and PR
git checkout -b test/github-actions
git push -u origin test/github-actions

# Create PR on GitHub
gh pr create --base develop --title "Test: GitHub Actions" --body "Testing automated workflows"
```

### Test Release Workflow
```bash
# Already set up! Next release:
git tag -a v0.3.0 -m "Release v0.3.0"
git push origin v0.3.0
```

### Test Dependency Check
```bash
# Manually trigger from GitHub:
# Go to Actions → Dependency Update Check → Run workflow
```

## Automation Features

### On Every Pull Request:
1. Builds your code and checks for errors
2. Runs TypeScript type checking
3. Creates Vercel preview deployment
4. Posts accessibility checklist as comment
5. Comments preview URL

### On Version Tag Push:
1. Creates GitHub release with changelog
2. Deploys to Vercel production
3. Links to deployment in release notes

### Weekly (Mondays):
1. Checks for package updates
2. Creates/updates issue with update list
3. Organizes updates by severity

## Monitoring

View workflow runs:
- https://github.com/steffenaichele/portfolio/actions

Check deployment status:
- https://vercel.com/steffen-aicheles-projects/portfolio

## Troubleshooting

**Workflow fails with "Resource not accessible by integration"**
- Ensure GitHub Actions has write permissions
- Go to `Settings` → `Actions` → `General` → `Workflow permissions`
- Select "Read and write permissions"

**Vercel deployment fails**
- Verify all Vercel secrets are correct
- Check NEXT_PUBLIC_EMAIL is set
- Review Vercel dashboard for errors

**Dependency check creates duplicate issues**
- This is expected - it updates existing issue if found
- Label: `dependencies` is used to identify the issue
