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

export const metadata: Metadata = {
  title: {
    default: 'ALPIINVEST Properties — Prona në Shitje dhe me Qira në Shqipëri',
    template: '%s — ALPIINVEST Properties',
  },
  description: 'Zbuloni pronat më të mira në shitje dhe me qira në Tiranë,Kamëz Durrës, Vlorë dhe në mbarë Shqipërinë. Apartamente, vila, toka dhe njësi tregtare.',
  keywords: ['prona ne shitje', 'prona me qira', 'apartamente tirane', 'apartamente kamez', 'vila shqiperi', 'real estate albania', 'imobiliare shqiperi', 'blerje prone', 'qira prone'],
  authors: [{ name: 'ALPIINVEST Properties' }],
  creator: 'ALPIINVEST Properties',
  openGraph: {
    type: 'website',
    locale: 'sq_AL',
    alternateLocale: 'en_US',
    url: 'https://alpiinvest.al',
    siteName: 'ALPIINVEST Properties',
    title: 'ALPIINVEST Properties — Prona në Shitje dhe me Qira në Shqipëri',
    description: 'Zbuloni pronat më të mira në shitje dhe me qira në Tiranë, Durrës, Vlorë, Sarandë dhe në mbarë Shqipërinë.',
    images: [
      {
        url: 'https://alpiinvest.al/description.jpeg',
        width: 1200,
        height: 630,
        alt: 'ALPIINVEST Properties',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALPIINVEST Properties',
    description: 'Prona në shitje dhe me qira në mbarë Shqipërinë.',
    images: ['https://alpiinvest.al/description.jpeg'],
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
    canonical: 'https://alpiinvest.al',
    languages: {
      'sq': 'https://alpiinvest.al',
      'en': 'https://alpiinvest.al/en',
    },
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
        <FloatingWhatsapp number='355699477107' />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
