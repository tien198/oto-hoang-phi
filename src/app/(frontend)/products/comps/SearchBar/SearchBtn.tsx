'use client'

import { Button } from '@/components/ui/button'
import { useMakeName, useModelName, useModelYear, useProductName } from './store'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import clsx from 'clsx'

export function SearchBtn() {
  const makeProductName = useProductName()
  const makeName = useMakeName()
  const modelName = useModelName()
  const modelYear = useModelYear()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <Button
      variant="outline"
      className={clsx(
        'bg-card border-accent-foreground shadow-sm px-6 h-10',
        'hover:bg-primary hover:text-accent',
      )}
      onClick={() => {
        const params = new URLSearchParams(searchParams.toString())
        if (makeProductName) params.set('productName', makeProductName)
        else params.delete('productName')
        if (makeName) params.set('vehicle-make', makeName)
        else params.delete('vehicle-make')
        if (modelName) params.set('vehicle-model', modelName)
        else params.delete('vehicle-model')
        if (modelYear) params.set('model-year', modelYear)
        else params.delete('model-year')
        // Reset to page 1 on new search
        params.delete('page')

        router.push(`${pathname}?${params.toString()}`)
        router.refresh()
      }}
    >
      Tìm kiếm
    </Button>
  )
}
