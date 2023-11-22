'use client'

import {NextUIProvider} from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react';

import {ThemeProvider as NextThemesProvider} from 'next-themes'
import { useRouter } from 'next/navigation';

export function Providers({children}: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push} className=''>
          <NextThemesProvider
              attribute='class'
              defaultTheme='light'
              themes={['light', 'dark']}>
              {children}
          </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}