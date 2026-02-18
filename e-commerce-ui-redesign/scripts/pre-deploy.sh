#!/bin/bash

# Pre-deployment verification script
# Ensures all checks pass before deploying
# Run with: bash scripts/pre-deploy.sh

set -e

echo "🚀 Pre-Deployment Verification"
echo "================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

check_command() {
  local name=$1
  local command=$2
  
  echo -n "Checking $name... "
  if eval "$command" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC}"
    ((FAILED++))
  fi
}

echo ""
echo "📋 Environment Checks"
echo "---"

# Check Node.js version
check_command "Node.js version" "node --version | grep -E 'v(20|21|22)'"

# Check pnpm
check_command "pnpm installed" "pnpm --version"

# Check .env.local exists
echo -n "Checking .env.local... "
if [ -f ".env.local" ]; then
  echo -e "${GREEN}✓${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗${NC}"
  echo "  Create .env.local from .env.example"
  ((FAILED++))
fi

echo ""
echo "🔍 Code Quality Checks"
echo "---"

# TypeScript type checking
echo -n "Running TypeScript type check... "
if pnpm type-check > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗${NC}"
  echo "  Run: pnpm type-check"
  ((FAILED++))
fi

# ESLint
echo -n "Running ESLint... "
if pnpm lint > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗${NC}"
  echo "  Run: pnpm lint"
  ((FAILED++))
fi

echo ""
echo "🔨 Build Checks"
echo "---"

# Build the project
echo -n "Building project... "
if pnpm build > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗${NC}"
  echo "  Run: pnpm build (see errors above)"
  ((FAILED++))
fi

echo ""
echo "🔐 Security Checks"
echo "---"

# Check for hardcoded secrets
echo -n "Checking for hardcoded secrets... "
if ! grep -r "password\|secret\|token\|key" --include="*.ts" --include="*.tsx" --include="*.js" app/ components/ lib/ 2>/dev/null | grep -v "// " | grep -v "placeholder" > /dev/null; then
  echo -e "${GREEN}✓${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠${NC}"
  echo "  Warning: Found potential secrets in code"
  echo "  Ensure they are in .env.local, not in git"
fi

echo ""
echo "📊 Summary"
echo "---"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"

if [ $FAILED -eq 0 ]; then
  echo ""
  echo -e "${GREEN}✅ All checks passed! Ready to deploy.${NC}"
  echo ""
  echo "Next steps:"
  echo "  1. Review changes: git status"
  echo "  2. Push to GitHub: git push origin main"
  echo "  3. Vercel will automatically deploy"
  echo "  4. Monitor deployment: https://vercel.com/dashboard"
  echo ""
  exit 0
else
  echo ""
  echo -e "${RED}❌ Some checks failed. Fix issues before deploying.${NC}"
  echo ""
  exit 1
fi
