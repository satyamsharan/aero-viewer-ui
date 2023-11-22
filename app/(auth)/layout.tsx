import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '../providers'
import '../ui/globals.css'
import { Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react'
import Image from 'next/image'
import ThemeSwitcher from '../components/ThemeSwitcher'

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
            <main className='flex grow'>
              <div className="w-screen h-screen authPage flex items-center justify-center">
                <Card className="w-[360px]">
                    <CardHeader className="flex items-center justify-center mt-4">
                        <Image alt="AFRY" src="/AFRY-logo.svg" width={80} height={80}/>
                    </CardHeader>
                    <CardBody className="">
                        {children}
                    </CardBody>
                    <CardFooter className="flex items-center justify-center">
                        <ThemeSwitcher />
                    </CardFooter>
                </Card>
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
