import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Lynxrelax',
  description: 'A personal blog about technology, life, and everything in between.',
  icons: {
    icon: [
      { url: '/images/lynx-icon.ico' },
      { url: '/images/lynx-icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/images/lynx-icon.ico' },
      { url: '/images/lynx-icon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-secondary text-primary`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}