'use client'

import {PiMoonBold, PiSunBold} from "react-icons/pi";
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@nextui-org/button'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className=''>
      <Button 
        isIconOnly 
        variant="light"
        radius="full" 
        size="sm" 
        aria-label="Dark Mode" 
        onClick={() => setTheme('light'==theme?'dark':'light')}>
        {theme == 'light' && <PiSunBold size={18} />}
        {theme == 'dark' && <PiMoonBold size={18} />}
      </Button> 
    </div>
  )
}