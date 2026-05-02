import { useRef, CSSProperties } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight, Mail, Linkedin, Globe } from 'lucide-react'
import { CardSpotlight } from './ui/card-spotlight'

const links = [
  { icon: Mail,     label: 'Email',    value: 'parkarharshad11@gmail.com',  href: 'mailto:parkarharshad11@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/harshadparkar', href: 'https://linkedin.com/in/harshadparkar' },
  { icon: Globe,    label: 'Behance',  value: 'behance.net/harshadparkar',  href: 'https://behance.net/harshadparkar' },
]

export function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} className="page-section" style={{ background: 'var(--bg)' }}>
      <div className="page-container">

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .7 }}
          style={{ marginBottom: 80 }}
        >
          <CardSpotlight color="rgba(99,102,241,0.25)" radius={700}
            style={{ borderRadius: 20, border: '1px solid var(--border)', background: 'var(--bg1)' } as CSSProperties}>

            <div className="cs-contact-padding" style={{ position: 'relative', zIndex: 10, padding: 'clamp(28px, 4vw, 56px) clamp(20px, 4vw, 48px)' }}>

              {/* Header + CTA row — stacks on mobile */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 'clamp(28px, 4vw, 48px)', flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 700, fontSize: 'clamp(22px,3vw,36px)', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
                    Let's build something great.
                  </h2>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
                    Available for freelance & full-time opportunities.
                  </p>
                </div>

                <motion.a
                  href="#portfolio"
                  onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }) }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 10, background: '#4f46e5', fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 13, color: '#fff', textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  View Projects <ArrowUpRight size={14} />
                </motion.a>
              </div>

              {/* Contact links — 3 col → 1 col on mobile */}
              <div className="contact-grid">
                {links.map((l) => {
                  const Icon = l.icon
                  return (
                    <CardSpotlight key={l.label} color="rgba(99,102,241,0.28)" radius={250}
                      style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg2)', transition: 'border-color .2s' } as CSSProperties}>
                    <a href={l.href}
                      target={l.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '18px 20px', textDecoration: 'none' }}
                      onMouseEnter={e => { (e.currentTarget.parentElement as HTMLElement).style.borderColor = 'var(--border2)' }}
                      onMouseLeave={e => { (e.currentTarget.parentElement as HTMLElement).style.borderColor = 'var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Icon size={13} color="#6B7280" />
                        <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: '#6B7280', letterSpacing: '.06em', textTransform: 'uppercase' }}>{l.label}</span>
                      </div>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: 13, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {l.value}
                      </span>
                    </a>
                    </CardSpotlight>
                  )
                })}
              </div>

            </div>
          </CardSpotlight>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: .5 }}
          className="footer-row"
          style={{ borderTop: '1px solid var(--border)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: 'var(--text3)', letterSpacing: '.08em' }}>© 2025 Harshad Parkar — Product Designer</span>
          <span style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 11, color: 'var(--text3)', letterSpacing: '.08em' }}>Pune · India · IST</span>
        </motion.div>

      </div>
    </section>
  )
}