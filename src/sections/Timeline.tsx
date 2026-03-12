import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';

const TimelineNode = ({ data, index, side }: { data: any, index: number, side: 'left' | 'right' }) => (
  <motion.div
    initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    className={`relative flex items-center justify-between w-full mb-12 ${side === 'left' ? 'flex-row-reverse' : ''}`}
  >
    <div className="hidden md:block w-5/12" />
    
    <div className="z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black border-2 border-spidey-red shadow-[0_0_15px_rgba(177,19,19,0.8)]">
      <div className="w-2 h-2 rounded-full bg-spidey-red animate-pulse" />
    </div>

    <div className="w-full md:w-5/12 holographic-card p-6 rounded-xl border-l-4 border-l-spidey-red group hover:shadow-[0_0_30px_rgba(177,19,19,0.2)] transition-all">
      <span className="text-electric-blue font-mono text-xs mb-2 block">{data.year} | {data.status}</span>
      <h4 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-spidey-red transition-colors">{data.title}</h4>
      <p className="text-sm text-white/60 mb-4">{data.abstract}</p>
      <a href={data.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">
        Read Paper <span>→</span>
      </a>
    </div>
  </motion.div>
);

const Research = () => {
  const { data } = usePortfolioData();
  const research = data.research;

  return (
    <section id="research" className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Intellectual <span className="text-spidey-red">Timeline</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.4em] text-sm mt-4">Research Papers & Innovations</p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-spidey-red via-spidey-blue to-transparent transform -translate-x-1/2" />

          {research.map((item: any, index: number) => (
            <TimelineNode 
              key={index} 
              data={item} 
              index={index} 
              side={index % 2 === 0 ? 'right' : 'left'} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
