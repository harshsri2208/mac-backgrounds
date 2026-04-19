import Cocoa
import WebKit

class AppDelegate: NSObject, NSApplicationDelegate, WKScriptMessageHandler {
    var studioWindow: NSWindow!
    var studioWebView: WKWebView!
    
    var wallpaperWindow: NSWindow?
    var wallpaperWebView: WKWebView?
    
    var statusItem: NSStatusItem!

    func applicationDidFinishLaunching(_ notification: Notification) {
        // 1. Setup Status Bar Menu
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        if let button = statusItem.button {
            button.title = "🎨 LiveToon"
        }
        let menu = NSMenu()
        menu.addItem(NSMenuItem(title: "Open LiveToon Studio", action: #selector(showStudioWindow), keyEquivalent: "s"))
        menu.addItem(NSMenuItem(title: "Quit completely", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q"))
        statusItem.menu = menu

        // 2. Auto-load previous wallpaper if saved, otherwise load studio
        if let savedHash = UserDefaults.standard.string(forKey: "LiveToonHash") {
            setWallpaperOnDesktop(hashString: savedHash)
        }
        // Always open Studio upon fresh open so user isn't confused
        showStudioWindow()
    }
    
    @objc func showStudioWindow() {
        if studioWindow != nil && studioWindow.isVisible {
            studioWindow.makeKeyAndOrderFront(nil)
            NSApp.activate(ignoringOtherApps: true)
            return
        }
        
        let initialWidth: CGFloat = 1024
        let initialHeight: CGFloat = 768
        
        studioWindow = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: initialWidth, height: initialHeight),
            styleMask: [.titled, .closable, .miniaturizable, .resizable],
            backing: .buffered,
            defer: false
        )
        studioWindow.center()
        studioWindow.title = "LiveToon Studio"
        
        let config = WKWebViewConfiguration()
        let contentController = WKUserContentController()
        contentController.add(self, name: "liveToonMessage")
        config.userContentController = contentController
        
        // Allowed local file access
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        
        studioWebView = WKWebView(frame: studioWindow.contentView!.bounds, configuration: config)
        studioWebView.autoresizingMask = [.width, .height]
        
        // Allow developer extras like inspector just in case
        studioWebView.configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
        
        studioWindow.contentView = studioWebView
        studioWindow.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
        
        loadLocalApp(into: studioWebView, hash: "") // open normal UI
    }
    
    func setWallpaperOnDesktop(hashString: String) {
        if wallpaperWindow == nil {
            let screenRect = NSScreen.main?.frame ?? NSRect(x: 0, y: 0, width: 1920, height: 1080)
            wallpaperWindow = NSWindow(
                contentRect: screenRect,
                styleMask: [.borderless],
                backing: .buffered,
                defer: false
            )
            
            // Magic: Set window behind icons but above desktop background
            wallpaperWindow!.level = NSWindow.Level(rawValue: Int(CGWindowLevelForKey(.desktopIconWindow)) - 1)
            wallpaperWindow!.collectionBehavior = [.canJoinAllSpaces, .stationary, .ignoresCycle]
            wallpaperWindow!.backgroundColor = .clear
            wallpaperWindow!.isOpaque = false
            wallpaperWindow!.ignoresMouseEvents = true // Pass clicks to desktop
            
            let webConfig = WKWebViewConfiguration()
            webConfig.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
            wallpaperWebView = WKWebView(frame: screenRect, configuration: webConfig)
            wallpaperWebView!.autoresizingMask = [.width, .height]
            wallpaperWebView!.setValue(false, forKey: "drawsBackground") // Transparent
            
            wallpaperWindow!.contentView = wallpaperWebView
            wallpaperWindow!.makeKeyAndOrderFront(nil)
        }
        
        loadLocalApp(into: wallpaperWebView!, hash: hashString)
        UserDefaults.standard.set(hashString, forKey: "LiveToonHash")
    }
    
    func loadLocalApp(into webView: WKWebView, hash: String) {
        // Point to index.html inside the app bundle's /dist directory
        if let htmlPath = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "dist") {
            let fileURL = URL(fileURLWithPath: htmlPath)
            var finalURLString = fileURL.absoluteString
            if !hash.isEmpty {
                finalURLString += hash
            }
            if let finalURL = URL(string: finalURLString) {
                // Must grant read access to the entire dist directory for assets to load
                let readAccessURL = fileURL.deletingLastPathComponent()
                webView.loadFileURL(finalURL, allowingReadAccessTo: readAccessURL)
            }
        } else {
             print("Error: Could not find dynamic 'dist/index.html'. Please run build.sh first!")
        }
    }
    
    // Process messages from JavaScript
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "liveToonMessage", let dict = message.body as? [String: Any], let action = dict["action"] as? String {
            if action == "setWallpaper", let hash = dict["hash"] as? String {
                setWallpaperOnDesktop(hashString: hash)
            }
        }
    }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()
