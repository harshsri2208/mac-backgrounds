import React, { useState } from 'react';
import { MonitorDown, Copy, Check, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import type { BgConfig, ToonTheme, AnimationDirection, SoundTheme } from '../types';
import { PRESETS } from '../presets';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ControlsProps {
  config: BgConfig;
  onChange: (config: BgConfig) => void;
  urlForPlash: string;
  soundEnabled: boolean;
  toggleSound: () => void;
  children?: React.ReactNode;
}

export default function ControlsOverlay({ config, onChange, urlForPlash, soundEnabled, toggleSound, children }: ControlsProps) {
  const [copied, setCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const update = (key: keyof BgConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  const themes: { id: ToonTheme, label: string }[] = [
    { id: 'clouds', label: 'Fluffy Sky' },
    { id: 'stars', label: 'Starry Night' },
    { id: 'blobs', label: 'Lava Blobs' },
    { id: 'matrix', label: 'Toon Matrix' },
  ];

  const directions: { id: AnimationDirection, label: string }[] = [
    { id: 'ltr', label: 'Left → Right' },
    { id: 'rtl', label: 'Right → Left' },
    { id: 'ttb', label: 'Top ↓ Down' },
    { id: 'btt', label: 'Bottom ↑ Up' },
    { id: 'radial', label: 'Radial' },
  ];

  const sounds: { id: SoundTheme, label: string }[] = [
    { id: 'none', label: 'Muted' },
    { id: 'wind', label: 'Wind' },
    { id: 'bubbles', label: 'Bubbles' },
    { id: 'space', label: 'Deep Space' },
    { id: 'fire', label: 'Fire' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(urlForPlash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center p-4 min-h-0 font-sans text-[var(--text-main)] pointer-events-none">
      {/* Desktop background effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#a1c4fd] to-[#c2e9fb] z-0 pointer-events-none" />

      {/* App Window */}
      <div className="relative z-10 w-[1024px] max-w-[98vw] h-[768px] max-h-[95vh] bg-[var(--app-bg)] rounded-xl border border-[var(--border-color)] shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden backdrop-blur-xl pointer-events-auto">
        
        {/* Title Bar */}
        <div className="flex items-center px-4 h-[52px] border-b border-[var(--border-color)] shrink-0 select-none">
          <div className="flex gap-2 w-[70px]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/10" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10" />
          </div>
          <div className="flex-1 text-center font-semibold text-[13px]">LiveToon Mac Wallpapers</div>
          <div className="w-[70px]" />
        </div>

        {/* Grid Area */}
        <div className="flex-1 min-h-0 flex flex-col md:grid md:grid-cols-[200px_1fr_260px] overflow-hidden">
          
          {/* Sidebar */}
          <div className="bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] py-5 overflow-y-auto hidden md:block">
            <div className="text-[11px] uppercase text-[var(--text-sub)] font-bold mb-2 px-5">Library</div>
            <div className="flex flex-col">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onChange(preset.config);
                    if (!soundEnabled && preset.config.sound !== 'none') toggleSound();
                  }}
                  className={cn(
                    "px-5 py-2 text-[13px] text-left flex items-center gap-2 cursor-pointer transition-colors",
                    config.theme === preset.config.theme && config.direction === preset.config.direction && config.sound === preset.config.sound 
                      ? "bg-[rgba(0,0,0,0.05)] font-medium text-[var(--text-main)]" 
                      : "hover:bg-[rgba(0,0,0,0.03)] text-[var(--text-main)]"
                  )}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Preview Workarea */}
          <div className="p-6 flex flex-col gap-5 overflow-hidden">
            <div className="flex-1 bg-white rounded-lg border border-[var(--border-color)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] relative overflow-hidden flex items-center justify-center">
              {children}
              
              {/* Floating Action within the Preview Canvas */}
              <div className="absolute top-4 right-4 z-50">
                <button 
                  onClick={toggleSound}
                  className="p-2 border border-black/5 bg-white/50 backdrop-blur rounded-lg shadow-sm hover:bg-white text-slate-700 transition"
                  title="Toggle Preview Sound"
                >
                  {soundEnabled && config.sound !== 'none' ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              </div>
            </div>

            {/* Footer Controls */}
            <div className="flex justify-between items-center shrink-0">
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowInstructions(true)}
                  className="px-4 py-2 rounded-md bg-[rgba(0,0,0,0.05)] text-[var(--text-main)] text-[13px] font-medium hover:bg-[rgba(0,0,0,0.1)] flex items-center gap-2 transition cursor-pointer"
                >
                  <MonitorDown size={14} /> Setup
                </button>
              </div>
              <button 
                onClick={handleCopy}
                className="px-6 py-2.5 rounded-md bg-[var(--accent-blue)] text-white text-[13px] font-medium hover:opacity-90 shadow flex items-center gap-2 transition cursor-pointer"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "URL Copied!" : "Set as Wallpaper"}
              </button>
            </div>
          </div>

          {/* Inspector Panel */}
          <div className="border-l border-[var(--border-color)] p-5 overflow-y-auto flex flex-col gap-6 text-[13px]">
            
            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-bold text-[var(--text-sub)] uppercase">Animation Style</div>
              <select 
                value={config.theme} 
                onChange={e => update('theme', e.target.value)}
                className="w-full p-1.5 border border-[var(--border-color)] rounded bg-white text-[13px] outline-none cursor-pointer"
              >
                {themes.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-bold text-[var(--text-sub)] uppercase">Flow Direction</div>
              <select 
                value={config.direction} 
                onChange={e => update('direction', e.target.value)}
                className="w-full p-1.5 border border-[var(--border-color)] rounded bg-white text-[13px] outline-none cursor-pointer"
              >
                {directions.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-bold text-[var(--text-sub)] uppercase flex justify-between">
                Color Vibe <span className="font-normal opacity-75">{config.hueRotate}°</span>
              </div>
              <input 
                type="range" min="0" max="360" step="10" 
                value={config.hueRotate} onChange={e => update('hueRotate', parseInt(e.target.value))}
                className="w-full accent-[var(--accent-blue)] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-bold text-[var(--text-sub)] uppercase flex justify-between">
                 Saturation <span className="font-normal opacity-75">{config.saturation}%</span>
              </div>
              <input 
                type="range" min="0" max="200" step="10" 
                value={config.saturation} onChange={e => update('saturation', parseInt(e.target.value))}
                className="w-full accent-[var(--accent-blue)] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-bold text-[var(--text-sub)] uppercase flex justify-between">
                Animation Speed <span className="font-normal opacity-75">{config.speed.toFixed(1)}x</span>
              </div>
              <input 
                type="range" min="0.1" max="3" step="0.1" 
                value={config.speed} onChange={e => update('speed', parseFloat(e.target.value))}
                className="w-full accent-[var(--accent-blue)] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-bold text-[var(--text-sub)] uppercase flex justify-between">
                Scene Complexity <span className="font-normal opacity-75">{config.density.toFixed(1)}x</span>
              </div>
              <input 
                type="range" min="0.1" max="3" step="0.1" 
                value={config.density} onChange={e => update('density', parseFloat(e.target.value))}
                className="w-full accent-[var(--accent-blue)] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-bold text-[var(--text-sub)] uppercase">Ambient Audio</div>
              <select 
                value={config.sound} 
                onChange={e => { update('sound', e.target.value); if (!soundEnabled && e.target.value !== 'none') toggleSound(); }}
                className="w-full p-1.5 border border-[var(--border-color)] rounded bg-white text-[13px] outline-none cursor-pointer"
              >
                {sounds.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>

            <div className="mt-auto flex flex-col pt-4 border-t border-[var(--border-color)]">
              <div className="text-[12px] text-[var(--text-sub)]">Current Setup: <b>{themes.find(t => t.id === config.theme)?.label} Background</b></div>
              <div className="text-[11px] text-[var(--text-sub)] opacity-80">Procedurally Generated Loop</div>
            </div>
          </div>

        </div>
      </div>

      {/* Instructions Modal */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto"
            onClick={() => setShowInstructions(false)}
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-[var(--app-bg)] p-8 rounded-2xl max-w-md shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative border border-[var(--border-color)]"
            >
              <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Set as Mac Wallpaper</h2>
              <ol className="list-decimal pl-4 space-y-3 text-[var(--text-sub)] mb-6 text-sm">
                <li>Design your scene and sound (it auto-loops forever).</li>
                <li>Click <strong>Set as Wallpaper</strong> to copy your unique URL.</li>
                <li>Open your Terminal and build our native Mac wrapper:
                    <div className="bg-slate-100 p-2 mt-1 rounded text-xs break-all font-mono">
                      cd mac-wrapper && chmod +x build.sh && ./build.sh
                    </div>
                </li>
                <li>Launch the background process using your URL:
                    <div className="bg-slate-100 p-2 mt-1 rounded text-xs break-all font-mono">
                      open LiveToon.app --args "&lt;Paste URL&gt;"
                    </div>
                </li>
              </ol>
              <div className="bg-slate-50 p-4 rounded-xl border border-[var(--border-color)] flex items-center gap-3 text-xs text-slate-500 mb-6 break-all">
                {urlForPlash}
              </div>
              <button 
                onClick={() => setShowInstructions(false)}
                className="w-full bg-[rgba(0,0,0,0.05)] text-[var(--text-main)] py-2.5 rounded-md font-medium hover:bg-[rgba(0,0,0,0.1)] transition-colors cursor-pointer"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
