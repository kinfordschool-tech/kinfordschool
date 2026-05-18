import Link from 'next/link'
import Reveal from '@/components/Reveal'

const plusOneFeatures = [
  'CA / CMA Guidance', 'Structured Assessment', 'Expert Talks', 'Individual Mentoring',
  'Career Oriented Guidance', 'Creative Sessions', 'Language Lab', 'Digital Learning',
]

export default function Academics() {
  return (
    <main>
      <section className="mobile-hero-padding" style={{ minHeight: '55vh', background: '#1E1E1E', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px 6vw 60px' }}>
        <Reveal>
          <p style={{ fontSize: 11, color: '#F5B800', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Academics</p>
          <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, maxWidth: 700 }}>
            Serious academics.<br />Serious futures.
          </h1>
        </Reveal>
      </section>

      {/* PLUS ONE */}
      <section style={{ background: '#1E1E1E', padding: '100px 6vw' }}>
        <div className="about-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <Reveal>
            <p style={{ fontSize: 11, color: '#F5B800', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Admissions Open</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20 }}>
              Plus One<br />Commerce
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 32 }}>
              A structured, mentorship-driven commerce program with clear pathways to CA, CMA, and beyond.
            </p>
            <div className="mobile-stack-buttons">
              <Link href="/admissions" style={{ background: '#F5B800', color: '#1E1E1E', padding: '12px 28px', borderRadius: 50, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
                Apply for Plus One →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="plus-one-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {plusOneFeatures.map((f, i) => (
                <div key={i} style={{ padding: '16px 18px', background: 'rgba(255,255,255,0.06)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F5B800', flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
