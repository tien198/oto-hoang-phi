import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { VehicleMakeResult } from '@/app/(frontend)/api/vehicle-makes-generation/route'
import { PaginationResult } from '@/types/pagination-result'

export async function MakeSelection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/vehicle-makes`,
    {
      next: { tags: ['vehicle-makes'] },
    },
  )

  const { docs: makes } = (await res.json()) as PaginationResult<VehicleMakeResult>

  return (
    <Select defaultValue={makes[0]?.name?.toLowerCase() || ''}>
      <SelectTrigger className="w-[180px] bg-card border-accent-foreground text-primary">
        <SelectValue placeholder="Brand" />
      </SelectTrigger>
      <SelectContent>
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
