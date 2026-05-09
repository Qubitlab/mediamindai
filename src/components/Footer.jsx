export default function Footer() {
  return (
    <footer className="bg-brand-black pt-20 pb-8 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-display font-extrabold text-lg mb-4">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Media Minds AI
            </div>
            <p className="text-sm text-txt-muted leading-relaxed max-w-[260px] mb-6">
              Full-stack agency specializing in AI systems, social media, technology development, national campaigns, Web3 technology, and brand intelligence.
            </p>
            <div className="font-mono text-[9px] tracking-[2px] uppercase text-txt-muted pt-4 border-t border-brand-border">
              A Division of The QuantumX Project
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[2px] uppercase text-txt-muted mb-5">Services</h4>
            <ul className="space-y-2.5">
              {['Strategy & Consulting', 'Campaigns & Content', 'AI & Tech Development', 'Web3 & Blockchain', 'E-Commerce'].map(s => (
                <li key={s}><a href="#services" className="text-[13px] text-txt-dim hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[2px] uppercase text-txt-muted mb-5">Technology</h4>
            <ul className="space-y-2.5">
              <li><a href="https://veraregistry.web.app" target="_blank" rel="noopener noreferrer" className="text-[13px] text-txt-dim hover:text-white transition-colors">VERA Registry</a></li>
              <li><a href="https://vverify.ai" target="_blank" rel="noopener noreferrer" className="text-[13px] text-txt-dim hover:text-white transition-colors">V-Verify</a></li>
              <li><a href="https://veragraph.ai" target="_blank" rel="noopener noreferrer" className="text-[13px] text-txt-dim hover:text-white transition-colors">VeraGraph</a></li>
              <li><a href="https://feedsyncai.com" target="_blank" rel="noopener noreferrer" className="text-[13px] text-txt-dim hover:text-white transition-colors">FeedSync AI</a></li>
              <li><a href="https://qxaiagent.com" target="_blank" rel="noopener noreferrer" className="text-[13px] text-txt-dim hover:text-white transition-colors">QXAI Agent</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[2px] uppercase text-txt-muted mb-5">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#team" className="text-[13px] text-txt-dim hover:text-white transition-colors">Team</a></li>
              <li><a href="https://quantumxproject.com" target="_blank" rel="noopener noreferrer" className="text-[13px] text-txt-dim hover:text-white transition-colors">QuantumX Project</a></li>
              <li><a href="#contact" className="text-[13px] text-txt-dim hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-[13px] text-txt-dim hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[2px] uppercase text-txt-muted mb-5">Connect</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.linkedin.com/company/media-mind-ai-group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-txt-dim hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/mediamindsai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-txt-dim hover:text-white transition-colors"
                >
                  X &middot; @mediamindsai
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@qxverse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-txt-dim hover:text-white transition-colors"
                >
                  TikTok &middot; @qxverse
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@mediamindai.com"
                  className="text-[13px] text-txt-dim hover:text-white transition-colors"
                >
                  hello@mediamindai.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:press@mediamindai.com"
                  className="text-[13px] text-txt-dim hover:text-white transition-colors"
                >
                  press@mediamindai.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+16297776155"
                  className="text-[13px] text-txt-dim hover:text-white transition-colors"
                >
                  (629) 777-6155
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-txt-muted">© 2026 Media Minds AI Group. All Rights Reserved.</p>
          <div className="flex gap-3">
            <span className="font-mono text-[9px] tracking-wider px-3 py-1.5 border border-brand-border rounded-full text-txt-muted">
              AIBlackBox™ Engine
            </span>
            <span className="font-mono text-[9px] tracking-wider px-3 py-1.5 border border-brand-border rounded-full text-txt-muted">
              Verified on Polygon
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
