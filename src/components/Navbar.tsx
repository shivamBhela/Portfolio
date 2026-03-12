import React from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ onAdminClick }: { onAdminClick: () => void }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-[500] px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/20 border-b border-white/5"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-spidey-red flex items-center justify-center font-black text-xs shadow-[0_0_10px_rgba(177,19,19,0.5)]">S</div>
        <span className="font-black uppercase tracking-[0.2em] text-sm hidden md:block">Spidey <span className="text-spidey-red">Portfolio</span></span>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 md:gap-6">
        {['Home', 'About', 'Skills', 'Projects', 'Research', 'Hackathons', 'Certificates', 'Contact'].map(item => (
          <a 
            key={item} 
            href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
            className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.15em] md:tracking-[0.3em] text-white/60 hover:text-spidey-red transition-all duration-300"
          >
            {item}
          </a>
        ))}
      </div>

      <button 
        onClick={onAdminClick}
        className="px-4 py-2 border border-spidey-red/30 text-spidey-red text-[10px] uppercase font-bold tracking-widest hover:bg-spidey-red hover:text-white transition-all rounded-sm"
      >
        Admin
      </button>
    </motion.nav>
  );
};

export default Navbar;
