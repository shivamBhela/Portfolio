import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';

// ─── Knowledge base built from portfolio data ────────────────────────────────
const quickReplies = [
  'Tell me about Shivam',
  'What projects has he built?',
  'What are his skills?',
  'Show me hackathons',
  'Research work?',
  'How to contact?'
];

const typing = (set: React.Dispatch<React.SetStateAction<boolean>>) => {
  set(true);
  return new Promise<void>(res => setTimeout(() => { set(false); res(); }, 900));
};

const ZibbiBot = () => {
  const { data } = usePortfolioData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! 👋 I'm **Zibbi**, Shivam's personal AI assistant. Ask me anything about his work, skills, hackathons, or how to reach him!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getResponse = (query: string): string => {
    const q = query.toLowerCase();

    // ── About / Who ────────────────────────────────────────────────────────
    if (q.match(/who|about|shivam|yourself|introduce|identity/)) {
      return `**${data.about.name}** is an AI & hardware developer based in India. 🚀\n\n${data.about.bio}\n\nHis focus areas include:\n${data.about.focusAreas?.map((a: any) => `  ${a.icon} ${a.title}`).join('\n')}`;
    }

    // ── Projects ───────────────────────────────────────────────────────────
    if (q.match(/project|build|deploy|code|repo|github|demo/)) {
      const projects = data.projects;
      if (!projects?.length) return "No projects found in the database yet — check back soon!";
      const list = projects.map((p: any) => `**${p.title}**\n  ↳ ${p.description}\n  🏷️ ${p.tags?.join(', ')}\n  💻 ${p.github}`).join('\n\n');
      return `Shivam has built ${projects.length} project(s) so far:\n\n${list}`;
    }

    // ── Skills ─────────────────────────────────────────────────────────────
    if (q.match(/skill|tech|stack|language|tool|expertise|know/)) {
      const skills = data.skills;
      if (!skills?.length) return "His skills are being catalogued — check the Skills section on the page!";
      const list = skills.map((s: any) => `**${s.title}**: ${s.items?.join(', ')}`).join('\n');
      return `Here's a breakdown of Shivam's technical arsenal:\n\n${list}`;
    }

    // ── Hackathons ─────────────────────────────────────────────────────────
    if (q.match(/hackathon|competition|hack|event|award|winner|runner/)) {
      const hacks = data.hackathons;
      if (!hacks?.length) return "No hackathon records found yet!";
      const list = hacks.map((h: any) => `🏆 **${h.name}** (${h.year})\n  📍 ${h.location || 'India'} | 🥇 ${h.achievement}\n  💡 ${h.problem}`).join('\n\n');
      return `Shivam has competed in ${hacks.length} hackathon(s):\n\n${list}`;
    }

    // ── Research ───────────────────────────────────────────────────────────
    if (q.match(/research|paper|publish|study|neural|bci|academic/)) {
      const research = data.research;
      if (!research?.length) return "Research papers coming soon — Shivam is actively working on publications!";
      const list = research.map((r: any) => `📄 **${r.title}** (${r.year})\n  Status: ${r.status}\n  Abstract: ${r.abstract}`).join('\n\n');
      return `Research by Shivam:\n\n${list}`;
    }

    // ── Certificates ───────────────────────────────────────────────────────
    if (q.match(/certificate|certif|course|learn|training|degree/)) {
      const certs = data.certificates;
      if (!certs?.length) return "Certificates section is being updated!";
      const list = certs.map((c: any) => `🎓 **${c.title}**\n  Issued by: ${c.issuer} | ${c.date}`).join('\n\n');
      return `Shivam's certifications:\n\n${list}`;
    }

    // ── Contact ────────────────────────────────────────────────────────────
    if (q.match(/contact|email|linkedin|reach|message|hire|connect|social/)) {
      return `Here's how you can reach Shivam:\n\n🔗 **LinkedIn**: [linkedin.com/in/shivam-bhela-110760312](https://www.linkedin.com/in/shivam-bhela-110760312/)\n💻 **GitHub**: [github.com/shivamBhela](https://github.com/shivamBhela)\n📧 **Email**: shivam@example.com\n\nFeel free to reach out for collaborations or opportunities!`;
    }

    // ── Help / Commands ────────────────────────────────────────────────────
    if (q.match(/help|what can you|command|option|menu/)) {
      return "I can help you explore Shivam's portfolio! Try asking me about:\n\n• 🛠️ **Projects** — What has he built?\n• 💡 **Skills** — What tech does he know?\n• 🏆 **Hackathons** — Competition wins\n• 📄 **Research** — Academic work\n• 🎓 **Certificates** — Credentials\n• 📬 **Contact** — How to reach him\n• 👤 **About** — Who is Shivam?";
    }

    // ── Fallback with context ──────────────────────────────────────────────
    const fallbacks = [
      `I'm not sure about that specifically — but I know Shivam is working on cutting-edge BCI and AI projects! Try asking about his **projects**, **skills**, or **hackathons**.`,
      `Great question! I'm still learning. You could rephrase or ask about Shivam's **work**, **research**, or **contact info**.`,
      `Hmm, I don't have a specific answer for that. Ask me about Shivam's **skills** or **achievements** — that's where I shine! 🌟`,
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSend = async (text?: string) => {
    const query = (text ?? input).trim();
    if (!query) return;

    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInput('');
    await typing(setIsTyping);
    setMessages(prev => [...prev, { role: 'assistant', content: getResponse(query) }]);
  };

  const renderContent = (content: string) => {
    // Very lightweight markdown: bold, newlines, links
    return content
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" class="underline text-electric-blue">$1</a>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="fixed bottom-10 right-10 z-[1000]">
      {/* Floating Trigger */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full bg-spidey-blue/20 border-2 border-electric-blue flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)] backdrop-blur-sm group"
      >
        <div className="absolute inset-0 rounded-full border border-electric-blue animate-ping opacity-20" />
        <span className="text-2xl group-hover:rotate-12 transition-transform">🤖</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, x: 20 }}
            className="absolute bottom-20 right-0 w-[380px] max-h-[560px] holographic-card rounded-2xl border-electric-blue/30 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-electric-blue/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-electric-blue">Zibbi — AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-electric-blue/20 border border-electric-blue/50 flex items-center justify-center text-[10px] mr-2 shrink-0 mt-1">🤖</div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                      msg.role === 'user'
                      ? 'bg-spidey-blue/40 border border-spidey-blue/50 text-white rounded-tr-none'
                      : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none'
                    }`}
                    dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
                  />
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-electric-blue/20 border border-electric-blue/50 flex items-center justify-center text-[10px] mr-2 shrink-0">🤖</div>
                  <div className="bg-white/5 border border-white/10 text-white/60 px-4 py-3 rounded-xl rounded-tl-none text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                {quickReplies.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:border-electric-blue/50 hover:bg-electric-blue/10 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 flex gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Zibbi anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-electric-blue transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping}
                className="p-2 aspect-square bg-electric-blue/20 text-electric-blue rounded-lg hover:bg-electric-blue hover:text-white transition-all shadow-[0_0_10px_rgba(0,242,255,0.2)] disabled:opacity-40"
              >
                ▲
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZibbiBot;
