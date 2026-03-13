import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../data/assetPaths';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'user' | 'glitch' | 'spiderman' | 'final'>('user');
  const { data } = usePortfolioData();

  // Use profileImage from store — falls back to static asset if not uploaded yet
  const profileSrc = data.about.profileImage || ASSETS.images.profile;

  useEffect(() => {
    const sequence = async () => {
      // 1. Show User Portrait (2.5s)
      await new Promise(r => setTimeout(r, 2500));
      setStage('glitch');
      
      // 2. Glitch Effect (0.6s)
      await new Promise(r => setTimeout(r, 600));
      setStage('spiderman');
      
      // 3. Show Spiderman (2s)
      await new Promise(r => setTimeout(r, 2000));
      setStage('final');
    };
    
    sequence();
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {/* ─── Stage 1: Your Portrait ─────────────────────────────────── */}
        {stage === 'user' && (
          <motion.div
            key="user-portrait"
            initial={{ opacity: 0, scale: 0.85, filter: 'brightness(0)' }}
            animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
            exit={{ opacity: 0, scale: 1.15, filter: 'brightness(3) contrast(3)' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)] pointer-events-none z-10" />

            {/* Portrait image */}
            <div className="relative w-80 h-96 md:w-[420px] md:h-[520px]">
              <img
                src={profileSrc}
                className="w-full h-full object-cover rounded-2xl shadow-[0_0_80px_rgba(255,255,255,0.15)]"
                alt="Shivam Bhela"
              />
              {/* Animated scan line */}
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-[2px] bg-electric-blue/40 z-20 pointer-events-none"
                style={{ position: 'absolute' }}
              />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-electric-blue/60 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-electric-blue/60 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-spidey-red/60 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-spidey-red/60 rounded-br-xl" />
            </div>

            {/* Name tag below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-24 text-center"
            >
              <p className="text-white/80 font-black uppercase tracking-[0.4em] text-sm">Shivam Bhela</p>
              <p className="text-white/30 uppercase tracking-[0.3em] text-[10px] mt-1">AI Developer • Hardware Innovator</p>
            </motion.div>
          </motion.div>
        )}

        {/* ─── Stage 2: Glitch ─────────────────────────────────────────── */}
        {stage === 'glitch' && (
          <motion.div
            key="glitch-effect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-spidey-red/20"
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{
                  x: [0, -8, 8, -4, 0],
                  opacity: [1, 0.8, 1, 0.6, 1],
                }}
                transition={{ duration: 0.15, repeat: Infinity, delay: i * 0.05 }}
                className="absolute text-white font-black text-7xl md:text-9xl italic tracking-tighter"
                style={{ color: i === 1 ? '#ff0000' : i === 2 ? '#00f2ff' : 'white', top: `${48 + i * 0.5}%`, transform: 'translateY(-50%)' }}
              >
                TRANSFORMING...
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ─── Stage 3: Spiderman ──────────────────────────────────────── */}
        {stage === 'spiderman' && (
          <motion.div
            key="spidey-reveal"
            initial={{ opacity: 0, scale: 1.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-2xl max-h-[80vh] px-4">
              <img
                src={ASSETS.images.spiderman}
                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(177,19,19,0.5)]"
                alt="Spider-Man"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="absolute inset-0 bg-spidey-red/20 pointer-events-none"
              />
            </div>
          </motion.div>
        )}

        {/* ─── Stage 4: Final ──────────────────────────────────────────── */}
        {stage === 'final' && (
          <motion.div
            key="final-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 text-center px-4"
          >
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] mb-4"
            >
              SHIVAM <span className="text-spidey-red">BHELA</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-xl uppercase tracking-[0.5em] text-white/40 font-bold mb-12"
            >
              The Multiverse Architect
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={onComplete}
              className="group relative px-12 py-4 bg-transparent border-2 border-spidey-red text-white overflow-hidden transition-all hover:bg-spidey-red hover:shadow-[0_0_50px_rgba(177,19,19,1)]"
            >
              <span className="relative z-10 font-black tracking-[0.3em] uppercase">INITIATE CONNECTION</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,119,181,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />
      </div>
    </div>
  );
};

export default Intro;
