import { Reveal } from '../components/Reveal'

export default function Statement() {
  return (
    <section className="border-b border-white/10 bg-brand-black relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] divide-y md:divide-y-0 md:divide-x divide-white/10">

        {/* Left: Big type */}
        <div className="p-8 md:p-14 lg:p-20 flex flex-col justify-center min-h-[360px] md:min-h-[480px] relative z-10">
          <Reveal>
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-accent" />
              A Division of The QuantumX Project
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] tracking-[-0.03em] leading-[1.02] text-white">
              Strategy.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-txt-muted">
                Technology.
              </span>
              <br />
              <span className="text-accent">Intelligence.</span>
            </h2>
          </Reveal>
        </div>

        {/* Right: Supporting context */}
        <div className="p-8 md:p-14 flex flex-col justify-center relative z-10">
          <Reveal delay={200}>
            <p className="text-[15px] md:text-base text-txt-dim leading-relaxed mb-8">
              Full-stack agency building AI systems, SaaS platforms, websites, and apps — running Social Media and national campaigns, and deploying Web3 &amp; blockchain technology. We create, we build, we launch.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="space-y-5 pt-8 border-t border-brand-border">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-sm shrink-0 mt-0.5">🎯</span>
                <div>
                  <div className="text-sm font-display font-semibold text-white mb-0.5">Strategy</div>
                  <div className="text-[13px] text-txt-muted leading-relaxed">Brand positioning, AI audits, go-to-market plans</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-sm shrink-0 mt-0.5">⚡</span>
                <div>
                  <div className="text-sm font-display font-semibold text-white mb-0.5">Technology</div>
                  <div className="text-[13px] text-txt-muted leading-relaxed">Custom AI platforms, Web3, full-stack development</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-sm shrink-0 mt-0.5">📊</span>
                <div>
                  <div className="text-sm font-display font-semibold text-white mb-0.5">Intelligence</div>
                  <div className="text-[13px] text-txt-muted leading-relaxed">Brand monitoring, sentiment analysis, competitive reports</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-wrap gap-x-6 gap-y-4 mt-10 pt-6 border-t border-brand-border">
              <div>
                <div className="text-xl font-display font-bold text-white">25B+</div>
                <div className="text-[9px] text-txt-muted uppercase tracking-[2px] mt-0.5 font-mono">Views</div>
              </div>
              <div>
                <div className="text-xl font-display font-bold text-white">40+</div>
                <div className="text-[9px] text-txt-muted uppercase tracking-[2px] mt-0.5 font-mono">Years Exp.</div>
              </div>
              <div>
                <div className="text-xl font-display font-bold text-white">4</div>
                <div className="text-[9px] text-txt-muted uppercase tracking-[2px] mt-0.5 font-mono">Platforms</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
