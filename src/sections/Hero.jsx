export default function Hero() {
  return (
    <header className="relative z-10 w-full grid grid-cols-1 md:grid-cols-[1fr_1fr_0.8fr] min-h-screen border-b border-white/10">

      {/* ── MEDIA MIND AI watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h1
          className="font-display font-extrabold tracking-[-0.04em] text-white/[0.04] leading-none select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(4rem, 14vw, 16rem)' }}
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

        {/* Headline */}
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

      {/* ── Col 2: Stats ── */}
      <div className="hidden md:flex flex-col p-8 lg:p-10 border-r border-white/10 relative justify-between overflow-hidden z-10">
        <div className="beam-line" style={{ right: '-1px', top: 0 }}>
          <div className="beam" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Top: AI-SEO badge */}
        <div className="flex justify-center animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <span className="px-4 py-1.5 rounded border border-white/15 bg-white/[0.03] text-[11px] font-mono text-txt-dim tracking-[2px] uppercase">
            AI-SEO v2.0
          </span>
        </div>

        {/* Stats block */}
        <div className="flex-1 flex flex-col justify-center space-y-10 animate-fade-up opacity-0" style={{ animationDelay: '0.5s' }}>
          <div>
            <div className="text-[3.5rem] lg:text-[4.5rem] font-display font-extrabold text-white tracking-tighter leading-none">
              10x
            </div>
            <div className="text-[10px] text-txt-muted uppercase tracking-[4px] mt-2 font-mono">
              Visibility
            </div>
          </div>
          <div>
            <div className="text-[3.5rem] lg:text-[4.5rem] font-display font-extrabold text-white tracking-tighter leading-none">
              5+
            </div>
            <div className="text-[10px] text-txt-muted uppercase tracking-[4px] mt-2 font-mono">
              Major LLMs
            </div>
          </div>
        </div>

        <div />
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
