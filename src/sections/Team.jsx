import { Reveal } from '../components/Reveal'
import { User } from 'lucide-react'

const team = [
  { name: 'Larry', role: 'Founder & CEO', desc: 'Built four proprietary AI platforms from the ground up. AI systems architecture, autonomous agents, quantum technologies, cybersecurity, Web3 & blockchain, full-stack development, and national media & social media strategy. 10+ billion views and counting.', linkedin: 'https://www.linkedin.com/in/castrolarry/' },
  { name: 'Allie', role: 'Marketing Director', desc: 'Brand strategy, national campaign management, client partnerships, and marketing operations.' },
  { name: 'Dakota', role: 'Social Media & Content', desc: 'Social video production, content strategy, platform optimization, and community engagement.' },
]

export default function Team() {
  return (
    <section id="team" className="border-b border-white/10 bg-brand-black py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <Reveal>
            <div className="w-8 h-px bg-accent mb-5" />
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-3">The Team</div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-white leading-[1.05]">
              Experienced. Versatile.<br />Ready to Build.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base text-txt-dim max-w-md leading-relaxed">
              Over 40 years of collective experience across strategy, media, technology, and creative. We're growing — reach out if you want in.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="bg-brand-surface border border-brand-border rounded-2xl p-10 text-center hover:border-brand-border-light transition-all">
                <div className="w-20 h-20 bg-brand-surface2 border border-brand-border rounded-full mx-auto mb-6 flex items-center justify-center text-txt-muted">
                  <User size={32} strokeWidth={1.4} />
                </div>
                <h4 className="font-display font-bold text-xl text-white">{t.name}</h4>
                <div className="text-accent text-[13px] font-medium mb-3">{t.role}</div>
                <p className="text-[13px] text-txt-dim leading-relaxed">{t.desc}</p>
                {t.linkedin && (
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-accent text-[12px] font-medium hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <a href="#contact" className="inline-flex font-display text-[12px] font-bold uppercase tracking-wider text-accent border-b border-accent/30 pb-1 hover:border-accent transition-all">
              We're Growing — Apply Here →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
