import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../data/assetPaths';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'user' | 'glitch' | 'spiderman' | 'final'>('user');

  useEffect(() => {
    const sequence = async () => {
      // 1. Show User Portrait (2s)
      await new Promise(r => setTimeout(r, 2000));
      setStage('glitch');
      
      // 2. Glitch Effect (0.5s)
      await new Promise(r => setTimeout(r, 500));
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
        {stage === 'user' && (
          <motion.div
            key="user-portrait"
            initial={{ opacity: 0, scale: 0.8, filter: 'brightness(0)' }}
            animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'brightness(2) contrast(2)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-2xl max-h-[80vh] px-4">
              <img 
                src={ASSETS.images.profile} 
                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                alt="Shivam Bhela"
              />
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="absolute inset-0 bg-spidey-blue/10 pointer-events-none mix-blend-overlay"
              />
            </div>
          </motion.div>
        )}

        {stage === 'glitch' && (
          <motion.div
            key="glitch-effect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-red-600/20"
          >
            <div className="relative text-white font-black text-9xl italic tracking-tighter animate-pulse">
              TRANSFORMING...
            </div>
            {/* Rapid flash/glitch elements can be added here */}
          </motion.div>
        )}

        {stage === 'spiderman' && (
          <motion.div
            key="spidey-reveal"
            initial={{ opacity: 0, scale: 1.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
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
              transition={{ duration: 1, ease: "easeOut" }}
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
            <button
              onClick={onComplete}
              className="group relative px-12 py-4 bg-transparent border-2 border-spidey-red text-white overflow-hidden transition-all hover:bg-spidey-red hover:shadow-[0_0_50px_rgba(177,19,19,1)]"
            >
              <span className="relative z-10 font-black tracking-[0.3em] uppercase">INITIATE CONNECTION</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
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
