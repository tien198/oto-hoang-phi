'use client'

import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export const Header = () => {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 99) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <div className="h-24"></div>
      <div
        className={cn(
          'w-full bg-[#111111] px-5 md:px-20 h-24 flex items-center justify-between',
          'fixed top-0 left-0 z-50 transition-transform duration-300',
          hidden ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div className="flex items-center gap-10 lg:gap-14">
          <div className="w-[120px] h-[138px] flex items-center relative z-10">
            <Logo loading="eager" priority="high" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 ">
          <Link
            href="#"
            className="text-muted-foreground font-medium text-base hover:text-white transition-colors"
          >
            Về chúng tôi
          </Link>
          <Link
            href="#"
            className="text-muted-foreground font-medium text-base hover:text-white transition-colors"
          >
            Tài nguyên
          </Link>
          <Link href="#contact">
            <Button
              className={cn(
                'bg-primary text-white px-6 py-5 rounded-full font-semibold ',
                'hover:bg-white hover:text-primary transition-colors',
              )}
            >
              Liên hệ ngay!
            </Button>
          </Link>
        </nav>

        <nav className="md:hidden">
          <Link
            href="#contract"
            className="text-primary font-medium text-base hover:text-white transition-colors flex items-center gap-2"
          >
            Liên Hệ <Phone className="w-4 h-4" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
