import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Sun, Moon } from 'lucide-react'

interface Props { theme: 'dark' | 'light'; onToggleTheme: () => void }

const links = [
  { label: 'Work',         href: '#portfolio'  },
  { label: 'Career',       href: '#experience' },
  { label: 'Testimonials', href: '#about'      },
  { label: 'Contact',      href: '#contact'    },
]

export function Navigation({ theme, onToggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const dark = theme === 'dark'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, open ? 300 : 0)
  }

  const pill: React.CSSProperties = {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    padding:        '10px 16px',
    borderRadius:   14,
    background:     scrolled
      ? dark ? 'rgba(8,8,8,0.92)' : 'rgba(255,255,255,0.92)'
      : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    border: scrolled
      ? dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.1)'
      : '1px solid transparent',
    transition: 'all .35s ease',
  }

  const iconBtnStyle = (mobile = false): React.CSSProperties => ({
    width:          34,
    height:         34,
    borderRadius:   8,
    marginLeft:     mobile ? 0 : 4,
    border:         dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
    background:     dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    color:          'var(--text2)',
  })

  const hoverBg  = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const drawerBg = dark ? 'rgba(10,10,12,0.98)'    : 'rgba(255,255,255,0.98)'
  const drawerBorder = dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)'
  const dividerColor = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'

  return (
    <>
      {/* ── Fixed header ──────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          right:      0,
          zIndex:     100,
          padding:    scrolled ? '10px 0' : '18px 0',
          transition: 'padding .3s ease',
        }}
      >
        <div className="page-container">
          <div style={pill}>

            {/* Logo */}
            <button
              onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none' }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: dark ? '#fff' : '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
                fontWeight: 800, fontSize: 12, color: dark ? '#000' : '#fff',
                flexShrink: 0,
              }}>HP</div>
              <span style={{
                fontFamily:    "'Plus Jakarta Sans','Inter',sans-serif",
                fontWeight:    800,
                fontSize:      15,
                color:         'var(--text)',
                letterSpacing: '-0.02em',
              }}>Harshad Parkar</span>
            </button>

            {/* ── Desktop nav (≥768px) ─────────────────────────── */}
            <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 4 }}>
              {links.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: .1 + i * .06 }}
                  onClick={() => go(l.href)}
                  style={{
                    padding:        '8px 16px',
                    borderRadius:   10,
                    fontFamily:     "'Geist Mono','Space Mono',monospace",
                    fontSize:       11,
                    letterSpacing:  '.1em',
                    textTransform:  'uppercase',
                    color:          'var(--text2)',
                    background:     'none',
                    border:         'none',
                    transition:     'color .2s, background .2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color      = 'var(--text)'
                    el.style.background = hoverBg
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color      = 'var(--text2)'
                    el.style.background = 'none'
                  }}
                >{l.label}</motion.button>
              ))}

              {/* Theme toggle */}
              <button onClick={onToggleTheme} style={iconBtnStyle()}>
                {dark ? <Sun size={14} /> : <Moon size={14} />}
              </button>

              {/* CTA */}
              <button
                onClick={() => go('#contact')}
                style={{
                  marginLeft:   8,
                  padding:      '9px 20px',
                  borderRadius: 9999,
                  background:   'var(--text)',
                  border:       'none',
                  fontFamily:   "'Inter',sans-serif",
                  fontWeight:   600,
                  fontSize:     13,
                  color:        'var(--bg)',
                  transition:   'opacity .2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '.85' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'   }}
              >Let's Connect</button>
            </nav>

            {/* ── Mobile controls (< 768px) ───────────────────── */}
            <div className="flex md:hidden" style={{ alignItems: 'center', gap: 8 }}>
              <button onClick={onToggleTheme} style={iconBtnStyle(true)}>
                {dark ? <Sun size={14} /> : <Moon size={14} />}
              </button>

              <button
                onClick={() => setOpen(v => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                style={{
                  width:          36,
                  height:         36,
                  borderRadius:   8,
                  border:         dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
                  background:     open
                    ? dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                    : dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          'var(--text)',
                  transition:     'background .2s',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate:   0, opacity: 1 }}
                    exit={{    rotate:  90, opacity: 0 }}
                    transition={{ duration: .18 }}
                    style={{ display: 'flex' }}
                  >
                    {open ? <X size={18} /> : <Menu size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer backdrop ────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: .25 }}
            onClick={() => setOpen(false)}
            style={{
              position:   'fixed',
              inset:      0,
              zIndex:     90,
              background: dark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer panel ───────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: '0%'   }}
            exit={{    x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            style={{
              position:   'fixed',
              top:        0,
              right:      0,
              bottom:     0,
              zIndex:     95,
              width:      'min(320px, 85vw)',
              background: drawerBg,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: drawerBorder,
              display:    'flex',
              flexDirection: 'column',
            }}
          >
            {/* Drawer header */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '20px 24px',
              borderBottom:   `1px solid ${dividerColor}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: dark ? '#fff' : '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
                  fontWeight: 800, fontSize: 11, color: dark ? '#000' : '#fff',
                }}>HP</div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
                  fontWeight: 700, fontSize: 14, color: 'var(--text)',
                  letterSpacing: '-0.02em',
                }}>Harshad Parkar</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                  background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text2)',
                }}
              ><X size={16} /></button>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {links.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0  }}
                  transition={{ delay: i * .06, duration: .25 }}
                  onClick={() => go(l.href)}
                  style={{
                    display:       'flex',
                    alignItems:    'center',
                    width:         '100%',
                    padding:       '14px 16px',
                    borderRadius:  10,
                    background:    'none',
                    border:        'none',
                    fontFamily:    "'Geist Mono','Space Mono',monospace",
                    fontSize:      12,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color:         'var(--text2)',
                    textAlign:     'left',
                    transition:    'background .18s, color .18s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = hoverBg
                    el.style.color      = 'var(--text)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'none'
                    el.style.color      = 'var(--text2)'
                  }}
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>

            {/* Drawer footer — CTA + socials */}
            <div style={{
              padding:       '20px 16px',
              borderTop:     `1px solid ${dividerColor}`,
              display:       'flex',
              flexDirection: 'column',
              gap:           12,
            }}>
              <button
                onClick={() => go('#contact')}
                style={{
                  width:        '100%',
                  padding:      '13px 20px',
                  borderRadius: 10,
                  background:   dark ? '#fff' : '#000',
                  border:       'none',
                  fontFamily:   "'Inter',sans-serif",
                  fontWeight:   700,
                  fontSize:     14,
                  color:        dark ? '#000' : '#fff',
                  transition:   'opacity .2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '.85' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'   }}
              >Let's Connect</button>

              {/* Social row */}
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { label: 'Behance',  href: 'https://behance.net/harshadparkar'     },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/harshadparkar' },
                  { label: 'Email',    href: 'mailto:parkarharshad11@gmail.com'       },
                ].map(s => (
                  <a key={s.label} href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    style={{
                      flex:           1,
                      padding:        '9px 8px',
                      borderRadius:   8,
                      border:         dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                      background:     dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                      fontFamily:     "'Geist Mono','Space Mono',monospace",
                      fontSize:       9,
                      letterSpacing:  '.1em',
                      textTransform:  'uppercase',
                      color:          'var(--text3)',
                      textDecoration: 'none',
                      textAlign:      'center',
                      transition:     'border-color .18s, color .18s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                      el.style.color       = 'var(--text2)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                      el.style.color       = 'var(--text3)'
                    }}
                  >{s.label}</a>
                ))}
              </div>

              <span style={{
                fontFamily:    "'Geist Mono','Space Mono',monospace",
                fontSize:      10,
                color:         'var(--text3)',
                letterSpacing: '.06em',
                textAlign:     'center',
              }}>© 2025 Harshad Parkar</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
