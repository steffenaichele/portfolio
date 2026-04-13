#!/bin/bash

# GitHub Actions Secrets Setup Script
# This script helps you add the required secrets to your GitHub repository

echo "🔐 GitHub Actions Secrets Setup"
echo "================================"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "   Install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ You're not authenticated with GitHub CLI."
    echo "   Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is ready"
echo ""

# Get repository info
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "📦 Repository: $REPO"
echo ""

# Vercel credentials from .vercel/project.json
if [ -f .vercel/project.json ]; then
    VERCEL_PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*' | cut -d'"' -f4)
    VERCEL_ORG_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*' | cut -d'"' -f4)

    echo "📋 Found Vercel credentials:"
    echo "   Project ID: $VERCEL_PROJECT_ID"
    echo "   Org ID: $VERCEL_ORG_ID"
    echo ""
else
    echo "⚠️  .vercel/project.json not found. Run 'vercel link' first."
    exit 1
fi

# Add secrets
echo "🔑 Adding secrets to GitHub..."
echo ""

# 1. NEXT_PUBLIC_EMAIL
echo "1️⃣  Setting NEXT_PUBLIC_EMAIL..."
echo "hi@steffenaichele.xyz" | gh secret set NEXT_PUBLIC_EMAIL
echo "   ✅ NEXT_PUBLIC_EMAIL set"

# 2. VERCEL_ORG_ID
echo "2️⃣  Setting VERCEL_ORG_ID..."
echo "$VERCEL_ORG_ID" | gh secret set VERCEL_ORG_ID
echo "   ✅ VERCEL_ORG_ID set"

# 3. VERCEL_PROJECT_ID
echo "3️⃣  Setting VERCEL_PROJECT_ID..."
echo "$VERCEL_PROJECT_ID" | gh secret set VERCEL_PROJECT_ID
echo "   ✅ VERCEL_PROJECT_ID set"

# 4. VERCEL_TOKEN
echo "4️⃣  Setting VERCEL_TOKEN..."
echo ""
echo "   ⚠️  You need to create a Vercel token manually:"
echo "   1. Go to: https://vercel.com/account/tokens"
echo "   2. Click 'Create Token'"
echo "   3. Name it 'GitHub Actions'"
echo "   4. Copy the token"
echo ""
read -p "   Paste your Vercel token here: " VERCEL_TOKEN

if [ -n "$VERCEL_TOKEN" ]; then
    echo "$VERCEL_TOKEN" | gh secret set VERCEL_TOKEN
    echo "   ✅ VERCEL_TOKEN set"
else
    echo "   ⚠️  Skipped VERCEL_TOKEN (no token provided)"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Verify secrets: gh secret list"
echo "   2. Enable GitHub Actions write permissions:"
echo "      Settings → Actions → General → Workflow permissions"
echo "      → Select 'Read and write permissions'"
echo "   3. Test with a PR: gh pr create --base develop"
echo ""
