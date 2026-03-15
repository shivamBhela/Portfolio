import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ASSETS } from '../data/assetPaths';

const Hero = () => {
  const { data } = usePortfolioData();
  const titleParts = data.about.title.split(' | ');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Cinematic Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={ASSETS.images.heroCinematic} 
          alt="Background" 
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 space-y-8 text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="inline-block px-6 py-2 border border-white/20 bg-white/5 backdrop-blur-md rounded-full mb-4"
        >
          <span className="text-white/80 tracking-[0.3em] uppercase text-[10px] font-black">
            {data.about.name} • Portfolio 2026
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <span className="block italic text-white/90">Hello</span>
          <span className="block -mt-4 md:-mt-8 text-spidey-red">Everyone</span>
        </h1>

        <div className="max-w-2xl mx-auto bg-white/5 p-6 rounded-2xl border border-white/10">
          <p className="text-sm md:text-base font-bold text-white/60 uppercase tracking-[0.3em] leading-relaxed">
            {data.about.heroSubtitle || data.about.title}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          <button className="px-10 py-4 bg-white/10 border border-white/20 text-white font-black tracking-widest uppercase rounded-sm transition-all hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95">
            Explore My Work
          </button>
        </motion.div>
      </motion.div>

      {/* Subtle Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-12 border-2 border-white/20 rounded-full flex justify-center p-1 backdrop-blur-sm">
          <motion.div 
            animate={{ height: ["20%", "60%", "20%"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 bg-spidey-red rounded-full" 
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
