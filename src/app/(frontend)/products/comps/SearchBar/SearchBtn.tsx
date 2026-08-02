// 'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'

export function SearchBtn() {
  return (
    <Button
      type="submit"
      variant="outline"
      className={clsx(
        // Base / Mobile
        'bg-card border-accent-foreground shadow-sm px-6 h-10 w-full',
        'hover:bg-primary hover:text-accent',
        // Tablet
        'sm:w-auto',
      )}
    >
      Tìm kiếm
    </Button>
  )
}
