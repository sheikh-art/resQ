#!/bin/bash
# ResQ Android APK Build Script
# Run this on your local machine after downloading the project

echo "=== ResQ Android Build ==="
echo ""

echo "Step 1: Installing dependencies..."
npm install

echo ""
echo "Step 2: Building web app..."
npm run build

echo ""
echo "Step 3: Syncing with Android..."
npx cap sync android

echo ""
echo "Step 4: Opening Android Studio..."
npx cap open android

echo ""
echo "=== Android Studio mein: Build > Build Bundle(s)/APK(s) > Build APK(s) ==="
