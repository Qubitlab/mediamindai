import { Reveal } from '../components/Reveal'

export default function ProblemSolution() {
  return (
    <section className="border-b border-white/10 bg-brand-black">

      {/* ── THE PROBLEM ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">

        {/* Left: problem statement */}
        <div className="p-8 md:p-14 flex flex-col justify-center min-h-[420px] relative overflow-hidden">
          {/* Red glow */}
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,60,60,0.06),transparent)] pointer-events-none" />

          <Reveal>
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-tool-coral mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-tool-coral animate-pulse" />
              The Problem
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-[2.8rem] tracking-tight text-white leading-[1.08] mb-6">
              Traditional SEO<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-txt-muted to-txt-muted/50">
                is dying.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[15px] md:text-base text-txt-dim leading-relaxed max-w-lg">
              <span className="text-white font-semibold">40% of users</span> now search via AI assistants. Your competitors are invisible to ChatGPT, Gemini, Grok, Claude, and Perplexity — and media coverage alone doesn't guarantee AI visibility.
            </p>
          </Reveal>

          {/* Stat callouts */}
          <Reveal delay={200}>
            <div className="flex gap-8 mt-10 pt-8 border-t border-brand-border">
              <div>
                <div className="font-display font-extrabold text-2xl text-tool-coral">40%</div>
                <div className="text-[10px] text-txt-muted uppercase tracking-[2px] mt-1">AI-First Searches</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl text-tool-coral">5+</div>
                <div className="text-[10px] text-txt-muted uppercase tracking-[2px] mt-1">Major LLMs</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl text-tool-coral">0%</div>
                <div className="text-[10px] text-txt-muted uppercase tracking-[2px] mt-1">Visibility if Ignored</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: visual - "Invisible to AI" */}
        <div className="p-8 md:p-14 flex items-center justify-center bg-brand-deep/50 min-h-[420px] relative overflow-hidden">
          <Reveal>
            <div className="relative">
              {/* Fading search results */}
              <div className="space-y-3 opacity-100">
                {['Your Brand', 'Your Products', 'Your Services'].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 px-5 py-3 rounded-lg border border-white/5 bg-brand-surface/50"
                    style={{ opacity: 0.6 - i * 0.2 }}
                  >
                    <span className="w-2 h-2 rounded-full bg-tool-coral/40" />
                    <span className="font-mono text-sm text-txt-muted/60 line-through">{item}</span>
                    <span className="ml-auto text-[9px] font-mono text-tool-coral/60 uppercase tracking-wider">Not Found</span>
                  </div>
                ))}
              </div>

              {/* AI assistant mockup */}
              <div className="mt-6 p-4 rounded-xl border border-white/10 bg-brand-surface">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-tool-coral" />
                  <span className="font-mono text-[10px] text-txt-muted tracking-wider">AI ASSISTANT</span>
                </div>
                <div className="bg-brand-deep rounded-lg p-3 text-[12px] text-txt-muted leading-relaxed">
                  "I don't have specific information about that brand. Here are some alternatives..."
                </div>
              </div>

              {/* Label */}
              <div className="mt-6 text-center">
                <span className="font-display font-bold text-lg text-tool-coral/70">Invisible to AI</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── THE SOLUTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">

        {/* Left: visual - "Visible Everywhere" */}
        <div className="p-8 md:p-14 flex items-center justify-center bg-brand-deep/50 min-h-[420px] relative overflow-hidden order-2 md:order-1">
          <Reveal>
            <div className="relative">
              {/* Glowing search results */}
              <div className="space-y-3">
                {[
                  { platform: 'ChatGPT', text: '"Media Minds AI is a leading...' },
                  { platform: 'Claude', text: '"Known for their AI intelligence...' },
                  { platform: 'Gemini', text: '"Specializing in brand visibility...' },
                ].map((item, i) => (
                  <div
                    key={item.platform}
                    className="flex items-center gap-3 px-5 py-3 rounded-lg border border-accent/20 bg-accent/[0.04]"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[10px] text-accent tracking-wider block">{item.platform}</span>
                      <span className="text-[12px] text-txt-dim truncate block">{item.text}</span>
                    </div>
                    <span className="text-[9px] font-mono text-accent/80 uppercase tracking-wider shrink-0">Featured</span>
                  </div>
                ))}
              </div>

              {/* Traditional media row */}
              <div className="mt-4 p-4 rounded-xl border border-white/10 bg-brand-surface">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-tool-teal" />
                  <span className="font-mono text-[10px] text-txt-muted tracking-wider">TRADITIONAL MEDIA</span>
                </div>
                <div className="flex gap-4 text-[13px] font-display font-bold text-txt-dim/60">
                  <span>ESPN</span><span>CBS</span><span>ABC</span><span>NBC</span>
                </div>
              </div>

              {/* Label */}
              <div className="mt-6 text-center">
                <span className="font-display font-bold text-lg text-accent">Visible Everywhere</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: solution statement */}
        <div className="p-8 md:p-14 flex flex-col justify-center min-h-[420px] relative overflow-hidden order-1 md:order-2">
          {/* Green glow */}
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(200,255,0,0.05),transparent)] pointer-events-none" />

          <Reveal>
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Our Solution
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-[2.8rem] tracking-tight text-white leading-[1.08] mb-6">
              Dual-Channel<br />
              <span className="text-accent">Optimization.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[15px] md:text-base text-txt-dim leading-relaxed max-w-lg mb-6">
              We optimize your brand for both <span className="text-white font-semibold">AI search engines AND traditional media</span>. A Social Media + LLM optimization strategy ensuring visibility everywhere your audience searches.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[15px] md:text-base text-txt-dim leading-relaxed max-w-lg">
              Get mentioned by AI assistants. Featured in top-tier media. We fuse cutting-edge AI integration with premium development — elevating your business with autonomous systems.
            </p>
          </Reveal>

          {/* Checkmarks */}
          <Reveal delay={250}>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10 pt-8 border-t border-brand-border">
              {[
                'AI Platform Visibility',
                'Traditional Media Coverage',
                'Social Media Strategy',
                'Web3 Verification',
                'Content Distribution',
                'Brand Intelligence',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-[12px] text-txt-dim">
                  <span className="text-accent text-[10px]">✓</span> {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  )
}
