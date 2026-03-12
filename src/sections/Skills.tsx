import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const SKILL_CATEGORIES = [
  {
    id: 'ai',
    title: 'AI / ML',
    skills: ['Generative AI', 'Machine Learning', 'Speech Recognition', 'NLP', 'Computer Vision'],
    color: '#ff0000',
    icon: '🧠'
  },
  {
    id: 'programming',
    title: 'Programming',
    skills: ['C++', 'Python', 'JavaScript', 'TypeScript'],
    color: '#00f2ff',
    icon: '💻'
  },
  {
    id: 'hardware',
    title: 'Hardware',
    skills: ['Arduino', 'Sensors', 'EEG Interfaces', 'Embedded Systems', 'IoT', 'Robotics'],
    color: '#ffaa00',
    icon: '⚙️'
  },
  {
    id: 'fullstack',
    title: 'Web Development',
    skills: ['React', 'HTML', 'CSS', 'Tailwind', 'Node.js', 'Next.js'],
    color: '#003767',
    icon: '🌐'
  },
  {
    id: 'research',
    title: 'Research',
    skills: ['Brain-computer interfaces', 'Neural Signals', 'Signal Processing', 'Scientific Writing'],
    color: '#ffffff',
    icon: '📑'
  }
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="relative min-h-screen py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            Skill <span className="text-spidey-red">Web Network</span>
          </motion.h2>
          <p className="text-white/50 uppercase tracking-[0.3em] text-sm mt-4">Interactive Neural Connection Map</p>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          {/* Central Hub */}
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 20px rgba(177,19,19,0.2)", "0 0 50px rgba(177,19,19,0.5)", "0 0 20px rgba(177,19,19,0.2)"] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-spidey-red/20 border-2 border-spidey-red flex items-center justify-center relative z-20 group cursor-pointer"
          >
            <div className="text-4xl">🕷️</div>
            <div className="absolute inset-0 rounded-full border-4 border-white/5 animate-ping" />
          </motion.div>

          {/* Lines and Nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {SKILL_CATEGORIES.map((cat, index) => {
              const angle = (index / SKILL_CATEGORIES.length) * Math.PI * 2;
              const x2 = 50 + Math.cos(angle) * 35;
              const y2 = 50 + Math.sin(angle) * 35;
              
              return (
                <motion.line
                  key={`line-${cat.id}`}
                  x1="50%" y1="50%"
                  x2={`${x2}%`} y2={`${y2}%`}
                  stroke={activeCategory === cat.id ? cat.color : "rgba(255,255,255,0.1)"}
                  strokeWidth={activeCategory === cat.id ? "2" : "1"}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Category Nodes */}
          {SKILL_CATEGORIES.map((cat, index) => {
            const angle = (index / SKILL_CATEGORIES.length) * Math.PI * 2;
            const x = 50 + Math.cos(angle) * 35;
            const y = 50 + Math.sin(angle) * 35;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className="absolute w-20 h-20 md:w-28 md:h-28 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div 
                  className={cn(
                    "w-full h-full rounded-full border-2 border-white/10 flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm",
                    activeCategory === cat.id ? "border-spidey-red bg-spidey-red/10 scale-110 shadow-[0_0_30px_rgba(177,19,19,0.3)]" : "bg-white/5"
                  )}
                >
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="text-[10px] md:text-xs text-center font-bold uppercase tracking-widest px-2">{cat.title}</span>
                </div>
              </motion.div>
            );
          })}

          {/* Skill Tooltip/Panel */}
          <AnimatePresence>
            {activeCategory && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-[-50px] bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-xl z-50 w-full max-w-md shadow-2xl"
              >
                <h4 className="text-electric-blue font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                   <span>{SKILL_CATEGORIES.find(c => c.id === activeCategory)?.icon}</span>
                   {SKILL_CATEGORIES.find(c => c.id === activeCategory)?.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILL_CATEGORIES.find(c => c.id === activeCategory)?.skills.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-spidey-red hover:border-spidey-red transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
