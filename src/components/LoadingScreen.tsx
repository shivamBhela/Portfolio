import React from 'react';
import { motion } from 'framer-motion';

/**
 * Clean, minimal loading screen: animated spider web + logo/name + loading animation.
 * No photos.
 */
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden cursor-default z-[10001]">
      {/* Animated spider web (CSS radial lines) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-[min(100vmax,800px)] h-[min(100vmax,800px)] opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{
            background: `
              repeating-conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg 10deg,
                rgba(177,19,19,0.15) 10deg 11deg
              )
            `,
          }}
        />
        <svg
          className="absolute w-[min(90vmax,700px)] h-[min(90vmax,700px)] text-spidey-red/30"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x2 = 100 + Math.cos(angle) * 90;
            const y2 = 100 + Math.sin(angle) * 90;
            return (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={x2}
                y2={y2}
              />
            );
          })}
          {[0.25, 0.5, 0.75].map((r, i) => (
            <circle
              key={`c-${i}`}
              cx="100"
              cy="100"
              r={90 * r}
              className="opacity-40"
            />
          ))}
        </svg>
      </div>

      {/* Logo / name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
          Shivam <span className="text-spidey-red">Bhela</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mt-2">
          Portfolio
        </p>
      </motion.div>

      {/* Loading animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-10 h-10 border-2 border-spidey-red border-t-transparent rounded-full animate-spin" />
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[10px] uppercase tracking-[0.4em] text-spidey-red"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
