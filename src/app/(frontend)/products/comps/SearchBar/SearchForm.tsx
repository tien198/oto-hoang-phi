'use client'

import { useMakeName, useModelName, useProductName } from './store'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { generateProductsQueryKey } from '../../tanstack-ultils/generate-querry-key'
import type { FormEvent, ReactNode } from 'react'

export function SearchForm({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const productName = useProductName()
  const vehicleMakeName = useMakeName()
  const vehicleModelName = useModelName()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())
    if (productName) {
      params.set('product-name', productName.toLowerCase())
    } else {
      params.delete('product-name')
    }
    if (vehicleMakeName) {
      params.set('vehicle-make', vehicleMakeName.toLowerCase())
    } else {
      params.delete('vehicle-make')
    }
    if (vehicleModelName) params.set('vehicle-model', vehicleModelName.toLowerCase())
    else {
      params.delete('vehicle-model')
    }

    // Reset to page 1 on new search
    params.set('page', '1')

    const redirectUrl = pathname + '?' + params.toString()

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

    // Close the mobile Drawer if it is open
    document.getElementById('mobile-drawer-close')?.click()
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      {children}
    </form>
  )
}
