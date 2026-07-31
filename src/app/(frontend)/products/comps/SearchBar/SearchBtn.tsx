'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'

export function SearchBtn() {
  return (
    <Button
      type="submit"
      variant="outline"
      className={clsx(
        'bg-card border-accent-foreground shadow-sm px-6 h-10',
        'hover:bg-primary hover:text-accent',
      )}
    >
      Tìm kiếm
    </Button>
  )
}
