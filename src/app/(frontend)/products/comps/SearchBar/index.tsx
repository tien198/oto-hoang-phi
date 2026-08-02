import { Suspense } from 'react'
import { ChevronsRight } from 'lucide-react'
import clsx from 'clsx'

import { MakeSelection } from './MakeSelection'
import { ModelSelection } from './ModelSelection'
// import { ModelYearSelection } from './ModelYearSelection'
import { ProductNameSearch } from './ProductNameInput'
import { SearchBtn } from './SearchBtn'
import { SearchForm } from './SearchForm'
import { getMakes, getModels } from '../cache/get-cache'

function SelectsSkeleton() {
  return (
    <>
      <div className={clsx('w-full h-10 bg-gray-200 animate-pulse rounded-md', 'md:w-44')} />
      <div className={clsx('w-full h-10 bg-gray-200 animate-pulse rounded-md', 'md:w-44')} />
    </>
  )
}

async function SearchSelects() {
  const [makes, models] = await Promise.all([getMakes(), getModels()])
  return (
    <>
      <MakeSelection makes={makes} />
      <ModelSelection models={models} />
    </>
  )
}

export default function SearchBar() {
  return (
    <div
      className={clsx(
        // Base / Mobile
        'flex flex-col w-full gap-4 py-4 bg-card border-b border-accent-foreground ',
        'sticky top-0 z-10',
        // Desktop
        'md:flex-row md:items-center',
      )}
    >
      <SearchForm>
        <div className={clsx('hidden items-center gap-2', 'lg:flex')}>
          <ChevronsRight className="w-6 h-6 text-primary" />
        </div>
        <ProductNameSearch />
        <div
          className={clsx(
            // Base / Mobile
            'flex flex-col shrink gap-4',
            // Tablet
            'sm:flex-row sm:items-center',
            // Desktop
            'md:w-auto',
          )}
        >
          <Suspense fallback={<SelectsSkeleton />}>
            <SearchSelects />
          </Suspense>
          {/* <ModelYearSelection /> */}
          <SearchBtn />
        </div>
      </SearchForm>
    </div>
  )
}
