'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminKeyTrigger() {
  const router = useRouter()

  useEffect(() => {
    let keyBuffer = ''
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when the user is inside form elements or rich text fields
      const activeEl = document.activeElement
      if (activeEl) {
        const tagName = activeEl.tagName.toLowerCase()
        const isEditable = activeEl.getAttribute('contenteditable') === 'true'
        if (
          tagName === 'input' ||
          tagName === 'textarea' ||
          tagName === 'select' ||
          isEditable
        ) {
          return
        }
      }

      // Only buffer single-character keys (e.g., '5', '6') to ignore Shift, Control, etc.
      if (e.key.length === 1) {
        keyBuffer += e.key
        if (keyBuffer.length > 4) {
          keyBuffer = keyBuffer.slice(-4)
        }

        // Check if the sequence matches "5656"
        if (keyBuffer === '5656') {
          keyBuffer = '' // Clear buffer
          router.push('/admin')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [router])

  return null
}
