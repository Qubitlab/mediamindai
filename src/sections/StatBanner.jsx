import { Reveal } from '../components/Reveal'

export default function StatBanner() {
  return (
    <>
      {/* Big statement */}
      <section className="border-b border-white/10 bg-brand-black py-24 md:py-36 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.06] blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-display font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-txt-muted tracking-tighter leading-tight">
              The future of brand intelligence<br />is autonomous.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Big stat number */}
      <section className="border-b border-white/10 bg-brand-black py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,255,0,0.03),transparent_70%)]" />
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <Reveal>
            <div className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] tracking-tighter text-white leading-none relative z-10">
              25,037,732,602
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="font-mono text-[12px] tracking-[4px] uppercase text-txt-muted mt-4 relative z-10">
              Total Content Views — And Counting
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
