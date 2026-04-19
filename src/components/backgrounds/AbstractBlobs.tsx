import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import type { BgConfig } from '../../types';

export default function AbstractBlobs({ config }: { config: BgConfig }) {
  const numBlobs = Math.floor(6 * config.density);
  
  const blobs = useMemo(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#7E57C2', '#FF9F1C'];
    return Array.from({ length: Math.max(3, numBlobs) }).map((_, i) => ({
      id: i,
      size: 200 + Math.random() * 400,
      color: colors[i % colors.length],
      duration: (15 + Math.random() * 15) / config.speed,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      borderRadius: `${40 + Math.random() * 30}% ${40 + Math.random() * 30}% ${40 + Math.random() * 30}% ${40 + Math.random() * 30}%`
    }));
  }, [numBlobs, config.speed]);

  const getMotion = (b: any) => {
    switch (config.direction) {
      case 'ltr': return { left: ['-50%', '150%'], top: [`${b.startY}%`, `${b.startY}%`] };
      case 'rtl': return { left: ['150%', '-50%'], top: [`${b.startY}%`, `${b.startY}%`] };
      case 'ttb': return { top: ['-50%', '150%'], left: [`${b.startX}%`, `${b.startX}%`] };
      case 'btt': return { top: ['150%', '-50%'], left: [`${b.startX}%`, `${b.startX}%`] };
      case 'radial': 
      default:
        return {
          left: [`${b.startX}%`, `${(b.startX + 20) % 100}%`, `${b.startX}%`],
          top: [`${b.startY}%`, `${(b.startY + 20) % 100}%`, `${b.startY}%`],
        };
    }
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden bg-white"
      style={{
        filter: `hue-rotate(${config.hueRotate}deg) saturate(${config.saturation}%)`
      }}
    >
      <div className="absolute inset-0 opacity-40 blur-[80px]">
        {blobs.map(b => {
          const anim = getMotion(b);
          return (
            <motion.div
              key={b.id}
              className="absolute mix-blend-multiply"
              style={{
                width: b.size,
                height: b.size,
                backgroundColor: b.color,
                borderRadius: b.borderRadius,
              }}
              animate={{
                ...anim,
                rotate: [0, 180, 360],
                scale: config.direction === 'radial' ? [1, 1.3, 0.8, 1] : 1
              }}
              transition={{
                duration: b.duration,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          );
        })}
      </div>
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
}
