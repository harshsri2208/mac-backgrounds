#!/bin/bash
set -e

cd "$(dirname "$0")"

APP_NAME="LiveToon"
APP_DIR="$APP_NAME.app"
MACOS_DIR="$APP_DIR/Contents/MacOS"
RESOURCES_DIR="$APP_DIR/Contents/Resources"

echo "🎨 Building React web bundle..."
cd ..

# Ensure dependencies are installed before building
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
fi

npm run build
cd mac-wrapper

echo "🎨 Wrapping native macOS App..."
mkdir -p "$MACOS_DIR"
mkdir -p "$RESOURCES_DIR"

# Copy the completely built web app into the app resources
rm -rf "$RESOURCES_DIR/dist"
cp -R ../dist "$RESOURCES_DIR/dist"

# Add Info.plist to hide the app from the Dock, making it a pure Menu Bar App + Windows
cat <<EOF > "$APP_DIR/Contents/Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>$APP_NAME</string>
    <key>CFBundleIdentifier</key>
    <string>com.livetoon.mac</string>
    <key>CFBundleName</key>
    <string>$APP_NAME</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>LSUIElement</key>
    <true/>
</dict>
</plist>
EOF

# Compile Swift into an executable binary
swiftc WallpaperEngine.swift -o "$MACOS_DIR/$APP_NAME"

echo "✅ App bundled successfully."
echo "You can now double click LiveToon.app or easily open it via terminal:"
echo "open LiveToon.app"
