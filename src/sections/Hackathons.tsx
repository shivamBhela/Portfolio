import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Hackathons = () => {
  const { data } = usePortfolioData();
  const hackathons = data.hackathons;
  const [showAll, setShowAll] = React.useState(false);
  const [selectedHack, setSelectedHack] = React.useState<any>(null);

  const visibleHackathons = showAll ? hackathons : hackathons.slice(0, 3);

  return (
    <section id="hackathons" className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Hackathon <span className="text-spidey-red">Arena</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.4em] text-sm mt-4">Battlefields of Innovation</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-spidey-red via-spidey-blue to-transparent transform md:-translate-x-1/2" />

          {visibleHackathons.map((hack: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center justify-between w-full mb-24 md:mb-32 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Spacer for desktop */}
              <div className="hidden md:block w-5/12" />

              {/* Central Node */}
              <div className="absolute left-4 md:left-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black border-2 border-spidey-red transform -translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-spidey-red animate-pulse" />
              </div>

              {/* Content Card */}
              <div 
                onClick={() => setSelectedHack(hack)}
                className="w-[calc(100%-60px)] ml-12 md:ml-0 md:w-5/12 holographic-card p-0 rounded-2xl overflow-hidden group hover:border-spidey-red/50 transition-all cursor-pointer"
              >
                <div className="h-40 md:h-48 overflow-hidden relative">
                  <img 
                    src={hack.image} 
                    alt={hack.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 flex gap-2">
                    <span className="bg-spidey-red text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm">
                      {hack.achievement}
                    </span>
                    {hack.location && (
                      <span className="bg-white/10 backdrop-blur-md text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm border border-white/10">
                        {hack.location}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-5 md:p-8 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                    <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight leading-none group-hover:text-spidey-red transition-colors">
                      {hack.name}
                    </h3>
                    <span className="text-electric-blue font-mono text-xs md:text-sm">{hack.year}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">Problem Statement</p>
                      <p className="text-xs md:text-sm text-white/70 italic leading-relaxed line-clamp-2">"{hack.problem}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hackathons.length > 3 && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all hover:border-spidey-red"
            >
              {showAll ? 'Show Less' : 'Show All Records'}
            </button>
          </div>
        )}

        {/* Gallery / Detail Modal */}
        <AnimatePresence>
          {selectedHack && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setSelectedHack(null)}
            >
              <div 
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto holographic-card rounded-2xl p-8 space-y-8"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{selectedHack.name}</h2>
                    <p className="text-spidey-red font-mono text-sm uppercase tracking-widest mt-2">
                      {selectedHack.year} • {selectedHack.achievement} • {selectedHack.location}
                    </p>
                  </div>
                  <button onClick={() => setSelectedHack(null)} className="text-white/40 hover:text-white text-2xl">✕</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2">Problem Statement</h4>
                      <p className="text-white/70 leading-relaxed italic">"{selectedHack.problem}"</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2">Project Details</h4>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm text-white/60 whitespace-pre-wrap">
                         {selectedHack.longDescription || "Full implementation details and gallery views of the solution."}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest font-black text-white/40">Gallery</h4>
                    <div className="grid grid-cols-2 gap-2">
                       <div className="aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10">
                          <img src={selectedHack.image} className="w-full h-full object-cover" />
                       </div>
                       {selectedHack.gallery?.map((img: string, i: number) => (
                         <div key={i} className="aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10">
                            <img src={img} className="w-full h-full object-cover" />
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hackathons;
