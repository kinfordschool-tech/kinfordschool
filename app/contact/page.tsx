import Reveal from '@/components/Reveal'

export default function Contact() {
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
                { label: 'Phone', value: '+91 7025116441', sub: 'Mon–Sat, 9am–5pm' },
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
              <form style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Your name', placeholder: 'Full name', type: 'text' },
                  { label: 'Phone / Email', placeholder: '+91 or email', type: 'text' },
                ].map((f, i) => (
                  <div key={i}>
                    <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#fff' }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 6 }}>Message</label>
                  <textarea rows={4} placeholder="How can we help?" style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', background: '#fff' }} />
                </div>
                <div className="mobile-stack-buttons">
                  <button type="submit" style={{ background: '#1E1E1E', color: '#fff', padding: '14px', borderRadius: 10, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                    Send Message →
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
