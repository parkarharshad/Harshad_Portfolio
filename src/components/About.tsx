import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { AnimatedTestimonials } from './ui/animated-testimonials'

const testimonials = [
  {
    quote: "Harshad brought clarity to complex operational systems. His design approach helped us streamline workflows and improve visibility across teams. The impact was immediate — faster decisions, fewer dependencies, and a much more structured way of working.",
    name: "Rohit Chate",
    designation: "VP Operations · RAMS Platform",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote: "Harshad played a key role in simplifying our day-to-day operations. The dashboards he designed gave us clear, actionable insights and reduced manual effort across teams. His ability to design for real-world usage made a significant difference.",
    name: "Rohit Baraskar",
    designation: "Head of Operations · RAMS Platform",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote: "What impressed us most was Harshad's understanding of ground-level workflows. He translated complex engineering processes into intuitive systems that our teams could easily adopt. The result was better coordination and smoother execution across projects.",
    name: "Yograj Barve",
    designation: "Head of Civil Engineering · RAMS Platform",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote: "Harshad's design thinking brought structure and consistency to the platform. From workflows to UI clarity, everything felt well thought out and aligned with business needs. It significantly improved usability and overall system efficiency.",
    name: "Kunal Patil",
    designation: "Stakeholder · Msc Go Platform",
    src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote: "Harshad's designs made development significantly smoother. The clarity in his layouts and component thinking reduced back-and-forth and helped us move faster from design to implementation. Everything was structured, consistent, and easy to translate into code.",
    name: "Priyanka Popalghat",
    designation: "Full Stack Developer · RAMS Platform",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
]

export function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="page-section" style={{ background: '#0a0a0a' }}>
      <div className="page-container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .5 }}
          style={{ marginBottom: 64, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Geist Mono','Space Mono',monospace", fontSize: 10, letterSpacing: '.25em', color: '#52525b', textTransform: 'uppercase', marginBottom: 16 }}>── Testimonials</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>
            What collaborators <span style={{ color: '#a1a1aa' }}>say.</span>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: 15, color: '#52525b', marginTop: 16 }}>
            From engineers and PMs to founders — people who've shipped alongside me.
          </p>
        </motion.div>

        {/* Animated Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .6, delay: .2 }}>
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </motion.div>

      </div>
    </section>
  )
}