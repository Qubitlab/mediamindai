export default function Hero() {
  return (
    <header className="relative z-10 w-full min-h-screen border-b border-white/10">

      {/* ── Background glow (behind the grid) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient glow — pulsing */}
        <div className="absolute inset-0 hero-glow animate-pulse-slow" />

        {/* Top convergence glow */}
        <div
          className="absolute top-0 left-0 right-0 h-2/5"
          style={{
            background:
              'radial-gradient(ellipse 12% 50% at 50% 0%, rgba(124,108,255,0.45), transparent)',
          }}
        />

        {/* Bottom convergence glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/5"
          style={{
            background:
              'radial-gradient(ellipse 12% 50% at 50% 100%, rgba(124,108,255,0.45), transparent)',
          }}
        />

        {/* Central vertical beam line with glow */}
        <div className="hero-beam-line" />

        {/* Dot grid overlay (masked to diamond shape) */}
        <div className="hero-beam-dots" />
      </div>

      {/* ── 4-column grid ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 min-h-screen">

        {/* Col 1: Headline + Description */}
        <div className="flex flex-col p-6 md:p-8 relative justify-between min-h-[520px] md:min-h-screen">
          {/* Column border with beam */}
          <div className="absolute right-0 top-0 h-full w-[1px] bg-white/10 hidden md:block overflow-hidden">
            <div className="hero-col-beam opacity-75" />
          </div>
          <div className="absolute -right-[5px] -top-[5px] text-white/30 text-xs hidden md:block z-20">
            +
          </div>

          {/* Top spacer */}
          <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }} />

          {/* Bottom: headline + description */}
          <div className="mt-auto mb-12 relative z-10">
            <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
              <h1 className="font-display font-extrabold text-[2rem] sm:text-[2.6rem] md:text-[2.2rem] lg:text-[2.8rem] leading-[1.08] tracking-tight text-white mb-8">
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
              <p className="text-sm md:text-[15px] leading-relaxed text-txt-dim max-w-xs font-light">
                First Web3 agency combining traditional Social Media with AI
                search optimization. Get mentioned by AI Platforms and featured
                in top-tier media.
              </p>
            </div>
          </div>
        </div>

        {/* Col 2: Empty (glow shows through) */}
        <div className="hidden md:flex flex-col p-8 relative justify-between">
          <div className="absolute right-0 top-0 h-full w-[1px] bg-white/10 overflow-hidden">
            <div className="hero-col-beam opacity-75" style={{ animationDelay: '1.5s' }} />
          </div>
          <div className="absolute -right-[5px] -top-[5px] text-white/30 text-xs z-20">
            +
          </div>
        </div>

        {/* Col 3: Empty (glow shows through) */}
        <div className="hidden md:flex flex-col p-8 relative justify-between">
          <div className="absolute right-0 top-0 h-full w-[1px] bg-white/10 overflow-hidden">
            <div className="hero-col-beam opacity-75" style={{ animationDelay: '3s' }} />
          </div>
          <div className="absolute -right-[5px] -top-[5px] text-white/30 text-xs z-20">
            +
          </div>
        </div>

        {/* Col 4: CTA */}
        <div className="flex flex-col p-6 md:p-8 relative justify-between">
          <div />

          {/* Desktop CTA at bottom */}
          <div
            className="hidden md:flex md:justify-start mt-auto mb-12 animate-fade-up opacity-0"
            style={{ animationDelay: '0.65s' }}
          >
            <a href="#contact" className="group relative block">
              <div className="absolute -inset-[1px] rounded-md bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,#7c6cff_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hero-border-spin blur-[0.5px]" />
              <div className="relative bg-brand-surface border border-[#7c6cff]/20 text-txt-dim px-5 py-2.5 rounded-md flex items-center gap-3 shadow-lg shadow-[#7c6cff]/5 group-hover:text-[#7c6cff] group-hover:border-[#7c6cff]/50 transition-all duration-300">
                <span className="text-sm font-display font-bold tracking-[0.2em] uppercase">
                  Start Optimizing
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-txt-muted group-hover:text-[#7c6cff] group-hover:translate-x-1 transition-all duration-300"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden border-t border-white/10 p-6">
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
        </div>
      </div>

      {/* ── Big Center Title ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-20 pointer-events-none hidden md:block">
        <h1 className="text-huge font-display font-bold tracking-[-0.04em] leading-none select-none whitespace-nowrap text-white opacity-90 mix-blend-overlay">
          MEDIA MIND AI
        </h1>
      </div>
    </header>
  )
}
