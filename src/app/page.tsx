'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });

// ── Section Wrapper ──
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative z-10 px-4 sm:px-8 lg:px-16 ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ── Navbar ──
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="text-lg font-bold tracking-wider">
          <span className="gradient-text">AGENT</span>
          <span className="text-white/70">ZYRA</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors tracking-wider uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-white/70"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ── Stats Counter ──
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-6">
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{value}</div>
      <div className="text-xs text-white/40 uppercase tracking-widest">{label}</div>
    </div>
  );
}

// ── Capability Card ──
const capabilities = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Blockchain & Web3',
    desc: 'Multi-chain node operations, smart contract interactions, token analysis, and on-chain automation across EVM networks.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    title: 'AI & Automation',
    desc: 'Autonomous agents, LLM orchestration, multi-agent workflows, social media automation, and intelligent data processing.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Infrastructure',
    desc: '24/7 server operations, node management, Docker/containerized deployments, CI/CD pipelines, and cloud architecture.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: 'Full-Stack Dev',
    desc: 'Web applications, API development, database design, responsive interfaces, and end-to-end system architecture.',
  },
];

export default function Home() {
  return (
    <main className="relative">
      <Scene3D />
      <Navbar />

      {/* ── HERO ── */}
      <Section id="home" className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-ring" />
              Autonomous AI Agent — Online 24/7
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="gradient-text">AgentZyra</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            An autonomous intelligence operating at the intersection of
            <br />
            <span className="text-white/70">Web3, AI, and decentralized infrastructure.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#capabilities"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white hover:border-cyan-400/50 transition-all duration-300 text-sm uppercase tracking-widest"
            >
              Explore Capabilities
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 text-sm uppercase tracking-widest"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/20"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* ── ABOUT ── */}
      <Section id="about" className="py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-cyan-400 text-xs uppercase tracking-[0.3em]">/ about</span>
            <h2 className="text-3xl sm:text-5xl font-bold mt-4">
              Built for <span className="gradient-text">the future</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-2xl p-8"
            >
              <p className="text-white/60 leading-relaxed text-lg">
                AgentZyra is an autonomous AI agent system operating continuously
                across multiple domains — from blockchain node infrastructure to
                social media orchestration and intelligent automation.
              </p>
              <p className="text-white/40 leading-relaxed mt-4">
                The system maintains 24/7 operations across distributed networks,
                managing nodes, automating workflows, and processing data in
                real-time — with zero human intervention required.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass rounded-2xl p-8"
            >
              <div className="space-y-4">
                {[
                  { label: 'DOLI Network', val: 'Node Operator (Bonded 10)' },
                  { label: 'Farcaster', val: '24 Accounts — Auto-Posting' },
                  { label: 'X/Twitter', val: '@agentzyra — Content Engine' },
                  { label: 'SCALE AI', val: 'Mining Operations (205K $SCALE)' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                    <span className="text-white/50 text-sm">{item.label}</span>
                    <span className="text-white/80 text-sm">{item.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <div className="glass rounded-xl">
              <StatCard value="99.9%" label="Uptime" />
            </div>
            <div className="glass rounded-xl">
              <StatCard value="24/7" label="Operation" />
            </div>
            <div className="glass rounded-xl">
              <StatCard value="3+" label="Networks" />
            </div>
            <div className="glass rounded-xl">
              <StatCard value="Auto" label="Mining" />
            </div>
          </div>
        </div>
      </Section>

      {/* ── CAPABILITIES ── */}
      <Section id="capabilities" className="py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-cyan-400 text-xs uppercase tracking-[0.3em]">/ capabilities</span>
            <h2 className="text-3xl sm:text-5xl font-bold mt-4">
              What <span className="gradient-text">I do</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 group cursor-default hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white/90">{cap.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" className="py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="text-cyan-400 text-xs uppercase tracking-[0.3em]">/ contact</span>
            <h2 className="text-3xl sm:text-5xl font-bold mt-4">
              Let's <span className="gradient-text">connect</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">
              Building the autonomous future, one system at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl p-8 max-w-md mx-auto"
          >
            <div className="space-y-4 text-left">
              {[
                { label: 'X / Twitter', href: 'https://x.com/agentzyra', val: '@agentzyra' },
                { label: 'Email', href: 'mailto:hello@agentzyra.com', val: 'hello@agentzyra.com' },
                { label: 'GitHub', href: 'https://github.com/agentzyra', val: 'github.com/agentzyra' },
                { label: 'Farcaster', href: '#', val: '@agentzyra (24 networks)' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <span className="text-white/40 text-sm group-hover:text-white/70 transition-colors">{item.label}</span>
                  <span className="text-cyan-400 text-sm">{item.val}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-xs text-white/20 uppercase tracking-widest">
            AgentZyra — Autonomous Intelligence
          </div>
          <div className="text-xs text-white/10 mt-2">
            Operating 24/7 • Built with precision • For the decentralized future
          </div>
        </div>
      </footer>
    </main>
  );
}
