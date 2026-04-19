import type { BgConfig } from './types';

export interface Preset {
  id: string;
  name: string;
  icon: string;
  config: BgConfig;
}

export const PRESETS: Preset[] = [
  {
    id: 'kawaii',
    name: 'Kawaii Skies',
    icon: '🌸',
    config: { theme: 'clouds', speed: 0.8, density: 1.5, hueRotate: 300, saturation: 110, direction: 'ltr', sound: 'wind' }
  },
  {
    id: 'retro-synth',
    name: 'Retro Synth',
    icon: '👾',
    config: { theme: 'matrix', speed: 1.2, density: 1.5, hueRotate: 310, saturation: 150, direction: 'ttb', sound: 'space' }
  },
  {
    id: 'sci-fi-hub',
    name: 'Sci-Fi Core',
    icon: '🛸',
    config: { theme: 'stars', speed: 2.0, density: 2.5, hueRotate: 180, saturation: 120, direction: 'radial', sound: 'space' }
  },
  {
    id: 'calm-modern',
    name: 'Modern Zen',
    icon: '🌿',
    config: { theme: 'blobs', speed: 0.5, density: 1.2, hueRotate: 0, saturation: 60, direction: 'radial', sound: 'bubbles' }
  },
  {
    id: 'cozy-night',
    name: 'Cozy Night',
    icon: '🔥',
    config: { theme: 'stars', speed: 0.3, density: 0.8, hueRotate: 45, saturation: 90, direction: 'btt', sound: 'fire' }
  }
];
