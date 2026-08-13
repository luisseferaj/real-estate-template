import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import './globals.css'
import { FloatingWhatsapp } from '@/components/floating-whatsapp'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

import { config } from '@/lib/config'

export const metadata: Metadata = {
  title: {
    default: `${config.companyName} — ${config.tagline}`,
    template: `%s — ${config.companyName}`,
  },
  description: config.siteDescription,
  authors: [{ name: config.companyName }],
  creator: config.companyName,
  openGraph: {
    type: 'website',
    url: config.siteUrl,
    siteName: config.companyName,
    title: `${config.companyName} — ${config.tagline}`,
    description: config.siteDescription,
    images: [
      {
        url: `${config.siteUrl}/description.jpeg`,
        width: 1200,
        height: 630,
        alt: config.companyName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.companyName,
    description: config.siteDescription,
    images: [`${config.siteUrl}/description.jpeg`],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: config.siteUrl,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#14120e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sq" className={`light bg-background ${geistSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <FloatingWhatsapp/>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
