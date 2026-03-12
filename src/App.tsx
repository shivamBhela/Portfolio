import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Background from './components/Background';
import ZibbiBot from './chatbot/ZibbiBot';

// Animations
import ScrollCinematic from './animations/ScrollCinematic';
// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Research from './sections/Timeline';
import Hackathons from './sections/Hackathons';
import Certificates from './sections/Certificates';
import GithubActivity from './sections/GithubActivity';
import AdminPanel from './admin/AdminPanel';

const Contact = () => (
  <section id="contact" className="relative py-20 md:py-28 flex flex-col items-center justify-center overflow-hidden">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
        Bridge the <span className="text-spidey-red">Multiverse</span>
      </h2>
      <p className="text-white/40 uppercase tracking-[0.4em] text-sm mt-4">Initialize secure communication channel</p>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl px-4">
      {[
        { label: 'LinkedIn', icon: '🔗', color: '#0077b5', url: 'https://www.linkedin.com/in/shivam-bhela-110760312/' },
        { label: 'GitHub', icon: '📁', color: '#333', url: 'https://github.com/shivamBhela' },
        { label: 'Official Email', icon: '📧', color: '#b11313', url: 'mailto:shivambhela8@gmail.com' },
        { label: 'College Mail', icon: '🎓', color: '#2563eb', url: 'mailto:24BIT70006@cumail.in' }
      ].map((social, i) => (
        <motion.a
          key={i}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -10, scale: 1.05 }}
          className="holographic-card p-8 rounded-2xl flex flex-col items-center gap-4 group transition-all"
        >
          <span className="text-4xl group-hover:scale-125 transition-transform">{social.icon}</span>
          <span className="font-black uppercase tracking-widest text-sm">{social.label}</span>
          <div className="w-8 h-1 bg-white/20 group-hover:bg-spidey-red group-hover:w-full transition-all duration-500" />
        </motion.a>
      ))}
    </div>

    <footer className="mt-32 pb-10 text-center">
      <p className="text-white/20 text-[10px] uppercase tracking-[0.5em]">
        © 2026 Shivam Bhela • All Rights Reserved
      </p>
    </footer>
  </section>
);

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <main className="relative bg-black text-white selection:bg-spidey-red selection:text-white min-h-screen cursor-default">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        <Navbar onAdminClick={() => setIsAdminOpen(true)} />
        <Background />

        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Research />
            <Hackathons />
            <Certificates />
            <GithubActivity />
            <Contact />
          </div>
        </div>

        <ZibbiBot />
        <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </motion.div>
    </main>
  );
}

export default App;
