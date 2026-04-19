# 🎨 LiveToon: Animated Mac Wallpapers

A sleek, procedural cartoon background generator built with React. Design endless, perfectly looping animated scenes and seamlessly set them as your true macOS desktop wallpaper.

## ✨ Features

- **Procedural Generation:** Beautifully looping animations powered entirely by code (no heavy video files or GIFs).
- **Multiple Themes:** Fluffy Skies, Starry Nights, Lava Blobs, and Toon Matrix.
- **Deep Customization:** Tweak animation direction, speed, complexity, color hue, and saturation.
- **Ambient Audio:** Integrated procedural sound engine with winds, bubbling water, deep space drones, and crackling fire.
- **macOS-Native Feel:** A frosted-glass, three-pane interface designed to feel like a native Mac utility.
- **Plash Integration:** One-click URL generation specially formatted to hide the UI and run natively on your desktop.

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

macOS doesn't support live websites as wallpapers out of the box. To bridge this gap, we use an incredible open-source tool called Plash.

1. Configure your perfect scene and sound using the LiveToon interface in your browser.
2. Click the **"Set as Wallpaper"** button in the bottom right. This copies a unique URL to your clipboard containing all your settings.
3. Download [Plash](https://sindresorhus.com/plash) (Free & Open Source).
4. Open Plash, click **"Add Website..."**, and paste your generated URL.
    * *Note: The copied URL includes a hidden `?plash=true` flag that completely removes the UI components, leaving only the pure animation.*
5. Enjoy your new living desktop!

## 🛠️ Tech Stack

- **React** - UI Component Architecture
- **Vite** - Build Tooling & Local Server
- **Tailwind CSS** - Styling and layout
- **Motion (Framer Motion)** - Canvas element animations
- **Web Audio API** - Procedural ambient sound synthesis

## 📄 License

MIT
