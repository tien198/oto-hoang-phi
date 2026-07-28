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
import { genProductParams } from '../fetch-api/get-products-list'
import Link from 'next/link'

type Props = {
  pagination: PaginationResult
  page: number
  vehicleMakeName: string | null
  vehicleModelName: string | null
}

export function ProductsPagination({ pagination, page, vehicleMakeName, vehicleModelName }: Props) {
  const { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = pagination

  // if (!totalPages || totalPages <= 1) return null
  if (!totalPages || totalPages < 1) return null

  const getPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i)
      } else if (i === page - 2 || i === page + 2) {
        pages.push('...')
      }
    }
    /*
    when we need ellipses on both sides of the active window (e.g. [1, '...', 4, 5, 6, '...', 10]), the filter function checks if the current index is equal to the first index where the string '...' is found using indexOf('...').
    -- return pages.filter((p, index, arr) => arr.indexOf(p) === index)
    */
    return pages
  }

  return (
    <div className="flex justify-center mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Link
              href={
                hasPrevPage
                  ? '?' + genProductParams(prevPage, vehicleMakeName, vehicleModelName)
                  : '#'
              }
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
                <Link href={'?' + genProductParams(Number(p), vehicleMakeName, vehicleModelName)}>
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
              href={
                hasNextPage
                  ? '?' + genProductParams(nextPage, vehicleMakeName, vehicleModelName)
                  : '#'
              }
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
