import { Suspense } from 'react'
import { ChevronsRight, Search } from 'lucide-react'
import clsx from 'clsx'

import { MakeSelection } from './MakeSelection'
import { ModelSelection } from './ModelSelection'
// import { ModelYearSelection } from './ModelYearSelection'
import { ProductNameSearch } from './ProductNameInput'
import { SearchBtn } from './SearchBtn'
import { SearchForm } from './SearchForm'
import { getMakes, getModels } from '../cache/get-cache'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

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

function SearchFormContent() {
  return (
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
  )
}

export default function SearchBar() {
  return (
    <div
      className={clsx('w-full py-4 bg-card border-b border-accent-foreground', 'sticky top-0 z-10')}
    >
      {/* Mobile view - Drawer */}
      <div className="flex w-full md:hidden items-center justify-between">
        <h2 className="font-semibold text-primary">Tìm kiếm phụ tùng</h2>
        <Drawer>
          <DrawerTrigger>
            <Button variant="outline" size="icon">
              <Search className="w-4 h-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Bộ lọc tìm kiếm</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-4 p-4">
              <SearchFormContent />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop view - Inline form */}
      <div className="hidden md:flex md:w-full md:items-center md:gap-4">
        <SearchFormContent />
      </div>
    </div>
  )
}
