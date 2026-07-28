import { ChevronsRight } from 'lucide-react'
import clsx from 'clsx'
import type { PaginationResult } from '@/types/pagination-result'
import type { VehicleMake, VehicleModel } from '@/payload-types'

import { MakeSelection } from './MakeSelection'
import { ModelSelection } from './ModelSelection'
import { ModelYearSelection } from './ModelYearSelection'
import { ProductNameSearch } from './ProductNameInput'
import { SearchBtn } from './SearchBtn'

export default async function SearchBar() {
  const [makesRes, modelsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/vehicle-makes`, {
      next: { tags: ['vehicle-makes'] },
    }),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/vehicle-models?limit=1000`,
      {
        next: { tags: ['vehicle-models'] },
      },
    ),
  ])

  const { docs: makes } = (await makesRes.json()) as PaginationResult<VehicleMake>
  const { docs: models } = (await modelsRes.json()) as PaginationResult<VehicleModel>

  return (
    <div
      className={clsx(
        'flex items-center gap-4 p-4 md:px-6 bg-card border-b border-accent-foreground w-full flex-wrap',
        'sticky top-0',
      )}
    >
      <div className="flex items-center gap-2">
        <ChevronsRight className="w-6 h-6 text-primary" />
      </div>
      <ProductNameSearch />
      <div className="flex items-center gap-4 flex-wrap">
        <MakeSelection makes={makes} />
        <ModelSelection models={models} />
        <ModelYearSelection />
        <SearchBtn />
      </div>
    </div>
  )
}
