import Reveal from '@/components/Reveal'

const subjects = [
  { title: "Qur'an Studies", body: "Deep engagement with the Qur'an — reading, understanding, and living its guidance." },
  { title: 'Fiqh', body: 'Islamic Jurisprudence — understanding the rules and reasoning behind Islamic practice.' },
  { title: 'Aqeedah', body: 'Islamic Theology — building a firm, reasoned foundation of faith and belief.' },
  { title: 'Islamic History', body: 'The story of Islam from its origins to the modern world — context and civilization.' },
  { title: 'Islam in the Modern World', body: 'How Islamic principles navigate contemporary challenges in society, technology, and life.' },
  { title: 'Islamic Finance', body: 'The ethics and structure of Islamic economic and financial principles.' },
]

export default function Values() {
  return (
    <main>
      <section className="mobile-hero-padding" style={{ minHeight: '60vh', background: '#1E1E1E', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px 6vw 60px', position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', right: -100, bottom: -100, width: 500, opacity: 0.06 }} viewBox="0 0 500 400" fill="none">
          <path d="M50 400 C50 150 450 150 450 400" fill="#A0163B" />
        </svg>
        <Reveal>
          <p style={{ fontSize: 11, color: '#F5B800', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Guided with Values</p>
          <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, maxWidth: 700 }}>
            Faith and education,<br />together.
          </h1>
        </Reveal>
      </section>

      <section style={{ background: '#fff', padding: '100px 6vw' }}>
        <Reveal>
          <p style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.8, color: '#555', maxWidth: 640, marginBottom: 60 }}>
            Kinford helps students develop a strong moral Islamic foundation — not as an addition to education, but as its foundation. Every aspect of school life is shaped by values of honesty, discipline, compassion, and purpose.
          </p>
        </Reveal>
        <div className="subjects-grid-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#eee' }}>
          {subjects.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ background: '#fff', padding: '36px 28px' }}>
                <p style={{ fontSize: 11, color: '#A0163B', fontWeight: 600, letterSpacing: '0.15em', marginBottom: 14 }}>0{i + 1}</p>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.8 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ background: '#A0163B', padding: '80px 6vw', textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', maxWidth: 600, margin: '0 auto 16px' }}>
            "We build not just students, but people of character."
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>— Kinford School of Guidance</p>
        </Reveal>
      </section>
    </main>
  )
}
