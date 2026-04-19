import Cocoa
import WebKit

class AppDelegate: NSObject, NSApplicationDelegate {
    var window: NSWindow!
    var webView: WKWebView!
    var statusItem: NSStatusItem!

    func applicationDidFinishLaunching(_ notification: Notification) {
        // 1. Setup Status Bar Menu (so user can quit the wallpaper)
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        if let button = statusItem.button {
            button.title = "🎨 LiveToon"
        }
        let menu = NSMenu()
        menu.addItem(NSMenuItem(title: "Quit LiveToon Background", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q"))
        statusItem.menu = menu

        // 2. Setup Borderless Desktop Window
        let screenRect = NSScreen.main?.frame ?? NSRect(x: 0, y: 0, width: 1920, height: 1080)
        window = NSWindow(
            contentRect: screenRect,
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )
        
        // Magic: Set window behind icons but above desktop background
        // CGWindowLevelForKey(.desktopIconWindow) pushes it to the bottom layer
        window.level = NSWindow.Level(rawValue: Int(CGWindowLevelForKey(.desktopIconWindow)) - 1)
        
        // Ensure it spans across spaces and doesn't bounce in Mission Control
        window.collectionBehavior = [.canJoinAllSpaces, .stationary, .ignoresCycle]
        window.backgroundColor = .clear
        window.isOpaque = false
        
        // Pass all mouse clicks through to the desktop
        window.ignoresMouseEvents = true

        // 3. Setup WebKit View
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: screenRect, configuration: webConfiguration)
        webView.autoresizingMask = [.width, .height]
        
        // Transparent background for WebView
        webView.setValue(false, forKey: "drawsBackground")
        
        window.contentView = webView
        window.makeKeyAndOrderFront(nil)

        // 4. Load the URL
        var targetUrl = "http://localhost:3000?wrapper=true" // Default fallback
        if CommandLine.arguments.count > 1 {
            targetUrl = CommandLine.arguments[1]
        }

        if let url = URL(string: targetUrl) {
            webView.load(URLRequest(url: url))
        }
    }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()
