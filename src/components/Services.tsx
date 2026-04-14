import { Palette, Users, Zap, Target, BarChart3, Sparkles } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design solutions that balance aesthetics with usability, creating interfaces that users love to interact with.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
  },
  {
    icon: Target,
    title: "Product Strategy",
    description: "Strategic design thinking to align product vision with user needs and business objectives for sustainable growth.",
    features: ["Product Roadmapping", "User Journey Mapping", "Feature Prioritization", "Competitive Analysis"]
  },
  {
    icon: Sparkles,
    title: "Design Systems",
    description: "Scalable design systems that ensure consistency across products while enabling teams to work more efficiently.",
    features: ["Component Libraries", "Design Tokens", "Style Guides", "Documentation"]
  },
  {
    icon: BarChart3,
    title: "Design Audits",
    description: "Comprehensive analysis of existing products to identify opportunities for improvement and optimization.",
    features: ["Heuristic Evaluation", "Accessibility Review", "Performance Analysis", "Recommendations"]
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Quick iteration and validation of ideas through interactive prototypes to reduce risk and accelerate decision-making.",
    features: ["Interactive Prototypes", "User Testing", "Iteration Cycles", "Validation Reports"]
  },
  {
    icon: Users,
    title: "Team Workshops",
    description: "Design thinking workshops and training sessions to upskill teams and foster a design-driven culture.",
    features: ["Design Sprints", "Training Sessions", "Process Optimization", "Team Alignment"]
  }
]

export function Services() {
  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#d1d5db' }}>What I Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, letterSpacing: '-0.03em' }}>
            <span className="text-white">Studio</span>{' '}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Comprehensive design services to help your business create meaningful
            digital experiences and build stronger connections with users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group relative rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: 'rgba(20, 24, 39, 0.5)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{ background: 'radial-gradient(circle at 30% 20%, rgba(6,182,212,0.08) 0%, transparent 60%)' }} />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)' }}>
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14 }}>
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6b7280' }}>
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-20">
          <div className="rounded-3xl p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(20,24,39,0.6))', backdropFilter: 'blur(40px)', border: '1px solid rgba(6,182,212,0.2)' }}>
            <h3 className="text-3xl text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
              Let's Work Together
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
              Ready to transform your digital product? Let's discuss how we can
              create something amazing together.
            </p>
            <button
              className="px-8 py-4 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: 'linear-gradient(135deg, #06B6D4, #14B8A6)', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}