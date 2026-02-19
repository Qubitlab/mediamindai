export default function Hero() {
  return (
    <header className="relative z-10 w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] min-h-screen border-b border-white/10">

      {/* ── MEDIA MIND AI watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
        <h1
          className="font-display font-extrabold tracking-[-0.04em] leading-none select-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(3rem, 13vw, 16rem)',
            color: 'rgba(255,255,255,0.25)',
            mixBlendMode: 'overlay',
          }}
        >
          MEDIA MIND AI
        </h1>
      </div>

      {/* ── Col 1: Headline ── */}
      <div className="flex flex-col p-6 md:p-10 lg:p-12 border-r border-white/10 relative justify-between min-h-[520px] md:min-h-screen overflow-hidden z-10">
        {/* Beam on right edge */}
        <div className="beam-line" style={{ right: '-1px', top: 0 }}>
          <div className="beam-white" />
        </div>

        {/* Top spacer */}
        <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }} />

        {/* Headline + description at bottom */}
        <div className="mt-auto relative z-10">
          <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <h1 className="font-display font-extrabold text-[2rem] sm:text-[2.6rem] md:text-[2.4rem] lg:text-[3.2rem] xl:text-[3.6rem] leading-[1.08] tracking-tight text-white mb-8">
              Be Visible in{' '}
              <span className="relative inline-block text-[#7c6cff]">
                ChatGPT
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7c6cff]/60" />
              </span>
              , Gemini, Grok, Claude, Perplexity{' '}
              <span className="text-txt-dim">&amp;</span>{' '}
              Social Media
            </h1>
          </div>
          <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.45s' }}>
            <p className="text-sm md:text-[15px] leading-relaxed text-txt-dim max-w-lg font-light">
              First Web3 agency combining traditional Social Media with AI search optimization. Get mentioned by AI Platforms and featured in top-tier media.
            </p>
          </div>
        </div>
      </div>

      {/* ── Col 2: Center Beam Effect ── */}
      <div className="hidden md:block relative border-r border-white/10 overflow-hidden">
        {/* Beam on right edge */}
        <div className="beam-line" style={{ right: '-1px', top: 0 }}>
          <div className="beam" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Wide ambient glow — pulsing */}
        <div className="absolute inset-0 hero-glow animate-pulse-slow" />

        {/* Top convergence glow */}
        <div
          className="absolute top-0 left-0 right-0 h-2/5"
          style={{
            background:
              'radial-gradient(ellipse 18% 55% at 50% 0%, rgba(124,108,255,0.5), transparent)',
          }}
        />

        {/* Bottom convergence glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/5"
          style={{
            background:
              'radial-gradient(ellipse 18% 55% at 50% 100%, rgba(124,108,255,0.5), transparent)',
          }}
        />

        {/* Central vertical beam line with glow */}
        <div className="hero-beam-line" />

        {/* Dot grid overlay (masked to diamond shape) */}
        <div className="hero-beam-dots" />

        {/* Animated bright beam drops */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] overflow-hidden z-10">
          <div className="beam-white" />
        </div>
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] overflow-hidden z-10">
          <div className="beam-white" style={{ animationDelay: '1.8s' }} />
        </div>
      </div>

      {/* ── Col 3: CTA ── */}
      <div className="flex flex-col p-6 md:p-8 lg:p-10 relative justify-between z-10">
        <div />

        {/* CTA at bottom */}
        <div className="mt-auto space-y-4 animate-fade-up opacity-0" style={{ animationDelay: '0.65s' }}>
          <a href="#contact" className="group relative block w-full">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#7c6cff]/40 via-white/10 to-[#7c6cff]/20 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center justify-between px-7 py-5 bg-brand-surface rounded-xl">
              <span className="text-[13px] font-display font-bold text-white tracking-wider uppercase">
                Start Optimizing
              </span>
              <span className="text-txt-dim group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 text-lg">
                →
              </span>
            </div>
          </a>
          <a href="#technology" className="group block w-full">
            <div className="flex items-center justify-between px-7 py-5 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
              <span className="text-[13px] font-display font-semibold text-txt-muted tracking-wider uppercase">
                Explore Technology
              </span>
              <span className="text-txt-muted group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 text-lg">
                →
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Mobile stats */}
      <div className="md:hidden border-t border-white/10 grid grid-cols-2 divide-x divide-white/10">
        <div className="p-6">
          <div className="text-3xl font-display font-extrabold text-white tracking-tighter">10x</div>
          <div className="text-[9px] text-txt-muted uppercase tracking-[3px] mt-1 font-mono">Visibility</div>
        </div>
        <div className="p-6">
          <div className="text-3xl font-display font-extrabold text-white tracking-tighter">5+</div>
          <div className="text-[9px] text-txt-muted uppercase tracking-[3px] mt-1 font-mono">Major LLMs</div>
        </div>
      </div>
    </header>
  )
}
