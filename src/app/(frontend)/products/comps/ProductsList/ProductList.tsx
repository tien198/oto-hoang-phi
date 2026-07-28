'use client'

import { useQuery } from '@tanstack/react-query'
import ProductCard from './ProductCard'
import { useSearchParams } from 'next/navigation'
import { ProductsPaginationResult } from '../../actions/get-products'
import { getProductsApi } from '../../fetch-api/get-products-list'
import { ProductsPagination } from './ProductList.Pagination'
import clsx from 'clsx'

export default function ProductList() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const vehicleMakeName = searchParams.get('vehicle-make')
  const vehicleModelName = searchParams.get('vehicle-model')
  const modelYear = searchParams.get('model-year')

  const { data } = useQuery<ProductsPaginationResult>({
    queryKey: ['products', page, vehicleMakeName, vehicleModelName, modelYear],
    queryFn: () =>
      getProductsApi({
        page,
        vehicleMakeName,
        vehicleModelName,
        modelYear,
      }),
  })

  const products = data?.docs

  return (
    <div className="flex flex-col gap-6 w-full flex-1">
      <div className="flex flex-col gap-2">
        <h2 className="text-foreground text-[22px] font-semibold uppercase">KẾT QUẢ TÌM KIẾM</h2>
        <div className="h-[3px] bg-primary w-[120px]"></div>
      </div>

      <div className="flex flex-col">
        {/* Table Header */}
        <div
          className={clsx(
            'grid grid-cols-[320px_1fr_260px] bg-primary',
            'text-base font-semibold text-primary-foreground',
          )}
        >
          <div className="px-6 h-full border border-accent py-4">
            <span>#</span>
          </div>
          <div className="px-6 h-full border border-accent py-4">
            <span>THÔNG SỐ KỸ THUẬT</span>
          </div>
          <div className="px-6 h-full border border-accent py-4">
            <span>TƯƠNG THÍCH</span>
          </div>
        </div>

        {/* Table Rows */}
        {products?.map((item, idx) => {
          return (
            <ProductCard
              key={idx}
              product={item.product}
              modelFitments={(item.fitments as any) ?? null}
              imgUrl={item.media ?? ''}
            />
          )
        })}
      </div>
      {data?.pagination && (
        <ProductsPagination
          pagination={data.pagination}
          page={page}
          vehicleMakeName={vehicleMakeName}
          vehicleModelName={vehicleModelName}
        />
      )}
    </div>
  )
}
