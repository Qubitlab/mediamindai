import { Reveal } from '../components/Reveal'

const tools = [
  {
    name: 'FeedSync AI',
    domain: 'feedsyncai.com',
    url: 'https://feedsyncai.com',
    desc: 'Multi-platform content distribution engine. Push content across all 6 major AI platforms and track visibility in real-time.',
    features: ['6-platform simultaneous distribution', 'Automated content scheduling', 'Real-time performance analytics', 'AI-optimized content suggestions'],
    color: 'tool-blue',
    logo: '/feedsyncai.png',
    gradient: 'from-tool-blue',
  },
  {
    name: 'TrustGraph',
    domain: 'trustgraph.space',
    url: 'https://trustgraph.space',
    desc: 'AI brand intelligence platform generating 32-page TrustBrief reports with sentiment analysis, competitive positioning, and strategic roadmaps.',
    features: ['32-page consultant-grade reports', '6-platform AI sentiment consensus', 'Real Share of Voice analysis', '30/60/90-day implementation plans'],
    color: 'tool-teal',
    logo: '/trustgraph_logo.png',
    gradient: 'from-tool-teal',
  },
  {
    name: 'TrustVerify',
    domain: 'trustverify.space',
    url: 'https://trustverify.space',
    desc: 'On-chain content and identity verification. The world\'s first AI reputation layer with blockchain-backed proof of authenticity.',
    features: ['Sentinel V-Verify vision analysis', 'Blockchain timestamping on Polygon', 'Trust badges & certificates', 'Deepfake detection safeguards'],
    color: 'tool-purple',
    logo: '/V-verify-logo.png',
    gradient: 'from-tool-purple',
  },
  {
    name: 'QXAI / AI CEO',
    domain: 'qxai.space',
    url: 'https://qxai.space',
    desc: 'Full AI automation platform. Content distribution to intelligence reporting to strategic action execution — running autonomously.',
    features: ['Automated brand monitoring', 'Continuous intelligence reporting', 'Strategic decision execution', 'Full FeedSync + TrustGraph integration'],
    color: 'tool-coral',
    logo: '/quantumxai-logo-white.png',
    gradient: 'from-tool-coral',
  },
]

export default function TechShowcase() {
  return (
    <section id="technology" className="border-b border-white/10 bg-brand-black py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <Reveal>
            <div className="w-8 h-px bg-accent mb-5" />
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-3">Our Technology</div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-white leading-[1.05]">
              Built by Us.<br />Powered by AIBlackBox™.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base text-txt-dim max-w-md leading-relaxed">
              We don't just advise — we build. These are proprietary platforms our team designed, developed, and deployed from scratch.
            </p>
          </Reveal>
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tools.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="group bg-brand-surface border border-brand-border rounded-2xl p-10 relative overflow-hidden hover:border-brand-border-light hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_24px_80px_rgba(0,0,0,0.4)]">

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${t.gradient} to-transparent`} />

                {/* Header row */}
                <div className="flex justify-between items-start mb-6">
                  <img src={t.logo} alt={t.name} className="h-10 w-auto object-contain" />
                  <span className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 border border-brand-border rounded-full text-txt-muted">
                    Live
                  </span>
                </div>

                {/* Domain */}
                <div className="font-mono text-[11px] text-txt-muted mb-4">{t.domain}</div>

                {/* Description */}
                <p className="text-[15px] text-txt-dim leading-relaxed mb-6">{t.desc}</p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {t.features.map(f => (
                    <li key={f} className="text-[13px] text-txt-dim pl-5 relative before:content-['›'] before:absolute before:left-0 before:text-txt-muted before:font-bold">
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-display text-[12px] font-bold uppercase tracking-wider text-${t.color} inline-flex items-center gap-2 group-hover:gap-4 transition-all`}
                >
                  Visit {t.name} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
