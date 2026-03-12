import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';

// ─── Reusable styled input ────────────────────────────────────────────────────
const Field = ({ label, value, onChange, type = 'text', rows }: any) => (
  <div>
    <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">{label}</label>
    {rows ? (
      <textarea rows={rows} value={value} onChange={onChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-electric-blue focus:outline-none transition-all" />
    ) : (
      <input type={type} value={value} onChange={onChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-electric-blue focus:outline-none transition-all" />
    )}
  </div>
);

// ─── Upload label ─────────────────────────────────────────────────────────────
const ImageUploadLabel = ({ src, onChange }: { src?: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="w-32 h-20 bg-white/10 rounded overflow-hidden relative group">
    {src ? <img src={src} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-white/20">NO IMG</div>}
    <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-[10px] font-bold">
      UPLOAD
      <input type="file" className="hidden" accept="image/*" onChange={onChange} />
    </label>
  </div>
);

// ─── Section Header with Add button ──────────────────────────────────────────
const SectionHeader = ({ title, accent, onAdd }: { title: string; accent: string; onAdd: () => void }) => (
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-black uppercase tracking-tight">{title} <span className="text-spidey-red">{accent}</span></h3>
    <button onClick={onAdd} className="bg-electric-blue text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded hover:opacity-90 transition">
      + Add New
    </button>
  </div>
);

// ─── Save / Clear bar ─────────────────────────────────────────────────────────
const SaveBar = ({ onSave, onClear, saved }: { onSave: () => void; onClear: () => void; saved: boolean }) => (
  <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-6">
    <button onClick={onSave} className="px-6 py-2 bg-spidey-red text-white font-black uppercase tracking-[0.15em] text-[10px] rounded hover:shadow-[0_0_20px_rgba(177,19,19,0.5)] transition-all">
      Save Changes
    </button>
    <button onClick={onClear} className="px-6 py-2 bg-white/5 border border-white/10 text-white/60 font-black uppercase tracking-[0.15em] text-[10px] rounded hover:bg-white/10 transition-all">
      Clear / Reset
    </button>
    {saved && <span className="text-green-400 text-[10px] uppercase font-bold animate-pulse">✓ Saved!</span>}
  </div>
);

// ─── AdminPanel ───────────────────────────────────────────────────────────────
const AdminPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'hero' | 'about' | 'projects' | 'hackathons' | 'certificates' | 'research'>('overview');
  const [savedFlag, setSavedFlag] = useState(false);

  const { data, addItem, removeItem, editItem, updateSection } = usePortfolioData();

  const handleLogin = () => {
    if (password === '8621') { setIsAuthenticated(true); setError(''); }
    else { setError('Access Denied. Invalid Authorization Code.'); setPassword(''); }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => cb(reader.result as string);
    reader.readAsDataURL(file);
  };

  const triggerSave = () => {
    setSavedFlag(true);
    setTimeout(() => setSavedFlag(false), 2500);
    // Data is already auto-saved to localStorage via usePortfolioData hook
  };

  const triggerClear = () => {
    if (confirm('Reset all portfolio data to defaults? This cannot be undone.')) {
      localStorage.removeItem('shivam_portfolio_data');
      window.location.reload();
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'research', label: 'Research' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div className="w-full max-w-5xl h-[85vh] holographic-card rounded-2xl border-spidey-red/30 p-0 relative overflow-hidden flex flex-col">
            <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white/40 hover:text-white bg-black/50 w-8 h-8 rounded-full flex items-center justify-center">✕</button>

            {!isAuthenticated ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-8 w-full max-w-xs">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-spidey-red">Admin Interface</h2>
                    <p className="text-white/40 text-xs uppercase tracking-[0.4em] mt-1">Restricted Access Protocol</p>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleLogin()}
                      placeholder="Enter Access Key"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center tracking-[1em] focus:outline-none focus:border-spidey-red transition-all"
                    />
                    {error && <p className="text-spidey-red text-xs font-bold uppercase tracking-widest animate-pulse">{error}</p>}
                    <button onClick={handleLogin} className="w-full py-3 bg-spidey-red text-white font-black uppercase tracking-[0.2em] rounded-lg hover:shadow-[0_0_20px_rgba(177,19,19,0.4)] transition-all">
                      Authenticate
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-56 shrink-0 border-r border-white/10 bg-white/5 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">Management</h3>
                    <div className="space-y-1">
                      {tabs.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-spidey-red text-white' : 'hover:bg-white/5 text-white/60'}`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setIsAuthenticated(false)} className="w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-spidey-red transition-colors">
                    Terminate Session
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-black/40 space-y-6">

                  {/* ── Overview ─────────────────────────────────────────── */}
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-black uppercase tracking-tight">System <span className="text-spidey-red">Dashboard</span></h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { label: 'Projects', value: data.projects.length },
                          { label: 'Hackathons', value: data.hackathons.length },
                          { label: 'Certificates', value: data.certificates.length },
                          { label: 'Research Papers', value: data.research.length },
                          { label: 'Skills', value: data.skills.length },
                        ].map(stat => (
                          <div key={stat.label} className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
                            <p className="text-3xl font-black italic">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-sm text-white/50">
                        All edits are <span className="text-green-400 font-bold">auto-saved</span> to your browser. Use <kbd className="bg-white/10 px-2 py-0.5 rounded text-[10px]">Save Changes</kbd> on any tab to confirm, or <kbd className="bg-white/10 px-2 py-0.5 rounded text-[10px]">Clear / Reset</kbd> to wipe all data.
                      </div>
                    </div>
                  )}

                  {/* ── Hero ─────────────────────────────────────────────── */}
                  {activeTab === 'hero' && (
                    <div className="space-y-5 max-w-2xl">
                      <h3 className="text-xl font-black uppercase tracking-tight">Hero <span className="text-spidey-red">Interface</span></h3>
                      <div className="flex gap-6 items-start">
                        <div className="w-40 h-24 bg-white/5 rounded overflow-hidden relative group">
                          {data.about.heroImage && <img src={data.about.heroImage} className="w-full h-full object-cover" />}
                          <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-[10px] font-bold">
                            UPLOAD
                            <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => updateSection('about', { ...data.about, heroImage: url }))} />
                          </label>
                        </div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">Upload the portrait image for the Hero section.</p>
                      </div>
                      <Field label="Main Greeting" value={data.about.heroTitle || 'Hello Everyone'} onChange={(e: any) => updateSection('about', { ...data.about, heroTitle: e.target.value })} />
                      <Field label="Sub-headline" value={data.about.heroSubtitle || data.about.title} onChange={(e: any) => updateSection('about', { ...data.about, heroSubtitle: e.target.value })} rows={3} />
                      <SaveBar onSave={triggerSave} onClear={triggerClear} saved={savedFlag} />
                    </div>
                  )}

                  {/* ── About ────────────────────────────────────────────── */}
                  {activeTab === 'about' && (
                    <div className="space-y-5 max-w-2xl">
                      <h3 className="text-xl font-black uppercase tracking-tight">Edit Bio <span className="text-spidey-red">Protocol</span></h3>
                      <Field label="Display Name" value={data.about.name} onChange={(e: any) => updateSection('about', { ...data.about, name: e.target.value })} />
                      <Field label="Technical Title" value={data.about.title} onChange={(e: any) => updateSection('about', { ...data.about, title: e.target.value })} />
                      <Field label="Biography" value={data.about.bio} onChange={(e: any) => updateSection('about', { ...data.about, bio: e.target.value })} rows={5} />
                      <SaveBar onSave={triggerSave} onClear={triggerClear} saved={savedFlag} />
                    </div>
                  )}

                  {/* ── Projects ─────────────────────────────────────────── */}
                  {activeTab === 'projects' && (
                    <div className="space-y-4">
                      <SectionHeader title="Project" accent="Deployments" onAdd={() => addItem('projects', { title: 'New Project', description: '', image: '', tags: [], github: '#', demo: '#' })} />
                      {data.projects.map((proj: any) => (
                        <div key={proj.id} className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
                          <div className="flex gap-5">
                            <ImageUploadLabel src={proj.image} onChange={e => handleImageUpload(e, url => editItem('projects', proj.id, { ...proj, image: url }))} />
                            <div className="flex-1 space-y-2">
                              <input type="text" value={proj.title} placeholder="Project Title" onChange={e => editItem('projects', proj.id, { ...proj, title: e.target.value })} className="bg-transparent text-base font-bold w-full focus:outline-none border-b border-transparent focus:border-electric-blue transition-all" />
                              <input type="text" value={proj.github} placeholder="GitHub URL" onChange={e => editItem('projects', proj.id, { ...proj, github: e.target.value })} className="bg-transparent text-[10px] text-white/40 block w-full focus:outline-none" />
                            </div>
                            <button onClick={() => removeItem('projects', proj.id)} className="text-spidey-red text-[10px] font-bold uppercase self-start">Delete</button>
                          </div>
                          <textarea value={proj.description} placeholder="Project Description" onChange={e => editItem('projects', proj.id, { ...proj, description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-electric-blue" />
                        </div>
                      ))}
                      <SaveBar onSave={triggerSave} onClear={triggerClear} saved={savedFlag} />
                    </div>
                  )}

                  {/* ── Hackathons ────────────────────────────────────────── */}
                  {activeTab === 'hackathons' && (
                    <div className="space-y-4">
                      <SectionHeader title="Hackathon" accent="Records" onAdd={() => addItem('hackathons', { name: 'New Hackathon', problem: '', year: '2025', achievement: '', teamSize: 1, image: '', location: '', gallery: [] })} />
                      {data.hackathons.map((hack: any) => (
                        <div key={hack.id} className="bg-white/5 p-6 rounded-xl border border-white/10 flex gap-5">
                          <div className="shrink-0">
                            <ImageUploadLabel src={hack.image} onChange={e => handleImageUpload(e, url => editItem('hackathons', hack.id, { ...hack, image: url }))} />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex gap-4">
                              <input type="text" value={hack.name} placeholder="Hackathon Name" onChange={e => editItem('hackathons', hack.id, { ...hack, name: e.target.value })} className="bg-transparent text-base font-bold flex-1 focus:outline-none border-b border-transparent focus:border-electric-blue transition-all" />
                              <input type="text" value={hack.year} placeholder="Year" onChange={e => editItem('hackathons', hack.id, { ...hack, year: e.target.value })} className="bg-transparent text-[10px] font-mono text-electric-blue w-16 text-right focus:outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <input type="text" value={hack.achievement} placeholder="Achievement" onChange={e => editItem('hackathons', hack.id, { ...hack, achievement: e.target.value })} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] w-full" />
                              <input type="text" value={hack.location || ''} placeholder="Location" onChange={e => editItem('hackathons', hack.id, { ...hack, location: e.target.value })} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] w-full" />
                            </div>
                            <textarea value={hack.problem} placeholder="Problem Statement" onChange={e => editItem('hackathons', hack.id, { ...hack, problem: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none" />
                          </div>
                          <button onClick={() => removeItem('hackathons', hack.id)} className="text-spidey-red text-[10px] font-bold uppercase self-start">Delete</button>
                        </div>
                      ))}
                      <SaveBar onSave={triggerSave} onClear={triggerClear} saved={savedFlag} />
                    </div>
                  )}

                  {/* ── Certificates ─────────────────────────────────────── */}
                  {activeTab === 'certificates' && (
                    <div className="space-y-4">
                      <SectionHeader title="Certificate" accent="Registry" onAdd={() => addItem('certificates', { title: 'New Certificate', issuer: '', date: '', image: '', link: '#' })} />
                      {data.certificates.map((cert: any) => (
                        <div key={cert.id} className="bg-white/5 p-6 rounded-xl border border-white/10 flex gap-5">
                          <ImageUploadLabel src={cert.image} onChange={e => handleImageUpload(e, url => editItem('certificates', cert.id, { ...cert, image: url }))} />
                          <div className="flex-1 space-y-3">
                            <input type="text" value={cert.title} placeholder="Certificate Title" onChange={e => editItem('certificates', cert.id, { ...cert, title: e.target.value })} className="bg-transparent text-base font-bold w-full focus:outline-none border-b border-transparent focus:border-electric-blue transition-all" />
                            <div className="grid grid-cols-2 gap-3">
                              <input type="text" value={cert.issuer} placeholder="Issuer (e.g. Coursera)" onChange={e => editItem('certificates', cert.id, { ...cert, issuer: e.target.value })} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] w-full" />
                              <input type="text" value={cert.date} placeholder="Date (e.g. Dec 2024)" onChange={e => editItem('certificates', cert.id, { ...cert, date: e.target.value })} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] w-full" />
                            </div>
                            <input type="text" value={cert.link} placeholder="Certificate Link" onChange={e => editItem('certificates', cert.id, { ...cert, link: e.target.value })} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] w-full" />
                          </div>
                          <button onClick={() => removeItem('certificates', cert.id)} className="text-spidey-red text-[10px] font-bold uppercase self-start">Delete</button>
                        </div>
                      ))}
                      <SaveBar onSave={triggerSave} onClear={triggerClear} saved={savedFlag} />
                    </div>
                  )}

                  {/* ── Research ──────────────────────────────────────────── */}
                  {activeTab === 'research' && (
                    <div className="space-y-4">
                      <SectionHeader title="Research" accent="Papers" onAdd={() => addItem('research', { title: 'New Research', abstract: '', year: '2025', status: 'Ongoing', link: '#' })} />
                      {data.research.map((res: any) => (
                        <div key={res.id} className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-3">
                          <div className="flex gap-4 items-start">
                            <input type="text" value={res.title} placeholder="Research Title" onChange={e => editItem('research', res.id, { ...res, title: e.target.value })} className="bg-transparent text-base font-bold flex-1 focus:outline-none border-b border-transparent focus:border-electric-blue transition-all" />
                            <button onClick={() => removeItem('research', res.id)} className="text-spidey-red text-[10px] font-bold uppercase shrink-0">Delete</button>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <input type="text" value={res.year} placeholder="Year" onChange={e => editItem('research', res.id, { ...res, year: e.target.value })} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] w-full" />
                            <input type="text" value={res.status} placeholder="Status (Published/Ongoing)" onChange={e => editItem('research', res.id, { ...res, status: e.target.value })} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] w-full" />
                            <input type="text" value={res.link} placeholder="Paper Link" onChange={e => editItem('research', res.id, { ...res, link: e.target.value })} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] w-full" />
                          </div>
                          <textarea value={res.abstract} placeholder="Abstract / Summary" onChange={e => editItem('research', res.id, { ...res, abstract: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-electric-blue" />
                        </div>
                      ))}
                      <SaveBar onSave={triggerSave} onClear={triggerClear} saved={savedFlag} />
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
