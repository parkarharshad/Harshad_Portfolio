import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { BentoGrid, BentoGridItem } from './ui/bento-grid'

interface Props { onViewCaseStudy?: (id: string) => void }

// ── Skeleton headers ──────────────────────────────────────────

function RamsHeader() {
  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{ height: 220, background: '#f8fafc' }}
    >
      <img
        src="/Dashboard.png"
        alt="RAMS Dashboard"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left', display: 'block' }}
      />
    </div>
  )
}

function MSCGoHeader() {
  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{
        height: 220,
        backgroundImage: 'url(/Hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    />
  )
}

function INodeHeader() {
  return (
    <div style={{ overflow:'hidden', minHeight:200, background:'#0d1117' }}>
      <img
        src="/Inode Home.png"
        alt="iNode Home"
        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
      />
    </div>
  )
}

function ProcessHeader() {
  const variants = { initial:{ x:0 }, animate:{ x:4, transition:{ duration:0.2 } } }
  return (
    <motion.div initial="initial" whileHover="animate"
      style={{ background:'var(--bg1)',padding:'24px 28px',display:'flex',flexDirection:'column',gap:14,minHeight:220 }}>
      {[{n:'01',t:'Discover',d:'JTBD interviews, competitive analysis'},
        {n:'02',t:'Define',d:'Problem framing, user flows, IA'},
        {n:'03',t:'Design',d:'High-fidelity prototypes, design system'},
        {n:'04',t:'Deliver',d:'Dev handoff, Loom walkthroughs'},
      ].map((s,i)=>(
        <motion.div key={s.n} variants={variants} transition={{ delay:i*0.04 }}
          style={{ display:'flex',alignItems:'flex-start',gap:10,paddingBottom:i<3?12:0,borderBottom:i<3?'1px solid var(--border)':'none' }}>
          <span style={{ fontSize:9,color:'#3f3f46',flexShrink:0,fontFamily:"'Geist Mono','Space Mono',monospace",paddingTop:1 }}>{s.n}</span>
          <div>
            <div style={{ fontSize:12,fontWeight:700,color:'var(--text)',fontFamily:"'Plus Jakarta Sans','Inter',sans-serif",marginBottom:2 }}>{s.t}</div>
            <div style={{ fontSize:11,color:'#52525b',fontFamily:"'Inter',sans-serif",lineHeight:1.5 }}>{s.d}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ── Metric chip ───────────────────────────────────────────────

function M({ n, l }: { n: string; l: string }) {
  return (
    <div style={{ display:'flex',flexDirection:'column',gap:1 }}>
      <span style={{ fontFamily:"'Plus Jakarta Sans','Inter',sans-serif",fontWeight:800,fontSize:16,color:'var(--text)',letterSpacing:'-0.02em' }}>{n}</span>
      <span style={{ fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:8,letterSpacing:'.12em',textTransform:'uppercase' as const,color:'#52525b' }}>{l}</span>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────

export function Portfolio({ onViewCaseStudy }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="portfolio" ref={ref} className="page-section" style={{ background:'var(--bg)' }}>
      <div className="page-container">

        {/* Heading */}
        <motion.div initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          style={{ marginBottom:40 }}>
          <p style={{ fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#52525b',marginBottom:12 }}>Selected Work</p>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans','Inter',sans-serif",fontWeight:800,fontSize:'clamp(28px,4vw,48px)',color:'var(--text)',letterSpacing:'-0.03em',lineHeight:1.05 }}>
            Projects that <span style={{ color:'#a1a1aa' }}>move the needle.</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div initial={{ opacity:0,y:32 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6,delay:.15 }}>
          <BentoGrid>

            {/* RAMS — col-span-2 */}
            <BentoGridItem
              colSpan={2}
              onClick={() => onViewCaseStudy?.('rams')}
              header={<RamsHeader />}
              icon={<p style={{ fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:'#52525b' }}>Dashboard · B2B SaaS</p>}
              title={
                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',gap:12 }}>
                  <span>RAMS — Asset Management</span>
                  <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.97 }}
                    onClick={e=>{ e.stopPropagation(); onViewCaseStudy?.('rams') }}
                    style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 14px',borderRadius:9999,background:'#4f46e5',border:'none',fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:11,color:'#fff',flexShrink:0 }}>
                    Case Study <ArrowUpRight size={12}/>
                  </motion.button>
                </div>
              }
              description={
                <div>
                  <p style={{ marginBottom:10 }}>Redesigned the core operator workflow for predictive maintenance — cut task completion time by 40% across 50+ enterprise clients.</p>
                  <div style={{ display:'flex',gap:20 }}>
                    <M n="40%" l="Faster completion" />
                    <M n="50+" l="Enterprise clients" />
                    <M n="3×" l="Efficiency" />
                  </div>
                </div>
              }
            />

            {/* MSCGo */}
            <BentoGridItem
              colSpan={1}
              onClick={() => onViewCaseStudy?.('msc')}
              header={<MSCGoHeader />}
              icon={<p style={{ fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:'#52525b' }}>Mobile · Workshop Platform</p>}
              title={
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                  <span>MSCGo</span>
                  <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.97 }}
                    onClick={e=>{ e.stopPropagation(); onViewCaseStudy?.('msc') }}
                    style={{ display:'flex',alignItems:'center',gap:5,padding:'5px 12px',borderRadius:9999,background:'#4f46e5',border:'none',fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:11,color:'#fff',flexShrink:0 }}>
                    Case Study <ArrowUpRight size={11}/>
                  </motion.button>
                </div>
              }
              description={
                <div>
                  <p style={{ marginBottom:8 }}>Mobile-first workshop management platform transforming local garages into digitally enabled service providers across India.</p>
                  <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                    <M n="2×" l="Booking conversion" />
                    <span style={{ fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:10,color:'#3f3f46' }}>2024</span>
                  </div>
                </div>
              }
            />

            {/* iNode — wired to inode case study */}
            <BentoGridItem
              colSpan={1}
              onClick={() => onViewCaseStudy?.('inode')}
              header={<INodeHeader />}
              icon={<p style={{ fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:'#52525b' }}>IoT Platform · Industrial</p>}
              title={
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                  <span>iNode</span>
                  <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.97 }}
                    onClick={e=>{ e.stopPropagation(); onViewCaseStudy?.('inode') }}
                    style={{ display:'flex',alignItems:'center',gap:5,padding:'5px 12px',borderRadius:9999,background:'#4f46e5',border:'none',fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:11,color:'#fff',flexShrink:0 }}>
                    Case Study <ArrowUpRight size={11}/>
                  </motion.button>
                </div>
              }
              description={
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  <p>Unified dashboard to monitor and control industrial IoT devices in real time.</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <M n="60%" l="Setup time reduced" />
                    <span style={{ fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:10,color:'#3f3f46' }}>2023</span>
                  </div>
                  <div style={{ borderTop:'1px solid var(--border)', paddingTop:10, display:'flex', flexDirection:'column', gap:6 }}>
                    <div style={{ display:'flex', gap:5, flexWrap:'wrap' as const }}>
                      {['Jal Shakti', 'AICTE', 'PMO'].map(b => (
                        <span key={b} style={{ fontFamily:"'Geist Mono','Space Mono',monospace", fontSize:8, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'#6366f1', background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.2)', borderRadius:3, padding:'2px 6px' }}>{b}</span>
                      ))}
                    </div>
                    <p style={{ fontSize:11, color:'#52525b', lineHeight:1.5 }}>Endorsed by Ministry of Jal Shakti, adopted across 4 states. Listed on AICTE NEAT portal.</p>
                    <a href="https://www.siliconindia.com/news/general/government-of-indias-pledge-to-innovation-evident-in-inode-software-cos-breakthrough-nid-227066-cid-1.html"
                      target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ display:'inline-flex', alignItems:'center', gap:4, fontFamily:"'Geist Mono','Space Mono',monospace", fontSize:9, color:'#6366f1', letterSpacing:'.08em', textDecoration:'none', textTransform:'uppercase' as const }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity='0.6' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity='1' }}>
                      SiliconIndia · Read Article <ExternalLink size={9} />
                    </a>
                  </div>
                </div>
              }
            />

            {/* Process */}
            <BentoGridItem
              colSpan={2}
              header={<ProcessHeader />}
              icon={<p style={{ fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',color:'#52525b' }}>Design Process</p>}
              title="Research-driven, system-thinking design"
              description={
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <p>I collaborate closely with engineers and PMs — writing specs, running design critiques, and shipping work that holds up at scale.</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    <span style={{ fontFamily:"'Geist Mono','Space Mono',monospace", fontSize:9, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'#3f3f46' }}>Tools & AI Stack</span>
                    <div style={{ display:'flex', gap:10, flexWrap:'wrap' as const }}>
                      {[
                        { name:'Figma',   color:'#1abcfe', letter:'F', bg:'#1a1a2e' },
                        { name:'ChatGPT', color:'#74aa9c', letter:'G', bg:'#1a2420' },
                        { name:'Claude',  color:'#d97757', letter:'C', bg:'#2a1a12' },
                        { name:'Adobe',   color:'#ff0000', letter:'A', bg:'#2a0a0a' },
                        { name:'Gemini',  color:'#4285f4', letter:'✦', bg:'#0a1428' },
                      ].map(t => (
                        <div key={t.name} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 10px', borderRadius:8, background:'var(--bg2)', border:'1px solid var(--border)', transition:'border-color .2s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border2)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border)' }}>
                          <span style={{ width:18, height:18, borderRadius:4, background:t.bg, border:`1px solid ${t.color}33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:t.color, flexShrink:0, fontFamily:'monospace' }}>{t.letter}</span>
                          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:'#71717a', fontWeight:400 }}>{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            />

          </BentoGrid>
        </motion.div>

        {/* Footer link */}
        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:.5 }}
          style={{ textAlign:'center', marginTop:32 }}>
          <a href="https://behance.net/harshadparkar" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex',alignItems:'center',gap:6,fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:11,color:'#52525b',textDecoration:'none',letterSpacing:'.08em',transition:'color .2s' }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color='#a1a1aa' }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color='#52525b' }}>
            All work on Behance <ExternalLink size={12}/>
          </a>
        </motion.div>

      </div>
    </section>
  )
}