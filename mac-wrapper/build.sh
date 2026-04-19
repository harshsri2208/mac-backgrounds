#!/bin/bash

# Ensure we're in the right directory
cd "$(dirname "$0")"

APP_NAME="LiveToon"
APP_DIR="$APP_NAME.app/Contents/MacOS"

echo "🎨 Building $APP_NAME.app natively for macOS..."
mkdir -p "$APP_DIR"

# Compile Swift into an executable binary using the native compiler included with Macs
swiftc WallpaperEngine.swift -o "$APP_DIR/$APP_NAME"

echo "✅ Built successfully!"
echo ""
echo "To run your animated wallpaper:"
echo "1. Copy your generated URL from the web app."
echo "2. Run this command in terminal:"
echo "   open $APP_NAME.app --args \"<YOUR_URL>\""
