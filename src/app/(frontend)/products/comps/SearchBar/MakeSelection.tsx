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
import type { VehicleMake } from '@/payload-types'

import { useMakeName, useSetMakeName } from './store'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

export function MakeSelection({ makes }: { makes: VehicleMake[] }) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const makeName = useMakeName()
  const setMakeName = useSetMakeName()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSelect = (val: string) => {
    setMakeName(val === '__all__' ? null : val)
    setOpen(false)
  }

  const selectedValue = makeName ?? '__all__'

  const displayLabel = makeName
    ? (makes.find((m) => m.name?.toLowerCase() === makeName.toLowerCase())?.name?.toUpperCase() ??
      'Hãng')
    : 'Hãng'

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
          <DrawerTitle>Chọn Hãng</DrawerTitle>
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
          {makes.map((make) => {
            if (!make.name) return null
            const lowerName = make.name.toLowerCase()
            return (
              <Button
                key={make.name}
                variant="ghost"
                className={clsx(
                  'justify-start font-normal',
                  selectedValue === lowerName && 'bg-accent',
                )}
                onClick={() => handleSelect(lowerName)}
              >
                {make.name.toUpperCase()}
              </Button>
            )
          })}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
