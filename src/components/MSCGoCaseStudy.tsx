import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import {
  ArrowLeft, ArrowUpRight,
  Smartphone, BarChart3, ClipboardList, Users,
  CheckCircle, Settings, FileText, MapPin,
  TrendingUp, Zap, Star, Shield,
} from 'lucide-react'
import { Tabs } from './ui/tabs'

interface MSCGoCaseStudyProps { onBack: () => void }

// ─────────────────────────────────────────
// Responsive hook
// ─────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

// ─────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

function SectionTag({ children }: { children: string }) {
  return (
    <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
      <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)' }} />
      <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#a1a1aa' }}>{children}</span>
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
    const duration = 1400; const start = performance.now()
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setDisplayed(Math.round(ease * value))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value])
  return (
    <div ref={ref} style={{ borderRadius: 20, padding: '28px 20px', background: 'rgba(20,24,39,0.5)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 10, background: 'linear-gradient(135deg, #fff 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {displayed}{suffix}
      </div>
      <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#555' }}>{label}</div>
    </div>
  )
}

const ACCENT = '#E72547'
const ACCENT_DARK = '#c41e3a'

// ─────────────────────────────────────────
// Desktop Mockup (matches RAMS / iNode style)
// ─────────────────────────────────────────

function DesktopMockup({ screen }: { screen: { tag: string; title: string; desc: string; content: React.ReactNode; imageSrc?: string } }) {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(14,16,23,0.9)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />)}
        </div>
        <div style={{ flex: 1, height: 20, borderRadius: 6, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>msc-go.app</div>
        <div style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}44`, borderRadius: 20, padding: '3px 12px', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: ACCENT }}>{screen.tag}</div>
      </div>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)' }}>
        {screen.imageSrc ? (
          <img src={screen.imageSrc} alt={screen.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        ) : screen.content}
      </div>
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

function DashboardScreen() {
  return (
    <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ height: 8, width: 90, borderRadius: 4, background: 'rgba(255,255,255,0.25)', marginBottom: 6 }} />
          <div style={{ height: 13, width: 140, borderRadius: 4, background: 'rgba(255,255,255,0.5)' }} />
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${ACCENT}22`, border: `1px solid ${ACCENT}44` }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[{ label: "Today's Revenue", val: '₹4,280', highlight: true }, { label: 'Bookings', val: '12', highlight: false }].map((c, i) => (
          <div key={i} style={{ borderRadius: 12, padding: '14px 12px', background: c.highlight ? `${ACCENT}18` : 'rgba(255,255,255,0.04)', border: `1px solid ${c.highlight ? ACCENT + '44' : 'rgba(255,255,255,0.08)'}` }}>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#6b7280', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{c.label}</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 20, fontWeight: 800, color: c.highlight ? ACCENT : '#e4e6eb', lineHeight: 1 }}>{c.val}</div>
            <div style={{ marginTop: 4, fontSize: 9, color: '#22c55e' }}>↑ 18% vs yesterday</div>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 12, padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#6b7280', marginBottom: 8, textTransform: 'uppercase' as const }}>Weekly Performance</div>
        <svg width="100%" height="40" viewBox="0 0 220 40" preserveAspectRatio="none">
          <polyline points="0,36 30,28 60,32 90,14 120,18 150,8 180,12 220,4" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="0,36 30,28 60,32 90,14 120,18 150,8 180,12 220,4 220,40 0,40" fill={`${ACCENT}18`} />
        </svg>
      </div>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
        {[{ name: 'Rajesh M.', svc: 'Oil Change', status: 'In Progress' }, { name: 'Priya S.', svc: 'Washing', status: 'Completed' }, { name: 'Arun K.', svc: 'Mechanical', status: 'Pending' }].map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#e4e6eb' }}>{b.name}</div>
              <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#4b5563' }}>{b.svc}</div>
            </div>
            <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 9999, background: b.status === 'Completed' ? '#22c55e22' : b.status === 'In Progress' ? `${ACCENT}22` : 'rgba(255,255,255,0.06)', color: b.status === 'Completed' ? '#22c55e' : b.status === 'In Progress' ? ACCENT : '#6b7280', border: `1px solid ${b.status === 'Completed' ? '#22c55e44' : b.status === 'In Progress' ? ACCENT + '44' : 'rgba(255,255,255,0.1)'}` }}>{b.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function OnboardingScreen() {
  return (
    <div style={{ padding: '24px 18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28 }}>
        {[1, 2, 3, 4, 5].map(n => <div key={n} style={{ flex: 1, height: 3, borderRadius: 9999, background: n <= 2 ? ACCENT : 'rgba(255,255,255,0.1)' }} />)}
        <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: ACCENT, marginLeft: 4, flexShrink: 0 }}>2/5</span>
      </div>
      <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#6b7280', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Step 02</div>
      <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 20, fontWeight: 800, color: '#e4e6eb', lineHeight: 1.2, marginBottom: 6 }}>Service Setup</div>
      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#6b7280', marginBottom: 20 }}>Select the services your workshop offers</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {[{ icon: '🔧', name: 'Mechanical Repair', checked: true }, { icon: '🧼', name: 'Washing & Cleaning', checked: true }, { icon: '⚡', name: 'Electrical Work', checked: false }, { icon: '🛞', name: 'Tyre Services', checked: false }, { icon: '🎨', name: 'Denting & Painting', checked: false }].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 10, background: s.checked ? `${ACCENT}12` : 'rgba(255,255,255,0.03)', border: `1px solid ${s.checked ? ACCENT + '44' : 'rgba(255,255,255,0.07)'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: s.checked ? '#e4e6eb' : '#9ca3af' }}>{s.name}</span>
            </div>
            <div style={{ width: 18, height: 18, borderRadius: 9999, background: s.checked ? ACCENT : 'transparent', border: `2px solid ${s.checked ? ACCENT : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {s.checked && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#000', display: 'block' }} />}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '14px', borderRadius: 12, background: ACCENT, textAlign: 'center', fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 13, fontWeight: 700, color: '#000' }}>Continue →</div>
    </div>
  )
}

function BookingsScreen() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 16, fontWeight: 700, color: '#e4e6eb', marginBottom: 10 }}>Bookings</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Pending', 'In Progress', 'Completed'].map((t, i) => (
            <span key={t} style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, padding: '4px 10px', borderRadius: 9999, background: i === 0 ? ACCENT : 'rgba(255,255,255,0.05)', color: i === 0 ? '#000' : '#9ca3af', border: `1px solid ${i === 0 ? ACCENT : 'rgba(255,255,255,0.08)'}` }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[{ id: '#BK-1042', name: 'Rahul Sharma', vehicle: 'Honda Activa · MH12', svc: 'Oil Change + Filter', time: '10:30 AM', amt: '₹850' }, { id: '#BK-1041', name: 'Sunita Patil', vehicle: 'Bajaj Pulsar · MH14', svc: 'Tyre Rotation', time: '11:00 AM', amt: '₹400' }, { id: '#BK-1040', name: 'Vikram Joshi', vehicle: 'Maruti Swift · MH15', svc: 'Full Service', time: '12:30 PM', amt: '₹2,200' }].map((b, i) => (
          <div key={i} style={{ borderRadius: 12, padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: ACCENT }}>{b.id}</span>
              <span style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 12, fontWeight: 700, color: '#e4e6eb' }}>{b.amt}</span>
            </div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#e4e6eb', marginBottom: 2 }}>{b.name}</div>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#6b7280', marginBottom: 8 }}>{b.vehicle}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9ca3af' }}>{b.svc}</span>
              <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#6b7280' }}>{b.time}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, padding: '7px', borderRadius: 8, background: ACCENT, textAlign: 'center', fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: '#000' }}>Accept</div>
              <div style={{ flex: 1, padding: '7px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#9ca3af' }}>Decline</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkshopScreen() {
  return (
    <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <div style={{ borderRadius: 16, padding: '16px', background: `linear-gradient(135deg, ${ACCENT}18 0%, rgba(255,255,255,0.03) 100%)`, border: `1px solid ${ACCENT}33` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 14, fontWeight: 700, color: '#e4e6eb' }}>Sharma Auto Works</div>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#6b7280', marginTop: 2 }}>Kothrud, Pune</div>
          </div>
          <span style={{ padding: '3px 10px', borderRadius: 9999, background: '#22c55e22', border: '1px solid #22c55e44', fontSize: 9, color: '#22c55e', fontFamily: "'Geist Mono','Space Mono',monospace" }}>LIVE</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['2W', '4W'].map(t => <span key={t} style={{ padding: '3px 10px', borderRadius: 9999, background: `${ACCENT}22`, border: `1px solid ${ACCENT}44`, fontSize: 9, color: ACCENT, fontFamily: "'Geist Mono','Space Mono',monospace" }}>{t}</span>)}
        </div>
      </div>
      {[{ Icon: Settings, label: 'Workshop Details', sub: 'Address, hours, contact' }, { Icon: ClipboardList, label: 'Services & Pricing', sub: '8 services configured' }, { Icon: FileText, label: 'Documents', sub: 'PAN, GST, Bank details' }, { Icon: Users, label: 'Employees', sub: '3 mechanics assigned' }, { Icon: MapPin, label: 'Location', sub: 'Map verified' }].map(({ Icon, label, sub }, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `${ACCENT}18`, border: `1px solid ${ACCENT}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={14} style={{ color: ACCENT }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#e4e6eb' }}>{label}</div>
            <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#6b7280' }}>{sub}</div>
          </div>
          <span style={{ color: '#6b7280', fontSize: 14 }}>›</span>
        </div>
      ))}
    </div>
  )
}

function EmployeeScreen() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 16, fontWeight: 700, color: '#e4e6eb' }}>Team</div>
        <div style={{ padding: '6px 14px', borderRadius: 9999, background: ACCENT, fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: '#000' }}>+ Add</div>
      </div>
      <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[{ name: 'Manoj Shinde', role: 'Sr. Mechanic', jobs: 5, color: '#6366f1' }, { name: 'Deepak Rao', role: 'Jr. Mechanic', jobs: 3, color: '#22c55e' }, { name: 'Amit Kulkarni', role: 'Manager', jobs: 0, color: ACCENT }].map((e, i) => (
          <div key={i} style={{ borderRadius: 12, padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: e.color + '22', border: `1px solid ${e.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 700, fontSize: 14, color: e.color }}>{e.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#e4e6eb' }}>{e.name}</div>
              <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#6b7280', marginTop: 2 }}>{e.role}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 18, fontWeight: 800, color: e.jobs > 0 ? ACCENT : '#374151' }}>{e.jobs}</div>
              <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 8, color: '#6b7280' }}>jobs today</div>
            </div>
          </div>
        ))}
        <div style={{ borderRadius: 12, padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#6b7280', marginBottom: 10, textTransform: 'uppercase' as const }}>Workload</div>
          {[{ name: 'Manoj', pct: 83 }, { name: 'Deepak', pct: 50 }, { name: 'Amit', pct: 20 }].map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 36, fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#9ca3af' }}>{w.name}</div>
              <div style={{ flex: 1, height: 5, borderRadius: 9999, background: 'rgba(255,255,255,0.05)' }}>
                <div style={{ width: `${w.pct}%`, height: '100%', borderRadius: 9999, background: ACCENT }} />
              </div>
              <div style={{ width: 28, fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#9ca3af', textAlign: 'right' }}>{w.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const MSC_SCREENS = [
  { title: 'Dashboard', value: 'dashboard', tag: '01 — Home', title2: 'Manager Dashboard', desc: 'Real-time revenue, booking counts, and weekly performance charts — everything a workshop owner needs at a glance.', content: <DashboardScreen />, imageSrc: '/MSCDashboard.png' },
  { title: 'Onboarding', value: 'onboarding', tag: '02 — Setup', title2: 'Workshop Setup Flow', desc: 'Structured 5-step onboarding guides workshops from registration to going LIVE — minimizing drop-off at each step.', content: <OnboardingScreen />, imageSrc: '/Onboarding.png' },
  { title: 'Bookings', value: 'bookings', tag: '03 — Bookings', title2: 'Booking Management', desc: 'Accept, track, and manage the full booking lifecycle — from pending to in-progress to completed, per vehicle and service.', content: <BookingsScreen />, imageSrc: '/Booking.png' },
  { title: 'My Workshop', value: 'workshop', tag: '04 — Workshop', title2: 'Workshop Configuration', desc: 'Edit services, documents, location, and images — supports multiple workshop management from one account.', content: <WorkshopScreen />, imageSrc: '/My Workshop.png' },
  { title: 'More', value: 'employees', tag: '05 — More', title2: 'More UI Screens', desc: 'Additional screens including profile, settings, checkout, and other key flows across the MSC Go experience.', content: <EmployeeScreen />, imageSrc: '/More.jpg' },
]


// ─────────────────────────────────────────
// Main export
// ─────────────────────────────────────────

export function MSCGoCaseStudy({ onBack }: MSCGoCaseStudyProps) {
  const isMobile = useIsMobile()

  useEffect(() => {
    const id = 'msc-fonts'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id; link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;500;700;800&family=Inter:wght@300;400;500&display=swap'
      document.head.appendChild(link)
    }
    return () => { document.getElementById(id)?.remove() }
  }, [])

  // Inject responsive CSS once
  useEffect(() => {
    const id = 'msc-responsive-css'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      .msc-problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
      .msc-solution-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
      .msc-flow-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 16px; }
      .msc-module-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
      .msc-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 48px; }
      .msc-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .msc-decision-row { display: grid; grid-template-columns: 64px 1fr 1fr 1fr; }
      .msc-decision-id { padding: 24px; border-right: 1px solid rgba(255,255,255,0.06); }
      .msc-decision-cell { padding: 24px; }
      .msc-learnings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      .msc-future-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
      .cs-nav-links { display: flex !important; }
      .hero-side-stats { display: flex !important; }
      @media (max-width: 900px) {
        .msc-solution-grid { grid-template-columns: 1fr 1fr !important; }
        .msc-flow-grid { grid-template-columns: 1fr 1fr !important; }
        .msc-future-grid { grid-template-columns: 1fr 1fr !important; }
        .msc-module-grid { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 767px) {
        .msc-problem-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        .msc-solution-grid { grid-template-columns: 1fr !important; }
        .msc-flow-grid { grid-template-columns: 1fr 1fr !important; }
        .msc-module-grid { grid-template-columns: 1fr !important; }
        .msc-stats-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; margin-bottom: 24px !important; }
        .msc-compare-grid { grid-template-columns: 1fr !important; }
        .msc-decision-row { grid-template-columns: 1fr !important; }
        .msc-decision-id { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 16px 20px 12px !important; }
        .msc-decision-cell { padding: 14px 20px !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .msc-decision-cell:last-child { border-bottom: none !important; }
        .msc-learnings-grid { grid-template-columns: 1fr !important; }
        .msc-future-grid { grid-template-columns: 1fr 1fr !important; }
        .cs-nav-links { display: none !important; }
        .hero-side-stats { display: none !important; }
      }
    `
    document.head.appendChild(style)
    return () => { document.getElementById(id)?.remove() }
  }, [])

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#0a0b0f', color: '#e4e6eb', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── INJECT responsive styles for page-section / page-container ── */}
      <style>{`
        .page-section { padding: clamp(60px,8vw,120px) 0; }
        .page-container { max-width: 1200px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
      `}</style>

      {/* ── NAV ── */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '12px 0' }}>
        <div className="page-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 14, padding: '10px 16px', background: 'rgba(20,24,39,0.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', gap: 12 }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 13, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' as const }}>MSC Go</div>
              <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, letterSpacing: '0.1em', color: '#555', marginTop: 2 }}>Case Study — 2024</div>
            </div>
            <div className="cs-nav-links" style={{ alignItems: 'center', gap: 16 }}>
              {['Problem', 'Solution', 'Screens', 'Impact', 'Decisions', 'Learnings'].map(l => (
                <a key={l} href={`#msc-${l.toLowerCase()}`}
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
      <section ref={heroRef} className="cs-hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingTop: 'clamp(80px,12vw,120px)', paddingBottom: 'clamp(40px,6vw,80px)' }}>
        <motion.div style={{ position: 'absolute', top: 80, right: 0, width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}0d 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className="cs-hero-bg-number" style={{ position: 'absolute', top: 120, right: 40, fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(80px,18vw,220px)', fontWeight: 800, color: 'rgba(255,255,255,0.025)', lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none' }}>02</div>

        <div className="page-container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 9999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 'clamp(16px,3vw,32px)' }}>
            <motion.span style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, display: 'block' }} animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#9ca3af' }}>Product Design Case Study</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(36px,8vw,112px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 'clamp(16px,2.5vw,28px)' }}>
            MSC Go<br />Workshop<br />
            <span style={{ background: 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Platform.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }}
            style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(14px,2vw,18px)', fontWeight: 300, color: '#9ca3af', maxWidth: 560, lineHeight: 1.7, marginBottom: 'clamp(24px,4vw,48px)' }}>
            A mobile-first platform that transforms local vehicle workshops into digitally enabled service providers — managing bookings, teams, and revenue in one place.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById('msc-solution')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: ACCENT, color: '#000', border: 'none', fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' as const, cursor: 'pointer', padding: 'clamp(11px,1.5vw,14px) clamp(20px,3vw,32px)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              Explore Case Study <ArrowUpRight size={16} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => document.getElementById('msc-decisions')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 'clamp(11px,1.3vw,12px)', letterSpacing: '0.1em', cursor: 'pointer', padding: 'clamp(11px,1.5vw,14px) clamp(20px,3vw,32px)', borderRadius: 14 }}>
              Key Decisions →
            </motion.button>
          </motion.div>
        </div>

        <div className="hero-side-stats" style={{ position: 'absolute', right: 'clamp(20px,5vw,80px)', bottom: 'clamp(40px,6vw,80px)', flexDirection: 'column', gap: 24 }}>
          {[{ n: '73', l: 'Screens Designed' }, { n: '5', l: 'Core Modules' }, { n: 'B2B', l: 'Mobile Platform' }].map(({ n, l }) => (
            <div key={l} style={{ textAlign: 'right', borderRight: `2px solid ${ACCENT}66`, paddingRight: 20 }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 36, fontWeight: 800, color: '#e4e6eb', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ overflow: 'hidden', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(20,24,39,0.4)' }}>
        <motion.div style={{ display: 'flex', gap: 56, whiteSpace: 'nowrap', width: 'max-content' }} animate={{ x: ['0%', '-50%'] }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
          {['Workshop Onboarding', 'Booking Management', 'Revenue Tracking', 'Employee Roles', 'Service Config', 'Multi-Workshop', 'OTP Login', 'Live Dashboard',
            'Workshop Onboarding', 'Booking Management', 'Revenue Tracking', 'Employee Roles', 'Service Config', 'Multi-Workshop', 'OTP Login', 'Live Dashboard'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT + '99', display: 'inline-block' }} />
              <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── PROBLEM ── */}
      <section id="msc-problem" className="page-section" style={{ background: 'rgba(20,24,39,0.3)' }}>
        <div className="page-container">
          <SectionTag>The Problem</SectionTag>
          <div className="msc-problem-grid">
            <div>
              <Reveal>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, color: '#e4e6eb' }}>
                  Local workshops were<br />running on paper.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.8vw,17px)', fontWeight: 300, color: '#9ca3af', lineHeight: 1.75, marginBottom: 36 }}>
                  Thousands of local garages across India managed bookings through <strong style={{ color: '#e4e6eb', fontWeight: 500 }}>phone calls and notebooks</strong>. No digital presence. No performance data. No way to scale.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {[{ label: 'Garage Owners', color: '#fff' }, { label: 'Service Managers', color: '#fff' }, { label: 'Mechanics', color: '#d4d4d8' }].map(({ label, color }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 9999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: '#9ca3af', letterSpacing: '0.08em' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />{label}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { n: '01', t: <><strong style={{ color: '#e4e6eb' }}>No digital booking system</strong> — calls & walk-ins only</> },
                { n: '02', t: <>Zero visibility into <strong style={{ color: '#e4e6eb' }}>revenue or performance trends</strong></> },
                { n: '03', t: <>No structured way to <strong style={{ color: '#e4e6eb' }}>manage employee workloads</strong></> },
                { n: '04', t: <>Cannot onboard quickly without <strong style={{ color: '#e4e6eb' }}>complex paperwork</strong></> },
                { n: '05', t: <><strong style={{ color: '#e4e6eb' }}>No multi-workshop</strong> support for growing businesses</> },
              ].map(({ n, t }, i) => (
                <Reveal key={n} delay={i * 0.07}>
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 20px', borderRadius: 16, background: 'rgba(20,24,39,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: `3px solid ${ACCENT}66` }}>
                    <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: ACCENT, letterSpacing: '0.1em', flexShrink: 0, paddingTop: 2 }}>{n}</span>
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{t}</span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section id="msc-solution" className="page-section">
        <div className="page-container">
          <SectionTag>The Solution</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 40, color: '#e4e6eb' }}>
              MSC Go — One app. End-to-end.
            </h2>
          </Reveal>
          <div className="msc-solution-grid">
            {[
              { Icon: Smartphone, num: '01 — Core', title: 'Mobile-First UX', color: '#fff', desc: "Designed for garage owners on the go — fast OTP login, minimal friction onboarding, and a thumb-friendly interface.", features: ['OTP-based auth', 'Multi-language support', 'Guided 5-step setup'] },
              { Icon: BarChart3, num: '02 — Platform', title: 'Operations Hub', color: '#e4e4e7', desc: "Dashboard that shows today's revenue, bookings, and performance — making data actionable for non-technical owners.", features: ['Real-time booking alerts', 'Revenue & performance charts', 'Weekly trend analytics'] },
              { Icon: Users, num: '03 — Team', title: 'Team & Workshop', color: '#a1a1aa', desc: "Manage employees, assign roles, and support multiple workshops from a single account — built for scale.", features: ['Role-based employee management', 'Multi-workshop support', 'Workload distribution view'] },
            ].map(({ Icon, num, title, color, desc, features }, i) => (
              <Reveal key={num} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} style={{ position: 'relative', height: '100%', borderRadius: 24, padding: 28, overflow: 'hidden', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: `${ACCENT}18`, border: `1px solid ${ACCENT}44` }}>
                    <Icon size={22} style={{ color: ACCENT }} />
                  </div>
                  <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, color, letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 10 }}>{num}</div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 10, color: '#e4e6eb' }}>{title}</h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#9ca3af' }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT, flexShrink: 0, display: 'inline-block' }} />{f}
                      </div>
                    ))}
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
          <SectionTag>Core User Flow</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 40, color: '#e4e6eb' }}>From signup to first booking.</h2>
          </Reveal>
          <div className="msc-flow-grid">
            {[
              { Icon: Smartphone, n: '1', title: 'OTP Login', desc: 'Fast mobile number login with OTP. Multi-language selection on first open.' },
              { Icon: Settings, n: '2', title: 'Workshop Setup', desc: '5-step guided onboarding — details, services, brands, documents, agreement.' },
              { Icon: CheckCircle, n: '3', title: 'Go Live', desc: 'Workshop verified and published on the MSC Go platform for customers to discover.' },
              { Icon: ClipboardList, n: '4', title: 'Receive Bookings', desc: 'Accept, manage and update bookings in real time from the mobile dashboard.' },
              { Icon: TrendingUp, n: '5', title: 'Track Growth', desc: 'Monitor daily revenue, booking trends, and mechanic performance with built-in analytics.' },
            ].map(({ Icon, n, title, desc }, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} style={{ position: 'relative', height: '100%', borderRadius: 24, padding: 22, background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 28, fontWeight: 700, color: `${ACCENT}18`, lineHeight: 1, position: 'absolute', top: -8, right: 0 }}>{n}</div>
                    <div style={{ width: 44, height: 44, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: `${ACCENT}12`, border: `1px solid ${ACCENT}33` }}>
                      <Icon size={20} style={{ color: ACCENT }} />
                    </div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#e4e6eb' }}>{title}</h3>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENS ── */}
      <section id="msc-screens" className="page-section" style={{ background: 'rgba(10,11,15,0.8)' }}>
        <div className="page-container">
          <SectionTag>UI Screens</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(28px,5vw,60px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 16, color: '#e4e6eb' }}>
              73 screens. Every flow covered.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(14px,1.8vw,17px)', fontWeight: 300, color: '#6b7280', lineHeight: 1.7, maxWidth: 520, marginBottom: 40 }}>
              Built on a 384×854 mobile frame with a 16px grid — every module from onboarding to analytics, designed for the field.
            </p>
          </Reveal>
          <div style={{ perspective: "1000px", overflow: "visible" }}>
            <Tabs
              tabs={MSC_SCREENS.map(s => ({
                title: s.title,
                value: s.value,
                content: <DesktopMockup screen={{ tag: s.tag, title: s.title2, desc: s.desc, content: s.content, imageSrc: s.imageSrc }} />,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ── MODULE BREAKDOWN ── */}
      <section className="page-section" style={{ background: 'rgba(20,24,39,0.3)' }}>
        <div className="page-container">
          <SectionTag>App Structure</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 40, color: '#e4e6eb' }}>9 modules. 73 screens.</h2>
          </Reveal>
          <div className="msc-module-grid">
            {[
              { module: 'Login & Onboarding', screens: 18, desc: 'OTP auth, language select, profile setup, service category selection' },
              { module: 'Workshop Information', screens: 6, desc: 'Basic details, address, map location, working hours, vehicle types' },
              { module: 'Service Setup', screens: 7, desc: 'Category selection, pricing per service, custom service creation' },
              { module: 'Brand & Model Preference', screens: 16, desc: 'Supported brands and specific model selection per vehicle type' },
              { module: 'Workshop Documents', screens: 3, desc: 'PAN/GST upload, bank details, shop registration document' },
              { module: 'My Workshop', screens: 8, desc: 'View and edit all workshop details — supports multiple workshops' },
              { module: 'Bookings', screens: 5, desc: 'Accept, track, and update booking status through full lifecycle' },
              { module: 'Add Employee', screens: 5, desc: 'Add mechanics and managers with role assignment and workshop linking' },
              { module: 'Profile', screens: 2, desc: 'User info, support access, referral programme, and logout' },
            ].map(({ module, screens, desc }, i) => (
              <Reveal key={module} delay={(i % 3) * 0.08}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} style={{ borderRadius: 20, padding: '22px', background: 'rgba(20,24,39,0.5)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 14, fontWeight: 700, color: '#e4e6eb', lineHeight: 1.3 }}>{module}</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 24, fontWeight: 800, color: ACCENT, lineHeight: 1, flexShrink: 0, marginLeft: 8 }}>{screens}</div>
                  </div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginBottom: 12 }}>{desc}</div>
                  <div style={{ height: 2, background: `${ACCENT}22`, borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(screens / 18) * 100}%`, background: ACCENT, borderRadius: 9999 }} />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section id="msc-impact" className="page-section" style={{ background: 'rgba(14,16,23,0.9)' }}>
        <div className="page-container">
          <SectionTag>Impact</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 40, color: '#e4e6eb' }}>Digital-first for local workshops.</h2>
          </Reveal>
          <div className="msc-stats-grid">
            <AnimatedStat value={73} label="Screens designed" />
            <AnimatedStat value={9} label="Modules shipped" />
            <AnimatedStat value={5} label="Onboarding steps" />
            <AnimatedStat value={2} suffix="×" label="Booking conversion" />
          </div>
          <div className="msc-compare-grid">
            {[
              { label: 'Before MSC Go', items: ['Phone calls & walk-ins only', 'Notebook-based job tracking', 'No revenue visibility', 'No team workload management'] },
              { label: 'After MSC Go', items: ['Digital booking with instant alerts', 'Real-time dashboard & analytics', 'Full revenue & performance tracking', 'Role-based team management'] },
            ].map(({ label, items }, i) => (
              <Reveal key={label} delay={i * 0.1}>
                <div style={{ borderRadius: 20, padding: 'clamp(20px,3vw,28px) clamp(20px,3vw,32px)', background: i === 0 ? 'rgba(20,24,39,0.4)' : `${ACCENT}08`, border: i === 0 ? '1px solid rgba(255,255,255,0.06)' : `1px solid ${ACCENT}33` }}>
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
        </div>
      </section>

      {/* ── DECISIONS ── */}
      <section id="msc-decisions" className="page-section">
        <div className="page-container">
          <SectionTag>Key Design Decisions</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 40, color: '#e4e6eb' }}>Every choice had a reason.</h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { id: 'D1', decision: <><strong style={{ color: '#e4e6eb' }}>Step-based onboarding</strong> over single long form</>, why: 'Garage owners are non-technical — breaking setup into 5 short steps reduces abandonment and cognitive load', result: 'Higher completion rate, fewer drop-offs at critical setup stages' },
              { id: 'D2', decision: <><strong style={{ color: '#e4e6eb' }}>Mobile-first</strong> over responsive web</>, why: 'Workshop owners operate on their phones on the floor — not at a desk with a laptop', result: 'Natural adoption, no training required, works in real garage environments' },
              { id: 'D3', decision: <><strong style={{ color: '#e4e6eb' }}>OTP login</strong> over username/password</>, why: 'Target users forget passwords and struggle with account recovery — phone OTP is familiar and frictionless', result: 'Zero login failures, lower support burden, faster onboarding' },
              { id: 'D4', decision: <><strong style={{ color: '#e4e6eb' }}>Data-first dashboard</strong> as the home screen</>, why: "Workshop owners check revenue and pending jobs the moment they open the app — that's the most important action", result: 'One tap to see full daily picture, driving daily active use' },
            ].map(({ id, decision, why, result }, i) => (
              <Reveal key={id} delay={i * 0.08}>
                <motion.div whileHover={{ x: isMobile ? 0 : 4 }} transition={{ duration: 0.2 }}
                  style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="msc-decision-row">
                    <div className="msc-decision-id" style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 12, color: ACCENT, letterSpacing: '0.1em' }}>{id}</span>
                    </div>
                    {[{ label: 'Decision', content: decision }, { label: 'Why', content: why }, { label: 'Result', content: result }].map(({ label, content }, j) => (
                      <div key={label} className="msc-decision-cell" style={{ borderRight: j < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                        <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 10 }}>{label}</div>
                        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{content}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNINGS ── */}
      <section id="msc-learnings" className="page-section" style={{ background: 'rgba(20,24,39,0.4)' }}>
        <div className="page-container">
          <SectionTag>Learnings</SectionTag>
          <Reveal>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 40, color: '#e4e6eb' }}>What MSC Go taught me.</h2>
          </Reveal>
          <div className="msc-learnings-grid">
            {[
              { n: '01', t: 'Designing for non-technical users demands extreme simplicity — every extra tap is a potential drop-off.' },
              { n: '02', t: 'Mobile context is everything — garage floors are loud, bright, and busy. The UI must work in those conditions.' },
              { n: '03', t: 'Onboarding is a product in itself. The faster a workshop goes live, the higher the retention.' },
              { n: '04', t: 'Data visibility is the biggest motivator for daily active use — make the numbers visible instantly.' },
            ].map(({ n, t }, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} style={{ position: 'relative', borderRadius: 24, padding: 'clamp(24px,3vw,40px)', overflow: 'hidden', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(48px,7vw,72px)', fontWeight: 800, color: `${ACCENT}12`, lineHeight: 1, marginBottom: 16, letterSpacing: '-0.03em' }}>{n}</div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(16px,2vw,20px)', fontWeight: 300, color: '#e4e6eb', lineHeight: 1.5, letterSpacing: '-0.01em' }}>{t}</p>
                  <div style={{ marginTop: 20, height: 1, width: 48, background: `linear-gradient(90deg, ${ACCENT}88, transparent)` }} />
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
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 40, color: '#e4e6eb' }}>Where MSC Go goes next.</h2>
          </Reveal>
          <div className="msc-future-grid">
            {[
              { Icon: Zap, title: 'Smarter defaults — reduce setup from 5 steps to 3' },
              { Icon: Star, title: 'Customer ratings & review system for workshops' },
              { Icon: Shield, title: 'Offline-first mode for low-connectivity areas' },
              { Icon: TrendingUp, title: 'AI-powered booking prediction & peak alerts' },
            ].map(({ Icon, title }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} style={{ borderRadius: 24, padding: 28, height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(20,24,39,0.5)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, flexShrink: 0, background: `${ACCENT}12`, border: `1px solid ${ACCENT}33` }}>
                    <Icon size={22} style={{ color: ACCENT }} />
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 16, fontWeight: 700, color: '#e4e6eb', letterSpacing: '-0.01em' }}>{title}</h3>
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
            <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 'clamp(36px,8vw,96px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 32, color: '#e4e6eb' }}>
              Paper is<br />
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #fff 20%, #52525b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>over.</em>
              <br />MSC Go fixed it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,2vw,18px)', fontWeight: 300, color: '#9ca3af', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px' }}>
              From manual notebooks to a real-time digital platform — helping local workshops get more bookings, track performance, and grow their business.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} onClick={onBack}
                style={{ background: ACCENT, color: '#000', border: 'none', fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' as const, cursor: 'pointer', padding: 'clamp(11px,1.5vw,14px) clamp(20px,3vw,32px)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ArrowLeft size={14} /> Back to Portfolio
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => document.getElementById('msc-decisions')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 12, letterSpacing: '0.1em', cursor: 'pointer', padding: '14px 28px', borderRadius: 14 }}>
                View Decisions →
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 0' }}>
        <div className="page-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 14, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' as const }}>MSC Go</div>
          <div style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: '#444', letterSpacing: '0.1em' }}>Product Design Case Study · 2024</div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['Problem', 'Solution', 'Screens', 'Impact', 'Decisions', 'Learnings'].map(l => (
              <a key={l} href={`#msc-${l.toLowerCase()}`} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#444', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#9ca3af')} onMouseLeave={e => (e.currentTarget.style.color = '#444')}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}