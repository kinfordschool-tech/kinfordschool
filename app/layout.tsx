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
        <a
          href="https://wa.me/917025116441"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Contact us on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.794.002-2.593-1.01-5.031-2.85-6.874-1.837-1.84-4.281-2.853-6.877-2.854-5.404 0-9.809 4.404-9.813 9.807-.001 1.93.51 3.426 1.48 5.06l-.987 3.6 3.696-.97zm11.517-5.602c-.313-.156-1.854-.915-2.131-1.016-.277-.101-.48-.153-.68.154-.2.308-.775.98-.95 1.185-.175.205-.35.23-.663.074-1.86-.759-3.235-1.316-4.54-3.56-.35-.6.35-.556.97-1.782.106-.205.053-.385-.026-.54-.08-.156-.68-1.64-.931-2.247-.244-.587-.492-.507-.68-.517-.174-.008-.374-.01-.575-.01-.201 0-.528.075-.804.378-.276.302-1.054 1.03-1.054 2.512 0 1.48 1.077 2.913 1.227 3.115.15.202 2.12 3.24 5.137 4.542.717.31 1.277.494 1.711.633.72.227 1.376.195 1.896.118.579-.085 1.854-.758 2.116-1.458.264-.699.264-1.3.186-1.418-.079-.118-.291-.194-.605-.349z" />
          </svg>
        </a>
      </body>
    </html>
  )
}
