import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { VehicleModel } from '@/payload-types'
import type { PaginationResult } from '@/types/pagination-result'

export async function ModelSelection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/vehicle-models`,
    {
      next: { tags: ['vehicle-models'] },
    },
  )

  const { docs: models } = (await res.json()) as PaginationResult<VehicleModel>

  return (
    <Select defaultValue={models[0]?.name?.toLowerCase() || ''}>
      <SelectTrigger className="w-[180px] bg-card border-accent-foreground text-primary">
        <SelectValue placeholder="Model" />
      </SelectTrigger>
      <SelectContent>
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
