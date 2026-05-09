// LeadModal — pop-out lead capture form. Triggered by "Start a project,"
// "Get a GEO Audit," "Email us" CTAs across the site. Writes to the
// `leads` Firestore collection with timestamp + source tag so the team
// can triage inquiries from the admin dashboard or Firebase console.
//
// Spam protection: minimal client-side honeypot field + Firestore rule
// validation (size caps, required fields, email pattern). Tighten with
// reCAPTCHA / App Check post-launch.

import { useState, useEffect } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react'

const interests = [
  { id: 'geo_audit',     label: 'GEO + AEO Audit' },
  { id: 'verification',  label: 'Brand AI Verification' },
  { id: 'social_media',  label: 'Social Media Strategy' },
  { id: 'campaigns',     label: 'National Campaign / Content' },
  { id: 'web_dev',       label: 'Web Design & Development' },
  { id: 'app_dev',       label: 'App / SaaS Development' },
  { id: 'ai_systems',    label: 'Custom AI Platform' },
  { id: 'web3',          label: 'Web3 / Blockchain' },
  { id: 'press',         label: 'Press / Partnership' },
  { id: 'other',         label: 'Something else' },
]

export default function LeadModal({ open, onClose, defaultInterest = null, source = 'mmai-landing' }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interests: defaultInterest ? [defaultInterest] : [],
    message: '',
    website: '', // honeypot — bots fill this, humans don't see it
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return
    const orig = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = orig }
  }, [open])

  // ESC closes
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function toggleInterest(id) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(id)
        ? f.interests.filter((i) => i !== id)
        : [...f.interests, id],
    }))
  }

  async function submit(e) {
    e.preventDefault()
    setErr('')
    // Validate
    if (!form.name.trim() || !form.company.trim() || !form.email.trim()) {
      setErr('Name, company, and email are required.')
      return
    }
    if (!/.+@.+\..+/.test(form.email)) {
      setErr('Please enter a valid email.')
      return
    }
    // Honeypot check
    if (form.website.trim()) {
      // Bot — silently "succeed" without writing
      setDone(true)
      return
    }
    setSubmitting(true)
    try {
      await addDoc(collection(db, 'leads'), {
        name: form.name.trim().slice(0, 200),
        company: form.company.trim().slice(0, 200),
        email: form.email.trim().toLowerCase().slice(0, 200),
        phone: form.phone.trim().slice(0, 50),
        interests: form.interests.slice(0, 10),
        message: form.message.trim().slice(0, 5000),
        source,
        page_url: typeof window !== 'undefined' ? window.location.href.slice(0, 500) : '',
        referrer: typeof document !== 'undefined' ? document.referrer.slice(0, 500) : '',
        created_at: serverTimestamp(),
        status: 'new',
      })
      setDone(true)
    } catch (e) {
      console.error('Lead submission failed:', e)
      setErr(e?.message || 'Something went wrong. Please try emailing hello@mediamindai.com directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(11, 11, 11, 0.78)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '40px 16px', overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0E0E0E', borderRadius: 16, width: '100%', maxWidth: 600,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 30px 100px rgba(0,0,0,0.5)',
          color: '#F5F1EA',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 26px', borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#c8ff00', fontWeight: 600,
            }}>
              Let's get you cited
            </div>
            <div style={{
              fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: 22,
              marginTop: 4, letterSpacing: '-0.02em', color: 'white',
            }}>
              Tell us where you stand.
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer', padding: 6,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        {done ? (
          <div style={{ padding: '60px 32px', textAlign: 'center' }}>
            <CheckCircle2 size={48} style={{ color: '#c8ff00', marginBottom: 18 }} />
            <h3 style={{
              fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: 24,
              margin: '0 0 10px', color: 'white',
            }}>
              Got it. We'll be in touch.
            </h3>
            <p style={{
              fontSize: 14, lineHeight: 1.6, color: 'rgba(245,241,234,0.7)',
              maxWidth: 380, margin: '0 auto 24px',
            }}>
              Lawrence or someone from the team will reach out at <strong style={{ color: 'white' }}>{form.email}</strong> within 24 hours. If urgent, call <strong style={{ color: 'white' }}>(629) 777-6155</strong>.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '10px 24px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6,
                color: 'white', fontFamily: '"Syne", sans-serif', fontWeight: 600,
                fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding: '24px 26px 28px' }}>
            {/* Honeypot — hidden from humans, bots fill it */}
            <div style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <Field label="Your name *">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Smith"
                  style={inputStyle}
                />
              </Field>
              <Field label="Company *">
                <input
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Acme, Inc."
                  style={inputStyle}
                />
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12, marginBottom: 16 }}>
              <Field label="Email *">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@acme.com"
                  style={inputStyle}
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(555) 555-5555"
                  style={inputStyle}
                />
              </Field>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(245,241,234,0.55)', fontWeight: 600, marginBottom: 8,
              }}>
                What are you looking for? (select any)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {interests.map((i) => {
                  const sel = form.interests.includes(i.id)
                  return (
                    <button
                      key={i.id}
                      type="button"
                      onClick={() => toggleInterest(i.id)}
                      style={{
                        padding: '7px 12px', borderRadius: 6,
                        border: sel ? '1px solid #c8ff00' : '1px solid rgba(255,255,255,0.15)',
                        background: sel ? 'rgba(200,255,0,0.12)' : 'transparent',
                        color: sel ? '#c8ff00' : 'rgba(245,241,234,0.7)',
                        fontFamily: '"Inter", system-ui, sans-serif', fontSize: 12, fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 160ms ease',
                      }}
                    >
                      {i.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <Field label="Tell us more (optional)" style={{ marginBottom: 16 }}>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What's the situation? Where are you stuck? What outcome would make this a win?"
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: '"Inter", system-ui, sans-serif' }}
              />
            </Field>

            {err && (
              <div style={{
                padding: '10px 14px', marginBottom: 14,
                background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)',
                borderRadius: 6, color: '#FCA5A5', fontSize: 13,
              }}>
                {err}
              </div>
            )}

            <div style={{
              display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
              <div style={{
                fontSize: 11, color: 'rgba(245,241,234,0.5)', fontFamily: '"Inter", system-ui, sans-serif',
              }}>
                We respond within 24 hours · No spam, ever.
              </div>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 22px', background: '#c8ff00', color: '#0B0B0B',
                  border: 'none', borderRadius: 6,
                  fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: 12,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  cursor: submitting ? 'default' : 'pointer',
                  opacity: submitting ? 0.6 : 1,
                  boxShadow: '0 8px 24px rgba(200,255,0,0.2)',
                  transition: 'all 160ms ease',
                }}
              >
                {submitting ? (
                  <><Loader2 size={14} className="animate-spin" /> Sending…</>
                ) : (
                  <>Send · Start the conversation <Send size={14} /></>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({ label, children, style }) {
  return (
    <label style={{ display: 'block', ...style }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(245,241,234,0.55)', fontWeight: 600, marginBottom: 6,
      }}>
        {label}
      </div>
      {children}
    </label>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 6,
  color: 'white',
  fontFamily: '"Inter", system-ui, sans-serif',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
}
