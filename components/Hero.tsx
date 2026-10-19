'use client'
import Link from 'next/link'

export default function Hero() {
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

        .hero-reel-card {
          width: 100%;
          max-width: 420px;
          height: 600px;
          background: #1E1E1E;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.14);
          border: 1px solid rgba(0, 0, 0, 0.06);
          position: relative;
        }

        .hero-reel-card iframe {
          width: 100% !important;
          height: 600px !important;
          border: none !important;
          border-radius: 20px !important;
          display: block !important;
          pointer-events: auto !important;
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

        .instagram-follow-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #666666;
          text-decoration: none;
          margin-top: 14px;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .instagram-follow-link:hover {
          color: #A0163B;
          transform: translateY(-1px);
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

          .hero-reel-card {
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

          .hero-reel-card {
            height: 520px;
          }

          .hero-reel-card iframe {
            height: 520px !important;
          }
        }
      `}} />

      <div className="hero-container">
        {/* Left Side: 55% */}
        <div className="hero-left">
          {/* Kinford Logo at top left (small, color version) */}
          <div style={{ marginBottom: 28 }}>
            <img
              src="/kinford-logo.png"
              alt="Kinford School of Guidance"
              style={{
                width: 160,
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

          {/* 3 Small Stat Pills in a row */}
          <div className="stat-pills-row">
            <span className="stat-pill">30+ Students</span>
            <span className="stat-pill">Plus One Commerce</span>
            <span className="stat-pill">Kozhikode, Kerala</span>
          </div>
        </div>

        {/* Right Side: 45% */}
        <div className="hero-right">
          <div className="hero-reel-card">
            <iframe
              src="https://www.instagram.com/p/DaQQiT5y2XH/embed/"
              title="Kinford School of Guidance Reel"
              scrolling="no"
              allowFullScreen
            />
          </div>

          {/* Below the iframe card: Follow us @kinfordschool with Instagram icon */}
          <a
            href="https://www.instagram.com/kinfordschool/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-follow-link"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Follow us @kinfordschool
          </a>
        </div>
      </div>
    </section>
  )
}
