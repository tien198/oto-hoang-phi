import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="w-full bg-[#111111] px-5 md:px-20 h-[99px] flex items-center justify-between">
      <div className="flex items-center gap-10 lg:gap-[60px]">
        <div className="w-[120px] h-[138px] flex items-center relative z-10">
          <Logo loading="eager" priority="high" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
        </div>
      </div>
      <nav className="flex items-center gap-4 lg:gap-8">
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
    </header>
  )
}
