'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const rotatingLines = [
  'Where knowledge meets character.',
  'Built on friendship. Guided by purpose.',
  'Guiding futures beyond academics.',
  'A school that shapes who you become.',
]

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setLineIndex((i) => (i + 1) % rotatingLines.length)
        setFade(true)
      }, 400)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="mobile-hero-padding"
      style={{
        minHeight: '100vh',
        background: '#1E1E1E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 6vw',
      }}
    >
      {/* Arch watermark */}
      <svg
        style={{
          position: 'absolute',
          bottom: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          opacity: 0.05,
        }}
        viewBox="0 0 700 350"
        fill="none"
      >
        <path d="M0 350 C0 150 700 150 700 350" fill="#A0163B" />
      </svg>

      {/* YouTube Background Video */}
      <div
        className="hero-video"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '130%',
          height: '130%',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/-XOXyX_Pz_Q?autoplay=1&mute=1&loop=1&playlist=-XOXyX_Pz_Q&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&color=white&playsinline=1"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            pointerEvents: 'none',
          }}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
        />
      </div>

      {/* Dark Overlay */}
      <div
        className="hero-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.68)',
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />

      {/* Centered Hero Content */}
      <div
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 11,
          animation: 'fadeUp 1s ease forwards',
          opacity: 0,
        }}
        className="animate-hero mobile-full-width"
      >
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.animate-hero{animation:fadeUp 1s ease forwards}`}</style>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <img
            src="/kinford-logo.png"
            alt="Kinford School of Guidance"
            style={{ width: 'clamp(140px, 18vw, 220px)', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: 40, minHeight: 36, transition: 'opacity 0.4s', opacity: fade ? 1 : 0 }}>
          <p style={{ fontSize: 'clamp(16px,2.5vw,26px)', fontWeight: 300, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.01em' }}>
            {rotatingLines[lineIndex]}
          </p>
        </div>

        <div className="mobile-stack-buttons" style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/admissions" style={{ background: '#F5B800', color: '#1E1E1E', padding: '14px 32px', borderRadius: 50, fontSize: 14, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.02em' }}>
            Begin Your Journey →
          </Link>
          <Link href="/about" style={{ border: '1.5px solid #ffffff', color: '#ffffff', padding: '14px 32px', borderRadius: 50, fontSize: 14, fontWeight: 400, textDecoration: 'none' }}>
            Our Story
          </Link>
        </div>
      </div>

      {/* Transparent Blocking Div */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          background: 'transparent',
          cursor: 'default',
        }}
      />
    </section>
  )
}
