import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import type { BgConfig } from '../../types';

export default function StarryNight({ config }: { config: BgConfig }) {
  const numStars = Math.floor(150 * config.density);
  
  const stars = useMemo(() => {
    return Array.from({ length: numStars }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: (1 + Math.random() * 3) / config.speed,
      delay: Math.random() * -5,
      isShooting: Math.random() < 0.05
    }));
  }, [numStars, config.speed]);

  const getShootingAnim = () => {
    switch(config.direction) {
      case 'ltr': return { left: ['-20%', '120%'], top: ['50%', '50%'] };
      case 'ttb': return { top: ['-20%', '120%'], left: ['50%', '50%'] };
      case 'btt': return { top: ['120%', '-20%'], left: ['50%', '50%'] };
      case 'radial': return { left: ['50%', '120%'], top: ['50%', '120%'] };
      case 'rtl':
      default: return { left: ['120%', '-20%'], top: ['-20%', '120%'] };
    }
  };

  const getPanAnim = () => {
    switch(config.direction) {
      case 'ltr': return { x: ['-10%', '0%'] };
      case 'rtl': return { x: ['0%', '-10%'] };
      case 'ttb': return { y: ['-10%', '0%'] };
      case 'btt': return { y: ['0%', '-10%'] };
      case 'radial': return { scale: [1, 1.2, 1] };
      default: return {};
    }
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden bg-slate-900"
      style={{
        background: `linear-gradient(to bottom, #0B1021, #1B2B4A)`,
        filter: `hue-rotate(${config.hueRotate}deg) saturate(${config.saturation}%)`
      }}
    >
      <motion.div 
        className="absolute inset-[-20%] w-[140%] h-[140%]" 
        animate={getPanAnim()}
        transition={{ duration: 40 / config.speed, repeat: Infinity, ease: 'linear' }}
      >
        {/* Cartoon Moon */}
        <motion.div 
          className="absolute top-[25%] right-[25%] w-[150px] h-[150px] rounded-full bg-yellow-100"
          style={{ boxShadow: '0 0 60px rgba(255, 255, 200, 0.4)' }}
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Moon Craters */}
          <div className="absolute top-[20%] left-[20%] w-8 h-8 rounded-full bg-yellow-200 opacity-60" />
          <div className="absolute top-[50%] left-[60%] w-12 h-12 rounded-full bg-yellow-200 opacity-60" />
          <div className="absolute bottom-[20%] left-[30%] w-6 h-6 rounded-full bg-yellow-200 opacity-60" />
        </motion.div>

        {/* Stars */}
        {stars.filter(s => !s.isShooting).map(s => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Shooting Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.filter(s => s.isShooting).map((s, i) => (
            <motion.div
              key={`shoot-${s.id}`}
              className="absolute h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ 
                width: `${100 + Math.random() * 150}px` 
              }}
              animate={getShootingAnim()}
              transition={{
                duration: (Math.random() * 1.5 + 0.5) / config.speed,
                repeat: Infinity,
                delay: (Math.random() * 10) / config.speed,
                repeatDelay: 2 + Math.random() * 5
              }}
            >
              <div className="absolute right-0 w-[4px] h-[4px] bg-white rounded-full blur-[1px] transform -translate-y-1/2" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
