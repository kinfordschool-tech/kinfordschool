'use client'
import Reveal from '@/components/Reveal'

export default function Gallery() {
  return (
    <main>
      <section className="mobile-hero-padding" style={{ minHeight: '45vh', background: '#1E1E1E', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px 6vw 60px' }}>
        <Reveal>
          <p style={{ fontSize: 11, color: '#F5B800', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Life at Kinford</p>
          <h1 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Our Gallery.
          </h1>
        </Reveal>
      </section>

      <section style={{ background: '#fff', padding: '100px 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>
          <Reveal>
            <div style={{ background: '#f8f6f2', borderRadius: 24, padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.03)' }}>
              <div style={{ overflow: 'hidden', borderRadius: 16, marginBottom: 24 }}>
                <img
                  src="/islamic-studies-class.png"
                  alt="Islamic Studies and Qur'an Study Circle at Kinford"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{ padding: '0 8px' }}>
                <span style={{ fontSize: 11, color: '#A0163B', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Interactive Study Circle</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>Faith & Learning in Action</h3>
                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.8 }}>
                  Our students engage in regular, collaborative study circles blending modern academic pursuits with guidance, morals, and core Islamic studies.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
