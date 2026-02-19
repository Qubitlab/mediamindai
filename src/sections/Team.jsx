import { Reveal } from '../components/Reveal'

const team = [
  { name: 'Larry', role: 'Director / Technology', desc: 'Full-stack technology, AI systems architecture, Web3 & blockchain development, and strategic vision.' },
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
                <div className="w-20 h-20 bg-brand-surface2 border border-brand-border rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
                  👤
                </div>
                <h4 className="font-display font-bold text-xl text-white">{t.name}</h4>
                <div className="text-accent text-[13px] font-medium mb-3">{t.role}</div>
                <p className="text-[13px] text-txt-dim leading-relaxed">{t.desc}</p>
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
