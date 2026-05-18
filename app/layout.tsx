import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import FloatingNav from '@/components/FloatingNav'
import Footer from '@/components/Footer'
import AdminKeyTrigger from '@/components/AdminKeyTrigger'

export const metadata: Metadata = {
  title: 'Kinford — School of Guidance',
  description: 'A premium residential school in Thamarassery, Kozhikode, Kerala. Guiding futures beyond academics.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-white text-ink">
        <AdminKeyTrigger />
        <FloatingNav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
