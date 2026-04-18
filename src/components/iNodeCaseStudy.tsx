import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import {
  ArrowLeft, ArrowUpRight,
  Droplets, BarChart3, FileText, Settings,
  CheckCircle, Cpu, FlaskConical, Layers,
  TrendingUp, Zap, Star, Shield,
  GitBranch, BookOpen,
} from 'lucide-react'
import { Tabs } from './ui/tabs'

interface INodeCaseStudyProps { onBack: () => void }

// ─────────────────────────────────────────
// Accent — teal/cyan for water/engineering
// ─────────────────────────────────────────

const ACCENT = '#06b6d4'
const ACCENT_DARK = '#0891b2'

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
// Animated stat counter
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
      borderRadius: 20, padding: '32px 28px',
      background: 'rgba(20,24,39,0.5)',
      border: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(20px)', textAlign: 'center',
    }}>
      <div style={{
        fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
        fontSize: 'clamp(40px,5vw,64px)', fontWeight: 800,
        letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 10,
        background: `linear-gradient(135deg, #fff 0%, ${ACCENT} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {displayed}{suffix}
      </div>
      <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#555' }}>{label}</div>
    </div>
  )
}

// ─────────────────────────────────────────
// Browser mockup wrapper (desktop app — not phone)
// ─────────────────────────────────────────

function DesktopMockup({ screen }: {
  screen: { tag: string; title: string; desc: string; content: React.ReactNode }
}) {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(14,16,23,0.9)', display: 'flex', flexDirection: 'column' }}>
      {/* Browser chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />)}
        </div>
        <div style={{ flex: 1, height: 20, borderRadius: 6, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
          inode-wtp.app
        </div>
        <div style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}44`, borderRadius: 20, padding: '3px 12px', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: ACCENT }}>
          {screen.tag}
        </div>
      </div>
      {/* Screen body */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #060e1a 0%, #0a1628 60%, #061218 100%)' }}>
        {screen.content}
      </div>
      {/* Caption */}
      <div style={{ padding: '18px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, background: 'rgba(14,16,23,0.95)' }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 700, fontSize: 16, color: '#e4e6eb', marginBottom: 5 }}>{screen.title}</div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{screen.desc}</div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Screen wireframes
// ─────────────────────────────────────────

function ProcessSelectionScreen() {
  const params = [
    { label: 'Turbidity', value: '180 NTU', status: 'high' },
    { label: 'pH', value: '7.2', status: 'ok' },
    { label: 'Iron', value: '2.4 mg/L', status: 'high' },
    { label: 'TDS', value: '420 mg/L', status: 'ok' },
    { label: 'Alkalinity', value: '210 mg/L', status: 'ok' },
    { label: 'Color', value: '32 Hazen', status: 'warn' },
  ]
  const train = ['Intake', 'Flash Mix', 'Flocculat.', 'Settler', 'RSF', 'Chlorinat.']
  return (
    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {/* Raw water params */}
        <div style={{ flex: 1, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '12px' }}>
          <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 10 }}>Raw Water Quality</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {params.map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9ca3af' }}>{p.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: p.status === 'high' ? '#ef4444' : p.status === 'warn' ? '#f59e0b' : '#22c55e' }}>{p.value}</span>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.status === 'high' ? '#ef4444' : p.status === 'warn' ? '#f59e0b' : '#22c55e', display: 'block' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Standard ref */}
        <div style={{ width: 100, borderRadius: 10, background: `${ACCENT}0a`, border: `1px solid ${ACCENT}33`, padding: '12px' }}>
          <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: ACCENT, textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 10 }}>Standards</div>
          {['BIS IS 10500', 'CPHEEO', 'WHO 2022', 'CPCB'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 7 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT, display: 'block', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#6b7280' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Treatment train */}
      <div style={{ borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: `1px solid ${ACCENT}22`, padding: '12px' }}>
        <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: ACCENT, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 10 }}>Recommended Treatment Train</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {train.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ flex: 1, borderRadius: 6, padding: '7px 4px', background: `${ACCENT}18`, border: `1px solid ${ACCENT}44`, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: ACCENT, lineHeight: 1.3 }}>{t}</div>
              </div>
              {i < train.length - 1 && <div style={{ width: 12, height: 1, background: `${ACCENT}44`, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>
      {/* Score */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[{ label: 'Process Match', val: '94%', c: '#22c55e' }, { label: 'Hydraulic Fit', val: 'Gravity', c: ACCENT }, { label: 'Compliance', val: 'IS 10500', c: '#a78bfa' }].map((s, i) => (
          <div key={i} style={{ flex: 1, borderRadius: 8, padding: '9px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 14, fontWeight: 800, color: s.c }}>{s.val}</div>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#555', textTransform: 'uppercase' as const, marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HydraulicScreen() {
  const units = [
    { name: 'Intake sump', hl: 0.30, cum: 0.30 },
    { name: 'Flash mixer', hl: 0.45, cum: 0.75 },
    { name: 'Flocculator', hl: 0.22, cum: 0.97 },
    { name: 'Clarifloc.', hl: 0.55, cum: 1.52 },
    { name: 'Rapid SF', hl: 1.80, cum: 3.32 },
    { name: 'Clear sump', hl: 0.10, cum: 3.42 },
  ]
  return (
    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      {/* HGL visualization */}
      <div style={{ borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '12px', flex: 1 }}>
        <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: ACCENT, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 10 }}>Hydraulic Grade Line</div>
        <svg width="100%" height="80" viewBox="0 0 320 80" preserveAspectRatio="none">
          {/* EGL */}
          <polyline points="0,5 53,8 107,14 160,22 213,36 267,72 320,75" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="4,2" opacity="0.5" />
          {/* HGL */}
          <polyline points="0,10 53,14 107,20 160,30 213,44 267,76 320,79" fill="none" stroke={ACCENT} strokeWidth="1.5" />
          <polyline points="0,10 53,14 107,20 160,30 213,44 267,76 320,79 320,80 0,80" fill={`${ACCENT}10`} />
          {/* Unit lines */}
          {[0, 53, 107, 160, 213, 267].map((x, i) => (
            <line key={i} x1={x} y1={0} x2={x} y2={80} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
          <text x="8" y="75" fontSize="7" fill={`${ACCENT}88`} fontFamily="monospace">HGL</text>
          <text x="8" y="68" fontSize="7" fill={`${ACCENT}55`} fontFamily="monospace">EGL</text>
        </svg>
      </div>
      {/* Head loss table */}
      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', padding: '6px 10px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {['Unit', 'HL (m)', 'Cumul. (m)'].map((h, i) => (
            <div key={h} style={{ flex: i === 0 ? 2 : 1, fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{h}</div>
          ))}
        </div>
        {units.map((u, i) => (
          <div key={i} style={{ display: 'flex', padding: '6px 10px', borderBottom: i < units.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
            <div style={{ flex: 2, fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9ca3af' }}>{u.name}</div>
            <div style={{ flex: 1, fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: u.hl > 1 ? '#f59e0b' : '#e4e6eb' }}>{u.hl.toFixed(2)}</div>
            <div style={{ flex: 1, fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: ACCENT }}>{u.cum.toFixed(2)}</div>
          </div>
        ))}
      </div>
      {/* Summary chips */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[{ label: 'Total HL', val: '3.42 m' }, { label: 'Pump TDH', val: '18.5 m' }, { label: 'Flow', val: 'Gravity ✓' }].map((s, i) => (
          <div key={i} style={{ flex: 1, borderRadius: 8, padding: '8px 10px', background: `${ACCENT}0a`, border: `1px solid ${ACCENT}33`, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 13, fontWeight: 700, color: '#e4e6eb' }}>{s.val}</div>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#555', textTransform: 'uppercase' as const, marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SizingScreen() {
  const units = [
    { unit: 'Flash Mixer', param: 'G value', val: '800 s⁻¹', ok: true },
    { unit: 'Flocculator', param: 'Detention', val: '25 min', ok: true },
    { unit: 'Clarifloc.', param: 'SOR', val: '1.8 m³/m²/h', ok: true },
    { unit: 'Rapid SF', param: 'Filter rate', val: '5.2 m/h', ok: false },
    { unit: 'Chlor. Contact', param: 'CT value', val: '28 mg·min/L', ok: true },
    { unit: 'Clear Sump', param: 'Storage', val: '4 hrs cap.', ok: true },
  ]
  return (
    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 2 }}>
        {[{ label: 'Design Flow', val: '25 MLD' }, { label: 'Peak Factor', val: '1.5×' }, { label: 'Population', val: '1.2 L' }].map((s, i) => (
          <div key={i} style={{ flex: 1, borderRadius: 8, padding: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 15, fontWeight: 800, color: ACCENT }}>{s.val}</div>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#555', textTransform: 'uppercase' as const, marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Unit sizing table */}
      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', flex: 1 }}>
        <div style={{ display: 'flex', padding: '7px 12px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {['Unit', 'Parameter', 'Computed', 'Status'].map((h, i) => (
            <div key={h} style={{ flex: i === 0 ? 1.5 : 1, fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#6b7280', textTransform: 'uppercase' as const }}>{h}</div>
          ))}
        </div>
        {units.map((u, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '7px 12px', borderBottom: i < units.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
            <div style={{ flex: 1.5, fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9ca3af' }}>{u.unit}</div>
            <div style={{ flex: 1, fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, color: '#6b7280' }}>{u.param}</div>
            <div style={{ flex: 1, fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: '#e4e6eb' }}>{u.val}</div>
            <div style={{ flex: 1 }}>
              <span style={{ padding: '2px 8px', borderRadius: 9999, fontSize: 9, fontFamily: "'Geist Mono','Space Mono',monospace", background: u.ok ? '#22c55e22' : '#ef444422', color: u.ok ? '#22c55e' : '#ef4444', border: `1px solid ${u.ok ? '#22c55e44' : '#ef444444'}` }}>
                {u.ok ? 'OK' : 'Review'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 8, padding: '8px 12px', background: '#ef444412', border: '1px solid #ef444433', fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#fca5a5' }}>
        ⚠ Rapid SF filter rate 5.2 m/h exceeds CPHEEO limit of 5.0 m/h — add 1 filter bay
      </div>
    </div>
  )
}

function DPRScreen() {
  const docs = [
    { name: 'Design Basis Report', pages: 14, status: 'ready' },
    { name: 'Process Design Calcs', pages: 38, status: 'ready' },
    { name: 'Hydraulic Notes', pages: 12, status: 'ready' },
    { name: 'Equipment Sizing Sheets', pages: 21, status: 'ready' },
    { name: 'BOQ Reference', pages: 8, status: 'draft' },
    { name: 'Technical Specifications', pages: 44, status: 'draft' },
    { name: 'O&M Philosophy', pages: 9, status: 'pending' },
  ]
  return (
    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
        {[{ label: 'Ready', count: 4, c: '#22c55e' }, { label: 'Draft', count: 2, c: ACCENT }, { label: 'Pending', count: 1, c: '#6b7280' }].map((s, i) => (
          <div key={i} style={{ flex: 1, borderRadius: 8, padding: '9px 10px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.c}33`, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 18, fontWeight: 800, color: s.c }}>{s.count}</div>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#555', textTransform: 'uppercase' as const, marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {docs.map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: d.status === 'ready' ? '#22c55e18' : d.status === 'draft' ? `${ACCENT}18` : 'rgba(255,255,255,0.04)', border: `1px solid ${d.status === 'ready' ? '#22c55e44' : d.status === 'draft' ? `${ACCENT}44` : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText size={12} style={{ color: d.status === 'ready' ? '#22c55e' : d.status === 'draft' ? ACCENT : '#6b7280' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#e4e6eb' }}>{d.name}</div>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#555', marginTop: 2 }}>{d.pages} pages</div>
          </div>
          <span style={{ padding: '2px 9px', borderRadius: 9999, fontSize: 8, fontFamily: "'Geist Mono','Space Mono',monospace", textTransform: 'uppercase' as const, letterSpacing: '0.08em', background: d.status === 'ready' ? '#22c55e18' : d.status === 'draft' ? `${ACCENT}18` : 'rgba(255,255,255,0.04)', color: d.status === 'ready' ? '#22c55e' : d.status === 'draft' ? ACCENT : '#6b7280' }}>{d.status}</span>
        </div>
      ))}
    </div>
  )
}

function DashboardScreen() {
  return (
    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      {/* Project header */}
      <div style={{ borderRadius: 10, padding: '12px 14px', background: `${ACCENT}0a`, border: `1px solid ${ACCENT}33` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 13, fontWeight: 700, color: '#e4e6eb' }}>Pune Municipal WTP</div>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#6b7280', marginTop: 2 }}>25 MLD · Gravity Flow · IS 10500</div>
          </div>
          <span style={{ padding: '3px 10px', borderRadius: 9999, background: '#22c55e22', border: '1px solid #22c55e44', fontSize: 9, color: '#22c55e', fontFamily: "'Geist Mono','Space Mono',monospace" }}>ACTIVE</span>
        </div>
      </div>
      {/* Module progress */}
      {[
        { label: 'Process Selection', pct: 100, status: 'Done' },
        { label: 'Hydraulic Design', pct: 100, status: 'Done' },
        { label: 'Equipment Sizing', pct: 85, status: 'In Progress' },
        { label: 'DPR Documentation', pct: 55, status: 'In Progress' },
        { label: 'Technical Specs', pct: 20, status: 'Draft' },
      ].map((m, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 110, fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9ca3af', flexShrink: 0 }}>{m.label}</div>
          <div style={{ flex: 1, height: 5, borderRadius: 9999, background: 'rgba(255,255,255,0.06)' }}>
            <div style={{ width: `${m.pct}%`, height: '100%', borderRadius: 9999, background: m.pct === 100 ? '#22c55e' : ACCENT, transition: 'width 1s ease' }} />
          </div>
          <div style={{ width: 70, fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: m.pct === 100 ? '#22c55e' : ACCENT, textAlign: 'right', flexShrink: 0 }}>{m.status}</div>
        </div>
      ))}
      {/* Mini stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 4 }}>
        {[{ label: 'Design Flow', val: '25 MLD' }, { label: 'Units Sized', val: '6 / 7' }, { label: 'DPR Pages', val: '93' }].map((s, i) => (
          <div key={i} style={{ borderRadius: 8, padding: '10px 8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 14, fontWeight: 800, color: ACCENT }}>{s.val}</div>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#555', textTransform: 'uppercase' as const, marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Screens data
// ─────────────────────────────────────────

const INODE_SCREENS = [
  { title: 'Project Hub', value: 'dashboard', tag: '01 — Overview', title2: 'Project Dashboard', desc: 'Complete project overview — design flow, module completion progress, and DPR status at a glance for engineers and reviewers.', content: <DashboardScreen /> },
  { title: 'Process', value: 'process', tag: '02 — Process', title2: 'Water Quality & Process Selection', desc: 'Maps raw water parameters (turbidity, pH, iron, TDS) to a compliant treatment train — referenced against BIS IS 10500, CPHEEO, and WHO guidelines.', content: <ProcessSelectionScreen /> },
  { title: 'Hydraulics', value: 'hydraulics', tag: '03 — Hydraulics', title2: 'Hydraulic Design Engine', desc: 'Unit-wise head loss calculation, HGL/EGL profile visualization, pump TDH estimation, and gravity flow validation across the full treatment train.', content: <HydraulicScreen /> },
  { title: 'Sizing', value: 'sizing', tag: '04 — Sizing', title2: 'Equipment & Civil Sizing', desc: 'Auto-computed detention times, surface overflow rates, filter loading rates, and pipe diameters — flagging any values exceeding CPHEEO limits.', content: <SizingScreen /> },
  { title: 'DPR Output', value: 'dpr', tag: '05 — DPR', title2: 'DPR & Tender-Ready Documents', desc: 'One-click generation of design basis reports, hydraulic notes, sizing sheets, BOQ references, and technical specifications — reducing turnaround by 60%.', content: <DPRScreen /> },
]


// ─────────────────────────────────────────
// Main export
// ─────────────────────────────────────────

export function INodeCaseStudy({ onBack }: INodeCaseStudyProps) {
  useEffect(() => {
    const id = 'inode-fonts'
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
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#0a0b0f', color: '#e4e6eb', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 0' }}>
        <div className="page-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 14, padding: '10px 16px', background: 'rgba(20,24,39,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 13, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' as const }}>iNODE WTP</div>
              <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, letterSpacing: '0.1em', color: '#555', marginTop: 2 }}>Case Study — 2023</div>
            </div>
            <div className='cs-nav-links' style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'nowrap' as const }}>
              {['Problem', 'Solution', 'Screens', 'Impact', 'Decisions', 'Learnings'].map(l => (
                <a key={l} href={`#inode-${l.toLowerCase()}`}
                  style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#888', textDecoration: 'none', letterSpacing: '0.02em', transition: 'color 0.2s', whiteSpace: 'nowrap' as const }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e4e6eb')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888')}>{l}</a>
              ))}
            </div>
            <motion.button onClick={onBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#a1a1aa', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' as const }}>
              <ArrowLeft size={12} /> Back
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="cs-hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingTop: 'clamp(80px,12vw,120px)' as any, paddingBottom: 'clamp(40px,6vw,80px)' as any }}>
        <motion.div style={{ position: 'absolute', top: 80, right: 0, width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}0d 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div style={{ position: 'absolute', bottom: 0, left: 0, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT_DARK}0a 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className='cs-hero-bg-number' style={{ position: 'absolute', top: 120, right: 40, fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(120px,18vw,220px)', fontWeight: 800, color: 'rgba(255,255,255,0.025)', lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none' }}>03</div>

        <div className="page-container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 9999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 32 }}>
            <motion.span style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, display: 'block' }} animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#9ca3af' }}>Product Design Case Study</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(32px,7vw,112px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20 }}>
            iNODE WTP<br />Digital<br />
            <span style={{ background: 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Engineering.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }}
            style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(14px,2vw,18px)' as any, fontWeight: 300, color: '#9ca3af', maxWidth: 580, lineHeight: 1.7, marginBottom: 'clamp(24px,4vw,48px)' as any }}>
            An integrated digital platform for Water Treatment Plant design — combining process intelligence, hydraulic computation, equipment sizing, and DPR documentation into one structured engineering environment.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('inode-solution')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: ACCENT, color: '#000', border: 'none', fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' as const, cursor: 'pointer', padding: '14px 32px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              Explore Case Study <ArrowUpRight size={16} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('inode-decisions')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', padding: '14px 32px', borderRadius: 14 }}>
              Key Decisions →
            </motion.button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.55 }}
          className='hero-side-stats' style={{ position: 'absolute', right: 'clamp(20px,5vw,80px)' as any, bottom: 'clamp(40px,6vw,80px)' as any, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[{ n: '11', l: 'Unit Processes' }, { n: '4', l: 'Core Engines' }, { n: 'DPR', l: 'Ready Output' }].map(({ n, l }) => (
            <div key={l} style={{ textAlign: 'right', borderRight: `2px solid ${ACCENT}66`, paddingRight: 20 }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 36, fontWeight: 800, color: '#e4e6eb', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ overflow: 'hidden', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(20,24,39,0.4)' }}>
        <motion.div style={{ display: 'flex', gap: 56, whiteSpace: 'nowrap', width: 'max-content' }} animate={{ x: ['0%', '-50%'] }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
          {['Process Selection', 'Hydraulic Design', 'HGL Profile', 'Equipment Sizing', 'DPR Generation', 'Flash Mixer', 'Clariflocculator', 'Rapid Sand Filter', 'Disinfection', 'BOQ Reference',
            'Process Selection', 'Hydraulic Design', 'HGL Profile', 'Equipment Sizing', 'DPR Generation', 'Flash Mixer', 'Clariflocculator', 'Rapid Sand Filter', 'Disinfection', 'BOQ Reference'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: `${ACCENT}99`, display: 'inline-block' }} />
              <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── PROBLEM ── */}
      <section id="inode-problem" className="page-section" style={{ background: 'rgba(20,24,39,0.3)' }}>
        <div className="page-container">
          <SectionTag>The Problem</SectionTag>
          <div className="grid-2">
            <div>
              <Reveal>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, color: '#e4e6eb' }}>
                  WTP engineering<br />was stuck in Excel.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, fontWeight: 300, color: '#9ca3af', lineHeight: 1.75, marginBottom: 36 }}>
                  Design engineers spent weeks in <strong style={{ color: '#e4e6eb', fontWeight: 500 }}>disconnected spreadsheets</strong> and manual calculations. Process, hydraulics, and DPR lived in separate silos with <strong style={{ color: '#e4e6eb', fontWeight: 500 }}>no validation between them</strong>.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {[{ label: 'Design Engineers' }, { label: 'EPC Consultants' }, { label: 'Utility Bodies' }, { label: 'Academic Trainers' }].map(({ label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 9999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: '#9ca3af', letterSpacing: '0.08em' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'inline-block', flexShrink: 0 }} />{label}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { n: '01', t: <><strong style={{ color: '#e4e6eb' }}>No integrated tool</strong> linking process design to hydraulics</> },
                { n: '02', t: <><strong style={{ color: '#e4e6eb' }}>Manual head loss</strong> calculations prone to compounding errors</> },
                { n: '03', t: <>DPR documentation done <strong style={{ color: '#e4e6eb' }}>separately from design</strong> — always out of sync</> },
                { n: '04', t: <>No <strong style={{ color: '#e4e6eb' }}>code-compliance validation</strong> against IS 10500 or CPHEEO</> },
                { n: '05', t: <><strong style={{ color: '#e4e6eb' }}>Multi-scenario comparison</strong> impossible without full rework</> },
              ].map(({ n, t }, i) => (
                <Reveal key={n} delay={i * 0.07}>
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px', borderRadius: 16, background: 'rgba(20,24,39,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: `3px solid ${ACCENT}66` }}>
                    <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: ACCENT, letterSpacing: '0.1em', flexShrink: 0, paddingTop: 2 }}>{n}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: '#9ca3af', lineHeight: 1.6 }}>{t}</span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section id="inode-solution" className="page-section">
        <div className="page-container">
          <SectionTag>The Solution</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>
              iNODE WTP — One platform. Full lifecycle.
            </h2>
          </Reveal>
          <div className="grid-3">
            {[
              { Icon: FlaskConical, num: '01 — Core', title: 'Process Intelligence', color: '#fff', desc: 'Maps raw water quality to the right treatment train using code-referenced process logic — IS 10500, CPHEEO, WHO, CPCB all built in.', features: ['Water quality parameter input', 'Treatment train recommendation', 'Multi-standard compliance check'] },
              { Icon: Droplets, num: '02 — Engine', title: 'Hydraulic Design', color: '#e4e4e7', desc: 'Computes head loss unit by unit, validates gravity flow, estimates pump TDH, and generates HGL/EGL profiles for the full plant.', features: ['Unit-wise head loss', 'HGL & EGL profile', 'Pump TDH estimation'] },
              { Icon: FileText, num: '03 — Output', title: 'DPR Generation', color: '#a1a1aa', desc: 'Converts computed design data into ready-to-submit DPR chapters, BOQ references, sizing sheets, and technical specifications.', features: ['Design basis report', 'Equipment sizing sheets', 'BOQ & technical specs'] },
            ].map(({ Icon, num, title, color, desc, features }, i) => (
              <Reveal key={num} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}
                  style={{ position: 'relative', height: '100%', borderRadius: 24, padding: 32, overflow: 'hidden', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, background: `${ACCENT}18`, border: `1px solid ${ACCENT}44` }}>
                      <Icon size={22} style={{ color: ACCENT }} />
                    </div>
                    <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, color, letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12 }}>{num}</div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 12, color: '#e4e6eb' }}>{title}</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#9ca3af' }}>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT, flexShrink: 0, display: 'inline-block' }} />{f}
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
          <SectionTag>Engineering Workflow</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>Raw water in. DPR out.</h2>
          </Reveal>
          <div className="flow-grid">
            {[
              { Icon: Droplets, n: '1', title: 'Raw Water Input', desc: 'Enter turbidity, pH, iron, TDS, alkalinity, color and microbial parameters from field reports.' },
              { Icon: GitBranch, n: '2', title: 'Process Selection', desc: 'Platform maps parameters to the optimal treatment train — code-compliant, automatically.' },
              { Icon: BarChart3, n: '3', title: 'Hydraulic Design', desc: 'Head losses computed unit-by-unit. HGL validated. Pump TDH estimated. Gravity flow confirmed.' },
              { Icon: Cpu, n: '4', title: 'Equipment Sizing', desc: 'Tank dimensions, detention times, filter rates, pipe diameters — all auto-calculated and flagged if non-compliant.' },
              { Icon: BookOpen, n: '5', title: 'DPR Output', desc: 'Export design basis report, hydraulic notes, sizing sheets, BOQ, and specifications — tender-ready.' },
            ].map(({ Icon, n, title, desc }, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}
                  style={{ position: 'relative', height: '100%', borderRadius: 24, padding: 24, background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 28, fontWeight: 700, color: `${ACCENT}18`, lineHeight: 1, position: 'absolute', top: -8, right: 0 }}>{n}</div>
                    <div style={{ width: 44, height: 44, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: `${ACCENT}12`, border: `1px solid ${ACCENT}33` }}>
                      <Icon size={20} style={{ color: ACCENT }} />
                    </div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#e4e6eb' }}>{title}</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENS ── */}
      <section id="inode-screens" className="page-section" style={{ background: 'rgba(10,11,15,0.8)' }}>
        <div className="page-container">
          <SectionTag>UI Screens</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 16, color: '#e4e6eb' }}>
              11 unit processes. One interface.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, fontWeight: 300, color: '#6b7280', lineHeight: 1.7, maxWidth: 520, marginBottom: 24 }}>
              From raw water intake to treated water delivery — every engineering module built for consultants, EPC teams, and training institutions.
            </p>
          </Reveal>
          <div style={{ perspective: '1000px', paddingBottom: 40, overflow: 'visible' }}>
            <Tabs
              tabs={INODE_SCREENS.map(s => ({
                title: s.title,
                value: s.value,
                content: <DesktopMockup screen={{ tag: s.tag, title: s.title2, desc: s.desc, content: s.content }} />,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ── UNIT PROCESSES ── */}
      <section className="page-section" style={{ background: 'rgba(20,24,39,0.3)' }}>
        <div className="page-container">
          <SectionTag>Unit Processes Covered</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>
              End-to-end. Nothing missing.
            </h2>
          </Reveal>
          <div className='module-grid-4' style={{ gap: 12 }}>
            {[
              { n: '01', title: 'Intake & Pumping', desc: 'Raw water intake, sump sizing, and rising main design' },
              { n: '02', title: 'Flash Mixer', desc: 'Rapid mixing — G value, detention time, power input' },
              { n: '03', title: 'Flocculator', desc: 'Baffled or mechanical — paddle sizing, velocity gradient' },
              { n: '04', title: 'Clariflocculator', desc: 'Tube settler / lamella — SOR, weir loading, sludge zone' },
              { n: '05', title: 'Rapid Sand Filter', desc: 'Filter rate, backwash rate, underdrain, air scour design' },
              { n: '06', title: 'Activated Carbon', desc: 'Contact time, bed depth, EBCT for taste & odour removal' },
              { n: '07', title: 'Chemical Dosing', desc: 'Alum, lime, chlorine — dose rates, tank sizing, pipework' },
              { n: '08', title: 'Clear Water Reservoir', desc: 'Storage hours, inlet/outlet layout, overflow design' },
              { n: '09', title: 'Disinfection', desc: 'Chlorine, UV, ozone — CT value, contact tank sizing' },
              { n: '10', title: 'Sludge Handling', desc: 'Sludge thickener, drying beds, backwash recovery tank' },
              { n: '11', title: 'Treated Water Main', desc: 'Delivery pumping, pipe sizing, pressure zone design' },
            ].map(({ n, title, desc }, i) => (
              <Reveal key={n} delay={(i % 4) * 0.07}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}
                  style={{ borderRadius: 16, padding: '20px', background: 'rgba(20,24,39,0.5)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 13, fontWeight: 700, color: '#e4e6eb', lineHeight: 1.3 }}>{title}</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 20, fontWeight: 800, color: ACCENT, lineHeight: 1, flexShrink: 0, marginLeft: 8 }}>{n}</div>
                  </div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>{desc}</div>
                  <div style={{ marginTop: 10, height: 2, background: `${ACCENT}18`, borderRadius: 9999 }}>
                    <div style={{ height: '100%', width: `${((11 - i) / 11) * 100}%`, background: ACCENT, borderRadius: 9999, opacity: 0.6 }} />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section id="inode-impact" className="page-section" style={{ background: 'rgba(14,16,23,0.9)' }}>
        <div className="page-container">
          <SectionTag>Impact</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>
              Engineering at full speed.
            </h2>
          </Reveal>
          <div className="impact-grid">
            <AnimatedStat value={11} label="Unit processes covered" />
            <AnimatedStat value={60} suffix="%" label="DPR turnaround reduced" />
            <AnimatedStat value={4} label="Design codes integrated" />
            <AnimatedStat value={4} label="States adopted" />
          </div>
          <div className="compare-grid">
            {[
              { label: 'Before iNODE WTP', items: ['Disconnected Excel sheets per unit process', 'Manual head loss — error-prone & slow', 'DPR written separately from design calcs', 'No compliance validation against standards'] },
              { label: 'After iNODE WTP', items: ['Single integrated environment for all units', 'Auto-computed HGL with flagged anomalies', 'DPR generated directly from design inputs', 'IS 10500, CPHEEO, WHO compliance built in'] },
            ].map(({ label, items }, i) => (
              <Reveal key={label} delay={i * 0.1}>
                <div style={{ borderRadius: 20, padding: '28px 32px', background: i === 0 ? 'rgba(20,24,39,0.4)' : `${ACCENT}08`, border: i === 0 ? '1px solid rgba(255,255,255,0.06)' : `1px solid ${ACCENT}33` }}>
                  <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: i === 0 ? '#555' : ACCENT, marginBottom: 20 }}>{label}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {items.map(it => (
                      <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#9ca3af' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? '#374151' : ACCENT, flexShrink: 0, display: 'inline-block' }} />{it}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Recognition */}
          <Reveal delay={0.2}>
            <div style={{ marginTop: 32, borderRadius: 20, padding: '28px 32px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#6366f1', marginBottom: 20 }}>Recognition</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                {[
                  { badge: 'Jal Shakti', detail: 'Endorsed by Ministry of Jal Shakti — adopted across water utility bodies' },
                  { badge: 'AICTE NEAT', detail: 'Listed on AICTE NEAT portal — used in engineering training programmes' },
                  { badge: 'PMO', detail: 'Recognised at PMO level as part of national smart water infrastructure push' },
                ].map(({ badge, detail }) => (
                  <div key={badge} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#6366f1', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 4, padding: '3px 10px', alignSelf: 'flex-start' }}>{badge}</span>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DECISIONS ── */}
      <section id="inode-decisions" className="page-section">
        <div className="page-container">
          <SectionTag>Key Design Decisions</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>Every choice had a reason.</h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { id: 'D1', decision: <><strong style={{ color: '#e4e6eb' }}>Integrate hydraulics directly into process design</strong></>, why: 'Most WTP failures are hydraulic — separating process and hydraulics creates dangerous blind spots', result: 'Gravity flow validated at every unit, pump TDH auto-computed, no post-design surprises' },
              { id: 'D2', decision: <><strong style={{ color: '#e4e6eb' }}>Code compliance as a first-class feature</strong>, not a checklist</>, why: 'Engineers waste hours manually cross-referencing IS 10500 and CPHEEO — embed the limits directly into the computation', result: 'Auto-flagging of non-compliant values with reference clause numbers' },
              { id: 'D3', decision: <><strong style={{ color: '#e4e6eb' }}>DPR output generated from design inputs</strong> — not typed separately</>, why: 'Manually writing DPR after design is done is where errors and inconsistencies appear', result: '60% reduction in DPR turnaround time — no copy-paste errors between calculation and documentation' },
              { id: 'D4', decision: <><strong style={{ color: '#e4e6eb' }}>Multi-scenario comparison</strong> at the process selection stage</>, why: 'Clients always ask "what if we used lamella settlers instead?" — this should be instant, not a week of rework', result: 'Engineers can compare 2–3 treatment trains side by side before committing to civil design' },
            ].map(({ id, decision, why, result }, i) => (
              <Reveal key={id} delay={i * 0.08}>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                  style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)'}} className="decision-grid">
                  <div style={{ display: 'flex', alignItems: 'flex-start', padding: 24, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 12, color: ACCENT, letterSpacing: '0.1em' }}>{id}</span>
                  </div>
                  {[{ label: 'Decision', content: decision }, { label: 'Why', content: why }, { label: 'Result', content: result }].map(({ label, content }, j) => (
                    <div key={label} style={{ padding: 24, borderRight: j < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                      <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 10 }}>{label}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{content}</div>
                    </div>
                  ))}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNINGS ── */}
      <section id="inode-learnings" className="page-section" style={{ background: 'rgba(20,24,39,0.4)' }}>
        <div className="page-container">
          <SectionTag>Learnings</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>What iNODE WTP taught me.</h2>
          </Reveal>
          <div className="compare-grid">
            {[
              { n: '01', t: 'Domain depth matters more than UI polish — understanding hydraulic engineering was non-negotiable before designing a single screen.' },
              { n: '02', t: 'Engineers trust tools that validate against standards. Embed the codes, not just the calculation fields.' },
              { n: '03', t: 'The output defines the tool — designing toward DPR-ready documents shaped every input field and workflow decision.' },
              { n: '04', t: 'Government adoption requires institutional trust — designing for CPHEEO and IS 10500 compliance was the key to Jal Shakti endorsement.' },
            ].map(({ n, t }, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                  style={{ position: 'relative', borderRadius: 24, padding: 40, overflow: 'hidden', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 72, fontWeight: 800, color: `${ACCENT}12`, lineHeight: 1, marginBottom: 20, letterSpacing: '-0.03em' }}>{n}</div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, fontWeight: 300, color: '#e4e6eb', lineHeight: 1.5, letterSpacing: '-0.01em' }}>{t}</p>
                    <div style={{ marginTop: 24, height: 1, width: 48, background: `linear-gradient(90deg, ${ACCENT}88, transparent)` }} />
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
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56, color: '#e4e6eb' }}>Where iNODE WTP goes next.</h2>
          </Reveal>
          <div className="impact-grid">
            {[
              { Icon: Zap, title: 'Real-time IoT sensor integration for live plant monitoring' },
              { Icon: Layers, title: 'Multi-WTP portfolio management across utility regions' },
              { Icon: Star, title: 'AI-assisted process selection from water quality trends' },
              { Icon: Shield, title: 'Automated DPR submission portal for government tenders' },
            ].map(({ Icon, title }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}
                  style={{ borderRadius: 24, padding: 32, height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, flexShrink: 0, background: `${ACCENT}12`, border: `1px solid ${ACCENT}33` }}>
                    <Icon size={22} style={{ color: ACCENT }} />
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 17, fontWeight: 700, color: '#e4e6eb', letterSpacing: '-0.01em' }}>{title}</h3>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-section" style={{ position: 'relative', overflow: 'hidden', background: 'rgba(20,24,39,0.6)' }}>
        <motion.div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}0a 0%, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="page-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(48px,8vw,96px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 32, color: '#e4e6eb' }}>
              Excel is<br />
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #fff 20%, #52525b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>not enough.</em>
              <br />iNODE fixed it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 300, color: '#9ca3af', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 48px' }}>
              From disconnected spreadsheets to an integrated digital engineering platform — endorsed by Jal Shakti, adopted across 4 states, and listed on AICTE NEAT.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} onClick={onBack}
                style={{ background: ACCENT, color: '#000', border: 'none', fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' as const, cursor: 'pointer', padding: '14px 32px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ArrowLeft size={14} /> Back to Portfolio
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('inode-decisions')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', padding: '14px 32px', borderRadius: 14 }}>
                View Decisions →
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div className="page-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 14, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' as const }}>iNODE WTP</div>
          <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: '#444', letterSpacing: '0.1em' }}>Product Design Case Study · 2023</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Problem', 'Solution', 'Screens', 'Impact', 'Decisions', 'Learnings'].map(l => (
              <a key={l} href={`#inode-${l.toLowerCase()}`} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#444', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#9ca3af')}
                onMouseLeave={e => (e.currentTarget.style.color = '#444')}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}