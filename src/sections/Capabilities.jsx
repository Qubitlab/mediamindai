import { Reveal } from '../components/Reveal'
import { Target, Zap, BarChart3 } from 'lucide-react'

const capabilities = [
  {
    Icon: Target,
    title: 'Strategy',
    desc: 'Brand positioning, AI visibility audits, market intelligence, and go-to-market plans for brands navigating AI-driven discovery.',
  },
  {
    Icon: Zap,
    title: 'Technology',
    desc: 'Custom AI platforms, autonomous agents, Web3 & blockchain infrastructure, and full-stack production deployment — built and shipped end to end.',
  },
  {
    Icon: BarChart3,
    title: 'Intelligence',
    desc: 'Brand monitoring across AI platforms, sentiment analysis, competitive reports, and continuous reputation signals delivered as actionable insights.',
  },
]

export default function Capabilities() {
  return (
    <section className="border-b border-white/10 bg-brand-black">
      <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {capabilities.map((c, i) => (
          <Reveal key={c.title} delay={i * 100}>
            <div className="group p-10 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 bg-brand-surface border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:border-accent/40 transition-colors text-accent">
                <c.Icon size={22} strokeWidth={1.6} />
              </div>
              <h3 className="text-white font-display font-semibold text-lg mb-3">{c.title}</h3>
              <p className="text-sm text-txt-muted leading-relaxed">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  )
}
