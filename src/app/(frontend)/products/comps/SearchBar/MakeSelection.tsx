'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { VehicleMake } from '@/payload-types'

import { useMakeName, useSetMakeName } from './store'
import { useEffect } from 'react'
import clsx from 'clsx'

export function MakeSelection({ makes }: { makes: VehicleMake[] }) {
  const makeName = useMakeName()
  const setMakeName = useSetMakeName()

  return (
    <Select
      value={makeName ?? '__all__'}
      onValueChange={(val) => setMakeName(val === '__all__' ? null : val)}
    >
      <SelectTrigger
        className={clsx(
          // Base / Mobile
          'bg-card border-accent-foreground text-primary',
          // Desktop
          'md:w-44',
        )}
      >
        <SelectValue placeholder="Hãng" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__all__">Tất cả</SelectItem>
        {makes.map((make) => {
          if (!make.name) return null
          return (
            <SelectItem key={make.name} value={make.name.toLowerCase()}>
              {make.name.toUpperCase()}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
