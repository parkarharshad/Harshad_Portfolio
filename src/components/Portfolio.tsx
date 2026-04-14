import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { BentoGrid, BentoGridItem } from './ui/bento-grid'

interface Props { onViewCaseStudy?: (id: string) => void }

// ── Skeleton headers ──────────────────────────────────────────

function RamsHeader() {
  return (
    <motion.div
      initial="initial" whileHover="animate"
      className="flex flex-col w-full h-full min-h-[180px] rounded-lg overflow-hidden"
      style={{ background:'#f8fafc', minHeight:220 }}
    >
      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'7px 12px', display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ display:'flex', gap:5 }}>
          {['#ff5f57','#ffbd2e','#28c840'].map(c=><span key={c} style={{ width:9,height:9,borderRadius:'50%',background:c,display:'block' }}/>)}
        </div>
        <div style={{ flex:1,height:16,borderRadius:4,background:'#f1f5f9',display:'flex',alignItems:'center',paddingLeft:8 }}>
          <span style={{ fontFamily:'monospace',fontSize:9,color:'#94a3b8' }}>rams-platform.app/dashboard</span>
        </div>
      </div>
      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:32,background:'#0f172a',display:'flex',flexDirection:'column',alignItems:'center',padding:'10px 0',gap:8 }}>
          {[1,0,0,0,0].map((a,i)=><div key={i} style={{ width:16,height:16,borderRadius:4,background:a?'#fff':'transparent',border:'1px solid '+(a?'#fff':'#334155'),opacity:a?1:0.4 }}/>)}
        </div>
        <div style={{ flex:1,padding:'10px 12px',overflow:'hidden' }}>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8 }}>
            <span style={{ fontFamily:'system-ui',fontSize:10,fontWeight:600,color:'#0f172a' }}>Dashboard</span>
            <div style={{ display:'flex',gap:3 }}>
              {['Day','Week','Month'].map((t,i)=>(
                <span key={t} style={{ fontSize:8,padding:'2px 5px',borderRadius:4,background:i===1?'#0f172a':'#f1f5f9',color:i===1?'#fff':'#64748b' }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display:'flex',gap:5,marginBottom:8 }}>
            {[{l:'Assets',v:'2,847'},{l:'Inspections',v:'142'},{l:'Issues',v:'23'}].map(s=>(
              <div key={s.l} style={{ flex:1,padding:'5px 6px',borderRadius:5,background:'#fff',border:'1px solid #e2e8f0' }}>
                <div style={{ fontSize:11,fontWeight:700,color:'#0f172a' }}>{s.v}</div>
                <div style={{ fontSize:7,color:'#94a3b8',marginTop:1 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ background:'#fff',borderRadius:5,border:'1px solid #e2e8f0',padding:'6px 8px',marginBottom:6 }}>
            <div style={{ fontSize:8,color:'#64748b',marginBottom:4 }}>Inspection Trend</div>
            <svg width="100%" height="28" viewBox="0 0 200 28" preserveAspectRatio="none">
              <polyline points="0,24 30,16 60,18 90,8 120,10 150,4 180,7 200,2" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/>
              <polyline points="0,24 30,16 60,18 90,8 120,10 150,4 180,7 200,2 200,28 0,28" fill="rgba(15,23,42,0.06)"/>
            </svg>
          </div>
          <div style={{ background:'#fff',borderRadius:5,border:'1px solid #e2e8f0',overflow:'hidden' }}>
            {[{t:'Rack R-24 overload',s:'Critical'},{t:'MHE maintenance due',s:'Warning'},{t:'Inspection complete',s:'Done'}].map((r,i)=>(
              <div key={i} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'4px 6px',borderBottom:i<2?'1px solid #f1f5f9':'none' }}>
                <span style={{ fontSize:8,color:'#374151' }}>{r.t}</span>
                <span style={{ fontSize:7,padding:'1px 5px',borderRadius:9999,background:'#f1f5f9',color:'#64748b' }}>{r.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MSCGoHeader() {
  const variants = { initial:{ y:4,opacity:0.8 }, animate:{ y:0,opacity:1 } }
  return (
    <motion.div initial="initial" whileHover="animate"
      style={{ background:'#f8fafc',minHeight:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24,gap:10 }}>
      {[{title:'Track'},{title:'Book'},{title:'Status'}].map((s,i)=>(
        <motion.div key={s.title} variants={variants} transition={{ delay:i*0.08 }}
          style={{ flex:1,background:'#fff',borderRadius:10,border:'1px solid #e2e8f0',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ background:'#0f172a',padding:'6px 8px',textAlign:'center' }}>
            <div style={{ fontSize:8,color:'#fff',fontWeight:600 }}>{s.title}</div>
          </div>
          <div style={{ padding:'8px 6px',display:'flex',flexDirection:'column',gap:4 }}>
            {[80,60,90,70].map((w,j)=>(
              <div key={j} style={{ height:4,borderRadius:2,background:'#e2e8f0',width:`${w}%` }}/>
            ))}
            <div style={{ display:'flex',alignItems:'center',gap:3,marginTop:2 }}>
              <span style={{ width:5,height:5,borderRadius:'50%',background:'#22c55e',display:'block' }}/>
              <span style={{ fontSize:7,color:'#94a3b8' }}>Live</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

function INodeHeader() {
  const variants = {
    initial:{ opacity:0.7 },
    animate:{ opacity:1, transition:{ staggerChildren:0.05 } }
  }
  const item = { initial:{ scale:0.97 }, animate:{ scale:1 } }
  return (
    <motion.div initial="initial" whileHover="animate" variants={variants}
      style={{ background:'#0d1117',minHeight:200,padding:'20px 20px' }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8 }}>
        <span style={{ fontSize:9,fontWeight:600,color:'#e2e8f0',fontFamily:'system-ui' }}>iNode Control Panel</span>
        <div style={{ display:'flex',gap:4 }}>
          {['#3b82f6','#6366f1'].map(c=><span key={c} style={{ width:7,height:7,borderRadius:'50%',background:c }}/>)}
        </div>
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:5 }}>
        {[{l:'D-01',v:'98%',s:'Online',g:true},{l:'D-02',v:'87%',s:'Online',g:true},{l:'D-03',v:'62%',s:'Offline',g:false},
          {l:'D-04',v:'94%',s:'Online',g:true},{l:'D-05',v:'76%',s:'Online',g:true},{l:'D-06',v:'0%',s:'Offline',g:false}].map((d,i)=>(
          <motion.div key={i} variants={item}
            style={{ background:'#161b22',borderRadius:6,padding:'6px 7px',border:'1px solid #1e293b' }}>
            <div style={{ fontSize:7,color:'#64748b',marginBottom:2 }}>{d.l}</div>
            <div style={{ fontSize:12,fontWeight:700,color:'#f1f5f9' }}>{d.v}</div>
            <div style={{ display:'flex',alignItems:'center',gap:3,marginTop:2 }}>
              <span style={{ width:4,height:4,borderRadius:'50%',background:d.g?'#22c55e':'#ef4444',display:'block' }}/>
              <span style={{ fontSize:7,color:'#64748b' }}>{d.s}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ProcessHeader() {
  const variants = { initial:{ x:0 }, animate:{ x:4, transition:{ duration:0.2 } } }
  return (
    <motion.div initial="initial" whileHover="animate"
      style={{ background:'#0a0a0a',padding:'24px 28px',display:'flex',flexDirection:'column',gap:14,minHeight:220 }}>
      {[{n:'01',t:'Discover',d:'JTBD interviews, competitive analysis'},
        {n:'02',t:'Define',d:'Problem framing, user flows, IA'},
        {n:'03',t:'Design',d:'High-fidelity prototypes, design system'},
        {n:'04',t:'Deliver',d:'Dev handoff, Loom walkthroughs'},
      ].map((s,i)=>(
        <motion.div key={s.n} variants={variants} transition={{ delay:i*0.04 }}
          style={{ display:'flex',alignItems:'flex-start',gap:10,paddingBottom:i<3?12:0,borderBottom:i<3?'1px solid rgba(255,255,255,0.05)':'none' }}>
          <span style={{ fontSize:9,color:'#3f3f46',flexShrink:0,fontFamily:"'Geist Mono','Space Mono',monospace",paddingTop:1 }}>{s.n}</span>
          <div>
            <div style={{ fontSize:12,fontWeight:700,color:'#fff',fontFamily:"'Plus Jakarta Sans','Inter',sans-serif",marginBottom:2 }}>{s.t}</div>
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
      <span style={{ fontFamily:"'Plus Jakarta Sans','Inter',sans-serif",fontWeight:800,fontSize:16,color:'#fff',letterSpacing:'-0.02em' }}>{n}</span>
      <span style={{ fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:8,letterSpacing:'.12em',textTransform:'uppercase' as const,color:'#52525b' }}>{l}</span>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────

export function Portfolio({ onViewCaseStudy }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="portfolio" ref={ref} className="page-section" style={{ background:'#000' }}>
      <div className="page-container">

        {/* Heading */}
        <motion.div initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          style={{ marginBottom:40 }}>
          <p style={{ fontFamily:"'Geist Mono','Space Mono',monospace",fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color:'#52525b',marginBottom:12 }}>Selected Work</p>
          <h2 style={{ fontFamily:"'Plus Jakarta Sans','Inter',sans-serif",fontWeight:800,fontSize:'clamp(28px,4vw,48px)',color:'#fff',letterSpacing:'-0.03em',lineHeight:1.05 }}>
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
                    style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 14px',borderRadius:9999,background:'#fff',border:'none',fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:11,color:'#000',flexShrink:0 }}>
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
                    style={{ display:'flex',alignItems:'center',gap:5,padding:'5px 12px',borderRadius:9999,background:'#fff',border:'none',fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:11,color:'#000',flexShrink:0 }}>
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
                    style={{ display:'flex',alignItems:'center',gap:5,padding:'5px 12px',borderRadius:9999,background:'#fff',border:'none',fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:11,color:'#000',flexShrink:0 }}>
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
                  <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:10, display:'flex', flexDirection:'column', gap:6 }}>
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
                        <div key={t.name} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 10px', borderRadius:8, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', transition:'border-color .2s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.15)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.07)' }}>
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