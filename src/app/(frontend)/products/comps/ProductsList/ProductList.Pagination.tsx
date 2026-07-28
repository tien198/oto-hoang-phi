'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Pagination as PaginationResult } from '@/types/pagination'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {
  pagination: PaginationResult
  page: number
  vehicleMakeName?: string | null
  vehicleModelName?: string | null
}

export function ProductsPagination({ pagination, page }: Props) {
  const { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = pagination
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // if (!totalPages || totalPages <= 1) return null
  if (!totalPages || totalPages < 1) return null

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const getPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i)
      } else if (i === page - 2 || i === page + 2) {
        pages.push('...')
      }
    }
    return pages
  }

  return (
    <div className="flex justify-center mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Link
              href={hasPrevPage && prevPage ? createPageURL(prevPage) : '#'}
            >
              <PaginationPrevious
                className={`border border-transparent text-[#737373] ${
                  !hasPrevPage ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-100'
                }`}
              />
            </Link>
          </PaginationItem>

          {getPageNumbers().map((p, i) => (
            <PaginationItem key={i}>
              {p === '...' ? (
                <PaginationEllipsis />
              ) : (
                <Link href={createPageURL(Number(p))}>
                  <PaginationLink
                    isActive={p === page}
                    className={
                      p === page
                        ? 'border-[#e5e5e5] bg-[#fafafa] text-[#0a0a0a] font-semibold'
                        : 'border-transparent hover:bg-gray-100 text-[#0a0a0a]'
                    }
                  >
                    {p}
                  </PaginationLink>
                </Link>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <Link
              href={hasNextPage && nextPage ? createPageURL(nextPage) : '#'}
            >
              <PaginationNext
                className={`border border-transparent text-[#0a0a0a] ${
                  !hasNextPage ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-100'
                }`}
              />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
