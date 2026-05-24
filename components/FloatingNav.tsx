'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Contact', href: '/contact' },
]

export default function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Desktop Floating Pill Nav */}
      <nav
        className="hidden md:flex"
        style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: `translateX(-50%) translateY(${visible ? '0' : '-120px'})`,
          transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
          zIndex: 1000,
          background: '#1E1E1E',
          borderRadius: 60,
          padding: '6px 8px',
          alignItems: 'center',
          gap: 2,
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', padding: '2px 10px 2px 4px', borderRight: '1px solid rgba(255,255,255,0.08)', marginRight: 4 }}>
          <img src="/kinford-icon.jpg" alt="Kinford" style={{ height: 30, width: 30, borderRadius: '6px', objectFit: 'cover' }} />
        </Link>
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                position: 'relative',
                padding: '8px 16px',
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 500,
                color: active ? '#1E1E1E' : 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                background: active ? '#F5B800' : 'transparent',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile Fixed Top Bar */}
      <header
        className="flex md:hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          background: '#1E1E1E',
          zIndex: 1000,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/kinford-icon.jpg" alt="Kinford" style={{ height: 30, width: 30, borderRadius: '6px', objectFit: 'cover' }} />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <span style={{ width: 22, height: 1.5, background: '#fff', borderRadius: 2 }} />
          <span style={{ width: 22, height: 1.5, background: '#fff', borderRadius: 2 }} />
          <span style={{ width: 22, height: 1.5, background: '#fff', borderRadius: 2 }} />
        </button>
      </header>

      {/* Mobile Full Screen Menu Overlay */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100vw',
          height: '100vh',
          background: '#1E1E1E',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateX(${mobileMenuOpen ? '0' : '100%'})`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute',
            top: 16,
            right: 20,
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 28,
            cursor: 'pointer',
            padding: 4,
          }}
        >
          ✕
        </button>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, textAlign: 'center' }}>
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: active ? '#F5B800' : '#ffffff',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Action Button */}
        <Link
          href="/admissions"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'absolute',
            bottom: 60,
            background: '#A0163B',
            color: '#fff',
            padding: '16px 40px',
            borderRadius: 50,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(160,22,59,0.3)',
          }}
        >
          Begin Your Journey →
        </Link>
      </div>
    </>
  )
}
