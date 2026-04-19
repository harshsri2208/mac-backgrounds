export type ToonTheme = 'clouds' | 'stars' | 'blobs' | 'matrix';
export type AnimationDirection = 'ltr' | 'rtl' | 'ttb' | 'btt' | 'radial';
export type SoundTheme = 'none' | 'wind' | 'space' | 'bubbles' | 'fire';

export interface BgConfig {
  theme: ToonTheme;
  speed: number;
  density: number;
  hueRotate: number;
  saturation: number;
  direction: AnimationDirection;
  sound: SoundTheme;
}

export const DEFAULT_CONFIG: BgConfig = {
  theme: 'clouds',
  speed: 1,
  density: 1,
  hueRotate: 0,
  saturation: 100,
  direction: 'ltr',
  sound: 'none',
};
