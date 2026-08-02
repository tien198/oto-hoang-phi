import { ChevronsRight } from 'lucide-react'
import clsx from 'clsx'

import { MakeSelection } from './MakeSelection'
import { ModelSelection } from './ModelSelection'
// import { ModelYearSelection } from './ModelYearSelection'
import { ProductNameSearch } from './ProductNameInput'
import { SearchBtn } from './SearchBtn'
import { SearchForm } from './SearchForm'
import { getMakes, getModels } from '../cache/get-cache'

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
