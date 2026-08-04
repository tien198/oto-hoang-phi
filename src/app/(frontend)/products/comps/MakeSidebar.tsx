import { Suspense } from 'react'
import { ChevronRight } from 'lucide-react'
import { getMakes } from './cache/get-cache'
import Link from 'next/link'
import { MakesListSkeleton } from './MakeSidebar.Skeleton'
import clsx from 'clsx'

async function MakesList() {
  const makes = await getMakes()

  return (
    <div className="flex flex-col">
      {makes.map((make, idx) => (
        <Link
          key={idx}
          href={`/products?vehicle-make=${make.name.toLowerCase()}`}
          className={`flex items-center justify-between p-4 cursor-pointer hover:bg-muted hover:text-primary transition-colors ${idx % 2 === 0 ? '' : 'bg-secondary'}`}
        >
          <span className="text-[15px]">
            {make.name.charAt(0).toUpperCase() + make.name.slice(1)}
          </span>
          <ChevronRight className="w-4 h-4 text-foreground" />
        </Link>
      ))}
    </div>
  )
}

export default function BrandSidebar() {
  return (
    <div className={clsx('hidden', 'lg:flex flex-col gap-6 shrink-0 w-full', 'lg:w-75')}>
      <div className="flex flex-col border border-accent rounded-sm bg-card overflow-hidden">
        <div className="bg-primary p-4">
          <h3 className="text-accent font-semibold text-base">PHỤ TÙNG CHÍNH HÃNG</h3>
        </div>
        <Suspense fallback={<MakesListSkeleton />}>
          <MakesList />
        </Suspense>
      </div>

      <div className="flex items-center justify-between p-4 text-accent-foreground bg-primary cursor-pointer hover:opacity-80 transition-opacity">
        <span className="font-semibold text-base mr-2">PHỤ TÙNG OEM</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  )
}
