import Link from 'next/link'
import Reveal from '@/components/Reveal'

const values = [
  { title: 'Connection', body: 'Built by three classmates who believed in the power of human bonds and shared purpose.' },
  { title: 'Belonging', body: 'Every student is known by name, by dream, by struggle — no one is just a roll number here.' },
  { title: 'Growth', body: 'Holistic development — academic, personal, spiritual. We nurture the whole person.' },
  { title: 'Purpose', body: 'We help students discover not just what to study, but who to become.' },
]

export default function About() {
  return (
    <main>
      {/* HEADER */}
      <section className="mobile-hero-padding" style={{ minHeight: '60vh', background: '#1E1E1E', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px 6vw 60px', position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', right: -80, top: -80, width: 500, opacity: 0.05 }} viewBox="0 0 500 400" fill="none">
          <path d="M100 400 C100 150 400 150 400 400" fill="#A0163B" />
        </svg>
        <Reveal>
          <p style={{ fontSize: 11, color: '#F5B800', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Our Story</p>
          <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, maxWidth: 700 }}>
            Built on friendship.<br />Guided by purpose.
          </h1>
        </Reveal>
      </section>

      {/* FOUNDING STORY */}
      <section style={{ background: '#fff', padding: '100px 6vw' }}>
        <div className="about-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <Reveal>
            <p style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 300, lineHeight: 1.8, color: '#333' }}>
              Kinford was founded with a vision to create a modern learning environment where academics, discipline, creativity, and leadership grow together.
            </p>
            <p style={{ fontSize: 16, color: '#888', lineHeight: 1.9, marginTop: 24 }}>
              Three classmates from different backgrounds came together on the Malabar coast with one shared dream — to build a school that represents the meeting point of journeys, ideas, and futures.
            </p>
            <p style={{ fontSize: 16, color: '#888', lineHeight: 1.9, marginTop: 16 }}>
              With a strong focus on holistic development, Kinford is designed to guide students beyond academics — into leadership, lifelong relationships, and a modern learning environment.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ background: '#1E1E1E', borderRadius: 20, padding: '40px 36px' }}>
              <p style={{ fontSize: 11, color: '#F5B800', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>Our Mission</p>
              <p style={{ fontSize: 20, fontWeight: 500, color: '#fff', lineHeight: 1.7 }}>
                "Education goes beyond classrooms. We focus on character, communication, innovation, and practical learning to help students grow into confident and future-ready individuals."
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CORE VALUES */}
      <section style={{ background: '#f8f6f2', padding: '100px 6vw' }}>
        <Reveal>
          <p style={{ fontSize: 11, color: '#A0163B', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 24, height: 2, background: '#A0163B', display: 'block' }} />
            Core Values
          </p>
          <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 60 }}>
            What we stand for.
          </h2>
        </Reveal>
        <div className="values-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ padding: '32px 28px', background: '#fff', borderRadius: 16, border: '1px solid #eee' }}>
                <p style={{ fontSize: 11, color: '#F5B800', fontWeight: 600, letterSpacing: '0.15em', marginBottom: 16 }}>0{i + 1}</p>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.01em' }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.8 }}>{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#A0163B', padding: '80px 6vw', textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
            We admit a small number of students each year.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', marginBottom: 32 }}>This is how to begin.</p>
          <div className="mobile-stack-buttons">
            <Link href="/admissions" style={{ background: '#F5B800', color: '#1E1E1E', padding: '14px 36px', borderRadius: 50, fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
              View Admissions →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
