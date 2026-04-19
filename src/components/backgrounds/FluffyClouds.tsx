import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import type { BgConfig } from '../../types';

export default function FluffyClouds({ config }: { config: BgConfig }) {
  const numClouds = Math.floor(10 * config.density);
  
  const clouds = useMemo(() => {
    return Array.from({ length: Math.max(3, numClouds) }).map((_, i) => {
      // Create random cartoon clouds
      const width = 100 + Math.random() * 200;
      const height = width * 0.4;
      
      const duration = (20 + Math.random() * 40) / config.speed;
      const zIndex = Math.floor(Math.random() * 10);
      const opacity = 0.5 + Math.random() * 0.5;
      const delay = -Math.random() * 50;

      // Start positions completely depend on direction, but we assign random base offsets
      const randomOffset = Math.random() * 100;

      return {
        id: i, width, height, zIndex, opacity, duration, delay, randomOffset,
        color: `hsl(${200 + Math.random() * 20}, 100%, ${85 + Math.random() * 15}%)`,
      };
    });
  }, [numClouds, config.speed]);

  const getMotionProps = (c: any) => {
    switch(config.direction) {
      case 'rtl': return { 
        x: ['120vw', '-40vw'], y: [`${c.randomOffset}vh`, `${c.randomOffset}vh`], scale: 1 
      };
      case 'ttb': return { 
        x: [`${c.randomOffset}vw`, `${c.randomOffset}vw`], y: ['-40vh', '120vh'], scale: 1 
      };
      case 'btt': return { 
        x: [`${c.randomOffset}vw`, `${c.randomOffset}vw`], y: ['120vh', '-40vh'], scale: 1 
      };
      case 'radial': return { 
        x: [`${c.randomOffset}vw`, `${c.randomOffset}vw`], 
        y: [`${c.randomOffset}vh`, `${c.randomOffset}vh`], 
        scale: [0, 2], opacity: [0, c.opacity, 0] 
      };
      case 'ltr':
      default: return { 
        x: ['-40vw', '120vw'], y: [`${c.randomOffset}vh`, `${c.randomOffset}vh`], scale: 1 
      };
    }
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, #87CEEB, #E0F6FF)`,
        filter: `hue-rotate(${config.hueRotate}deg) saturate(${config.saturation}%)`
      }}
    >
      {/* Sun */}
      <motion.div
        className="absolute rounded-full bg-yellow-300 pointer-events-none"
        style={{
          width: 200, height: 200, top: '10%', right: '15%',
          boxShadow: '0 0 40px rgba(253, 224, 71, 0.6)'
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-2 border-4 border-yellow-400 rounded-full opacity-50" />
      </motion.div>

      {clouds.map(c => {
        const anim = getMotionProps(c);
        return (
          <motion.div
            key={c.id}
            className="absolute"
            style={{
              width: c.width,
              height: c.height,
              zIndex: c.zIndex,
              opacity: config.direction === 'radial' ? 0 : c.opacity,
              left: 0, top: 0, // Reset base to use motion x/y fully
            }}
            animate={anim}
            transition={{
              duration: c.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: c.delay
            }}
          >
            {/* Cartoon Cloud Shape composed of overlapping circles */}
            <div className="relative w-full h-full pointer-events-none flex items-end">
              <div className="absolute bottom-0 w-full h-1/2 rounded-full" style={{ backgroundColor: c.color }} />
              <div className="absolute bottom-0 left-[15%] w-[35%] h-[90%] rounded-full" style={{ backgroundColor: c.color }} />
              <div className="absolute bottom-0 right-[20%] w-[40%] h-[75%] rounded-full" style={{ backgroundColor: c.color }} />
              <div className="absolute bottom-[4px] left-[15px] w-[30%] h-[20%] rounded-full bg-white opacity-40 mix-blend-overlay" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

