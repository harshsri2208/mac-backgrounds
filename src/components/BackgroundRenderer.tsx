import React, { lazy, Suspense } from 'react';
import type { BgConfig } from '../types';

const FluffyClouds = lazy(() => import('./backgrounds/FluffyClouds'));
const StarryNight = lazy(() => import('./backgrounds/StarryNight'));
const AbstractBlobs = lazy(() => import('./backgrounds/AbstractBlobs'));
const MatrixRain = lazy(() => import('./backgrounds/MatrixRain'));

export default function BackgroundRenderer({ config }: { config: BgConfig }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Suspense fallback={<div className="absolute inset-0 bg-slate-100" />}>
        {config.theme === 'clouds' && <FluffyClouds config={config} />}
        {config.theme === 'stars' && <StarryNight config={config} />}
        {config.theme === 'blobs' && <AbstractBlobs config={config} />}
        {config.theme === 'matrix' && <MatrixRain config={config} />}
      </Suspense>
    </div>
  );
}
