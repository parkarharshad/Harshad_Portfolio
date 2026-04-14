import { Timeline } from "./ui/timeline"

function Tag({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: "'Geist Mono','Space Mono',monospace",
      fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase' as const,
      color: '#6366f1', background: 'rgba(99,102,241,0.1)',
      border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: 4, padding: '3px 8px',
    }}>{children}</span>
  )
}

function Bullet({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#6366f1', flexShrink: 0, marginTop: 7 }} />
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 300, color: '#a1a1aa', lineHeight: 1.7 }}>{text}</span>
    </div>
  )
}

const data = [
  {
    title: "Aug 2024\nPresent",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h4 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 700, fontSize: 17, color: '#fff', letterSpacing: '-0.01em', marginBottom: 4 }}>
            Product Designer
          </h4>
          <p style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, color: '#52525b', letterSpacing: '.08em', marginBottom: 4 }}>
            INODE RAMS BUILT ENV TECH PVT. LTD. (formerly iNODE Software Co.) · Pune, India
          </p>
          <p style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#3f3f46', letterSpacing: '.06em', marginBottom: 12 }}>
            Full-time · On-site
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
            <Tag>B2B SaaS</Tag><Tag>RAMS</Tag><Tag>Enterprise</Tag>
          </div>
        </div>
        <div>
          <Bullet text="Leading product design for RAMS — Rack Asset Management System used by enterprise warehouse clients." />
          <Bullet text="Elevated to Product Designer, driving end-to-end design strategy across dashboards and workflows." />
        </div>
      </div>
    ),
  },
  {
    title: "Oct 2021\nJul 2024",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h4 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 700, fontSize: 17, color: '#fff', letterSpacing: '-0.01em', marginBottom: 4 }}>
            UI/UX Designer
          </h4>
          <p style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, color: '#52525b', letterSpacing: '.08em', marginBottom: 4 }}>
            iNode Design (iNODE Software Co.) · Pune, India
          </p>
          <p style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#3f3f46', letterSpacing: '.06em', marginBottom: 12 }}>
            Full-time · Hybrid · 2 yrs 10 mos
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
            <Tag>IoT</Tag><Tag>Water Tech</Tag><Tag>AI</Tag><Tag>iNode WTP</Tag>
          </div>
        </div>
        <div>
          <Bullet text="Led UI/UX for iNODE WTP Design Tool — water treatment plant software adopted across Maharashtra, Karnataka, Kerala & MP." />
          <Bullet text="Designed dashboards, data visualizations, and mobile-first components for complex engineering workflows." />
        </div>
      </div>
    ),
  },
  {
    title: "Dec 2018\nMay 2020",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h4 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 700, fontSize: 17, color: '#fff', letterSpacing: '-0.01em', marginBottom: 4 }}>
            Server Support Specialist
          </h4>
          <p style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, color: '#52525b', letterSpacing: '.08em', marginBottom: 4 }}>
            Wysetek System Pvt. Ltd. · BSNL Pune Office (IBM India Contract)
          </p>
          <p style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 9, color: '#3f3f46', letterSpacing: '.06em', marginBottom: 12 }}>
            Full-time · On-site · 1 yr 6 mos
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
            <Tag>Server Infrastructure</Tag><Tag>IBM</Tag><Tag>BSNL</Tag>
          </div>
        </div>
        <div>
          <Bullet text="Provided server support and troubleshooting for BSNL Pune under IBM India's third-party contract." />
          <Bullet text="Monitored server performance, network configurations, and resolved hardware/software issues." />
        </div>
      </div>
    ),
  },
]

export function Experience() {
  return (
    <section id="experience" style={{ background: '#000', paddingTop: 96, paddingBottom: 96 }}>
      <div className="page-container">

        {/* Heading */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, letterSpacing: '.25em', color: '#52525b', textTransform: 'uppercase', marginBottom: 16 }}>── Experience</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
            Career <span style={{ color: '#a1a1aa' }}>journey.</span>
          </h2>
        </div>

        <Timeline data={data} />
      </div>
    </section>
  )
}