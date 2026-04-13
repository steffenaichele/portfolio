# Tomorrow's Checklist

Quick reference for completing the automation setup.

## ☑️ Must Do (5-10 minutes)

### 1. Set VERCEL_TOKEN Secret
```bash
# Get token from: https://vercel.com/account/tokens
echo "YOUR_TOKEN" | gh secret set VERCEL_TOKEN -R steffenaichele/portfolio

# Verify all secrets are set:
gh secret list -R steffenaichele/portfolio
```

**Expected**: 4 secrets (NEXT_PUBLIC_EMAIL, VERCEL_ORG_ID, VERCEL_PROJECT_ID, VERCEL_TOKEN)

---

### 2. Enable GitHub Actions Permissions
1. Go to: https://github.com/steffenaichele/portfolio/settings/actions
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Click "Save"

---

### 3. Restart Claude Code & Test Linear
1. **Quit Claude Code completely** (Cmd+Q on Mac)
2. **Reopen Claude Code**
3. **Test Linear**: Type `"Show me all my Linear issues"`
4. **Create a test issue**: `"Create a Linear issue: Test MCP integration"`

---

### 4. Test GitHub Actions
```bash
# Create test PR to verify workflows
git checkout develop
git checkout -b test/github-actions
echo "# Test" >> README.md
git add README.md
git commit -m "test: verify GitHub Actions workflows"
git push -u origin test/github-actions
gh pr create --base develop --title "Test: GitHub Actions" --body "Testing automated workflows"
```

**Expected**:
- ✅ Build & type check passes
- ✅ Accessibility checklist comment appears
- ✅ Vercel preview deployment succeeds
- ✅ Preview URL comment appears

---

## 🎯 High Priority Automations (45 minutes total)

### 5. Lighthouse CI (15 min)
```bash
# Create workflow file
cat > .github/workflows/lighthouse.yml << 'EOF'
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            https://portfolio-red-eight-19.vercel.app
          uploadArtifacts: true
          temporaryPublicStorage: true
EOF

git add .github/workflows/lighthouse.yml
git commit -m "feat: add Lighthouse CI workflow"
git push
```

---

### 6. Bundle Size Monitoring (20 min)
```bash
# Install size-limit
npm install --save-dev @size-limit/preset-next

# Add to package.json
npm pkg set 'size-limit[0].path'='.next/static/**/*.js'
npm pkg set 'size-limit[0].limit'='300 KB'

# Create workflow
cat > .github/workflows/bundle-size.yml << 'EOF'
name: Bundle Size
on: [pull_request]
jobs:
  size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: andresz1/size-limit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
EOF

git add package.json .github/workflows/bundle-size.yml
git commit -m "feat: add bundle size monitoring"
git push
```

---

### 7. Image Optimization (10 min)
```bash
# Create workflow
cat > .github/workflows/optimize-images.yml << 'EOF'
name: Optimize Images
on:
  push:
    paths:
      - 'public/**/*.{jpg,jpeg,png,webp}'
jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: calibreapp/image-actions@main
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
          jpegQuality: 80
          pngQuality: 80
          webpQuality: 80
EOF

git add .github/workflows/optimize-images.yml
git commit -m "feat: add automatic image optimization"
git push
```

---

## 📦 Medium Priority (30 minutes)

### 8. Automated Changelogs (25 min)
```bash
# Install conventional changelog
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky

# Create commitlint config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > .commitlintrc.js

# Add release-please workflow
cat > .github/workflows/release-please.yml << 'EOF'
name: Release Please
on:
  push:
    branches: [main]
jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          release-type: node
EOF

git add .
git commit -m "feat: add automated changelog generation"
git push
```

---

### 9. Enable Dependabot (5 min)
1. Go to: https://github.com/steffenaichele/portfolio/settings/security_analysis
2. Enable "Dependabot alerts"
3. Enable "Dependabot security updates"
4. Click "Enable Dependabot version updates"
5. It will create `.github/dependabot.yml` automatically

---

## ✅ Completion Checklist

- [ ] VERCEL_TOKEN secret set
- [ ] GitHub Actions permissions enabled
- [ ] Claude Code restarted
- [ ] Linear MCP tested and working
- [ ] Test PR created and all checks passing
- [ ] Lighthouse CI added
- [ ] Bundle size monitoring added
- [ ] Image optimization added
- [ ] Automated changelogs configured
- [ ] Dependabot enabled

---

## 📊 Success Metrics

After completion, you should have:
- **4/4 GitHub secrets configured**
- **6 GitHub Actions workflows** (quality-check, release, dependency-update, lighthouse, bundle-size, optimize-images)
- **Linear MCP working** (can create/view issues from Claude Code)
- **Automated PR checks** (build, type check, accessibility, lighthouse, bundle size)
- **Automated deployments** (preview on PR, production on tag)
- **Automated maintenance** (dependency updates, image optimization, changelogs)

---

## 🆘 Troubleshooting

**GitHub Actions not running**:
- Check workflow permissions are set to "Read and write"
- Verify all secrets are set: `gh secret list`
- Check Actions tab for error messages

**Linear MCP not working**:
- Verify config.json syntax is valid
- Check API key is correct (starts with `lin_api_`)
- Restart Claude Code completely

**Lighthouse CI failing**:
- Wait for Vercel preview deployment first
- Update URL in workflow to match your preview URL pattern
- Check Lighthouse score requirements aren't too strict

---

## 📚 References

- GitHub Actions Setup: `.github/GITHUB_ACTIONS_SETUP.md`
- Linear MCP Setup: `.github/LINEAR_SETUP.md`
- All Automations: `.github/AUTOMATION_RECOMMENDATIONS.md`
- MCP Servers Guide: `.github/MCP_SERVERS.md`

---

**Estimated Total Time**: 1.5 - 2 hours
**Priority**: High priority items first, then medium
**Best Time**: Morning when you're fresh

Good luck! 🚀
