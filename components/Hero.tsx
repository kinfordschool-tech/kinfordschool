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

const TOTAL_SLOTS = 8

export default function Hero() {
  const [photos, setPhotos] = useState<GalleryItem[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null)
  const [lineIndex, setLineIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1000)
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

  const slots = Array.from({ length: TOTAL_SLOTS }).map((_, index) => {
    const photo = photos[index] || null
    const borderColor = index % 2 === 0 ? '#A0163B' : '#F5B800'
    const glowColor = index % 2 === 0 ? 'rgba(160, 22, 59, 0.7)' : 'rgba(245, 184, 0, 0.7)'
    return { index, photo, borderColor, glowColor }
  })

  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100vh',
        background: '#141414',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 4vw 60px',
      }}
    >
      {/* Styles for Orbit Animation and Responsiveness */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orbitRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes counterRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        .orbit-container {
          position: relative;
          width: 520px;
          height: 520px;
          display: flex;
          alignItems: center;
          justifyContent: center;
          margin: 0 auto;
        }

        .orbit-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          animation: orbitRotate 30s linear infinite;
        }

        .orbit-ring.paused, .orbit-ring:hover {
          animation-play-state: paused !important;
        }

        .orbit-item {
          position: absolute;
          width: 120px;
          height: 120px;
          top: 50%;
          left: 50%;
          margin-top: -60px;
          margin-left: -60px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .orbit-item-inner {
          width: 100%;
          height: 100%;
          animation: counterRotate 30s linear infinite;
        }

        .orbit-ring.paused .orbit-item-inner, .orbit-ring:hover .orbit-item-inner {
          animation-play-state: paused !important;
        }

        .photo-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .photo-circle:hover {
          transform: scale(1.3);
          z-index: 50;
        }

        .photo-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .photo-circle:hover img {
          transform: scale(1.08);
        }

        @media (max-width: 640px) {
          .orbit-container {
            width: 320px;
            height: 320px;
          }
          .orbit-item {
            width: 80px;
            height: 80px;
            margin-top: -40px;
            margin-left: -40px;
          }
          .photo-circle {
            width: 80px;
            height: 80px;
          }
        }
      `}} />

      {/* Arch watermark */}
      <svg
        style={{
          position: 'absolute',
          bottom: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          opacity: 0.05,
          pointerEvents: 'none',
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

      {/* Hero Overlay */}
      <div
        className="hero-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(12, 12, 12, 0.72)',
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />

      {/* Central Content: Orbit Ring with Center Logo */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        {/* Orbit Ring Layout */}
        <div className="orbit-container">
          {/* Centered Kinford Logo */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'auto',
            }}
          >
            <div
              style={{
                background: 'rgba(20, 20, 20, 0.65)',
                backdropFilter: 'blur(16px)',
                padding: '24px 32px',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/kinford-logo.png"
                alt="Kinford School of Guidance"
                style={{
                  width: 'clamp(120px, 15vw, 180px)',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Continuous Rotating Ring for 8 Orbiting Circles */}
          <div
            className={`orbit-ring ${isPaused ? 'paused' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slots.map(({ index, photo, borderColor, glowColor }) => {
              const angle = (index * (360 / TOTAL_SLOTS) * Math.PI) / 180
              // Responsive radius calculation: desktop ~210px, mobile handled in CSS scaling
              const radiusDesktop = 210
              const xDesktop = Math.cos(angle) * radiusDesktop
              const yDesktop = Math.sin(angle) * radiusDesktop

              return (
                <div
                  key={index}
                  className="orbit-item"
                  style={{
                    transform: `translate(${xDesktop}px, ${yDesktop}px)`,
                  }}
                >
                  <div className="orbit-item-inner">
                    <div
                      className="photo-circle"
                      style={{
                        border: `2.5px solid ${borderColor}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 30px ${glowColor}, 0 10px 30px rgba(0,0,0,0.6)`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'
                      }}
                      onClick={() => {
                        if (photo) {
                          setSelectedPhoto(photo)
                        }
                      }}
                    >
                      {photo ? (
                        <img src={photo.url} alt={photo.title || `Kinford Gallery ${index + 1}`} />
                      ) : (
                        /* Soft Placeholder (blurred dark circle with subtle icon) */
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.4) 100%)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={borderColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ opacity: 0.5 }}
                          >
                            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Rotating Taglines & Action Buttons */}
        <div style={{ textAlign: 'center', marginTop: 40, width: '100%' }}>
          <div style={{ minHeight: 36, transition: 'opacity 0.4s', opacity: fade ? 1 : 0 }}>
            <p
              style={{
                fontSize: 'clamp(16px,2.5vw,24px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.01em',
              }}
            >
              {rotatingLines[lineIndex]}
            </p>
          </div>

          <div
            className="mobile-stack-buttons"
            style={{
              marginTop: 32,
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
                boxShadow: '0 8px 24px rgba(245,184,0,0.25)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              Begin Your Journey →
            </Link>
            <Link
              href="/about"
              style={{
                border: '1.5px solid rgba(255,255,255,0.6)',
                color: '#ffffff',
                padding: '14px 34px',
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              Our Story
            </Link>
          </div>
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
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(12px)',
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
