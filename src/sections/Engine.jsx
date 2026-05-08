import { Reveal } from '../components/Reveal'
import { Search, Zap, BrainCircuit, Link as LinkIcon, ClipboardList } from 'lucide-react'

const steps = [
  { Icon: Search,        title: 'Input',   desc: 'Brand or entity submitted for analysis' },
  { Icon: Zap,           title: 'Query',   desc: 'Parallel queries to 6 AI platforms' },
  { Icon: BrainCircuit,  title: 'Analyze', desc: 'NLP extraction, sentiment, competitive data' },
  { Icon: LinkIcon,      title: 'Verify',  desc: 'Blockchain timestamping on Polygon' },
  { Icon: ClipboardList, title: 'Deliver', desc: 'Reports, scores, badges, strategic actions' },
]

const platforms = ['ChatGPT', 'Claude', 'Gemini', 'Grok', 'Perplexity', 'DeepSeek']

export default function Engine() {
  return (
    <section className="border-b border-white/10 bg-brand-black py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 md:p-14 relative overflow-hidden">

            {/* Glow */}
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(200,255,0,0.03),transparent)] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-14">
              <div>
                <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-3">The Engine</div>
                <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-white">AIBlackBox™</h2>
              </div>
              <p className="text-base text-txt-dim max-w-md leading-relaxed">
                Our proprietary intelligence engine powers every platform we build. Queries 6 AI systems simultaneously and verifies results on-chain.
              </p>
            </div>

            {/* Pipeline nodes */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="bg-white/[0.02] border border-brand-border rounded-2xl p-6 text-center hover:border-brand-border-light transition-colors">
                    <div className="flex justify-center mb-3 text-accent">
                      <s.Icon size={24} strokeWidth={1.6} />
                    </div>
                    <h4 className="font-display font-bold text-sm text-white mb-1">{s.title}</h4>
                    <p className="text-[11px] text-txt-muted leading-snug">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Platform strip */}
            <div className="mt-8 pt-8 border-t border-brand-border flex flex-col md:flex-row md:items-center gap-5">
              <span className="font-mono text-[10px] tracking-[2px] uppercase text-txt-muted shrink-0">
                Platforms Monitored
              </span>
              <div className="flex flex-wrap gap-2">
                {platforms.map(p => (
                  <span key={p} className="text-[13px] text-txt-dim px-4 py-1.5 border border-brand-border rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
