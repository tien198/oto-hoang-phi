'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useModelYear, useSetModelYear } from './store'

const currentYear = new Date().getFullYear()
const MODEL_YEARS = Array.from({ length: currentYear - 1975 + 1 }, (_, i) =>
  String(currentYear - i),
)

export function ModelYearSelection() {
  const modelYear = useModelYear()
  const setModelYear = useSetModelYear()

  return (
    <Select
      value={modelYear ?? '__all__'}
      onValueChange={(val) => setModelYear(val === '__all__' ? null : val)}
    >
      <SelectTrigger className="w-44 bg-card border-accent-foreground text-primary">
        <SelectValue placeholder="Năm sản xuất" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__all__">Tất cả</SelectItem>
        {MODEL_YEARS.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
