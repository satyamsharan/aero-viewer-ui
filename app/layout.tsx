import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './ui/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aero Viewer',
  description: 'Realtime monitoring of air quality in bypass (förbifart) Stockholm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
