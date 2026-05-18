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
    'Best Residential School in Kozhikode',
    'Best Residential School in Thamarassery',
    'Best School in Kozhikode',
    'Best School to Study +1',
    'Best school to study Plus One',
    'Best Residential School in Kerala',
    'Best Boarding School in Kozhikode',
    'Best Boarding School in Thamarassery',
    'Kinford School of Guidance',
    'Kinford School Thamarassery',
    'Plus One Commerce Kozhikode'
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
