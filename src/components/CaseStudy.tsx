import { ImageWithFallback } from "./figma/ImageWithFallback"
import { ArrowLeft } from 'lucide-react'

interface CaseStudyProps {
  projectId: string
}

export function CaseStudy({ projectId }: CaseStudyProps) {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <div className="container-grid py-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-[#282C3F] hover:text-[#E72547] transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-[16px]">Back to Work</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="container-grid py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-[48px] text-[#282C3F]">Project Title</h1>
          <p className="text-[24px] text-[#282C3F] opacity-70">
            Brief project tagline or description
          </p>
          <div className="flex items-center justify-center gap-6 text-[16px] text-[#282C3F] opacity-60">
            <span>Role: Lead Designer</span>
            <span>•</span>
            <span>Year: 2024</span>
            <span>•</span>
            <span>Duration: 3 months</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container-grid pb-24">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-[16/9] bg-white">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1761593280919-766a4acbcfca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYxODg5MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Case Study Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container-grid pb-24">
        <div className="max-w-3xl mx-auto space-y-24">
          
          {/* Problem Section */}
          <section className="space-y-6">
            <h2 className="text-[48px] text-[#282C3F]">Problem</h2>
            <div className="space-y-4 text-[16px] text-[#282C3F] opacity-80 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
            
            {/* Stats or Key Metrics */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="bg-white rounded-xl p-6 border border-[#282C3F]/10">
                <div className="text-[32px] text-[#E72547] mb-2">40%</div>
                <div className="text-[14px] text-[#282C3F] opacity-60">Conversion Drop</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#282C3F]/10">
                <div className="text-[32px] text-[#E72547] mb-2">5.2s</div>
                <div className="text-[14px] text-[#282C3F] opacity-60">Avg Task Time</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[#282C3F]/10">
                <div className="text-[32px] text-[#E72547] mb-2">32%</div>
                <div className="text-[14px] text-[#282C3F] opacity-60">Support Tickets</div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="space-y-6">
            <h2 className="text-[48px] text-[#282C3F]">Process</h2>
            <div className="space-y-4 text-[16px] text-[#282C3F] opacity-80 leading-relaxed">
              <p>
                Our design process followed a user-centered approach, starting with comprehensive 
                research to understand user needs and pain points. We conducted interviews, surveys, 
                and usability testing to gather insights.
              </p>
            </div>
            
            {/* Process Steps */}
            <div className="grid grid-cols-1 gap-4 pt-8">
              {['Research & Discovery', 'Ideation & Wireframing', 'Prototyping & Testing', 'Visual Design', 'Development Handoff'].map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#E72547] text-white flex items-center justify-center flex-shrink-0 text-[14px]">
                    {index + 1}
                  </div>
                  <div className="pt-1">
                    <div className="text-[16px] text-[#282C3F]">{step}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Process Image */}
            <div className="rounded-xl overflow-hidden bg-white border border-[#282C3F]/10 mt-8">
              <div className="aspect-[16/9]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1590417286292-4274afeee179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTkyNTY5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Design Process"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* System Design Section */}
          <section className="space-y-6">
            <h2 className="text-[48px] text-[#282C3F]">System Design</h2>
            <div className="space-y-4 text-[16px] text-[#282C3F] opacity-80 leading-relaxed">
              <p>
                We developed a comprehensive design system to ensure consistency and scalability 
                across the product. The system includes typography, color palettes, components, 
                and interaction patterns.
              </p>
            </div>
            
            {/* Design System Preview */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="rounded-xl overflow-hidden bg-white border border-[#282C3F]/10">
                <div className="aspect-square">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIwMTM5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Components"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-white border border-[#282C3F]/10">
                <div className="aspect-square">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIwMTM5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Typography"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Outcome Section */}
          <section className="space-y-6">
            <h2 className="text-[48px] text-[#282C3F]">Outcome</h2>
            <div className="space-y-4 text-[16px] text-[#282C3F] opacity-80 leading-relaxed">
              <p>
                The redesigned product launched successfully, resulting in significant improvements 
                across key metrics. User satisfaction increased, task completion times decreased, 
                and overall engagement grew substantially.
              </p>
            </div>
            
            {/* Results */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-[48px] text-[#E72547] mb-2">+65%</div>
                <div className="text-[14px] text-[#282C3F] opacity-60">User Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-[48px] text-[#E72547] mb-2">-40%</div>
                <div className="text-[14px] text-[#282C3F] opacity-60">Task Time</div>
              </div>
              <div className="text-center">
                <div className="text-[48px] text-[#E72547] mb-2">92%</div>
                <div className="text-[14px] text-[#282C3F] opacity-60">Satisfaction Rate</div>
              </div>
            </div>
            
            {/* Final Image */}
            <div className="rounded-xl overflow-hidden bg-white border border-[#282C3F]/10 mt-8">
              <div className="aspect-[16/9]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1712002641088-9d76f9080889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIwMTM5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Final Product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Reflection Section */}
          <section className="space-y-6">
            <h2 className="text-[48px] text-[#282C3F]">Reflection</h2>
            <div className="space-y-4 text-[16px] text-[#282C3F] opacity-80 leading-relaxed">
              <p>
                This project reinforced the importance of user-centered design and iterative 
                testing. The most valuable lesson was learning to balance business constraints 
                with user needs while maintaining design excellence.
              </p>
              <p>
                Moving forward, we plan to continue refining the product based on user feedback 
                and expanding the design system to support additional features and platforms.
              </p>
            </div>
            
            {/* Key Learnings */}
            <div className="bg-white rounded-xl p-8 border border-[#282C3F]/10 mt-8">
              <h3 className="text-[24px] text-[#282C3F] mb-4">Key Learnings</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-[16px] text-[#282C3F] opacity-70">
                  <span className="w-1.5 h-1.5 bg-[#E72547] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Early and frequent user testing leads to better design decisions
                </li>
                <li className="flex items-start text-[16px] text-[#282C3F] opacity-70">
                  <span className="w-1.5 h-1.5 bg-[#E72547] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Design systems accelerate development and ensure consistency
                </li>
                <li className="flex items-start text-[16px] text-[#282C3F] opacity-70">
                  <span className="w-1.5 h-1.5 bg-[#E72547] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Collaboration between design and engineering is crucial for success
                </li>
              </ul>
            </div>
          </section>

          {/* Next Project CTA */}
          <section className="text-center py-16 border-t border-[#282C3F]/10">
            <h3 className="text-[24px] text-[#282C3F] mb-6">Interested in more work?</h3>
            <button 
              onClick={() => window.location.href = '#portfolio'}
              className="px-8 py-3 bg-[#E72547] text-white rounded-lg hover:bg-[#d01e3f] transition-all duration-300 hover:shadow-lg"
            >
              View All Projects
            </button>
          </section>

        </div>
      </div>
    </div>
  )
}
