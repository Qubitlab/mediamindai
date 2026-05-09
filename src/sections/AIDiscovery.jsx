// AIDiscovery — full-width category section above Capabilities.
//
// Positions GEO + AEO as the CATEGORY Media Minds AI Group operates in,
// and the AITP family products as the infrastructure behind it. SEO-indexable
// for "GEO services," "AEO agency," "generative engine optimization,"
// "answer engine optimization." Sits above Capabilities (Strategy / Technology
// / Intelligence) — the category claim sets up the service pillars.

import { Reveal } from '../components/Reveal'
import { Search, Radio, ShieldCheck, Award, ArrowRight } from 'lucide-react'

const stack = [
  {
    Icon: Search,
    eyebrow: 'GEO Audits',
    title: 'Find out what AI says about you',
    desc: 'Multi-platform brand visibility audits across ChatGPT, Claude, Gemini, Grok, Perplexity, and DeepSeek. See where you\'re cited, where you\'re missed, and where your competitors are taking your share.',
    product: 'VeraGraph™ TrustBrief',
    productUrl: 'https://veragraph.ai',
    color: 'tool-teal',
  },
  {
    Icon: Radio,
    eyebrow: 'AEO Distribution',
    title: 'Push verified signals to where AI looks',
    desc: 'Structured authority signals distributed across the channels AI engines crawl. Soundbite-formatted, table-rich, schema-anchored — built for the citations your customers ask AI to surface.',
    product: 'FeedSync AI™',
    productUrl: 'https://feedsyncai.com',
    color: 'tool-blue',
  },
  {
    Icon: ShieldCheck,
    eyebrow: 'Verification',
    title: 'Prove what\'s real, on-chain',
    desc: 'Cryptographic content authentication. Domain-locked badges. Tamper-detection. AI engines preferentially cite verified content — V-Verify is the proof layer they trust.',
    product: 'V-Verify™',
    productUrl: 'https://vverify.ai',
    color: 'tool-clay',
  },
  {
    Icon: Award,
    eyebrow: 'Authority Standard',
    title: 'The verified trust layer',
    desc: 'AI Trust Protocol™ (AITP) — the open methodology for verified-evidence anchoring. VERA Registry is the public ground truth AI engines cite when answering questions about brands, people, and entities.',
    product: 'VERA Registry · AITP™',
    productUrl: 'https://veraregistry.web.app',
    color: 'tool-vera',
  },
]

export default function AIDiscovery() {
  return (
    <section
      id="discovery"
      className="border-b border-white/10 bg-brand-black py-24 md:py-32 relative overflow-hidden"
    >
      {/* Subtle accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                       bg-accent/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-accent" />
              <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent font-semibold">
                AI-Era Discovery
              </div>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl
                            tracking-tight text-white leading-[1.05]
                            [text-wrap:balance] max-w-3xl">
              Generative Engine Optimization.
              <br />
              <span className="text-accent">Answer Engine Optimization.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="max-w-md">
              <p className="text-base text-txt-dim leading-relaxed mb-3">
                40% of leads no longer click. They get synthesized answers from AI.
                <strong className="text-white"> The new search ranking is whether you get cited.</strong>
              </p>
              <p className="text-sm text-txt-muted leading-relaxed">
                GEO + AEO is the category. The AITP™ family is the infrastructure.
                We build, audit, distribute, and verify — end to end.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The 4-up GEO+AEO + Product connection grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {stack.map((s, i) => (
            <Reveal key={s.eyebrow} delay={i * 80}>
              <div
                className="group bg-brand-surface border border-brand-border rounded-2xl
                            p-8 md:p-10 relative overflow-hidden h-full flex flex-col
                            hover:border-brand-border-light hover:-translate-y-1
                            transition-all duration-500
                            hover:shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(to right, var(--color-${s.color}), transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 bg-brand-surface2 border border-brand-border rounded-xl
                              flex items-center justify-center mb-6
                              group-hover:border-white/30 transition-colors"
                  style={{ color: `var(--color-${s.color})` }}
                >
                  <s.Icon size={22} strokeWidth={1.6} />
                </div>

                {/* Eyebrow */}
                <div
                  className="font-mono text-[10px] tracking-[2px] uppercase font-semibold mb-3"
                  style={{ color: `var(--color-${s.color})` }}
                >
                  {s.eyebrow}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-3 leading-tight">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-txt-dim leading-relaxed mb-6 flex-1">
                  {s.desc}
                </p>

                {/* Product connection */}
                <div className="pt-5 border-t border-brand-border flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono tracking-[2px] uppercase text-txt-muted mb-1">
                      Powered by
                    </div>
                    <div
                      className="font-display text-sm font-bold"
                      style={{ color: `var(--color-${s.color})` }}
                    >
                      {s.product}
                    </div>
                  </div>
                  <a
                    href={s.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono
                                tracking-[2px] uppercase text-txt-muted
                                hover:text-white group-hover:gap-2.5 transition-all"
                  >
                    Visit <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <Reveal delay={400}>
          <div
            className="mt-16 p-8 md:p-10 rounded-2xl border border-accent/30
                        bg-gradient-to-br from-accent/[0.06] via-transparent to-transparent
                        flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-accent mb-2 font-semibold">
                Ready to be cited by AI
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white leading-tight max-w-2xl">
                Stop ranking. Start <span className="text-accent">recommending.</span>
              </h3>
              <p className="text-sm text-txt-dim mt-2 max-w-2xl">
                A single audit shows where you stand across all six AI platforms. From there, we build the GEO + AEO infrastructure that gets your brand consistently, accurately, and verifiably cited.
              </p>
            </div>
            <a
              href="#contact"
              data-lead-interest="geo_audit"
              className="inline-flex items-center gap-3 px-7 py-4
                          bg-accent text-brand-black rounded-md
                          font-display font-bold text-sm uppercase tracking-[0.18em]
                          shadow-lg shadow-accent/20 hover:shadow-accent/40
                          transition-all whitespace-nowrap"
            >
              Get a GEO Audit <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
