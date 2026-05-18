import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import FloatingNav from '@/components/FloatingNav'
import Footer from '@/components/Footer'
import AdminKeyTrigger from '@/components/AdminKeyTrigger'

export const metadata: Metadata = {
  title: 'Kinford School of Guidance | Best Residential School in Kozhikode & Thamarassery',
  description: 'Kinford School of Guidance is a premium residential school in Kozhikode and Thamarassery, Kerala. Offering top-tier Plus One Commerce coaching with integrated CA/CMA guidance, individual mentoring, and strong Islamic moral foundations.',
  keywords: [
    'best residential school in kozhikode',
    'best residential school in thamrassery',
    'kinford school of guidance',
    'best boarding school in kerala',
    'residential school kozhikode',
    'boarding school thamrassery',
    'kinford school',
    'best residential school kerala',
    'plus one commerce boarding school'
  ],
  icons: {
    icon: '/kinford-logo.png',
    shortcut: '/kinford-logo.png',
    apple: '/kinford-logo.png',
  }
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
