import { Reveal } from '../components/Reveal'
import { FileText, Link as LinkIcon, Lock, Check } from 'lucide-react'

const services = [
  {
    num: '01',
    title: 'Strategy & Consulting',
    desc: 'Brand positioning, AI visibility audits, market intelligence, and go-to-market strategies for modern brands navigating AI-driven discovery. Includes Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) audits across all six AI platforms.',
    tags: ['Brand Strategy', 'GEO Audits', 'AEO Strategy', 'GTM'],
    visual: 'chat', // interactive visual type
  },
  {
    num: '02',
    title: 'Social Media, Campaigns & Content',
    desc: 'National campaign production, social media strategy, social video, content distribution across ESPN, CBS, ABC, NBC, and performance optimization. 25B+ views and counting. Soundbite-first formatting and table-rich structure built for GEO citation by AI engines.',
    tags: ['Social Media', 'Video Production', 'National Campaigns', 'GEO Content'],
    visual: 'chart',
  },
  {
    num: '03',
    title: 'Tech, Web & AI Development',
    desc: 'Full-stack web design and development, mobile and SaaS apps, AI platforms, autonomous agents, multi-model integrations, sentiment engines, intelligence pipelines, and production deployment. Custom GEO + AEO infrastructure powered by AIBlackBox™.',
    tags: ['Web Dev', 'Apps & SaaS', 'AI/ML', 'GEO/AEO Infra', 'Full-Stack'],
    visual: 'code',
  },
  {
    num: '04',
    title: 'Web3 & Blockchain',
    desc: 'Smart contract development, on-chain verification, token strategy, DeFi integration, and blockchain infrastructure on Polygon. Cryptographic anchoring for GEO + AEO authority signals via QUBIT Blockchain®.',
    tags: ['Solidity', 'Polygon', 'AEO Anchoring', 'Verification'],
    visual: 'nodes',
  },
]

function ChatVisual() {
  return (
    <div className="w-3/4 flex flex-col gap-3 relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
      <div className="self-end bg-brand-surface2 p-3 rounded-2xl rounded-tr-sm border border-white/5 text-[10px] text-txt-muted max-w-[80%]">
        Who is the best AI agency?
      </div>
      <div className="self-start bg-accent/15 p-3 rounded-2xl rounded-tl-sm border border-accent/30 text-[10px] text-white max-w-[80%] flex items-center gap-2">
        <span className="text-accent">✦</span>
        Media Minds AI Group
      </div>
      <div className="self-start w-full h-20 bg-brand-black rounded-lg border border-white/10 relative overflow-hidden group-hover:border-accent/30 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
        <div className="absolute bottom-2 right-2 flex gap-1">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  )
}

function ChartVisual() {
  const bars = [30, 50, 40, 85, 60]
  return (
    <div className="w-full h-full flex items-end justify-between gap-2 relative z-10 px-6 pb-6">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`w-full rounded-t-sm transition-all duration-700 ${
            i === 3 ? 'bg-accent shadow-[0_0_15px_rgba(200,255,0,0.2)] group-hover:h-[90%]' : 'bg-brand-surface2 group-hover:h-[' + (h + 5) + '%]'
          }`}
          style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
  )
}

function CodeVisual() {
  return (
    <div className="p-5 font-mono text-[11px] leading-relaxed text-txt-muted">
      <div className="flex gap-1.5 mb-4 opacity-50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
      </div>
      <div className="space-y-1">
        <div><span className="text-accent">from</span> <span className="text-white">aiblackbox</span> <span className="text-accent">import</span> <span className="text-white">Engine</span></div>
        <div className="h-1.5" />
        <div><span className="text-accent">engine</span> = Engine(</div>
        <div className="pl-4"><span className="text-txt-dim">platforms</span>=<span className="text-tool-teal">[6]</span>,</div>
        <div className="pl-4"><span className="text-txt-dim">verify</span>=<span className="text-tool-teal">"polygon"</span></div>
        <div>)</div>
        <div className="h-1.5" />
        <div className="text-txt-muted/50"># Query all AI platforms</div>
        <div className="relative">
          <span className="text-white">report</span> = <span className="text-accent">await</span> engine.<span className="text-tool-blue">analyze</span>(<span className="text-tool-teal">"brand"</span>)
          <span className="absolute -right-1 top-0 w-1.5 h-4 bg-accent animate-pulse" />
        </div>
      </div>
    </div>
  )
}

