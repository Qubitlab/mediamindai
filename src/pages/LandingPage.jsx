import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LeadModal from '../components/LeadModal'
import Hero from '../sections/Hero'
import Marquee from '../sections/Marquee'
import Statement from '../sections/Statement'
import ProblemSolution from '../sections/ProblemSolution'
import Services from '../sections/Services'
import AIDiscovery from '../sections/AIDiscovery'
import Capabilities from '../sections/Capabilities'
import TechShowcase from '../sections/TechShowcase'
import Engine from '../sections/Engine'
import StatBanner from '../sections/StatBanner'
import Work from '../sections/Work'
import Team from '../sections/Team'
import CTA from '../sections/CTA'

export default function LandingPage() {
  const [leadOpen, setLeadOpen] = useState(false)
  const [defaultInterest, setDefaultInterest] = useState(null)

  // Global CTA intercept — any link with href="#contact" or any element with
  // [data-lead] opens the lead modal. Lets every existing "Start a project,"
  // "Get in Touch," "Email us" CTA across the site become a lead capture
  // without touching every section component.
  useEffect(() => {
    function handleClick(e) {
      const target = e.target.closest('a[href="#contact"], [data-lead]')
      if (!target) return
      // Don't intercept the trust strip's direct mailto/tel — those already work
      if (target.tagName === 'A' && (target.href.startsWith('mailto:') || target.href.startsWith('tel:'))) {
        return
      }
      e.preventDefault()
      const interest = target.getAttribute('data-lead-interest')
      setDefaultInterest(interest || null)
      setLeadOpen(true)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Statement />
      <ProblemSolution />
      <Services />
      <AIDiscovery />
      <Capabilities />
      <TechShowcase />
      <Engine />
      <StatBanner />
      <Work />
      <Team />
      <CTA />
      <Footer />
      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        defaultInterest={defaultInterest}
        source="mmai-landing"
      />
    </>
  )
}
