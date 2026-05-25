'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

interface Enquiry {
  id: number
  name: string
  parent_name: string
  email: string
  phone: string
  grade: string
  gender: string
  message: string
  created_at: string
  place?: string
  last_school_studied?: string
}

interface ContactMessage {
  id: number
  name: string
  contact: string
  message: string
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  const [activeTab, setActiveTab] = useState<'enquiries' | 'messages'>('enquiries')
  
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  
  const [loading, setLoading] = useState(true)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  // Route protection checking sessionStorage on the client side
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('kinford_admin_logged_in') === 'true'
    if (!isLoggedIn) {
      router.replace('/admin')
    } else {
      setAuthorized(true)
    }
  }, [router])

  // Fetch enquiries from Supabase sorted by created_at descending
  const fetchEnquiries = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching enquiries:', error.message)
      } else {
        setEnquiries(data || [])
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch contact messages from Supabase sorted by created_at descending
  const fetchMessages = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching contact messages:', error.message)
      } else {
        setMessages(data || [])
      }
    } catch (err) {
      console.error('Failed to fetch contact messages:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authorized) {
      if (activeTab === 'enquiries') {
        fetchEnquiries()
      } else {
        fetchMessages()
      }
    }
  }, [authorized, activeTab])

  const handleLogout = () => {
    sessionStorage.removeItem('kinford_admin_logged_in')
    router.replace('/')
  }

  const handleDeleteEnquiry = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return
    }
    
    try {
      const res = await fetch(`/api/enquiry?id=${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success) {
        setEnquiries(enquiries.filter(e => e.id !== id))
        setSelectedEnquiry(null)
      } else {
        alert(data.error || 'Failed to delete enquiry.')
      }
    } catch (err: any) {
      console.error(err)
      alert(err.message || 'An error occurred while deleting the enquiry.')
    }
  }

  const handleDeleteMessage = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this contact message? This action cannot be undone.')) {
      return
    }

    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success) {
        setMessages(messages.filter(m => m.id !== id))
        setSelectedMessage(null)
      } else {
        alert(data.error || 'Failed to delete message.')
      }
    } catch (err: any) {
      console.error(err)
      alert(err.message || 'An error occurred while deleting the message.')
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateStr
    }
  }

  if (authorized === null) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#1E1E1E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: 'var(--font-geist-sans), sans-serif'
      }}>
        <div style={{ fontSize: '16px', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
          Authenticating session...
        </div>
      </div>
    )
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#141414',
      color: '#ffffff',
      fontFamily: 'var(--font-geist-sans), sans-serif',
      paddingBottom: '80px'
    }}>
      {/* Dynamic keyframe animation style injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-spinner {
          animation: spin 1s linear infinite;
        }
      `}} />

      {/* Kinford Branded Header */}
      <header style={{
        background: '#1E1E1E',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 6vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo size="sm" dark={false} />
          <span style={{
            marginLeft: '16px',
            paddingLeft: '16px',
            borderLeft: '1px solid rgba(255,255,255,0.15)',
            fontSize: '14px',
            fontWeight: 500,
            color: '#F5B800',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Dashboard
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            color: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '30px',
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff'
            e.currentTarget.style.borderColor = '#A0163B'
            e.currentTarget.style.backgroundColor = 'rgba(160,22,59,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '6px'
            }}>
              {activeTab === 'enquiries' ? 'Admissions Enquiries' : 'Contact Messages'}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
              {activeTab === 'enquiries' 
                ? 'Manage and view all incoming student admissions submissions.' 
                : 'View messages sent by visitors through the contact form.'}
            </p>
          </div>

          <button
            onClick={activeTab === 'enquiries' ? fetchEnquiries : fetchMessages}
            disabled={loading}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              transition: 'background-color 0.2s'
            }}
            title="Refresh Data"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
          >
            <svg
              className={loading ? 'loading-spinner' : ''}
              style={{ width: '20px', height: '20px' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
            </svg>
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '32px', paddingBottom: '1px' }}>
          <button
            onClick={() => setActiveTab('enquiries')}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'enquiries' ? '2px solid #F5B800' : '2px solid transparent',
              color: activeTab === 'enquiries' ? '#F5B800' : 'rgba(255,255,255,0.5)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '-1px'
            }}
          >
            Admissions Enquiries {enquiries.length > 0 && `(${enquiries.length})`}
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'messages' ? '2px solid #F5B800' : '2px solid transparent',
              color: activeTab === 'messages' ? '#F5B800' : 'rgba(255,255,255,0.5)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '-1px'
            }}
          >
            Contact Messages {messages.length > 0 && `(${messages.length})`}
          </button>
        </div>

        {/* Table Container */}
        {loading ? (
          <div style={{
            background: 'rgba(30,30,30,0.4)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: '80px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div
              className="loading-spinner"
              style={{
                width: '36px',
                height: '36px',
                border: '3px solid rgba(160,22,59,0.3)',
                borderTopColor: '#A0163B',
                borderRadius: '50%'
              }}
            />
            <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>Fetching records from database...</span>
          </div>
        ) : activeTab === 'enquiries' ? (
          enquiries.length === 0 ? (
            <div style={{
              background: 'rgba(30,30,30,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
              padding: '80px 24px',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)'
            }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>📂</p>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>No enquiries yet</h3>
              <p style={{ fontSize: '14px' }}>Submissions from the admissions form will appear here.</p>
            </div>
          ) : (
            <div style={{
              background: 'rgba(30,30,30,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
              <div className="mobile-table-scroll" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                  <thead>
                    <tr style={{
                      background: '#1E1E1E',
                      borderBottom: '1px solid rgba(255,255,255,0.08)'
                    }}>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Parent Name</th>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</th>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grade</th>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date Submitted</th>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq, index) => (
                      <tr
                        key={enq.id}
                        style={{
                          borderBottom: index === enquiries.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                          background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'}
                      >
                        <td style={{ padding: '18px 24px', fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>{enq.name}</td>
                        <td style={{ padding: '18px 24px', fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}>{enq.parent_name || '—'}</td>
                        <td style={{ padding: '18px 24px', fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>{enq.phone}</td>
                        <td style={{ padding: '18px 24px', fontSize: '14px' }}>
                          <span style={{
                            background: 'rgba(245,184,0,0.12)',
                            color: '#F5B800',
                            padding: '4px 10px',
                            borderRadius: '50px',
                            fontSize: '12px',
                            fontWeight: 600
                          }}>{enq.grade}</span>
                        </td>
                        <td style={{ padding: '18px 24px', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{formatDate(enq.created_at)}</td>
                        <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => setSelectedEnquiry(enq)}
                              style={{
                                background: '#A0163B',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '30px',
                                padding: '6px 16px',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7a1030'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A0163B'}
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              style={{
                                background: 'transparent',
                                color: 'rgba(255,255,255,0.6)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '30px',
                                padding: '5px 14px',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#ff4d4d'
                                e.currentTarget.style.borderColor = '#ff4d4d'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          messages.length === 0 ? (
            <div style={{
              background: 'rgba(30,30,30,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
              padding: '80px 24px',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)'
            }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>💬</p>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>No messages yet</h3>
              <p style={{ fontSize: '14px' }}>Visitor submissions from the contact page form will show up here.</p>
            </div>
          ) : (
            <div style={{
              background: 'rgba(30,30,30,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
              <div className="mobile-table-scroll" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                  <thead>
                    <tr style={{
                      background: '#1E1E1E',
                      borderBottom: '1px solid rgba(255,255,255,0.08)'
                    }}>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Info</th>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message Excerpt</th>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date Sent</th>
                      <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg, index) => (
                      <tr
                        key={msg.id}
                        style={{
                          borderBottom: index === messages.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                          background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'}
                      >
                        <td style={{ padding: '18px 24px', fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>{msg.name}</td>
                        <td style={{ padding: '18px 24px', fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>{msg.contact}</td>
                        <td style={{ padding: '18px 24px', fontSize: '14px', color: 'rgba(255,255,255,0.5)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</td>
                        <td style={{ padding: '18px 24px', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{formatDate(msg.created_at)}</td>
                        <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => setSelectedMessage(msg)}
                              style={{
                                background: '#A0163B',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '30px',
                                padding: '6px 16px',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7a1030'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A0163B'}
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              style={{
                                background: 'transparent',
                                color: 'rgba(255,255,255,0.6)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '30px',
                                padding: '5px 14px',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#ff4d4d'
                                e.currentTarget.style.borderColor = '#ff4d4d'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>

      {/* View Admissions Enquiry Details Modal */}
      {selectedEnquiry && (
        <div className="mobile-modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }}>
          <div className="mobile-full-screen-modal" style={{
            background: '#1E1E1E',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              background: '#141414',
              padding: '24px 32px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{
                  background: 'rgba(245,184,0,0.12)',
                  color: '#F5B800',
                  padding: '4px 10px',
                  borderRadius: '50px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{selectedEnquiry.grade} Application</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>Enquiry Details</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', maxHeight: '70vh' }}>
              <div className="about-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Student Name</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>{selectedEnquiry.name}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Parent / Guardian</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>{selectedEnquiry.parent_name || '—'}</span>
                </div>
              </div>

              <div className="about-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Phone Number</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', fontFamily: 'monospace' }}>{selectedEnquiry.phone}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Parent Email</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>
                    <a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#F5B800', textDecoration: 'none' }}>
                      {selectedEnquiry.email}
                    </a>
                  </span>
                </div>
              </div>

               <div className="about-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Gender</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>{selectedEnquiry.gender || '—'}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Submission Date</span>
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)' }}>{formatDate(selectedEnquiry.created_at)}</span>
                </div>
              </div>

              <div className="about-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Place of Residence / Location</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>{selectedEnquiry.place || '—'}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Last School Studied</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>{selectedEnquiry.last_school_studied || '—'}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Message / Additional Info</span>
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  minHeight: '80px'
                }}>
                  {selectedEnquiry.message || 'No additional message was provided.'}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              background: '#141414',
              padding: '20px 32px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                style={{
                  background: 'rgba(255,77,77,0.1)',
                  color: '#ff4d4d',
                  border: '1px solid rgba(255,77,77,0.3)',
                  borderRadius: '30px',
                  padding: '10px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.1)'
                }}
              >
                Delete Enquiry
              </button>
              <button
                onClick={() => setSelectedEnquiry(null)}
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '30px',
                  padding: '10px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Contact Message Details Modal */}
      {selectedMessage && (
        <div className="mobile-modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }}>
          <div className="mobile-full-screen-modal" style={{
            background: '#1E1E1E',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              background: '#141414',
              padding: '24px 32px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{
                  background: 'rgba(160,22,59,0.12)',
                  color: '#ff6b8b',
                  padding: '4px 10px',
                  borderRadius: '50px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Contact Message</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>Message Details</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', maxHeight: '70vh' }}>
              <div className="about-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Sender Name</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>{selectedMessage.name}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Contact Info</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', fontFamily: 'monospace' }}>{selectedMessage.contact}</span>
                </div>
              </div>

              <div className="about-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Submission Date</span>
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)' }}>{formatDate(selectedMessage.created_at)}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Message Body</span>
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  minHeight: '120px'
                }}>
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              background: '#141414',
              padding: '20px 32px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                style={{
                  background: 'rgba(255,77,77,0.1)',
                  color: '#ff4d4d',
                  border: '1px solid rgba(255,77,77,0.3)',
                  borderRadius: '30px',
                  padding: '10px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.1)'
                }}
              >
                Delete Message
              </button>
              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '30px',
                  padding: '10px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
