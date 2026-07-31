'use client'

import { Button } from '@/components/ui/button'
import { useMakeName, useModelName, useProductName } from './store'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { useQueryClient } from '@tanstack/react-query'
import { generateProductsQueryKey } from '../../tanstack-ultils/generate-querry-key'

export function SearchBtn() {
  const queryClient = useQueryClient()
  const productName = useProductName()
  const vehicleMakeName = useMakeName()
  const vehicleModelName = useModelName()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const params = new URLSearchParams(searchParams.toString())
  if (productName) {
    params.set('product-name', productName)
  } else {
    params.delete('product-name')
  }
  if (vehicleMakeName) {
    params.set('vehicle-make', vehicleMakeName)
  } else {
    params.delete('vehicle-make')
  }
  if (vehicleModelName) params.set('vehicle-model', vehicleModelName)
  else {
    params.delete('vehicle-model')
  }

  // Reset to page 1 on new search
  params.set('page', '1')

  const redirectUrl = pathname + '?' + params.toString()

  const handleSubmit = () => {
    queryClient.invalidateQueries({
      queryKey: generateProductsQueryKey({
        page: 1,
        productName,
        vehicleMakeName,
        vehicleModelName,
      }),
    })
    router.push(redirectUrl)
    router.refresh()
  }

  return (
    <Button
      variant="outline"
      className={clsx(
        'bg-card border-accent-foreground shadow-sm px-6 h-10',
        'hover:bg-primary hover:text-accent',
      )}
      onClick={handleSubmit}
    >
      Tìm kiếm
    </Button>
  )
}
