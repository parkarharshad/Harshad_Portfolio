import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowDown, ArrowUpRight, ArrowUpRight as Arrow, Grid2x2, ArrowUp } from 'lucide-react'
import { BackgroundBeams } from './ui/background-beams'
import { Spotlight } from './ui/spotlight'

const WORDS = ['Simplified', 'Modernized', 'Engineered']

const STATS = [
  { num: '5+',   l1: 'Years',   l2: 'Experience', desc: 'Years crafting enterprise B2B platforms and design systems at scale.', Icon: Arrow },
  { num: '5+',   l1: 'Digital', l2: 'Platforms',  desc: 'End-to-end platforms designed from research to production-ready handoff.', Icon: Grid2x2 },
  { num: '400+', l1: 'Screens', l2: 'Shipped',    desc: 'High-fidelity screens shipped across dashboards, mobile apps and IoT tools.', Icon: ArrowUp },
]

export function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])

  const fs = 'clamp(26px, 5vw, 56px)'

  const staticStyle: React.CSSProperties = {
    fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
    fontWeight: 800,
    fontSize: fs,
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
    color: '#fff',
  }

  const pillStyle: React.CSSProperties = {
    fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
    fontWeight: 800,
    fontSize: fs,
    letterSpacing: '-0.01em',
    lineHeight: 1,
    color: '#fff',
    display: 'block',
  }

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#000' }}>

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right,rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,#000 50%,transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,#000 50%,transparent 100%)' }} />
      <BackgroundBeams />

      <div className="page-container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 'clamp(100px, 14vw, 140px)', paddingBottom: 'clamp(40px, 6vw, 80px)' }}>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.02)', marginBottom: 'clamp(24px, 4vw, 52px)' }}>
          <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
            <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff', opacity: .35 }} />
            <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
          </span>
          <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 'clamp(9px, 1.5vw, 11px)', letterSpacing: '.12em', color: '#a1a1aa', textTransform: 'uppercase' }}>Open to full-time roles · Pune, India</span>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .2 }}
          style={{ marginBottom: 'clamp(20px, 4vw, 36px)', width: '100%' }}>
          <div style={{ ...staticStyle, display: 'block', marginBottom: 16 }}>I Craft Digital</div>

          {/* Pill row — wraps on mobile */}
          <div className="hero-pill-row">
            <motion.span
              layout
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, padding: '6px 24px', background: '#4f46e5', minWidth: 'clamp(160px, 28vw, 280px)', maxWidth: '100%' }}
              transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[index]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={pillStyle}
                >
                  {WORDS[index]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
            <span style={staticStyle}>Platforms.</span>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .4 }}
          style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 'clamp(13px, 2vw, 16px)', color: '#71717a', lineHeight: 1.6, marginBottom: 'clamp(32px, 5vw, 52px)', textAlign: 'center', maxWidth: 560 }}>
          Designing enterprise B2B platforms — dashboards, logistics and IoT products used by thousands in real-world operations.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .55 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 'clamp(40px, 7vw, 80px)' }}>
          <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: 'clamp(10px,1.5vw,13px) clamp(20px,3vw,30px)', borderRadius: 9999, background: '#fff', border: 'none', fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 'clamp(13px,1.5vw,14px)', color: '#000', transition: 'opacity .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '.85' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
            View Case Studies <ArrowUpRight size={15} />
          </button>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: 'clamp(10px,1.5vw,13px) clamp(20px,3vw,30px)', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.12)', fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 'clamp(13px,1.5vw,14px)', color: '#a1a1aa', textDecoration: 'none', transition: 'border-color .2s, color .2s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.35)'; el.style.color = '#fff' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.color = '#a1a1aa' }}>
            Download Resume
          </a>
        </motion.div>

        {/* Stats — responsive via CSS class */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .7 }}
          style={{ width: '100%', maxWidth: 720 }}>
          <div className="stats-grid" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.005)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
            {STATS.map((s, i) => (
              <div key={s.l1}
                style={{ position: 'relative', padding: 'clamp(20px,3vw,32px) clamp(16px,2.5vw,28px)', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', background: 'rgba(255,255,255,0.005)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', transition: 'background 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.01)' }}
              >
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px', WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 35%, transparent 70%)', maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 35%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1, width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, flexShrink: 0 }}>
                  <s.Icon size={18} color="rgba(255,255,255,0.65)" strokeWidth={1.5} />
                </div>
                <div style={{ position: 'relative', zIndex: 1, fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 700, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 12 }}>{s.num}</div>
                <p style={{ position: 'relative', zIndex: 1, fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}>
        <button
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'none', border: 'none', padding: '8px 16px' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.5' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
          <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, letterSpacing: '.15em', color: '#3f3f46', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown size={14} color="#3f3f46" />
          </motion.div>
        </button>
      </motion.div>

    </section>
  )
}