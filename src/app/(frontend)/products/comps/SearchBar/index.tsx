import { ChevronsRight } from 'lucide-react'
import clsx from 'clsx'
import type { VehicleMake, VehicleModel } from '@/payload-types'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

import { MakeSelection } from './MakeSelection'
import { ModelSelection } from './ModelSelection'
// import { ModelYearSelection } from './ModelYearSelection'
import { ProductNameSearch } from './ProductNameInput'
import { SearchBtn } from './SearchBtn'
import { SearchForm } from './SearchForm'

import { unstable_cache } from 'next/cache'

const getMakes = unstable_cache(
  async () => {
    const payload = await getPayload({ config: payloadConfig })
    const res = await payload.find({ collection: 'vehicle-makes', limit: 1000 })
    return res.docs as VehicleMake[]
  },
  ['vehicle-makes'],
  { tags: ['vehicle-makes'] },
)

const getModels = unstable_cache(
  async () => {
    const payload = await getPayload({ config: payloadConfig })
    const res = await payload.find({ collection: 'vehicle-models', limit: 1000 })
    return res.docs as VehicleModel[]
  },
  ['vehicle-models'],
  { tags: ['vehicle-models'] },
)

export default async function SearchBar() {
  const [makes, models] = await Promise.all([getMakes(), getModels()])

  return (
    <div
      className={clsx(
        'flex items-center gap-4 p-4 md:px-6 bg-card border-b border-accent-foreground w-full flex-wrap',
        'sticky top-0',
      )}
    >
      <SearchForm>
        <div className="flex items-center gap-2">
          <ChevronsRight className="w-6 h-6 text-primary" />
        </div>
        <ProductNameSearch />
        <div className="flex items-center gap-4 flex-wrap">
          <MakeSelection makes={makes} />
          <ModelSelection models={models} />
          {/* <ModelYearSelection /> */}
          <SearchBtn />
        </div>
      </SearchForm>
    </div>
  )
}
