import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#1E1E1E', color: 'white', padding: '60px 6vw 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 60, marginBottom: 48 }}>
        <div>
          <img src="/kinford-logo.png" alt="Kinford School of Guidance" style={{ width: 120, display: 'block' }} />
          <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 280 }}>
            A premium residential school built on friendship, guided by purpose. Thamarassery, Kozhikode, Kerala.
          </p>
          <p style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Plus One Commerce</p>
          <div style={{ marginTop: 20, display: 'flex', gap: 16 }}>
            <a href="https://instagram.com/kinfordschool" target="_blank" rel="noopener" style={{ fontSize: 13, color: '#F5B800', textDecoration: 'none' }}>@kinfordschool</a>
          </div>
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 16 }}>Pages</p>
          {['/', '/about', '/academics', '/values', '/residential', '/admissions', '/contact'].map((href, i) => (
            <Link key={href} href={href} style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}>
              {['Home', 'About', 'Academics', 'Values', 'Residential', 'Admissions', 'Contact'][i]}
            </Link>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 16 }}>Contact</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9 }}>
            +91 7025116441<br />
            Thamarassery<br />
            Kozhikode, Kerala
          </p>
          <Link href="/admissions" style={{ display: 'inline-block', marginTop: 20, background: '#A0163B', color: 'white', padding: '10px 20px', borderRadius: 50, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
            Apply Now →
          </Link>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2026 Kinford School of Guidance. All rights reserved.</p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Thamarassery, Kozhikode, Kerala</p>
      </div>
    </footer>
  )
}
