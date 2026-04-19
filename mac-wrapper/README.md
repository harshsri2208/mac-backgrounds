# 🎨 LiveToon macOS Native Wrapper

This is a super lightweight native macOS application written in Swift that acts as a dedicated engine for your animated wallpapers. It removes the need for 3rd-party apps!

### How it Works
It uses Apple's native `AppKit` to create a borderless window and pushes it to `kCGDesktopIconWindowLevel` - physically placing it between your desktop icons and your generic desktop background. Inside that window, it spins up a highly optimized `WKWebView` to render your LiveToon animations using minimal CPU/RAM.

### Setup & Usage
Since it uses raw Swift, you can compile it natively right from your Mac without needing heavy dependencies or an Xcode project!

1. Generate your amazing background in the web app and click **Set as Wallpaper** to copy the secure URL.
2. Open your terminal and navigate to this folder (`cd mac-wrapper`).
3. Run the build script to compile the App:
   ```bash
   chmod +x build.sh
   ./build.sh
   ```
4. Start the wallpaper by running the newly built App and passing your URL as an argument:
   ```bash
   open LiveToon.app --args "YOUR_COPIED_URL_HERE"
   ```

### How to Quit
Once running, you'll see a small 🎨 icon in your Mac's top menu bar. Click it and select **Quit LiveToon Background** to restore your normal desktop.
