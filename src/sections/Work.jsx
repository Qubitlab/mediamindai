import { Reveal } from '../components/Reveal'

const projects = [
  { title: 'Tiger Woods & Rory McIlroy — Stealth 2', client: 'TaylorMade Golf', views: '6.5M', url: 'https://youtu.be/3W03naKIXS4', thumb: '/tiger-woods-mcllroy.png' },
  { title: 'People Are Awesome — Extreme Sports', client: 'National Campaign', views: '11M', url: 'https://youtu.be/AQkbbtDoPq0', thumb: '/People are awesome.png' },
  { title: 'Galaxy S23 Ultra — Introduction Film', client: 'Samsung', views: '6.3M', url: 'https://youtu.be/BSYsXVFzmKA', thumb: '/galaxy S23.png' },
  { title: 'One Thing At A Time Sessions', client: 'Morgan Wallen', views: '3.1M', url: 'https://youtu.be/S-OKqDu8YmA', thumb: '/morgan-wallen.png' },
  { title: 'Make Your Workout Worth the Effort', client: 'Optimum Nutrition', views: '3.1M', url: 'https://youtu.be/99LquYW0LAg', thumb: '/make your workout worth it .png' },
  { title: 'Viral Short-Form Content', client: 'Multi-Brand', views: '634M', url: 'https://youtu.be/YlvcFJOE-OE', thumb: '/viral-short-form.png' },
]

export default function Work() {
  return (
    <section id="work" className="border-b border-white/10 bg-brand-black py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <Reveal>
          <div className="w-8 h-px bg-accent mb-5" />
          <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-3">Selected Work</div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-white leading-[1.05] mb-4">
            National Campaigns.<br />Billions of Views.
          </h2>
          <p className="text-base text-txt-dim max-w-lg leading-relaxed mb-16">
            From sports entertainment to consumer electronics. Our production team has delivered at the highest level.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:border-brand-border-light hover:-translate-y-1 transition-all duration-500"
              >
                {/* Thumbnail area */}
                <div className="w-full aspect-video bg-brand-surface2 flex items-center justify-center relative overflow-hidden">
                  <img src={p.thumb} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-lg group-hover:bg-accent group-hover:text-brand-black group-hover:scale-110 transition-all">
                    ▶
                  </div>
                  <span className="absolute top-3 right-3 z-10 font-mono text-[10px] tracking-wider px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-full text-txt-dim">
                    {p.views} VIEWS
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h4 className="font-display font-semibold text-[15px] text-white mb-1 tracking-tight leading-snug">
                    {p.title}
                  </h4>
                  <span className="text-[12px] text-txt-muted">{p.client}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
