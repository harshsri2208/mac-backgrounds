# 🎨 LiveToon: Animated Mac Wallpapers

A sleek, procedural cartoon background generator built with React. Design endless, perfectly looping animated scenes and seamlessly set them as your true macOS desktop wallpaper using our included lightweight native wrapper!

## ✨ Features

- **Procedural Generation:** Beautifully looping animations powered entirely by code (no heavy video files or GIFs).
- **Multiple Themes:** Fluffy Skies, Starry Nights, Lava Blobs, and Toon Matrix.
- **Deep Customization:** Tweak animation direction, speed, complexity, color hue, and saturation.
- **Ambient Audio:** Integrated procedural sound engine with winds, bubbling water, deep space drones, and crackling fire.
- **macOS-Native Feel:** A frosted-glass, three-pane interface designed to feel like a native Mac utility.
- **Native Mac Wrapper Included:** A standalone, tiny Swift app is included in the `./mac-wrapper` directory so you can run your wallpapers smoothly at the native OS desktop level!

## 🚀 Local Setup & Development

This app is built using **React 19**, **Vite**, **Tailwind CSS v4**, and **Motion**.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/livetoon-mac-wallpapers.git
   cd livetoon-mac-wallpapers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port provided by Vite).

## 🖥️ Setting as your Mac Desktop

macOS doesn't support live websites as wallpapers out of the box. To bridge this gap, we've included a tiny, native Mac wrapper specifically designed for this app.

1. Configure your perfect scene and sound using the LiveToon interface in your browser.
2. Click the **"Set as Wallpaper"** button in the bottom right to copy your configuration URL.
3. Open a new terminal and navigate to the native wrapper folder:
   ```bash
   cd mac-wrapper
   ```
4. Build the wrapper locally (requires no setup, Macs can compile Swift out of the box!):
   ```bash
   chmod +x build.sh
   ./build.sh
   ```
5. Launch the wallpaper using the URL you copied earlier:
   ```bash
   open LiveToon.app --args "PASTE_YOUR_COPIED_URL_HERE"
   ```

To quit the wallpaper at any time, click the 🎨 icon in your Mac menu bar and select **Quit**.

## 🛠️ Tech Stack

- **React** - UI Component Architecture
- **Vite** - Build Tooling & Local Server
- **Tailwind CSS** - Styling and layout
- **Motion (Framer Motion)** - Canvas element animations
- **Web Audio API** - Procedural ambient sound synthesis
- **Swift / AppKit** - macOS Desktop Level window wrapper

## 📄 License

MIT
