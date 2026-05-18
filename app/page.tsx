'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

const rotatingLines = [
  'Where knowledge meets character.',
  'Built on friendship. Guided by purpose.',
  'Guiding futures beyond academics.',
  'A school that shapes who you become.',
]

const whyKinford = [
  { num: '01', title: 'Premium Residential Life', body: 'Safe, structured, and inspiring. Students live, learn, and grow together in a community built around discipline and care.' },
  { num: '02', title: 'Beyond the Classroom', body: 'From AI programs to entrepreneurship clubs — we prepare students for the real world, not just exams.' },
  { num: '03', title: 'Islamic Values at the Core', body: "Every aspect of Kinford's environment is shaped by strong moral and Islamic principles. Faith and education, together." },
  { num: '04', title: 'Individual Mentorship', body: 'Every student gets personal guidance. Teachers who know their names, their dreams, and their struggles.' },
  { num: '05', title: 'Future-Ready Skills', body: 'Digital marketing, content creation, web development, AI — real skills for the world your child will enter.' },
  { num: '06', title: 'Structured Academic Excellence', body: 'Focused Plus One Commerce program with CA/CMA guidance, language lab, and career-oriented support for every student.' },
]

const skills = [
  'Public speaking', 'Educational trips', 'Sports & fitness',
  'Entrepreneurship clubs', 'Arts & cultural programs', 'Leadership camps',
  'Media & content creation', 'Communication training',
]

const skillIcons = [
  '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
  '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  '<line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14z"/>',
  '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
  '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="2" y1="17" x2="7" y2="17"/>',
  '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
]

const futureSkills = [
  { title: 'Digital Marketing' },
  { title: 'Content Creation' },
  { title: 'Videography & Photography' },
  { title: 'Web Development' },
  { title: 'AI Program' },
  { title: 'Entrepreneurship' },
]

const futureSkillIcons = [
  '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
  '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
]

export default function Home() {
  const [lineIndex, setLineIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => { setLineIndex(i => (i + 1) % rotatingLines.length); setFade(true) }, 400)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <main>
      {/* HERO */}
      <section className="mobile-hero-padding" style={{ minHeight: '100vh', background: '#1E1E1E', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '0 6vw' }}>
        {/* Arch watermark */}
        <svg style={{ position: 'absolute', bottom: -80, left: '50%', transform: 'translateX(-50%)', width: 700, opacity: 0.04 }} viewBox="0 0 700 350" fill="none">
          <path d="M0 350 C0 150 700 150 700 350" fill="#A0163B" />
        </svg>

        <div style={{ textAlign: 'center', zIndex: 2, animation: 'fadeUp 1s ease forwards', opacity: 0 }}
          className="animate-hero mobile-full-width">
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.animate-hero{animation:fadeUp 1s ease forwards}`}</style>

          <img
            src="/kinford-logo.png"
            alt="Kinford School of Guidance"
            style={{ width: 'clamp(140px, 18vw, 220px)', display: 'block', margin: '0 auto' }}
          />

          <div style={{ marginTop: 40, minHeight: 36, transition: 'opacity 0.4s', opacity: fade ? 1 : 0 }}>
            <p style={{ fontSize: 'clamp(16px,2.5vw,26px)', fontWeight: 300, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.01em' }}>
              {rotatingLines[lineIndex]}
            </p>
          </div>

          <div className="mobile-stack-buttons" style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/admissions" style={{ background: '#F5B800', color: '#1E1E1E', padding: '14px 32px', borderRadius: 50, fontSize: 14, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.02em' }}>
              Begin Your Journey →
            </Link>
            <Link href="/about" style={{ border: '1.5px solid rgba(255,255,255,0.25)', color: 'white', padding: '14px 32px', borderRadius: 50, fontSize: 14, fontWeight: 400, textDecoration: 'none' }}>
              Our Story
            </Link>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.25)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'center' }}>
          Scroll to explore
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.15)', margin: '10px auto 0' }} />
        </div>
      </section>

      {/* WHY KINFORD */}
      <section style={{ background: '#fff', padding: '100px 6vw' }}>
        <Reveal>
          <p className="section-label" style={{ color: '#A0163B' }}>Why Kinford</p>
          <h2 style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 60, maxWidth: 600 }}>
            Six reasons parents choose us.
          </h2>
        </Reveal>
        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#eee' }}>
          {whyKinford.map((w, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ background: '#fff', padding: '40px 32px', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                <p style={{ fontSize: 11, color: '#F5B800', fontWeight: 600, letterSpacing: '0.15em', marginBottom: 16 }}>{w.num}</p>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>{w.title}</h3>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.8 }}>{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEYOND CLASSROOM */}
      <section style={{ background: '#1E1E1E', padding: '100px 6vw' }}>
        <div className="beyond-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <Reveal>
            <p className="section-label" style={{ color: '#F5B800' }}>Beyond Classroom</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20 }}>
              Skills for life,<br />not just marks.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
              Education at Kinford goes far beyond textbooks. We build students who can speak, lead, create, and innovate.
            </p>
          </Reveal>
          <div>
            {skills.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: 16, color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${skillIcons[i]}</svg>` }} />
                  {s}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDING FUTURES */}
      <section style={{ background: '#A0163B', padding: '100px 6vw' }}>
        <Reveal>
          <p className="section-label" style={{ color: '#F5B800' }}>Guiding Futures</p>
          <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>
            Beyond academics.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            We teach students the skills the modern world demands — digital, creative, and entrepreneurial.
          </p>
        </Reveal>
        <div className="futures-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {futureSkills.map((f, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: '28px 24px', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span style={{ display: 'block', marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${futureSkillIcons[i]}</svg>` }} />
                <p style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{f.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ISLAMIC VALUES TEASER */}
      <section style={{ background: '#fff', padding: '100px 6vw' }}>
        <div className="islamic-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <Reveal>
            <p className="section-label dark-label">Guided with Values</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20 }}>
              Faith and education,<br />together.
            </h2>
            <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8, marginBottom: 32 }}>
              Kinford integrates a strong Islamic moral foundation into everyday school life — building not just students, but people of character.
            </p>
            <Link href="/values" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#A0163B', color: '#fff', padding: '12px 28px', borderRadius: 50, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              See our values →
            </Link>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {["Qur'an Studies", "Fiqh — Islamic Jurisprudence", "Aqeedah — Islamic Theology", "Islamic History", "Islam in the Modern World", "Islamic Finance"].map((v, i) => (
                <div key={i} style={{ padding: '14px 20px', background: '#f8f6f2', borderRadius: 10, fontSize: 14, fontWeight: 500, color: '#333', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A0163B', flexShrink: 0 }} />
                  {v}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: '#1E1E1E', padding: '100px 6vw', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', width: 600, opacity: 0.05 }} viewBox="0 0 600 300" fill="none">
          <path d="M0 300 C0 120 600 120 600 300" fill="#A0163B" />
        </svg>
        <Reveal>
          <p style={{ fontSize: 12, color: '#F5B800', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>Admissions Open</p>
          <h2 style={{ fontSize: 'clamp(28px,5vw,56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 20, maxWidth: 600, margin: '0 auto 20px' }}>
            Your child's future starts with one conversation.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>Limited seats — Plus One Commerce. Admissions closing soon.</p>
          <div className="mobile-stack-buttons">
            <Link href="/admissions" style={{ background: '#F5B800', color: '#1E1E1E', padding: '16px 40px', borderRadius: 50, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
              Enquire Now →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
