import { useState, useEffect } from 'react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Technology', href: '#technology' },
  { label: 'Work', href: '#work' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-brand-black/90 backdrop-blur-2xl border-b border-white/5 py-3'
        : 'py-4'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <img
            src="/Mediamindai-white-logo.jpeg"
            alt="MediaMind AI"
            className="h-8 w-auto object-contain"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-[11px] font-mono uppercase tracking-[2px] text-txt-muted hover:text-white transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#7c6cff] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right: CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden lg:inline-flex font-mono text-[10px] font-medium uppercase tracking-[2px] px-5 py-2 border border-white/15 text-txt-dim rounded hover:border-white/30 hover:text-white transition-all">
            Get in Touch
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] p-2"
            aria-label="Menu"
          >
            <span className={`block w-6 h-[1.5px] bg-white/60 transition-all ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-white/60 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-white/60 transition-all ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile / full menu */}
      {menuOpen && (
        <div className="bg-brand-black/95 backdrop-blur-2xl border-t border-white/5 px-6 py-8">
          <ul className="space-y-4">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMenuOpen(false)} className="block text-lg font-display font-semibold text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="mt-6 inline-flex font-display text-sm font-bold uppercase tracking-wider px-8 py-3 border border-[#7c6cff]/50 text-white rounded">
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  )
}
