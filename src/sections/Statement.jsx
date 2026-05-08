import { Reveal } from '../components/Reveal'

export default function Statement() {
  return (
    <section className="border-b border-white/10 bg-brand-black relative overflow-hidden py-16 md:py-24">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-14 lg:px-20 relative z-10">
        <Reveal>
          <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-6 flex items-center gap-3">
            <span className="w-6 h-px bg-accent" />
            A Division of The QuantumX Project
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] tracking-[-0.03em] leading-[1.02] text-white mb-10 md:mb-14">
            Strategy.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-txt-muted">
              Technology.
            </span>
            <br />
            <span className="text-accent">Intelligence.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-base md:text-lg text-txt-dim leading-relaxed max-w-3xl mb-10">
            Full-stack agency building AI systems, SaaS platforms, websites, and apps — running Social Media and national campaigns, and deploying Web3 &amp; blockchain technology. We create, we build, we launch.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-wrap gap-x-12 gap-y-4 pt-8 border-t border-brand-border">
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-white">25B+</div>
              <div className="text-[10px] text-txt-muted uppercase tracking-[2px] mt-1 font-mono">Views</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-white">40+</div>
              <div className="text-[10px] text-txt-muted uppercase tracking-[2px] mt-1 font-mono">Years Exp.</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-display font-bold text-white">4</div>
              <div className="text-[10px] text-txt-muted uppercase tracking-[2px] mt-1 font-mono">Platforms</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
