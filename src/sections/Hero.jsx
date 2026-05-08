export default function Hero() {
  return (
    <header className="relative w-full min-h-screen border-b border-white/10">

      {/* ── Background glow (behind everything) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 hero-glow animate-pulse-slow" />
        <div
          className="absolute top-0 left-0 right-0 h-2/5"
          style={{
            background:
              'radial-gradient(ellipse 12% 50% at 50% 0%, rgba(124,108,255,0.45), transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-2/5"
          style={{
            background:
              'radial-gradient(ellipse 12% 50% at 50% 100%, rgba(124,108,255,0.45), transparent)',
          }}
        />
        <div className="hero-beam-line" />
        <div className="hero-beam-dots" />
      </div>

      {/* ── 4-column grid (visual structure only: borders, beams, + markers) ── */}
      <div className="absolute inset-0 z-10 grid grid-cols-1 md:grid-cols-4 min-h-screen pointer-events-none">
        {/* Col 1 border */}
        <div className="hidden md:block relative">
          <div className="absolute right-0 top-0 h-full w-[1px] bg-white/10 overflow-hidden">
            <div className="hero-col-beam opacity-75" />
          </div>
          <div className="absolute -right-[5px] -top-[5px] text-white/30 text-xs z-20">+</div>
        </div>
        {/* Col 2 border */}
        <div className="hidden md:block relative">
          <div className="absolute right-0 top-0 h-full w-[1px] bg-white/10 overflow-hidden">
            <div className="hero-col-beam opacity-75" style={{ animationDelay: '1.5s' }} />
          </div>
          <div className="absolute -right-[5px] -top-[5px] text-white/30 text-xs z-20">+</div>
        </div>
        {/* Col 3 border */}
        <div className="hidden md:block relative">
          <div className="absolute right-0 top-0 h-full w-[1px] bg-white/10 overflow-hidden">
            <div className="hero-col-beam opacity-75" style={{ animationDelay: '3s' }} />
          </div>
          <div className="absolute -right-[5px] -top-[5px] text-white/30 text-xs z-20">+</div>
        </div>
        {/* Col 4 */}
        <div className="hidden md:block" />
      </div>

      {/* ── Centered content ── */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 sm:px-6 md:px-8 text-center">

        {/* MEDIA MIND AI — primary brand mark. A page that sells visibility
            should not hide its own name. Full white, prominent, intentional. */}
        <h1 className="text-huge font-display font-bold tracking-[-0.04em] leading-none select-none mb-4 sm:mb-6 md:mb-8 text-white">
          MEDIA MIND AI
        </h1>

        {/* Headline */}
        <div className="animate-fade-up opacity-0 max-w-3xl px-2" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-display font-extrabold text-[1.25rem] sm:text-[1.6rem] md:text-[2.4rem] lg:text-[3rem] leading-[1.15] tracking-tight text-white mb-4 sm:mb-6 text-center [text-wrap:balance]">
            Be Visible in{' '}
            <span className="relative inline-block text-[#7c6cff]">
              ChatGPT
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7c6cff]/60" />
            </span>
            , Gemini, Grok, Claude, Perplexity{' '}
            <span className="text-txt-dim">&amp;</span>{' '}
            Social Media
          </h2>
        </div>

        {/* Description */}
        <div className="animate-fade-up opacity-0 max-w-lg px-2" style={{ animationDelay: '0.45s' }}>
          <p className="text-xs sm:text-sm md:text-[15px] leading-relaxed text-txt-dim font-light">
            First Web3 agency combining traditional Social Media with AI
            search optimization. Get mentioned by AI Platforms and featured
            in top-tier media.
          </p>
        </div>

        {/* Trust tag */}
        <div className="animate-fade-up opacity-0 mt-5 sm:mt-7" style={{ animationDelay: '0.55s' }}>
          <span className="inline-block text-[11px] sm:text-xs tracking-wide text-txt-muted/70 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            AI won&apos;t reference what it doesn&apos;t trust.
          </span>
        </div>

        {/* CTA */}
        <div className="animate-fade-up opacity-0 mt-4 sm:mt-5" style={{ animationDelay: '0.65s' }}>
          <a href="#contact" className="group relative inline-block">
            <div className="absolute -inset-[1px] rounded-md bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,#7c6cff_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hero-border-spin blur-[0.5px]" />
            <div className="relative bg-brand-surface border border-[#7c6cff]/20 text-txt-dim px-6 py-3 rounded-md flex items-center gap-3 shadow-lg shadow-[#7c6cff]/5 group-hover:text-[#7c6cff] group-hover:border-[#7c6cff]/50 transition-all duration-300">
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
    </header>
  )
}
