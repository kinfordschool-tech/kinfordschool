'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Values', href: '/values' },
  { label: 'Residential', href: '/residential' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Contact', href: '/contact' },
]

export default function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
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
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', padding: '2px 10px 2px 4px', borderRight: '1px solid rgba(255,255,255,0.08)', marginRight: 4 }}>
        <img src="/kinford-logo.png" alt="Kinford" style={{ height: 30, width: 'auto' }} />
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
  )
}
