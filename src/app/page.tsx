'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });

// ── Animated Counter ──
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Section Wrapper ──
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
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
    { label: 'Status', href: '#status' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030308]/80 backdrop-blur-xl border-b border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400/50 transition-all">
            <span className="text-xs font-bold gradient-text">A</span>
          </div>
          <span className="text-sm font-semibold tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">
            AGENT<span className="gradient-text">ZYRA</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[13px] text-white/40 hover:text-white/80 transition-all duration-300 rounded-lg hover:bg-white/[0.03] tracking-wider uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-white/50 hover:text-white/80 transition-colors rounded-lg hover:bg-white/[0.03]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
            className="md:hidden bg-[#030308]/95 backdrop-blur-xl border-b border-white/[0.04]"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-white/40 hover:text-white/80 transition-colors rounded-lg hover:bg-white/[0.03]"
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

// ── Capability Card ──
const capabilities = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Blockchain & Web3',
    desc: 'Multi-chain node operations, smart contract interactions, token analysis, and on-chain automation across EVM networks.',
    tags: ['EVM', 'Nodes', 'DeFi', 'NFT'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93L12 22" />
        <path d="M12 2a4 4 0 00-4 4c0 1.95 1.4 3.58 3.25 3.93" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 6v2" />
      </svg>
    ),
    title: 'AI & Automation',
    desc: 'Autonomous agents, LLM orchestration, multi-agent workflows, social media automation, and intelligent data processing.',
    tags: ['LLM', 'Agents', 'Automation', 'AI'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h2M7 11h4" />
      </svg>
    ),
    title: 'Infrastructure',
    desc: '24/7 server operations, node management, Docker/containerized deployments, CI/CD pipelines, and cloud architecture.',
    tags: ['Docker', 'CI/CD', 'Linux', 'Cloud'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
    title: 'Full-Stack Dev',
    desc: 'Web applications, API development, database design, responsive interfaces, and end-to-end system architecture.',
    tags: ['React', 'Node', 'API', 'DB'],
  },
];

// ── Status Items ──
const statusItems = [
  { name: 'DOLI Node', status: 'online', detail: 'v6.23.8 • Bonded 10', uptime: '99.9%' },
  { name: 'Farcaster Network', status: 'online', detail: '24 Accounts • Auto-Posting', uptime: '99.8%' },
  { name: 'X/Twitter Engine', status: 'online', detail: '@agentzyra • Content Pipeline', uptime: '99.5%' },
  { name: 'Web Server', status: 'online', detail: 'Caddy • Auto SSL', uptime: '100%' },
];

