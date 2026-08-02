'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { VehicleModel } from '@/payload-types'

import { useModelName, useSetModelName } from './store'
import { useEffect } from 'react'
import clsx from 'clsx'

export function ModelSelection({ models }: { models: VehicleModel[] }) {
  const modelName = useModelName()
  const setModelName = useSetModelName()

  return (
    <Select
      value={modelName ?? '__all__'}
      onValueChange={(val) => setModelName(val === '__all__' ? null : val)}
    >
      <SelectTrigger
        className={clsx(
          // Base / Mobile
          'bg-card border-accent-foreground text-primary',
          // Desktop
          'md:w-44',
        )}
      >
        <SelectValue placeholder="Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__all__">Tất cả</SelectItem>
        {models.map((model) => {
          if (!model.name) return null
          return (
            <SelectItem key={model.name} value={model.name.toLowerCase()}>
              {model.name.toUpperCase()}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
