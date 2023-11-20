import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './ui/globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers>
          <div className='h-full flex flex-col'>
            <Header/>
            <main className='flex grow'>
              {children}
            </main>
            <Footer/>
          </div>
        </Providers>
      </body>
    </html>
  )
}
