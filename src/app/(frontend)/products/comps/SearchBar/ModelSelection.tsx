'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'
import type { VehicleModel } from '@/payload-types'

import { useModelName, useSetModelName } from './store'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

export function ModelSelection({ models }: { models: VehicleModel[] }) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const modelName = useModelName()
  const setModelName = useSetModelName()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSelect = (val: string) => {
    setModelName(val === '__all__' ? null : val)
    setOpen(false)
  }

  const selectedValue = modelName ?? '__all__'

  const displayLabel = modelName
    ? (models.find((m) => m.name?.toLowerCase() === modelName.toLowerCase())?.name?.toUpperCase() ??
      'Model')
    : 'Model'

  if (!mounted) {
    return (
      <Button
        variant="outline"
        className="w-full md:w-44 justify-between bg-card border-accent-foreground text-primary font-normal"
      >
        {displayLabel}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>
    )
  }

  if (isDesktop) {
    return (
      <Select value={selectedValue} onValueChange={handleSelect} open={open} onOpenChange={setOpen}>
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

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button
          variant="outline"
          className="w-full justify-between bg-card border-accent-foreground text-primary font-normal"
        >
          {displayLabel}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Chọn Model</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col px-4 pb-4 gap-2 max-h-[60vh] overflow-y-auto">
          <Button
            variant="ghost"
            className={clsx(
              'justify-start font-normal',
              selectedValue === '__all__' && 'bg-accent',
            )}
            onClick={() => handleSelect('__all__')}
          >
            Tất cả
          </Button>
          {models.map((model) => {
            if (!model.name) return null
            const lowerName = model.name.toLowerCase()
            return (
              <Button
                key={model.name}
                variant="ghost"
                className={clsx(
                  'justify-start font-normal',
                  selectedValue === lowerName && 'bg-accent',
                )}
                onClick={() => handleSelect(lowerName)}
              >
                {model.name.toUpperCase()}
              </Button>
            )
          })}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
