import { Reveal } from '../components/Reveal'

const capabilities = [
  {
    icon: '⚡',
    title: 'Branding & Visual Design',
    desc: 'Visual identity systems, UI/UX, presentation design, and creative direction that makes brands unforgettable across every touchpoint.',
  },
  {
    icon: '🛒',
    title: 'E-Commerce & SaaS',
    desc: 'End-to-end e-commerce builds, payment integrations with Stripe, SaaS platform development, and technology infrastructure that scales.',
  },
  {
    icon: '🎯',
    title: 'Social Media & Distribution',
    desc: 'Platform strategy, content calendars, community management, and cross-platform distribution optimized for visibility and engagement.',
  },
]

export default function Capabilities() {
  return (
    <section className="border-b border-white/10 bg-brand-black">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {capabilities.map((c, i) => (
          <Reveal key={c.title} delay={i * 100}>
            <div className="group p-10 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 bg-brand-surface border border-white/10 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:border-accent/40 transition-colors">
                {c.icon}
              </div>
              <h3 className="text-white font-display font-semibold text-lg mb-3">{c.title}</h3>
              <p className="text-sm text-txt-muted leading-relaxed">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
