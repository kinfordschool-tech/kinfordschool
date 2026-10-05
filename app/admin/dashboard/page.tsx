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

interface GalleryPhoto {
  id: string
  url: string
  title: string | null
  category: string | null
  order: number
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState<boolean | null>(null)
  const [activeTab, setActiveTab] = useState<'enquiries' | 'messages' | 'gallery'>('enquiries')
  
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([])
  
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadTitle, setUploadTitle] = useState('')
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null)
  const [tempTitle, setTempTitle] = useState('')
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

  // Fetch gallery photos from Supabase sorted by order ascending, created_at descending
  const fetchGallery = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('order', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching gallery photos:', error.message)
      } else {
        setGalleryPhotos(data || [])
      }
    } catch (err) {
      console.error('Failed to fetch gallery photos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authorized) {
      if (activeTab === 'enquiries') {
        fetchEnquiries()
      } else if (activeTab === 'messages') {
        fetchMessages()
      } else if (activeTab === 'gallery') {
        fetchGallery()
      }
    }
  }, [authorized, activeTab])

  // Upload Photo to Supabase Storage 'gallery' bucket and save record to gallery table
  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
      const filePath = `photos/${fileName}`

      const { error: uploadError } = await supabase
        .storage
        .from('gallery')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })

      if (uploadError) {
        throw uploadError
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('gallery')
        .getPublicUrl(filePath)

      const publicUrl = publicUrlData.publicUrl

      const maxOrder = galleryPhotos.length > 0
        ? Math.max(...galleryPhotos.map((p) => p.order || 0)) + 1
        : 0

      const { error: dbError } = await supabase
        .from('gallery')
        .insert([
          {
            url: publicUrl,
            title: uploadTitle.trim() || file.name,
            order: maxOrder,
          },
        ])

      if (dbError) throw dbError

      setUploadTitle('')
      await fetchGallery()
    } catch (err: any) {
      console.error('Upload failed:', err)
      alert(err.message || 'Failed to upload photo to gallery.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  // Delete photo from Supabase storage bucket & gallery table
  const handleDeletePhoto = async (photo: GalleryPhoto) => {
    if (!window.confirm(`Are you sure you want to delete "${photo.title || 'this photo'}"?`)) {
      return
    }

    try {
      const storagePathMatch = photo.url.match(/\/storage\/v1\/object\/public\/gallery\/(.+)$/)
      if (storagePathMatch && storagePathMatch[1]) {
        const storagePath = decodeURIComponent(storagePathMatch[1])
        await supabase.storage.from('gallery').remove([storagePath])
      } else {
        const filename = photo.url.split('/').pop()
        if (filename) {
          await supabase.storage.from('gallery').remove([`photos/${filename}`, filename])
        }
      }

      const { error } = await supabase.from('gallery').delete().eq('id', photo.id)
      if (error) throw error

      setGalleryPhotos((prev) => prev.filter((p) => p.id !== photo.id))
    } catch (err: any) {
      console.error('Delete photo failed:', err)
      alert(err.message || 'Failed to delete photo.')
    }
  }

  // Reorder photos (up / down)
  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= galleryPhotos.length) return

    const currentPhoto = galleryPhotos[index]
    const targetPhoto = galleryPhotos[targetIndex]

    const currentOrder = currentPhoto.order ?? index
    const targetOrder = targetPhoto.order ?? targetIndex

    const newCurrentOrder = targetOrder === currentOrder ? (direction === 'up' ? currentOrder - 1 : currentOrder + 1) : targetOrder
    const newTargetOrder = currentOrder

    const updated = [...galleryPhotos]
    updated[index] = { ...currentPhoto, order: newCurrentOrder }
    updated[targetIndex] = { ...targetPhoto, order: newTargetOrder }

    updated.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    setGalleryPhotos(updated)

    try {
      await Promise.all([
        supabase.from('gallery').update({ order: newCurrentOrder }).eq('id', currentPhoto.id),
        supabase.from('gallery').update({ order: newTargetOrder }).eq('id', targetPhoto.id),
      ])
    } catch (err) {
      console.error('Reorder update failed:', err)
      fetchGallery()
    }
  }

  // Save updated photo title
  const handleSaveTitle = async (id: string, newTitle: string) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .update({ title: newTitle.trim() })
        .eq('id', id)

      if (error) throw error
      setGalleryPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, title: newTitle.trim() } : p)))
      setEditingTitleId(null)
    } catch (err: any) {
      console.error('Failed to update title:', err)
      alert(err.message || 'Failed to update title.')
    }
  }

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
              {activeTab === 'enquiries' ? 'Admissions Enquiries' : activeTab === 'messages' ? 'Contact Messages' : 'Gallery Management'}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
              {activeTab === 'enquiries' 
                ? 'Manage and view all incoming student admissions submissions.' 
                : activeTab === 'messages'
                ? 'View messages sent by visitors through the contact form.'
                : 'Upload photos to Supabase storage, manage titles, and reorder images.'}
            </p>
          </div>

          <button
            onClick={activeTab === 'enquiries' ? fetchEnquiries : activeTab === 'messages' ? fetchMessages : fetchGallery}
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
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '32px', paddingBottom: '1px', flexWrap: 'wrap' }}>
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
          <button
            onClick={() => setActiveTab('gallery')}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'gallery' ? '2px solid #F5B800' : '2px solid transparent',
              color: activeTab === 'gallery' ? '#F5B800' : 'rgba(255,255,255,0.5)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '-1px'
            }}
          >
            Gallery {galleryPhotos.length > 0 && `(${galleryPhotos.length})`}
          </button>
        </div>

        {/* Content Container */}
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
        ) : activeTab === 'messages' ? (
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
        ) : (
          /* GALLERY TAB CONTENT */
          <div>
            {/* Upload Bar Card */}
            <div style={{
              background: '#1E1E1E',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '24px 32px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  Upload New Gallery Photo
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                  Upload images to Supabase storage ('gallery' bucket) to feature on the website hero orbit.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Photo title (optional)"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  disabled={uploading}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '30px',
                    padding: '10px 18px',
                    fontSize: '14px',
                    color: '#ffffff',
                    outline: 'none',
                    minWidth: '220px'
                  }}
                />

                <label style={{
                  background: uploading ? 'rgba(245,184,0,0.4)' : '#F5B800',
                  color: '#1E1E1E',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '11px 24px',
                  borderRadius: '30px',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}>
                  {uploading ? (
                    <>
                      <div className="loading-spinner" style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #1E1E1E',
                        borderTopColor: 'transparent',
                        borderRadius: '50%'
                      }} />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span>📷 Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadPhoto}
                        disabled={uploading}
                        style={{ display: 'none' }}
                      />
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Photos Grid or Empty State */}
            {galleryPhotos.length === 0 ? (
              <div style={{
                background: 'rgba(30,30,30,0.4)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px',
                padding: '80px 24px',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.4)'
              }}>
                <p style={{ fontSize: '48px', marginBottom: '16px' }}>🖼️</p>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>No photos uploaded yet</h3>
                <p style={{ fontSize: '14px' }}>Upload photos using the button above to populate the hero orbit ring.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {galleryPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    style={{
                      background: '#1E1E1E',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                  >
                    {/* Thumbnail Header with Reorder Controls */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#141414', overflow: 'hidden' }}>
                      <img
                        src={photo.url}
                        alt={photo.title || `Gallery photo ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />

                      {/* Order Badge */}
                      <span style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: 'rgba(0,0,0,0.75)',
                        backdropFilter: 'blur(4px)',
                        color: '#F5B800',
                        padding: '4px 10px',
                        borderRadius: '50px',
                        fontSize: '11px',
                        fontWeight: 700,
                        border: '1px solid rgba(245,184,0,0.3)'
                      }}>
                        #{index + 1}
                      </span>

                      {/* Up / Down Reorder Buttons */}
                      <div style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        display: 'flex',
                        gap: '4px',
                        background: 'rgba(0,0,0,0.75)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '30px',
                        padding: '3px 6px',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}>
                        <button
                          onClick={() => handleReorder(index, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: index === 0 ? 'rgba(255,255,255,0.2)' : '#ffffff',
                            cursor: index === 0 ? 'not-allowed' : 'pointer',
                            fontSize: '12px',
                            padding: '4px 6px'
                          }}
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleReorder(index, 'down')}
                          disabled={index === galleryPhotos.length - 1}
                          title="Move Down"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: index === galleryPhotos.length - 1 ? 'rgba(255,255,255,0.2)' : '#ffffff',
                            cursor: index === galleryPhotos.length - 1 ? 'not-allowed' : 'pointer',
                            fontSize: '12px',
                            padding: '4px 6px'
                          }}
                        >
                          ▼
                        </button>
                      </div>
                    </div>

                    {/* Photo Info & Title Editing */}
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        {editingTitleId === photo.id ? (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="text"
                              value={tempTitle}
                              onChange={(e) => setTempTitle(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveTitle(photo.id, tempTitle)
                                if (e.key === 'Escape') setEditingTitleId(null)
                              }}
                              autoFocus
                              style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid #F5B800',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                fontSize: '14px',
                                color: '#ffffff',
                                width: '100%',
                                outline: 'none'
                              }}
                            />
                            <button
                              onClick={() => handleSaveTitle(photo.id, tempTitle)}
                              style={{
                                background: '#F5B800',
                                color: '#1E1E1E',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                fontSize: '13px',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              ✓
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h4 style={{
                              fontSize: '15px',
                              fontWeight: 600,
                              color: '#ffffff',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '190px'
                            }}>
                              {photo.title || 'Untitled'}
                            </h4>
                            <button
                              onClick={() => {
                                setEditingTitleId(photo.id)
                                setTempTitle(photo.title || '')
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'rgba(255,255,255,0.4)',
                                cursor: 'pointer',
                                fontSize: '12px',
                                padding: '4px'
                              }}
                              title="Edit Title"
                            >
                              ✏️ Edit
                            </button>
                          </div>
                        )}
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', display: 'block' }}>
                          {formatDate(photo.created_at)}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                        <button
                          onClick={() => handleDeletePhoto(photo)}
                          style={{
                            background: 'rgba(255,77,77,0.1)',
                            color: '#ff4d4d',
                            border: '1px solid rgba(255,77,77,0.25)',
                            borderRadius: '30px',
                            padding: '6px 16px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.2)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.1)'}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
