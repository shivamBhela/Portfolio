import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Certificates = () => {
  const { data } = usePortfolioData();
  const certificates = data.certificates;

  return (
    <section id="certificates" className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Verified <span className="text-spidey-blue">Assets</span>
          </h2>
          <a 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-spidey-blue text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-spidey-blue transition-all"
          >
            LinkedIn Profile
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="holographic-card rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-spidey-blue/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold uppercase tracking-tight mb-1">{cert.title}</h4>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-4">{cert.issuer} • {cert.date}</p>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[10px] font-black uppercase tracking-widest text-electric-blue border-b border-electric-blue/30 hover:border-electric-blue transition-all"
                >
                  View Certificate Protocol
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
