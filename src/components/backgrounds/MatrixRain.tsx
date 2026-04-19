import React, { useMemo } from 'react';
import type { BgConfig } from '../../types';

export default function MatrixRain({ config }: { config: BgConfig }) {
  const cols = Math.floor(50 * config.density);
  
  const pillars = useMemo(() => {
    return Array.from({ length: cols }).map((_, i) => ({
      id: i,
      offset: `${(i / cols) * 100}%`,
      delay: -(Math.random() * 20),
      duration: (3 + Math.random() * 5) / config.speed,
      chars: Array.from({ length: 20 }).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('\n')
    }));
  }, [cols, config.speed]);

  const dir = config.direction;

  return (
    <div 
      className="absolute inset-0 overflow-hidden bg-black text-green-500 font-mono text-xl whitespace-pre"
      style={{
        filter: `hue-rotate(${config.hueRotate}deg) saturate(${config.saturation}%)`
      }}
    >
      <style>
        {`
          @keyframes matrix-ttb { 0% { transform: translateY(-100%); opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
          @keyframes matrix-btt { 0% { transform: translateY(100vh); opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(-100%); opacity: 0; } }
          @keyframes matrix-ltr { 0% { transform: translateX(-100%) rotate(-90deg); opacity: 1; } 80% { opacity: 1; } 100% { transform: translateX(100vw) rotate(-90deg); opacity: 0; } }
          @keyframes matrix-rtl { 0% { transform: translateX(100vw) rotate(90deg); opacity: 1; } 80% { opacity: 1; } 100% { transform: translateX(-100%) rotate(90deg); opacity: 0; } }
          @keyframes matrix-radial { 0% { transform: scale(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: scale(3); opacity: 0; } }
          
          .matrix-col {
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}
      </style>
      {pillars.map(p => {
        let style: any = {
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
          animationName: `matrix-${dir}`,
          textShadow: '0 0 8px rgba(34, 197, 94, 0.8)'
        };
        
        if (dir === 'ttb' || dir === 'btt') {
          style.left = p.offset;
          style.top = dir === 'ttb' ? 0 : 'auto';
          style.bottom = dir === 'btt' ? 0 : 'auto';
        } else if (dir === 'ltr' || dir === 'rtl') {
          style.top = p.offset;
          style.left = dir === 'ltr' ? 0 : 'auto';
          style.right = dir === 'rtl' ? 0 : 'auto';
          style.transformOrigin = 'center';
        } else if (dir === 'radial') {
          style.left = p.offset;
          style.top = '50%';
          style.transformOrigin = 'center';
        }

        return (
          <div key={p.id} className="absolute matrix-col text-center" style={style}>
            {p.chars.split('').map((char, index) => (
              <div key={index} style={{ opacity: 1 - (index / 20) }}>{char}</div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
