'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import { useProductName, useSetProductName } from './store'

export function ProductNameSearch() {
  const productName = useProductName()
  const setProductName = useSetProductName()

  return (
    <div
      className={clsx(
        // Base / Mobile
        'flex items-center gap-2 flex-1 w-full min-w-48 border border-accent-foreground rounded-md px-4 bg-card h-10',
        // Desktop
        'md:w-auto',
      )}
    >
      <Input
        className={clsx(
          'border-none shadow-none outline-0 bg-transparent px-0 text-primary placeholder:text-primary',
          'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
        )}
        placeholder="Nhập tên phụ tùng..."
        value={productName || ''}
        onChange={(e) => setProductName(e.target.value || null)}
      />
      <Search className="w-4 h-4 text-muted" />
    </div>
  )
}
