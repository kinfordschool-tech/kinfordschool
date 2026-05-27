'use client'
import { useState } from 'react'
import Reveal from '@/components/Reveal'

export default function Contact() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message }),
      })

      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setName('')
        setContact('')
        setMessage('')
      } else {
        setError(data.error || 'Failed to send message.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <section className="mobile-hero-padding" style={{ minHeight: '45vh', background: '#1E1E1E', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px 6vw 60px' }}>
        <Reveal>
          <p style={{ fontSize: 11, color: '#F5B800', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Contact</p>
          <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Get in touch.
          </h1>
        </Reveal>
      </section>

      <section style={{ background: '#fff', padding: '100px 6vw' }}>
        <div className="contact-grid-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                { label: 'Phone', value: '+91 6235774224', sub: 'Mon–Sat, 9am–5pm' },
                { label: 'Address', value: 'Thamarassery, Kozhikode', sub: 'Kerala, India' },
                { label: 'Instagram', value: '@kinfordschool', sub: 'Follow us for updates' },
              ].map((c, i) => (
                <div key={i} style={{ paddingBottom: 32, borderBottom: '1px solid #eee' }}>
                  <p style={{ fontSize: 11, color: '#A0163B', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>{c.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>{c.value}</p>
                  <p style={{ fontSize: 14, color: '#888', marginTop: 4 }}>{c.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ background: '#f8f6f2', borderRadius: 20, padding: '40px 36px' }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Send a message</h3>
              
              {success && (
                <div style={{ background: 'rgba(16,185,129,0.15)', color: '#059669', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, padding: '12px 16px', fontSize: 14, fontWeight: 500, marginBottom: 20 }}>
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.15)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', fontSize: 14, fontWeight: 500, marginBottom: 20 }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>Your name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>Phone / Email</label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+91 or email"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', background: '#fff' }}
                  />
                </div>

                <div className="mobile-stack-buttons">
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ background: '#1E1E1E', color: '#fff', padding: '14px', borderRadius: 10, fontSize: 14, fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? 'Sending...' : 'Send Message →'}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