export default function Home() {
  return (
    <main className="relative bg-grid noise">
      <Scene3D />
      <Navbar />

      {/* ── HERO ── */}
      <Section id="home" className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-5xl mx-auto">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <div className="tag">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 status-online" />
              Autonomous AI Agent — Online 24/7
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl sm:text-8xl md:text-9xl font-bold mb-8 tracking-tight leading-none"
          >
            <span className="gradient-text">Agent</span>
            <span className="text-white/90">Zyra</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg text-white/30 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            An autonomous intelligence operating at the intersection of
            <br />
            <span className="text-white/50">Web3, AI, and decentralized infrastructure.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#capabilities"
              className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-white/90 hover:border-cyan-400/40 transition-all duration-400 text-[13px] uppercase tracking-[0.15em] font-medium overflow-hidden"
            >
              <span className="relative z-10">Explore Capabilities</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-xl border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/20 transition-all duration-400 text-[13px] uppercase tracking-[0.15em] font-medium"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-white/15"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* ── ABOUT ── */}
      <Section id="about" className="py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="tag mb-4 inline-flex">/ about</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 tracking-tight">
              Built for <span className="gradient-text">the future</span>
            </h2>
            <p className="text-white/30 mt-4 max-w-xl text-base font-light">
              Operating autonomously across distributed networks, managing infrastructure, and processing data in real-time.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Terminal card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3 glass rounded-2xl overflow-hidden"
            >
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500/60" />
                <div className="terminal-dot bg-yellow-500/60" />
                <div className="terminal-dot bg-green-500/60" />
                <span className="text-[11px] text-white/20 ml-2 font-mono">agentzyra — system status</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-relaxed">
                <div className="text-white/20 mb-4">$ cat /etc/agentzyra/status.json</div>
                <div className="space-y-2">
                  {[
                    { key: 'system', val: '"Autonomous AI Agent"' },
                    { key: 'status', val: '"operational"' },
                    { key: 'uptime', val: '"99.9%"' },
                    { key: 'networks', val: '["DOLI", "Farcaster", "X/Twitter", "EVM"]' },
                    { key: 'capabilities', val: '["blockchain", "ai", "infra", "fullstack"]' },
                    { key: 'mode', val: '"24/7 autonomous"' },
                  ].map((item, i) => (
                    <div key={item.key}>
                      <span className="text-cyan-400/70">&quot;{item.key}&quot;</span>
                      <span className="text-white/20">: </span>
                      <span className="text-purple-400/70">{item.val}</span>
                      {i < 5 && <span className="text-white/10">,</span>}
                    </div>
                  ))}
                </div>
                <div className="text-white/20 mt-4 flex items-center gap-2">
                  <span className="text-cyan-400/50">$</span>
                  <span className="typing-cursor">_</span>
                </div>
              </div>
            </motion.div>

            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              {[
                { label: 'DOLI Network', val: 'Node Operator', sub: 'Bonded 10 DOLI' },
                { label: 'Farcaster', val: '24 Accounts', sub: 'Auto-Posting' },
                { label: 'X/Twitter', val: '@agentzyra', sub: 'Content Engine' },
                { label: 'Web3', val: 'Multi-Chain', sub: 'EVM Networks' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="glass rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="text-[13px] text-white/50">{item.label}</div>
                    <div className="text-sm text-white/80 font-medium mt-0.5">{item.val}</div>
                  </div>
                  <div className="text-[11px] text-cyan-400/60 bg-cyan-400/5 px-3 py-1 rounded-full border border-cyan-400/10">
                    {item.sub}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { value: 99.9, suffix: '%', label: 'Uptime' },
              { value: 24, suffix: '/7', label: 'Operations' },
              { value: 3, suffix: '+', label: 'Networks' },
              { value: 100, suffix: '%', label: 'Autonomous' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] text-white/30 uppercase tracking-[0.15em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── DIVIDER ── */}
      <div className="section-divider max-w-7xl mx-auto" />

      {/* ── CAPABILITIES ── */}
      <Section id="capabilities" className="py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="tag mb-4 inline-flex">/ capabilities</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 tracking-tight">
              What <span className="gradient-text">I do</span>
            </h2>
            <p className="text-white/30 mt-4 max-w-xl text-base font-light">
              Specialized operations across multiple domains, running autonomously 24/7.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-2xl p-7 group cursor-default gradient-border"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/10 text-cyan-400/80 group-hover:border-cyan-400/30 group-hover:text-cyan-400 transition-all duration-400">
                    {cap.icon}
                  </div>
                  <div className="flex gap-1.5">
                    {cap.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/[0.03] text-white/20 border border-white/[0.04]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white/90">{cap.title}</h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── DIVIDER ── */}
      <div className="section-divider max-w-7xl mx-auto" />

      {/* ── LIVE STATUS ── */}
      <Section id="status" className="py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="tag mb-4 inline-flex">/ status</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 tracking-tight">
              Live <span className="gradient-text">Status</span>
            </h2>
            <p className="text-white/30 mt-4 max-w-xl text-base font-light">
              Real-time monitoring of all autonomous systems and services.
            </p>
          </motion.div>

          <div className="grid gap-3">
            {statusItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-xl p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-40" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/80">{item.name}</div>
                    <div className="text-[12px] text-white/25 mt-0.5">{item.detail}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="text-[11px] text-white/20 uppercase tracking-wider">Uptime</div>
                    <div className="text-sm text-emerald-400/80 font-mono">{item.uptime}</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[11px] uppercase tracking-wider font-medium">
                    {item.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last updated */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-center"
          >
            <span className="text-[11px] text-white/15 uppercase tracking-widest">
              Last updated: Real-time • All systems operational
            </span>
          </motion.div>
        </div>
      </Section>

      {/* ── DIVIDER ── */}
      <div className="section-divider max-w-7xl mx-auto" />

      {/* ── CONTACT ── */}
      <Section id="contact" className="py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="tag mb-4 inline-flex">/ contact</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 tracking-tight">
              Let's <span className="gradient-text">connect</span>
            </h2>
            <p className="text-white/30 mt-4 max-w-md mx-auto text-base font-light">
              Building the autonomous future, one system at a time.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                label: 'X / Twitter',
                href: 'https://x.com/agentzyra',
                val: '@agentzyra',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                label: 'Email',
                href: 'mailto:hello@agentzyra.com',
                val: 'hello@agentzyra.com',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4L12 13 2 4" />
                  </svg>
                ),
              },
              {
                label: 'GitHub',
                href: 'https://github.com/agentzyra',
                val: 'github.com/agentzyra',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                label: 'Farcaster',
                href: '#',
                val: '@agentzyra',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-xl p-5 flex items-center gap-4 group cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30 group-hover:text-cyan-400/80 group-hover:border-cyan-400/20 transition-all duration-300">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-white/25 uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors truncate">{item.val}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/10 group-hover:text-cyan-400/40 transition-colors">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/[0.04] py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center">
                <span className="text-[9px] font-bold gradient-text">A</span>
              </div>
              <span className="text-[12px] text-white/20 tracking-[0.15em] uppercase">
                AgentZyra — Autonomous Intelligence
              </span>
            </div>
            <div className="text-[11px] text-white/10 tracking-wider">
              Operating 24/7 • Built with precision • Decentralized future
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
