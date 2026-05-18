import Link from 'next/link'
import Reveal from '@/components/Reveal'

const facilities = [
  { icon: '🏠', title: 'Safe & Secure Accommodation', body: 'Comfortable, supervised dormitories where students feel at home and safe.' },
  { icon: '🍽️', title: 'Nutritious Food', body: 'Balanced, healthy meals prepared daily — fuel for learning and growing.' },
  { icon: '🎨', title: 'Creative Lounge', body: 'A dedicated space for creation, collaboration, and creative thinking outside the classroom.' },
  { icon: '📚', title: 'Study-Focused Atmosphere', body: 'Structured study hours, quiet zones, and academic support built into daily life.' },
  { icon: '🤝', title: 'Individual Mentorship', body: 'Every student is personally mentored — academically, personally, and spiritually.' },
  { icon: '🕌', title: 'Prayer & Reflection Spaces', body: 'Dedicated spaces for salah, reflection, and spiritual grounding throughout the day.' },
]

export default function Residential() {
  return (
    <main>
      <section className="mobile-hero-padding" style={{ minHeight: '55vh', background: '#1E1E1E', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px 6vw 60px' }}>
        <Reveal>
          <p style={{ fontSize: 11, color: '#F5B800', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Residential Life</p>
          <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, maxWidth: 700 }}>
            Home away<br />from home.
          </h1>
        </Reveal>
      </section>

      <section style={{ background: '#fff', padding: '100px 6vw' }}>
        <Reveal>
          <p style={{ fontSize: 18, fontWeight: 300, color: '#555', lineHeight: 1.8, maxWidth: 600, marginBottom: 60 }}>
            Kinford provides a secure, comfortable, and growth-focused residential environment where students learn independence, discipline, and collaboration — together.
          </p>
        </Reveal>
        <div className="facilities-grid-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {facilities.map((f, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: '36px 28px', background: '#f8f6f2', borderRadius: 16 }}>
                <p style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</p>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.8 }}>{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ background: '#F5B800', padding: '80px 6vw', textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#1E1E1E', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Come and see the school in motion.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(30,30,30,0.6)', marginBottom: 32 }}>Visit us at Thamarassery, Kozhikode.</p>
          <div className="mobile-stack-buttons">
            <Link href="/contact" style={{ background: '#1E1E1E', color: '#fff', padding: '14px 36px', borderRadius: 50, fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
              Get in Touch →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
