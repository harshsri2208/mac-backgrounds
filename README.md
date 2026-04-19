# 🎨 LiveToon: Animated Mac Wallpapers

A sleek, procedural cartoon background generator built with React. Design endless, perfectly looping animated scenes and seamlessly set them as your true macOS desktop wallpaper using our included standalone offline Mac App!

## ✨ Features

- **Standalone Mac App:** You don't need to run a web server! We bundle the entire React application directly into a native `.app` using Swift.
- **Procedural Generation:** Beautifully looping animations powered entirely by code (no heavy video files or GIFs).
- **Multiple Themes:** Fluffy Skies, Starry Nights, Lava Blobs, and Toon Matrix.
- **Deep Customization:** Tweak animation direction, speed, complexity, color hue, and saturation.
- **Ambient Audio:** Integrated procedural sound engine with winds, bubbling water, deep space drones, and crackling fire.
- **macOS-Native Feel:** A frosted-glass, three-pane interface designed to feel like a native Mac utility.

## 🚀 Building the Native Mac App

This app is built using **React 19**, **Vite**, **Tailwind CSS v4**, and **Motion**, all wrapped cleanly into a Swift `WKWebView`. 

To build your offline Mac App, simply run the build script. (Macs come with the Swift compiler built-in, so you don't even need Xcode!)

```bash
git clone https://github.com/yourusername/livetoon-mac-wallpapers.git
cd livetoon-mac-wallpapers/mac-wrapper
chmod +x build.sh
./build.sh
```

## 🖥️ Using LiveToon

1. After running `./build.sh`, you will find a generated **LiveToon.app** in the `mac-wrapper` folder.
2. Double click the app. A Studio window will open.
3. Configure your perfect scene and sound. 
4. Click **Set as Wallpaper**. The app will magically spawn a background window beneath your desktop icons.
5. The application runs quietly in the top menu bar (look for the 🎨 icon).
6. Your wallpaper persists! The next time you open the app, it will remember and automatically apply your desktop theme.

## 🛠️ Tech Stack

- **React / Vite / Tailwind** - UI & Build framework
- **HashRouter** - Local offline routing logic
- **Motion (Framer Motion)** - Canvas element animations
- **Web Audio API** - Procedural ambient sound synthesis
- **Swift / AppKit** - macOS Desktop Level window wrapper + API message bus

## 📄 License

MIT
