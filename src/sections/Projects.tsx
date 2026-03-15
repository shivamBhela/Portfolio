import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Projects = () => {
  const { data } = usePortfolioData();
  const projects = data.projects;
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="relative min-h-screen py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
              Major <span className="text-spidey-red">Deployments</span>
            </h2>
            <p className="text-white/40 uppercase tracking-[0.4em] text-sm mt-4">Project Database - Unauthorized Access Detected</p>
          </div>
          <div className="text-electric-blue font-mono text-sm border-l-2 border-electric-blue pl-4">
            Total Projects: {projects.length} <br/>
            Security Level: Avenger
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative min-h-[320px] md:min-h-[400px] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Web Overlay on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                 <svg viewBox="0 0 100 100" className="w-full h-full stroke-white stroke-[0.2] fill-none">
                    <path d="M50,50 L0,0 M50,50 L100,0 M50,50 L100,100 M50,50 L0,100 M50,50 L0,50 M50,50 L100,50 M50,50 L50,0 M50,50 L50,100" />
                    <circle cx="50" cy="50" r="10" />
                    <circle cx="50" cy="50" r="20" />
                    <circle cx="50" cy="50" r="30" />
                 </svg>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-electric-blue bg-electric-blue/10 border border-electric-blue/20 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight group-hover:text-spidey-red transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/70 line-clamp-3 max-w-md group-hover:text-white transition-colors">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-6 pt-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`text-xs uppercase tracking-[0.2em] font-bold border-b border-white hover:border-spidey-red hover:text-spidey-red transition-all ${project.github === '#' ? 'opacity-30 pointer-events-none' : ''}`}
                    >
                      {project.github === '#' ? 'Repo Locked' : 'Source Code'}
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`text-xs uppercase tracking-[0.2em] font-bold border-b border-white hover:border-electric-blue hover:text-electric-blue transition-all ${project.demo === '#' ? 'opacity-30 pointer-events-none' : ''}`}
                    >
                      {project.demo === '#' ? 'Demo Offline' : 'Live Demo'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Glowing Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-spidey-red/40 to-transparent -translate-y-full -translate-x-full group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Gallery / Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <div 
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto holographic-card rounded-2xl p-8 space-y-8"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{selectedProject.title}</h2>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedProject.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-electric-blue bg-electric-blue/10 border border-electric-blue/20 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="text-white/40 hover:text-white text-2xl">✕</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2">Project Overview</h4>
                      <p className="text-white/70 leading-relaxed italic">"{selectedProject.description}"</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-2">Implementation Details</h4>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm text-white/60 whitespace-pre-wrap">
                         {selectedProject.longDescription || "Detailed description coming soon."}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 pt-4">
                      <a 
                        href={selectedProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`px-6 py-2 bg-spidey-red text-white text-xs uppercase tracking-[0.2em] font-bold rounded hover:shadow-[0_0_15px_rgba(177,19,19,0.5)] transition-all ${selectedProject.github === '#' ? 'opacity-30 pointer-events-none' : ''}`}
                      >
                        {selectedProject.github === '#' ? 'Locked' : 'View Code'}
                      </a>
                      <a 
                        href={selectedProject.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`text-xs uppercase tracking-[0.2em] font-bold border-b border-white hover:border-electric-blue hover:text-electric-blue transition-all ${selectedProject.demo === '#' ? 'opacity-30 pointer-events-none' : ''}`}
                      >
                        {selectedProject.demo === '#' ? 'Offline' : 'Live Demo'}
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-widest font-black text-white/40">Gallery</h4>
                    <div className="grid grid-cols-2 gap-2">
                       <div className="aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10">
                          <img src={selectedProject.image} className="w-full h-full object-cover" alt="Main cover" />
                       </div>
                       {selectedProject.gallery?.map((img: string, i: number) => (
                         <div key={i} className="aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10">
                            <img src={img} className="w-full h-full object-cover" alt={`Gallery item ${i}`} />
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

export default Projects;
