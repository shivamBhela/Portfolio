import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ASSETS } from '../data/assetPaths';

const About = () => {
  const { data } = usePortfolioData();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse-tilt parallax values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Immersive Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Outer glow blobs */}
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-electric-blue/15 blur-[120px] -z-10 animate-pulse" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-spidey-red/15 blur-[120px] -z-10" />

            {/* 3D tilt card */}
            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY, transformPerspective: 900 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Portrait image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <motion.img
                  src={ASSETS.images.heroEdited}
                  alt="Shivam Bhela"
                  className="w-full h-full object-cover object-center transition-all duration-700 scale-110 group-hover:scale-105"
                  initial={{ filter: 'brightness(0.6) saturate(0.4)' }}
                  whileInView={{ filter: 'brightness(0.85) saturate(0.7)' }}
                  whileHover={{ filter: 'brightness(1) saturate(1.1)' }}
                  transition={{ duration: 0.8 }}
                />

                {/* Cinematic top/bottom letterbox bars */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

                {/* Animated scan line on hover */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                  <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-electric-blue/40"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </div>

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-electric-blue/70 z-20" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-electric-blue/70 z-20" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-spidey-red/70 z-20" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-spidey-red/70 z-20" />

                {/* Floating ID Tag */}
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4/5 bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl z-20 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] text-electric-blue uppercase tracking-[0.2em] font-black">Subject Identity</p>
                    <span className="flex items-center gap-1 text-[9px] text-green-400 font-bold uppercase">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">{data.about.name}</h3>
                  <p className="text-[10px] text-white/40 mt-1 tracking-wider">{data.about.title?.split(' | ')[0]}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-spidey-red to-transparent" />
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/50">Protocol: Active</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Identity Core */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Identity <span className="text-spidey-red">Profile</span>
              </h2>
              <div className="h-1 w-20 bg-spidey-red" />
            </div>

            <p className="text-lg text-white/70 leading-relaxed font-light">
              {data.about.bio}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {data.about.focusAreas.map((area: any) => (
                <div key={area.id} className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <span className="text-2xl">{area.icon}</span>
                  <span className="font-bold uppercase tracking-widest text-[10px]">{area.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;


