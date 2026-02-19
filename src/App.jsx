import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Statement from './sections/Statement'
import ProblemSolution from './sections/ProblemSolution'
import Services from './sections/Services'
import Capabilities from './sections/Capabilities'
import TechShowcase from './sections/TechShowcase'
import Engine from './sections/Engine'
import StatBanner from './sections/StatBanner'
import Work from './sections/Work'
import Team from './sections/Team'
import CTA from './sections/CTA'

export default function App() {
  return (
    <>
      {/* Background layers */}
      <div className="fixed inset-0 z-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black pointer-events-none" />

      {/* App */}
      <Navbar />
      <Hero />
      <Marquee />
      <Statement />
      <ProblemSolution />
      <Services />
      <Capabilities />
      <TechShowcase />
      <Engine />
      <StatBanner />
      <Work />
      <Team />
      <CTA />
      <Footer />
    </>
  )
}
