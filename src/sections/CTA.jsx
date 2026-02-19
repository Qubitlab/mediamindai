import { Reveal } from '../components/Reveal'

export default function CTA() {
  return (
    <section id="contact" className="bg-brand-black py-24 md:py-32 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="bg-brand-surface border border-brand-border rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,255,0,0.03),transparent_60%)] pointer-events-none" />

            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05] mb-6 relative z-10">
              Let's Build<br />Something Together
            </h2>
            <p className="text-lg text-txt-dim max-w-lg mx-auto mb-10 leading-relaxed relative z-10">
              Whether you need a national campaign, a custom AI system, blockchain verification, or a complete brand transformation — we're ready.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a href="mailto:info@mediamindai.com" className="group relative inline-flex">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/60 to-tool-teal/40 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-500" />
                <span className="relative font-display text-[13px] font-bold uppercase tracking-wider px-8 py-4 bg-accent text-brand-black rounded-full hover:scale-[1.03] transition-all">
                  info@mediamindai.com
                </span>
              </a>
              <a href="tel:7602584874" className="font-display text-[13px] font-bold uppercase tracking-wider px-8 py-4 border border-brand-border-light text-txt-dim rounded-full hover:border-white/30 hover:text-white transition-all">
                (760) 258-4874
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
