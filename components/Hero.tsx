'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const reels = [
  'DaQQiT5y2XH',
  'Dac72NrSL1I',
  'DZuxlKWSXjz',
  'Dc0nAVby3xT',
]

export default function Hero() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Fade out current embed
      setFade(false)
      setTimeout(() => {
        // 2. Advance to next reel index and loop back
        setCurrentReelIndex((prev) => (prev + 1) % reels.length)
        // 3. Fade in next embed
        setFade(true)
      }, 400)
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className="hero-section mobile-hero-padding"
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '120px 6vw 80px',
        boxSizing: 'border-box',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          gap: 60px;
        }

        .hero-left {
          flex: 0 0 55%;
          max-width: 55%;
        }

        .hero-right {
          flex: 0 0 45%;
          max-width: 45%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .reel-wrapper {
          position: relative;
          width: 100%;
          max-width: 420px;
          height: 600px;
          overflow: hidden;
          border-radius: 20px;
          background: #1E1E1E;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.14);
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: opacity 0.4s ease;
        }

        .reel-wrapper iframe {
          position: absolute;
          top: -80px;
          left: -1px;
          width: calc(100% + 2px);
          height: calc(100% + 180px);
          border: none;
          pointer-events: auto;
        }

        .stat-pills-row {
          display: flex;
          gap: 10px;
          margin-top: 36px;
          flex-wrap: wrap;
          align-items: center;
        }

        .stat-pill {
          background: #F5F5F5;
          color: #4A4A4A;
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          border: 1px solid rgba(0, 0, 0, 0.05);
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }

        @media (max-width: 992px) {
          .hero-container {
            flex-direction: column;
            gap: 48px;
            text-align: left;
          }

          .hero-left {
            flex: 0 0 100%;
            max-width: 100%;
          }

          .hero-right {
            flex: 0 0 100%;
            max-width: 100%;
            width: 100%;
          }

          .reel-wrapper {
            max-width: 380px;
          }
        }

        @media (max-width: 640px) {
          .stat-pills-row {
            gap: 8px;
          }

          .stat-pill {
            font-size: 12px;
            padding: 6px 14px;
          }

          .reel-wrapper {
            height: 520px;
          }

          .reel-wrapper iframe {
            top: -70px;
            height: calc(100% + 160px);
          }
        }
      `}} />

      <div className="hero-container">
        {/* Left Side: 55% */}
        <div className="hero-left">
          {/* Kinford Logo at top left (small, uncropped color version) */}
          <div style={{ marginBottom: 28 }}>
            <img
              src="/kinford-logo-new.png"
              alt="Kinford School of Guidance"
              style={{
                width: 150,
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Big Bold Headline */}
          <h1
            style={{
              fontSize: 'clamp(42px, 5.2vw, 68px)',
              fontWeight: 800,
              color: '#1E1E1E',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: '0 0 24px 0',
            }}
          >
            A school that<br />
            shapes who<br />
            <span style={{ color: '#A0163B' }}>you become.</span>
          </h1>

          {/* Subtext in gray */}
          <p
            style={{
              fontSize: 'clamp(16px, 1.6vw, 19px)',
              color: '#666666',
              lineHeight: 1.6,
              margin: '0 0 36px 0',
              maxWidth: 520,
              fontWeight: 400,
            }}
          >
            A premium residential school in Thamarassery, Kozhikode.
          </p>

          {/* CTA Button */}
          <div>
            <Link
              href="/admissions"
              style={{
                background: '#F5B800',
                color: '#1E1E1E',
                padding: '16px 36px',
                borderRadius: 50,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: '0 8px 24px rgba(245, 184, 0, 0.28)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(245, 184, 0, 0.38)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 184, 0, 0.28)'
              }}
            >
              Begin Your Journey →
            </Link>
          </div>

          {/* 3 Stat Pills in a row */}
          <div className="stat-pills-row">
            <span className="stat-pill">Admissions Open — 2027 Batch</span>
            <span className="stat-pill">Plus One Commerce</span>
            <span className="stat-pill">Science Stream</span>
          </div>
        </div>

        {/* Right Side: 45% */}
        <div className="hero-right">
          {/* Reel Wrapper clipping top profile bar and bottom UI bars */}
          <div
            className="reel-wrapper"
            style={{
              opacity: fade ? 1 : 0,
            }}
          >
            <iframe
              key={currentReelIndex}
              src={`https://www.instagram.com/p/${reels[currentReelIndex]}/embed/?hidecaption=true&autoplay=1&muted=1`}
              title={`Kinford School Instagram Reel ${currentReelIndex + 1}`}
              scrolling="no"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
