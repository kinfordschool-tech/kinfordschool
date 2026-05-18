'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Slight timeout for a smooth loading state interaction
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === 'kinford@123') {
        sessionStorage.setItem('kinford_admin_logged_in', 'true')
        router.push('/admin/dashboard')
      } else {
        setError('Invalid credentials')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1E1E1E',
      fontFamily: 'var(--font-geist-sans), sans-serif',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Premium subtle gradient background glows */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(160,22,59,0.15) 0%, rgba(0,0,0,0) 70%)',
        top: '-10%',
        right: '-10%',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,184,0,0.08) 0%, rgba(0,0,0,0) 70%)',
        bottom: '-15%',
        left: '-15%',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="mobile-full-width" style={{
        width: '100%',
        maxWidth: '440px',
        background: 'rgba(30,30,30,0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        padding: '48px 40px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Centered Kinford Logo */}
        <div style={{ marginBottom: '32px' }}>
          <Logo size="lg" dark={false} />
        </div>

        <h1 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          marginBottom: '28px',
          textAlign: 'center'
        }}>
          Admin Portal
        </h1>

        {error && (
          <div style={{
            width: '100%',
            background: 'rgba(160,22,59,0.15)',
            border: '1px solid rgba(160,22,59,0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            color: '#ff6b8b',
            fontSize: '14px',
            fontWeight: 500,
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@gmail.com"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s, background-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#F5B800'
                e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                e.target.style.backgroundColor = 'rgba(255,255,255,0.03)'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s, background-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#F5B800'
                e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                e.target.style.backgroundColor = 'rgba(255,255,255,0.03)'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: '#A0163B',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '12px',
              transition: 'background-color 0.2s, transform 0.1s',
              boxShadow: '0 8px 24px rgba(160,22,59,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#7a1030'
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#A0163B'
            }}
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}
