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

      <section style={{ background: '#fff', padding: '100px 6vw' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .gallery-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
          }
          @media (min-width: 768px) {
            .gallery-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}} />

        <div className="gallery-grid">
          {/* Card 1: School Campus */}
          <Reveal>
            <div style={{ background: '#f8f6f2', borderRadius: 24, padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.03)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ overflow: 'hidden', borderRadius: 16, marginBottom: 24, aspectRatio: '4/3' }}>
                <img
                  src="/kinford-campus.jpg"
                  alt="Kinford School of Guidance Campus"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '0 8px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 11, color: '#A0163B', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>School Campus</span>
                  <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>Scenic Lush Campus</h3>
                  <p style={{ fontSize: 15, color: '#666', lineHeight: 1.8 }}>
                    Our premium residential facility is nestled in the serene and peaceful green hills of Kozhikode, providing a focused, healthy environment for growth and learning.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Interactive Study Circle */}
          <Reveal delay={150}>
            <div style={{ background: '#f8f6f2', borderRadius: 24, padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.03)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ overflow: 'hidden', borderRadius: 16, marginBottom: 24, aspectRatio: '4/3' }}>
                <img
                  src="/islamic-studies-class.png"
                  alt="Islamic Studies and Qur'an Study Circle at Kinford"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '0 8px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 11, color: '#A0163B', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Interactive Study Circle</span>
                  <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>Faith & Learning in Action</h3>
                  <p style={{ fontSize: 15, color: '#666', lineHeight: 1.8 }}>
                    Our students engage in regular, collaborative study circles blending modern academic pursuits with guidance, morals, and core Islamic studies.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
