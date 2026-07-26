'use client'

import { useQuery } from '@tanstack/react-query'
import ProductCard from './ProductCard'
import { useSearchParams } from 'next/navigation'
import { ProductsPaginationResult } from '../actions/get-products'
import { getProductsApi } from '../fetch-api/get-products-list'
import { ProductsPagination } from './ProductList.Pagination'

export default function ProductList() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const vehicleMakeName = searchParams.get('vehicle-make')
  const vehicleModelName = searchParams.get('vehicle-model')

  const { data } = useQuery<ProductsPaginationResult>({
    queryKey: ['products', vehicleMakeName, vehicleModelName, page],
    queryFn: () =>
      getProductsApi({
        page,
        vehicleMakeName,
        vehicleModelName,
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
        <div className={'grid grid-cols-[320px_1fr_260px] bg-primary'}>
          <div className="px-6 h-full border border-accent">
            <span className="text-base font-semibold text-primary-foreground"></span>
          </div>
          <div className="px-6 h-full border border-accent py-4">
            <span className="text-base font-semibold text-primary-foreground">
              THÔNG SỐ KỸ THUẬT
            </span>
          </div>
          <div className="px-6 h-full border border-accent py-4">
            <span className="text-base font-semibold text-primary-foreground">TƯƠNG THÍCH</span>
          </div>
        </div>

        {/* Table Rows */}
        {products?.map((item, idx) => {
          return (
            <ProductCard
              key={idx}
              product={item.product}
              vehicleModel={item.vehicleModel ?? null}
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
