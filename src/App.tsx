import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import BackgroundRenderer from './components/BackgroundRenderer';
import ControlsOverlay from './components/ControlsOverlay';
import AmbientAudio from './components/AmbientAudio';
import { DEFAULT_CONFIG, type BgConfig, type ToonTheme, type AnimationDirection, type SoundTheme } from './types';

// The Main View reading from URL params
function Workspace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  // Parse config from URL or use defaults
  const config: BgConfig = {
    theme: (searchParams.get('theme') as ToonTheme) || DEFAULT_CONFIG.theme,
    speed: parseFloat(searchParams.get('speed') || String(DEFAULT_CONFIG.speed)),
    density: parseFloat(searchParams.get('density') || String(DEFAULT_CONFIG.density)),
    hueRotate: parseInt(searchParams.get('hueRotate') || String(DEFAULT_CONFIG.hueRotate)),
    saturation: parseInt(searchParams.get('saturation') || String(DEFAULT_CONFIG.saturation)),
    direction: (searchParams.get('direction') as AnimationDirection) || DEFAULT_CONFIG.direction,
    sound: (searchParams.get('sound') as SoundTheme) || DEFAULT_CONFIG.sound,
  };

  const isPlashMode = searchParams.get('plash') === 'true';

  // If in plash mode, we might want to auto-enable sound if it has one.
  // We'll rely on the user interacting once if not Plash, or just trusting Plash webview policies.
  const isAudioActive = isPlashMode || soundEnabled;

  const setConfig = (newConfig: BgConfig) => {
    setSearchParams({
      theme: newConfig.theme,
      speed: String(newConfig.speed),
      density: String(newConfig.density),
      hueRotate: String(newConfig.hueRotate),
      saturation: String(newConfig.saturation),
      direction: newConfig.direction,
      sound: newConfig.sound,
      ...(isPlashMode ? { plash: 'true' } : {})
    }, { replace: true });
  };

  // Build the absolute URL for the Mac Plash app
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('plash', 'true');
  const plashUrl = currentUrl.toString();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[var(--bg-color)] font-sans text-[var(--text-main)]">
      <AmbientAudio sound={config.sound} enabled={isAudioActive} />

      {isPlashMode ? (
        <BackgroundRenderer config={config} />
      ) : (
        <ControlsOverlay 
          config={config} 
          onChange={setConfig} 
          urlForPlash={plashUrl}
          soundEnabled={soundEnabled}
          toggleSound={() => setSoundEnabled(!soundEnabled)}
        >
          <BackgroundRenderer config={config} />
        </ControlsOverlay>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Workspace />} />
      </Routes>
    </BrowserRouter>
  );
}

