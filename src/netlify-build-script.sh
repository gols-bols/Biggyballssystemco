#!/bin/bash

echo "======================================"
echo "🚀 Starting Netlify Build"
echo "======================================"

echo ""
echo "📦 Node version:"
node --version

echo ""
echo "📦 NPM version:"
npm --version

echo ""
echo "📂 Current directory:"
pwd

echo ""
echo "📂 Files in current directory:"
ls -la

echo ""
echo "📥 Installing dependencies..."
npm install

echo ""
echo "📦 Installed packages:"
npm list --depth=0

echo ""
echo "🔨 Building project..."
npm run build

echo ""
echo "📂 Build output (dist directory):"
ls -la dist/ || echo "⚠️ dist directory not found!"

echo ""
echo "======================================"
echo "✅ Build Complete"
echo "======================================"
