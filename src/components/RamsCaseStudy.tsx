import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import {
  ArrowLeft, ArrowUpRight, Layers, BarChart3, CheckCircle,
  ClipboardList, AlertTriangle, CloudUpload, TrendingUp,
  Bot, Zap, Radio, Bell,
} from 'lucide-react'
import { Tabs } from './ui/tabs'

interface RamsCaseStudyProps { onBack: () => void }

// ─────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────

function Reveal({
  children, delay = 0, className = '',
}: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionTag({ children }: { children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
    >
      <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)' }} />
      <span style={{
        fontFamily: "'Geist Mono', 'Space Mono', monospace",
        fontSize: 11, letterSpacing: '0.2em',
        textTransform: 'uppercase' as const, color: '#a1a1aa',
      }}>
        {children}
      </span>
    </motion.div>
  )
}

// ─────────────────────────────────────────
// ScreenContent
// gradient  → the indigo/violet bg behind the UI image
// imageSrc  → optional real UI screenshot (falls back to wireframe)
// ─────────────────────────────────────────

function ScreenContent({
  tag, title, desc, color, gradient, imageSrc,
}: {
  tag: string
  title: string
  desc: string
  color: string
  gradient: string
  imageSrc?: string
}) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      borderRadius: 20,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(14,16,23,0.9)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Browser chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
            <span key={c} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: c, display: 'block',
            }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: 22, borderRadius: 6,
          background: 'rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', padding: '0 12px',
          fontFamily: "'Geist Mono','Space Mono',monospace",
          fontSize: 10, color: 'rgba(255,255,255,0.25)',
        }}>
          rams-platform.app
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 20, padding: '3px 12px',
          fontFamily: "'Geist Mono','Space Mono',monospace",
          fontSize: 9, letterSpacing: '0.14em',
          textTransform: 'uppercase' as const, color: '#fff',
        }}>
          {tag}
        </div>
      </div>

      {/* Screen area */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        background: gradient,
      }}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              borderRadius: 0,
            }}
          />
        ) : (
          // Wireframe skeleton fallback
          <div style={{
            position: 'absolute',
            inset: '16px 16px 0',
            background: 'rgba(14,16,23,0.85)',
            borderRadius: '10px 10px 0 0',
            border: '1px solid rgba(255,255,255,0.07)',
            borderBottom: 'none',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Skeleton nav */}
            <div style={{
              height: 36,
              background: 'rgba(255,255,255,0.04)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center',
              padding: '0 14px', gap: 10, flexShrink: 0,
            }}>
              <div style={{ width: 64, height: 8, borderRadius: 2, background: color + '55' }} />
              {[70, 50, 80].map((w, i) => (
                <div key={i} style={{
                  width: w, height: 8, borderRadius: 2,
                  background: 'rgba(255,255,255,0.08)',
                  marginLeft: i === 0 ? 16 : 0,
                }} />
              ))}
            </div>
            {/* Skeleton body */}
            <div style={{ flex: 1, display: 'flex' }}>
              <div style={{
                width: '18%', background: 'rgba(255,255,255,0.02)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                {[1, 0.7, 0.85, 0.5, 0.75].map((o, i) => (
                  <div key={i} style={{
                    height: 9, borderRadius: 2,
                    background: `rgba(255,255,255,${o * 0.12})`,
                    width: i === 0 ? '80%' : `${55 + i * 8}%`,
                  }} />
                ))}
              </div>
              <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[0.9, 0.7, 0.8].map((o, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: o }}>
                    <div style={{ width: 22, height: 22, borderRadius: 4, background: color + '30', flexShrink: 0 }} />
                    <div style={{ height: 9, borderRadius: 2, background: 'rgba(255,255,255,0.18)', width: `${60 + i * 10}%` }} />
                    <div style={{ marginLeft: 'auto', width: 48, height: 18, borderRadius: 9, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 8 }}>
                  {[0.9, 0.6, 0.75].map((o, i) => (
                    <div key={i} style={{ height: 52, borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}33`, opacity: o }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <div style={{
        padding: '18px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
        background: 'rgba(14,16,23,0.95)',
      }}>
        <div style={{
          fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
          fontWeight: 700, fontSize: 16, color: '#e4e6eb', marginBottom: 5,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: "'Inter',sans-serif",
          fontWeight: 300, fontSize: 14, color: '#6b7280', lineHeight: 1.6,
        }}>
          {desc}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Tab definitions
// TO ADD UI SCREENSHOTS: pass imageSrc="/your-image.png" to ScreenContent
// ─────────────────────────────────────────

const SCREEN_TABS = [
  {
    title: 'Dashboard',
    value: 'dashboard',
    imageSrc: '/Dashboard.png',
    tag: '01 — Dashboard',
    title2: 'Manager Dashboard',
    desc: 'Centralized command center giving safety managers real-time visibility across all warehouses, assets, and open issues.',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 40%, #6d28d9 100%)',
  },
  {
    title: 'Inspection',
    value: 'inspection',
    imageSrc: '/Inspection.png',
    tag: '02 — Inspection',
    title2: 'Inspection Engine',
    desc: 'Tablet-first checklist interface designed for warehouse floors — fast, glove-friendly, and fully offline-capable.',
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, #312e81 0%, #4338ca 40%, #5b21b6 100%)',
  },
  {
    title: 'Assets',
    value: 'assets',
    imageSrc: '/Assets.png',
    tag: '03 — Assets',
    title2: 'Rack Asset Module',
    desc: 'Dedicated module for rack inspection and issue logging with severity classification and photo capture built in.',
    color: '#a5b4fc',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 40%, #4c1d95 100%)',
  },
  {
    title: 'Tracking',
    value: 'tracking',
    imageSrc: '/Tracking.png',
    tag: '04 — Tracking',
    title2: 'MHE Tracking View',
    desc: 'Material Handling Equipment lifecycle tracker — from onboarding through scheduled maintenance to flagged issues.',
    color: '#c7d2fe',
    gradient: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 40%, #3730a3 100%)',
  },
  {
    title: 'Reports',
    value: 'reports',
    imageSrc: '/Report.jpg',
    tag: '05 — Reports',
    title2: 'Analytics & Reports',
    desc: 'Visual dashboards with exportable compliance reports, team velocity charts, and issue trend analytics.',
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, #312e81 0%, #4338ca 40%, #5b21b6 100%)',
  },
]

// ─────────────────────────────────────────
// MockupShowcase
// ─────────────────────────────────────────

function MockupShowcase() {
  const tabItems = SCREEN_TABS.map((s) => ({
    title: s.title,
    value: s.value,
    content: (
      <ScreenContent
        tag={s.tag}
        title={s.title2}
        desc={s.desc}
        color={s.color}
        gradient={s.gradient}
        imageSrc={s.imageSrc}
      />
    ),
  }))

  return (
    <section id="rams-screens" className="page-section" style={{ background: 'rgba(10,11,15,0.8)' }}>
      <div className="page-container">
        <SectionTag>UI Screens</SectionTag>
        <Reveal>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800,
            lineHeight: 1.05, letterSpacing: '-0.02em',
            marginBottom: 16, color: '#e4e6eb',
          }}>
            Designed for the field.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 17, fontWeight: 300, color: '#6b7280',
            lineHeight: 1.7, maxWidth: 520, marginBottom: 24,
          }}>
            High-fidelity screens built from real workflow research — every screen solves a specific pain point.
          </p>
        </Reveal>

        {/*
          Wrapper: perspective for 3D depth, overflow:visible so peek cards fan freely
        */}
        <div style={{ perspective: "1000px", overflow: "visible" }}>
          <Tabs
            tabs={tabItems}
            autoPlay={true}
            autoPlayInterval={5000}
          />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// NEW: Impact Metrics section
// ─────────────────────────────────────────

function AnimatedStat({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1400
    const start = performance.now()
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setDisplayed(Math.round(ease * value))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value])

  return (
    <div ref={ref} style={{
      borderRadius: 20,
      padding: '32px 28px',
      background: 'rgba(20,24,39,0.5)',
      border: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(20px)',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
        fontSize: 'clamp(40px,5vw,64px)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: 10,
        background: 'linear-gradient(135deg, #fff 0%, #6366f1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {displayed}{suffix}
      </div>
      <div style={{
        fontFamily: "'Geist Mono','Space Mono',monospace",
        fontSize: 11, letterSpacing: '0.12em',
        textTransform: 'uppercase' as const, color: '#555',
      }}>{label}</div>
    </div>
  )
}

// ─────────────────────────────────────────
// Main export
// ─────────────────────────────────────────

export function RamsCaseStudy({ onBack }: RamsCaseStudyProps) {
  useEffect(() => {
    const id = 'rams-fonts'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id; link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;500;700;800&family=Inter:wght@300;400;500&display=swap'
      document.head.appendChild(link)
    }
    return () => { document.getElementById(id)?.remove() }
  }, [])

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: '#0a0b0f', color: '#e4e6eb',
      minHeight: '100vh', overflowX: 'hidden',
    }}>

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 0' }}
      >
        <div className="page-container">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderRadius: 14, padding: '10px 16px',
            background: 'rgba(20,24,39,0.85)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div>
              <div style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 13, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' as const }}>RAMS</div>
              <div style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: '#555', marginTop: 2 }}>Case Study — 2024</div>
            </div>
            <div className='cs-nav-links' style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'nowrap' as const }}>
              {['Problem', 'Solution', 'Screens', 'Impact', 'Decisions', 'Learnings'].map(l => (
                <a
                  key={l} href={`#rams-${l.toLowerCase()}`}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#888', textDecoration: 'none', letterSpacing: '0.02em', transition: 'color 0.2s', whiteSpace: 'nowrap' as const }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e4e6eb')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                >
                  {l}
                </a>
              ))}
            </div>
            <motion.button
              onClick={onBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#a1a1aa', fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' as const }}
            >
              <ArrowLeft size={12} /> Back
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="cs-hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingTop: 'clamp(80px,12vw,120px)' as any, paddingBottom: 'clamp(40px,6vw,80px)' as any }}>
        <motion.div style={{ position: 'absolute', top: 80, right: 0, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div style={{ position: 'absolute', bottom: 0, left: 0, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.05) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className='cs-hero-bg-number' style={{ position: 'absolute', top: 120, right: 40, fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(120px,18vw,220px)', fontWeight: 800, color: 'rgba(255,255,255,0.025)', lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none' }}>01</div>

        <div className="page-container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 9999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 32 }}>
            <motion.span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', display: 'block' }} animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#9ca3af' }}>Product Design Case Study</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(32px,7vw,112px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Rack Asset<br />Management<br />
            <span style={{ background: 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>System.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }} style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(14px,2vw,18px)' as any, fontWeight: 300, color: '#9ca3af', maxWidth: 560, lineHeight: 1.7, marginBottom: 'clamp(24px,4vw,48px)' as any }}>
            A SaaS platform that centralizes warehouse inspections, asset tracking, and safety compliance — transforming manual fragmented processes into a unified, real-time system.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.45 }} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById('rams-solution')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: '#fff', color: '#000', border: 'none', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' as const, cursor: 'pointer', padding: '14px 32px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              Explore Case Study <ArrowUpRight size={16} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => document.getElementById('rams-decisions')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', padding: '14px 32px', borderRadius: 14 }}>
              Key Decisions →
            </motion.button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.55 }} className='hero-side-stats' style={{ position: 'absolute', right: 'clamp(20px,5vw,80px)' as any, bottom: 'clamp(40px,6vw,80px)' as any, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[{ n: '3', l: 'Asset Modules' }, { n: '4', l: 'Key Decisions' }, { n: 'SaaS', l: 'Platform' }].map(({ n, l }) => (
            <div key={l} style={{ textAlign: 'right', borderRight: '2px solid rgba(255,255,255,0.18)', paddingRight: 20 }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 36, fontWeight: 800, color: '#e4e6eb', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 10, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ overflow: 'hidden', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(20,24,39,0.4)' }}>
        <motion.div style={{ display: 'flex', gap: 56, whiteSpace: 'nowrap', width: 'max-content' }} animate={{ x: ['0%', '-50%'] }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
          {['Inspection Engine', 'Asset Tracking', 'Safety Compliance', 'Real-Time Dashboard', 'Tablet Interface', 'Rack Management', 'MHE Tracking', 'Load Management',
            'Inspection Engine', 'Asset Tracking', 'Safety Compliance', 'Real-Time Dashboard', 'Tablet Interface', 'Rack Management', 'MHE Tracking', 'Load Management'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', display: 'inline-block' }} />
              <span style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 11, color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── PROBLEM ── */}
      <section id="rams-problem" className="page-section" style={{ background: 'rgba(20,24,39,0.3)' }}>
        <div className="page-container">
          <SectionTag>The Problem</SectionTag>
          <div className="grid-2">
            <div>
              <Reveal>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, color: '#e4e6eb' }}>
                  Warehouses were flying<br />blind on safety.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 300, color: '#9ca3af', lineHeight: 1.75, marginBottom: 36 }}>
                  Inspections were done on <strong style={{ color: '#e4e6eb', fontWeight: 500 }}>paper or spreadsheets</strong>. Issues fell through the cracks. Managers had <strong style={{ color: '#e4e6eb', fontWeight: 500 }}>no real-time visibility</strong>. Field teams struggled with tools built for office desks.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {[{ label: 'Warehouse Inspectors', color: '#fff' }, { label: 'Safety Managers', color: '#fff' }, { label: 'Operations Teams', color: '#d4d4d8' }].map(({ label, color }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 9999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 11, color: '#9ca3af', letterSpacing: '0.08em' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />{label}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { n: '01', t: <><strong style={{ color: '#e4e6eb' }}>Manual & inconsistent</strong> inspections across teams</> },
                { n: '02', t: <>No centralized system for <strong style={{ color: '#e4e6eb' }}>rack and equipment safety</strong></> },
                { n: '03', t: <>Issues were <strong style={{ color: '#e4e6eb' }}>not tracked</strong> or followed to resolution</> },
                { n: '04', t: <>Managers lacked <strong style={{ color: '#e4e6eb' }}>real-time visibility</strong> into safety status</> },
                { n: '05', t: <>Field teams struggling with <strong style={{ color: '#e4e6eb' }}>desktop-heavy tools</strong> on the floor</> },
              ].map(({ n, t }, i) => (
                <Reveal key={n} delay={i * 0.07}>
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px', borderRadius: 16, background: 'rgba(20,24,39,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '3px solid rgba(255,255,255,0.15)' }}>
                    <span style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 11, color: '#fff', letterSpacing: '0.1em', flexShrink: 0, paddingTop: 2 }}>{n}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#9ca3af', lineHeight: 1.6 }}>{t}</span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section id="rams-solution" className="page-section">
        <div className="page-container">
          <SectionTag>The Solution</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>
              RAMS — One system. End-to-end.
            </h2>
          </Reveal>
          <div className="grid-3">
            {[
              { Icon: ClipboardList, num: '01 — Core', title: 'Inspection Engine', color: '#fff', desc: 'The backbone of RAMS. Standardizes every inspection with checklist-driven workflows and structured issue logging.', features: ['Checklist-based inspections', 'Issue logging & severity classification', 'Real-time sync to dashboard'] },
              { Icon: BarChart3, num: '02 — Platform', title: 'SaaS Dashboard', color: '#e4e4e7', desc: 'Command center for safety managers. Track trends, spot issues early, and make data-driven decisions fast.', features: ['Analytics & reporting', 'Role-based access', 'Issue lifecycle management'] },
              { Icon: Layers, num: '03 — Assets', title: 'Asset Modules', color: '#a1a1aa', desc: 'Three specialized modules for each asset type — each with its own logic and workflow, built for the field.', features: ['Rack management', 'MHE (Material Handling Equipment)', 'Pallet / Load management'] },
            ].map(({ Icon, num, title, color, desc, features }, i) => (
              <Reveal key={num} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} style={{ position: 'relative', height: '100%', borderRadius: 24, padding: 32, overflow: 'hidden', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <Icon size={22} style={{ color: '#e4e4e7' }} />
                    </div>
                    <div style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 10, color, letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12 }}>{num}</div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 12, color: '#e4e6eb' }}>{title}</h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9ca3af' }}>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: color, flexShrink: 0, display: 'inline-block' }} />{f}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOW ── */}
      <section className="page-section" style={{ background: 'rgba(20,24,39,0.4)' }}>
        <div className="page-container">
          <SectionTag>End-to-End Flow</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>How it works in the field.</h2>
          </Reveal>
          <div className="flow-grid">
            {[
              { Icon: ClipboardList, n: '1', title: 'Scan & Inspect', desc: 'Inspector uses tablet to scan asset and begin structured checklist inspection on-site.' },
              { Icon: AlertTriangle, n: '2', title: 'Log Issue', desc: 'Issues are logged with severity classification. Photos and notes captured instantly.' },
              { Icon: CloudUpload, n: '3', title: 'Data Syncs', desc: 'All inspection data syncs to the SaaS dashboard in real time. No manual entry required.' },
              { Icon: TrendingUp, n: '4', title: 'Manager Tracks', desc: 'Safety managers track issues, trends, and team performance across all warehouses.' },
              { Icon: CheckCircle, n: '5', title: 'Resolved & Verified', desc: 'Actions are taken and verified, closing the compliance loop with a full audit trail.' },
            ].map(({ Icon, n, title, desc }, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} style={{ position: 'relative', height: '100%', borderRadius: 24, padding: 24, background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.04)', lineHeight: 1, position: 'absolute', top: -8, right: 0 }}>{n}</div>
                    <div style={{ width: 44, height: 44, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <Icon size={20} style={{ color: '#fff' }} />
                    </div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#e4e6eb' }}>{title}</h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOCKUP SHOWCASE ── */}
      <MockupShowcase />

      {/* ── IMPACT METRICS (NEW) ── */}
      <section id="rams-impact" className="page-section" style={{ background: 'rgba(14,16,23,0.9)' }}>
        <div className="page-container">
          <SectionTag>Impact</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>
              Numbers don't lie.
            </h2>
          </Reveal>
          <div className="impact-grid">
            <AnimatedStat value={400} suffix="+" label="Screens designed" />
            <AnimatedStat value={3} label="Asset modules shipped" />
            <AnimatedStat value={5} label="Key workflows standardized" />
            <AnimatedStat value={100} suffix="%" label="Field adoption (tablet-first)" />
          </div>
          {/* Qualitative impact row */}
          <div className="compare-grid">
            {[
              { label: 'Before RAMS', items: ['Paper checklists & spreadsheets', 'No issue tracking or audit trail', 'Managers blind to site status', 'No structured workflows'] },
              { label: 'After RAMS', items: ['Checklist-driven digital inspections', 'Real-time issue lifecycle management', 'Live dashboard across all warehouses', 'Standardized, scalable workflows'] },
            ].map(({ label, items }, i) => (
              <Reveal key={label} delay={i * 0.1}>
                <div style={{
                  borderRadius: 20, padding: '28px 32px',
                  background: i === 0 ? 'rgba(20,24,39,0.4)' : 'rgba(99,102,241,0.06)',
                  border: i === 0 ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(99,102,241,0.2)',
                }}>
                  <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: i === 0 ? '#555' : '#6366f1', marginBottom: 20 }}>{label}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {items.map(it => (
                      <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#9ca3af' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? '#374151' : '#6366f1', flexShrink: 0, display: 'inline-block' }} />
                        {it}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DECISIONS ── */}
      <section id="rams-decisions" className="page-section">
        <div className="page-container">
          <SectionTag>Key Design Decisions</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>Every choice had a reason.</h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { id: 'D1', decision: <><strong style={{ color: '#e4e6eb' }}>Inspection as the core engine</strong>, not assets</>, why: 'All safety operations revolve around inspections — making it the core creates a consistent, unified data flow', result: 'Unified workflow, better issue tracking, scalable system foundation' },
              { id: 'D2', decision: <><strong style={{ color: '#e4e6eb' }}>Modular architecture</strong> (Rack, MHE, Pallet separate)</>, why: 'Each asset type has unique logic and workflows — combining them causes confusion and maintenance debt', result: 'Clear workflows, easier expansion, better user comprehension' },
              { id: 'D3', decision: <><strong style={{ color: '#e4e6eb' }}>Tablet-first interface</strong> for field inspectors</>, why: "Inspectors work on warehouse floors, not desks — the tool must fit their physical environment", result: 'Faster inspections, reduced friction, significantly improved adoption rate' },
              { id: 'D4', decision: <><strong style={{ color: '#e4e6eb' }}>Analytics dashboards</strong> for management layer</>, why: "Managers need macro-level visibility — raw data lists don't enable fast action", result: 'Improved monitoring capability, better compliance tracking and trend analysis' },
            ].map(({ id, decision, why, result }, i) => (
              <Reveal key={id} delay={i * 0.08}>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }} style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)'}} className="decision-grid">
                  <div style={{ display: 'flex', alignItems: 'flex-start', padding: 24, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 12, color: '#fff', letterSpacing: '0.1em' }}>{id}</span>
                  </div>
                  {[{ label: 'Decision', content: decision }, { label: 'Why', content: why }, { label: 'Result', content: result }].map(({ label, content }, j) => (
                    <div key={label} style={{ padding: 24, borderRight: j < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                      <div style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 9, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 10 }}>{label}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{content}</div>
                    </div>
                  ))}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNINGS ── */}
      <section id="rams-learnings" className="page-section" style={{ background: 'rgba(20,24,39,0.4)' }}>
        <div className="page-container">
          <SectionTag>Learnings</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>What building RAMS taught me.</h2>
          </Reveal>
          <div className="compare-grid">
            {[
              { n: '01', t: 'Enterprise systems demand deep workflow understanding before a single pixel is drawn.' },
              { n: '02', t: 'Collaboration with engineers is critical for making the right system-level decisions.' },
              { n: '03', t: 'Real-world constraints — warehouse floors, gloves, loud environments — drive better design than assumptions.' },
              { n: '04', t: 'Simplicity is the hardest problem to solve in complex, high-stakes environments.' },
            ].map(({ n, t }, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} style={{ position: 'relative', borderRadius: 24, padding: 40, overflow: 'hidden', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 72, fontWeight: 800, color: 'rgba(255,255,255,0.04)', lineHeight: 1, marginBottom: 20, letterSpacing: '-0.03em' }}>{n}</div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 300, color: '#e4e6eb', lineHeight: 1.5, letterSpacing: '-0.01em' }}>{t}</p>
                    <div style={{ marginTop: 24, height: 1, width: 48, background: 'linear-gradient(90deg, rgba(255,255,255,0.4), transparent)' }} />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUTURE ── */}
      <section className="page-section">
        <div className="page-container">
          <SectionTag>Future Scope</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>Where RAMS goes next.</h2>
          </Reveal>
          <div className="impact-grid">
            {[
              { Icon: Bot, title: 'AI-based predictive safety alerts' },
              { Icon: Zap, title: 'Automated issue prioritization' },
              { Icon: Radio, title: 'IoT sensor integration' },
              { Icon: Bell, title: 'Real-time push notifications' },
            ].map(({ Icon, title }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} style={{ borderRadius: 24, padding: 32, height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, flexShrink: 0, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Icon size={22} style={{ color: '#e4e4e7' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 17, fontWeight: 700, color: '#e4e6eb', letterSpacing: '-0.01em' }}>{title}</h3>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-section" style={{ position: 'relative', overflow: 'hidden', background: 'rgba(20,24,39,0.6)' }}>
        <motion.div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="page-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 'clamp(48px,8vw,96px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 32, color: '#e4e6eb' }}>
              Manual is<br />
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #fff 20%, #52525b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>broken.</em>
              <br />RAMS fixed it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 300, color: '#9ca3af', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 48px' }}>
              From fragmented paper trails to a centralized, scalable SaaS system — improving warehouse safety visibility, efficiency, and compliance.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} onClick={onBack} style={{ background: '#fff', color: '#000', border: 'none', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' as const, cursor: 'pointer', padding: '14px 32px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ArrowLeft size={14} /> Back to Portfolio
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => document.getElementById('rams-decisions')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', padding: '14px 32px', borderRadius: 14 }}>
                View Decisions →
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div className="page-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 14, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' as const }}>RAMS</div>
          <div style={{ fontFamily: "'Geist Mono', 'Space Mono', monospace", fontSize: 11, color: '#444', letterSpacing: '0.1em' }}>Product Design Case Study · 2024</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Problem', 'Solution', 'Screens', 'Impact', 'Decisions', 'Learnings'].map(l => (
              <a key={l} href={`#rams-${l.toLowerCase()}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#444', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#9ca3af')} onMouseLeave={e => (e.currentTarget.style.color = '#444')}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}