#!/bin/bash

echo "🧪 Testing build locally..."
echo ""

echo "1️⃣ Cleaning old builds..."
rm -rf dist node_modules package-lock.json
echo "✅ Cleaned"
echo ""

echo "2️⃣ Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

echo "3️⃣ Building project..."
npm run build
echo ""

echo "4️⃣ Checking dist folder..."
if [ -d "dist" ]; then
    echo "✅ dist folder exists!"
    echo ""
    echo "📂 Contents of dist:"
    ls -lah dist/
    echo ""
    echo "📦 Size of dist:"
    du -sh dist/
    echo ""
    echo "✅ BUILD SUCCESS!"
else
    echo "❌ dist folder NOT found!"
    echo "❌ BUILD FAILED!"
    exit 1
fi
