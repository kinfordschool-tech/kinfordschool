'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface GalleryItem {
  id: string
  url: string
  title?: string
  category?: string
  order?: number
  created_at?: string
}

const rotatingLines = [
  'Where knowledge meets character.',
  'Built on friendship. Guided by purpose.',
  'Guiding futures beyond academics.',
  'A school that shapes who you become.',
]

export default function Hero() {
  const [photos, setPhotos] = useState<GalleryItem[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null)
  const [lineIndex, setLineIndex] = useState(0)
  const [fade, setFade] = useState(true)

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

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('order', { ascending: true })
          .order('created_at', { ascending: false })

        if (!error && data) {
          setPhotos(data)
        }
      } catch (err) {
        console.error('Error fetching hero gallery:', err)
      }
    }
    fetchGallery()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const photoLeft = photos[0] || null
  const photoRightTop = photos[1] || null
  const photoRightBottom = photos[2] || null

  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 4vw 60px',
      }}
    >
      {/* Styles for Photo Cards Layout & Hover Effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-card {
          background: #f5f5f5;
          border-radius: 0px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: box-shadow 0.3s ease;
          border: none;
        }

        .hero-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .hero-card-left {
          position: absolute;
          left: 4vw;
          top: 50%;
          transform: translateY(-50%);
          width: 160px;
          height: 320px;
          z-index: 5;
        }

        .hero-card-right-top {
          position: absolute;
          right: 4vw;
          top: calc(50% - 175px);
          width: 200px;
          height: 160px;
          z-index: 5;
        }

        .hero-card-right-bottom {
          position: absolute;
          right: 4vw;
          top: calc(50% + 15px);
          width: 200px;
          height: 160px;
          z-index: 5;
        }

        @media (max-width: 960px) {
          .hero-card-left, .hero-card-right-top, .hero-card-right-bottom {
            display: none !important;
          }
        }
      `}} />

      {/* Left side card: Tall vertical rectangle (160px x 320px) */}
      <div
        className="hero-card hero-card-left"
        onClick={() => photoLeft && setSelectedPhoto(photoLeft)}
      >
        {photoLeft ? (
          <img
            src={photoLeft.url}
            alt={photoLeft.title || 'Kinford Gallery 1'}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: '#e5e5e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Right side top card: Rectangle (200px x 160px) */}
      <div
        className="hero-card hero-card-right-top"
        onClick={() => photoRightTop && setSelectedPhoto(photoRightTop)}
      >
        {photoRightTop ? (
          <img
            src={photoRightTop.url}
            alt={photoRightTop.title || 'Kinford Gallery 2'}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: '#e5e5e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Right side bottom card: Rectangle (200px x 160px) */}
      <div
        className="hero-card hero-card-right-bottom"
        onClick={() => photoRightBottom && setSelectedPhoto(photoRightBottom)}
      >
        {photoRightBottom ? (
          <img
            src={photoRightBottom.url}
            alt={photoRightBottom.title || 'Kinford Gallery 3'}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: '#e5e5e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Centered Content: Small Kinford Logo, Tagline, Action Buttons */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          maxWidth: '650px',
        }}
      >
        {/* Centered Kinford Logo (Small 180px, no card or background) */}
        <div style={{ marginBottom: 24 }}>
          <img
            src="/kinford-logo.png"
            alt="Kinford School of Guidance"
            style={{
              width: 180,
              height: 'auto',
              display: 'block',
            }}
          />
        </div>

        {/* Tagline Below Logo */}
        <div style={{ minHeight: 36, transition: 'opacity 0.4s', opacity: fade ? 1 : 0, marginTop: 16 }}>
          <p
            style={{
              fontSize: 'clamp(18px,2.5vw,26px)',
              fontWeight: 400,
              color: '#1E1E1E',
              letterSpacing: '0.01em',
              lineHeight: 1.4,
            }}
          >
            {rotatingLines[lineIndex]}
          </p>
        </div>

        {/* Buttons Below Tagline */}
        <div
          className="mobile-stack-buttons"
          style={{
            marginTop: 36,
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/admissions"
            style={{
              background: '#F5B800',
              color: '#1E1E1E',
              padding: '14px 34px',
              borderRadius: 50,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              boxShadow: '0 8px 24px rgba(245,184,0,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            Begin Your Journey →
          </Link>
          <Link
            href="/about"
            style={{
              border: '1.5px solid #1E1E1E',
              color: '#1E1E1E',
              padding: '14px 34px',
              borderRadius: 50,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Lightbox / Modal for full photo view */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.96); }
              to { opacity: 1; transform: scale(1); }
            }
          `}} />
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              background: '#1E1E1E',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '24px',
              padding: '16px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: 38,
                height: 38,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                cursor: 'pointer',
                zIndex: 10,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#A0163B')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)')}
            >
              ✕
            </button>

            {/* Photo */}
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title || 'Kinford Photo'}
              style={{
                maxWidth: '85vw',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '16px',
                display: 'block',
              }}
            />

            {/* Photo Title */}
            {selectedPhoto.title && (
              <div style={{ marginTop: 16, textAlign: 'center', padding: '0 16px' }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  {selectedPhoto.title}
                </p>
                {selectedPhoto.category && (
                  <span
                    style={{
                      fontSize: 12,
                      color: '#F5B800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                      marginTop: 4,
                      display: 'inline-block',
                    }}
                  >
                    {selectedPhoto.category}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
