#!/usr/bin/env node

/**
 * Build Analysis Script
 * 
 * Analyzes Next.js build output for bundle size and performance metrics.
 * Run with: ANALYZE=true pnpm build
 * 
 * Or manually: node scripts/build-analysis.js
 */

const fs = require('fs');
const path = require('path');

const buildDir = path.join(process.cwd(), '.next');
const analyzeDir = path.join(buildDir, 'analyze');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeDirectory(dir, prefix = '') {
  if (!fs.existsSync(dir)) {
    console.log('Build directory not found. Run: pnpm build');
    return;
  }

  const files = fs.readdirSync(dir);
  let totalSize = 0;

  console.log(`\n${prefix || 'Build Output Analysis'}`);
  console.log('='.repeat(60));

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const size = stat.size;
    totalSize += size;

    if (stat.isFile()) {
      const ext = path.extname(file);
      const sizeStr = formatBytes(size);
      console.log(`${file.padEnd(40)} ${sizeStr.padStart(12)}`);
    }
  });

  console.log('-'.repeat(60));
  console.log(`${'Total'.padEnd(40)} ${formatBytes(totalSize).padStart(12)}`);
  console.log('='.repeat(60));

  return totalSize;
}

function analyzeBuildOutput() {
  const buildInfo = path.join(buildDir, 'build-manifest.json');
  const staticDir = path.join(buildDir, 'static');
  const serverDir = path.join(buildDir, 'server');

  console.log('\n📊 Next.js Build Analysis\n');

  if (fs.existsSync(staticDir)) {
    console.log('\n📦 Static Assets:');
    console.log('-'.repeat(60));

    const staticFiles = fs.readdirSync(staticDir);
    staticFiles.forEach(category => {
      const categoryPath = path.join(staticDir, category);
      if (fs.statSync(categoryPath).isDirectory()) {
        console.log(`\n${category}/`);
        const categorySize = analyzeDirectory(categoryPath, `  ${category}`);
      }
    });
  }

  if (fs.existsSync(serverDir)) {
    console.log('\n\n⚙️  Server Files:');
    analyzeDirectory(serverDir);
  }

  console.log('\n\n✅ Build Analysis Complete\n');

  if (fs.existsSync(buildInfo)) {
    const manifest = JSON.parse(fs.readFileSync(buildInfo, 'utf8'));
    console.log('Build Statistics:');
    console.log(`- Pages: ${manifest.pages ? Object.keys(manifest.pages).length : 'N/A'}`);
    console.log(`- API Routes: ${manifest.apiRoutes ? Object.keys(manifest.apiRoutes).length : 'N/A'}`);
  }

  console.log('\n💡 Tips for optimization:');
  console.log('  • Use dynamic imports for large components');
  console.log('  • Enable ISR for frequently updated pages');
  console.log('  • Check for unused dependencies: pnpm list');
  console.log('  • Use Image component for image optimization');
  console.log('  • Monitor Core Web Vitals in Vercel Analytics\n');
}

// Run analysis
analyzeBuildOutput();