function NodesVisual() {
  return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full text-white/10" strokeWidth="1.5" fill="none" stroke="currentColor">
        <line x1="50%" y1="18%" x2="20%" y2="50%" />
        <line x1="50%" y1="18%" x2="80%" y2="50%" />
        <line x1="20%" y1="50%" x2="50%" y2="82%" />
        <line x1="80%" y1="50%" x2="50%" y2="82%" />
      </svg>
      {[
        { top: '18%', left: '50%', Icon: FileText,  accent: false },
        { top: '50%', left: '20%', Icon: LinkIcon,  accent: false },
        { top: '50%', left: '80%', Icon: Lock,      accent: false },
        { top: '82%', left: '50%', Icon: Check,     accent: true  },
      ].map((n, i) => (
        <div
          key={i}
          className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center z-10 transition-all group-hover:scale-110 ${
            n.accent
              ? 'bg-accent/20 border border-accent/50 shadow-[0_0_20px_rgba(200,255,0,0.2)] text-accent'
              : 'bg-brand-surface2 border border-white/15 text-txt-dim'
          }`}
          style={{ top: n.top, left: n.left, transitionDelay: `${i * 80}ms` }}
        >
          <n.Icon size={16} strokeWidth={1.6} />
        </div>
      ))}
    </div>
  )
}

const visuals = { chat: ChatVisual, chart: ChartVisual, code: CodeVisual, nodes: NodesVisual }

export default function Services() {
  return (
    <section id="services" className="border-b border-white/10 bg-brand-black">
      <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">

        {/* Sidebar */}
        <div className="md:col-span-1 p-8 md:p-10 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="w-8 h-px bg-accent mb-6" />
            <Reveal>
              <h2 className="text-3xl font-display font-bold text-white tracking-tight mb-4">
                What We Build
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-sm leading-relaxed text-txt-dim">
                From national campaigns to custom AI systems. Strategy to deployment. We handle every layer of the stack.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <a href="#contact" className="text-[10px] font-mono text-white hover:text-accent uppercase tracking-[3px] border-b border-white/20 pb-1 hover:border-accent transition-all inline-flex items-center gap-2 mt-8">
              Start a Project →
            </a>
          </Reveal>
        </div>

        {/* Bento cards */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-white/10" id="services-grid">
          {services.map((s, i) => {
            const Visual = visuals[s.visual]
            const isRight = i % 2 === 1
            return (
              <Reveal
                key={s.num}
                delay={i * 100}
                className={`group p-8 flex flex-col hover:bg-white/[0.02] transition-colors duration-500 ${
                  isRight ? 'md:border-l border-white/10' : ''
                } ${i >= 2 ? 'border-t border-white/10' : ''}`}
              >
                {/* Interactive visual */}
                <div className="h-56 w-full bg-brand-surface/50 rounded-lg border border-white/5 mb-8 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent-dim),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Visual />
                </div>

                {/* Text */}
                <div className="mt-auto">
                  <div className="text-accent text-[10px] font-mono tracking-wider mb-2">{s.num}</div>
                  <h3 className="text-lg text-white font-display font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-txt-muted leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map(t => (
                      <span key={t} className="font-mono text-[9px] tracking-wider px-2.5 py-1 border border-brand-border rounded-full text-txt-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* "Ask for the business" — direct CTA strip closing the Services section.
          No section is complete without an explicit ask. Multiple paths: form,
          email, phone — let prospects choose their comfort lane. */}
      <Reveal>
        <div className="border-t border-white/10 px-8 md:px-14 py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent font-semibold mb-3 flex items-center gap-3">
                <span className="w-6 h-px bg-accent" />
                Ready when you are
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-[1.1] tracking-tight mb-3">
                Let's get you <span className="text-accent">cited.</span>
              </h3>
              <p className="text-sm md:text-base text-txt-dim leading-relaxed">
                Tell us where you stand and where you want to be — across ChatGPT, Claude, Gemini, Grok, Perplexity, and DeepSeek. We'll show you the gap and how we close it.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4
                            bg-accent text-brand-black rounded-md
                            font-display font-bold text-sm uppercase tracking-[0.16em]
                            shadow-lg shadow-accent/20 hover:shadow-accent/40
                            transition-all whitespace-nowrap"
              >
                Start a project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <a
                href="mailto:hello@mediamindai.com?subject=GEO%20%2F%20AEO%20Audit%20Inquiry"
                className="inline-flex items-center justify-center gap-2 px-6 py-4
                            border border-white/20 text-white rounded-md
                            font-display font-bold text-sm uppercase tracking-[0.16em]
                            hover:border-white/40 hover:bg-white/5 transition-all whitespace-nowrap"
              >
                Email us
              </a>
            </div>
          </div>

          {/* Trust strip — direct contact paths in case form/email feel too slow */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap gap-x-10 gap-y-3 items-center">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-txt-muted">
              Direct lines
            </div>
            <a href="tel:+16297776155" className="font-mono text-[12px] text-txt-dim hover:text-white transition-colors">
              <span className="text-accent">▸</span>&nbsp;&nbsp;(629) 777-6155
            </a>
            <a href="mailto:hello@mediamindai.com" className="font-mono text-[12px] text-txt-dim hover:text-white transition-colors">
              <span className="text-accent">▸</span>&nbsp;&nbsp;hello@mediamindai.com
            </a>
            <a href="mailto:press@mediamindai.com" className="font-mono text-[12px] text-txt-dim hover:text-white transition-colors">
              <span className="text-accent">▸</span>&nbsp;&nbsp;press@mediamindai.com
            </a>
          </div>
        </div>
      </Reveal>

      </div>
    </section>
  )
}
