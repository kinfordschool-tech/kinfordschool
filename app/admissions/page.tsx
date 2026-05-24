'use client'
import { useState } from 'react'
import Reveal from '@/components/Reveal'

const features = [
  'CA / CMA Guidance', 'Structured Assessment', 'Expert Talks',
  'Individual Mentoring', 'Career Oriented Guidance', 'Creative Sessions',
  'Language Lab', 'Digital Learning',
]

export default function Admissions() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({ name: '', parent: '', email: '', phone: '', grade: '', gender: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          parent_name: form.parent,
          email: form.email,
          phone: form.phone,
          grade: form.grade,
          gender: form.gender,
          message: form.message
        })
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Submission error:', result.error || 'Unknown error')
        setErrorMessage(result.error || 'Failed to submit enquiry. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch (err: any) {
      console.error('Submission failed:', err)
      setErrorMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      <section className="mobile-hero-padding" style={{ minHeight: '55vh', background: '#1E1E1E', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px 6vw 60px', position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', right: -60, bottom: -80, width: 500, opacity: 0.05 }} viewBox="0 0 500 400" fill="none">
          <path d="M50 400 C50 150 450 150 450 400" fill="#A0163B" />
        </svg>
        <Reveal>
          <div style={{ display: 'inline-block', background: '#A0163B', color: '#fff', padding: '6px 16px', borderRadius: 50, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            Admissions Open for Plus One Commerce
          </div>
          <h1 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, maxWidth: 700 }}>
            Secure your child's<br />place at Kinford.
          </h1>
          <p style={{ fontSize: 14, color: '#F5B800', marginTop: 16, fontWeight: 500 }}>Limited seats. Admissions closing soon.</p>
        </Reveal>
      </section>

      {/* FEATURES */}
      <section style={{ background: '#f8f6f2', padding: '80px 6vw' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>What you get at Kinford.</h2>
        </Reveal>
        <div className="chips-grid-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ padding: '16px 18px', background: '#fff', borderRadius: 10, border: '1px solid #eee', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A0163B', flexShrink: 0 }} />
                {f}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section style={{ background: '#fff', padding: '100px 6vw' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Begin your enquiry.</h2>
            <p style={{ fontSize: 15, color: '#888', marginBottom: 40 }}>We'll get back to you within 24 hours.</p>
          </Reveal>

          {submitted ? (
            <Reveal>
              <div style={{ background: '#f8f6f2', borderRadius: 16, padding: '48px', textAlign: 'center', border: '1px solid #eee' }}>
                <p style={{ fontSize: 32, marginBottom: 16 }}>✅</p>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Enquiry received!</h3>
                <p style={{ color: '#888' }}>We'll contact you within 24 hours. Welcome to the Kinford community.</p>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'name', label: "Student's full name", type: 'text', placeholder: 'e.g. Mohammed Arshad' },
                { key: 'parent', label: "Parent / guardian name", type: 'text', placeholder: 'e.g. Abdul Rahman' },
                { key: 'email', label: "Parent email address", type: 'email', placeholder: 'e.g. parent@example.com' },
                { key: 'phone', label: 'Phone number', type: 'tel', placeholder: '+91 98765 43210' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: 13, color: '#888', display: 'block', marginBottom: 6 }}>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15, fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => (e.target.style.borderColor = '#A0163B')}
                    onBlur={e => (e.target.style.borderColor = '#ddd')}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 13, color: '#888', display: 'block', marginBottom: 6 }}>Gender</label>
                <select
                  required
                  value={form.gender}
                  onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15, fontFamily: 'inherit', outline: 'none', background: '#fff' }}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#888', display: 'block', marginBottom: 6 }}>Grade applying for</label>
                <select
                  required
                  value={form.grade}
                  onChange={e => setForm(f => ({ ...f, grade: e.target.value }))}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15, fontFamily: 'inherit', outline: 'none', background: '#fff' }}
                >
                  <option value="">Select grade</option>
                  <option value="XI (Plus One Commerce)">XI (Plus One Commerce)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#888', display: 'block', marginBottom: 6 }}>Message (optional)</label>
                <textarea
                  placeholder="Any questions or things you'd like us to know..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={4}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15, fontFamily: 'inherit', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = '#A0163B')}
                  onBlur={e => (e.target.style.borderColor = '#ddd')}
                />
              </div>
              {errorMessage && (
                <div style={{ color: '#A0163B', background: '#fdf3f5', border: '1px solid #f5c2c7', padding: '12px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, textAlign: 'center' }}>
                  {errorMessage}
                </div>
              )}
              <div className="mobile-stack-buttons">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ background: isSubmitting ? '#ccc' : '#A0163B', color: '#fff', padding: '16px 32px', borderRadius: 50, fontSize: 15, fontWeight: 700, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: 8, transition: 'background 0.2s' }}
                  onMouseEnter={e => !isSubmitting && (e.currentTarget.style.background = '#7a1030')}
                  onMouseLeave={e => !isSubmitting && (e.currentTarget.style.background = '#A0163B')}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry →'}
                </button>
              </div>
              <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center' }}>We respect your privacy. Your details will not be shared.</p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
