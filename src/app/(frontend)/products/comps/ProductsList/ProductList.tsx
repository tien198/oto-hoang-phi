'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import ProductCard from './ProductCard'
import { useSearchParams } from 'next/navigation'
import { ProductsPaginationResult } from '../../actions/get-products'
import { getProductsApi } from '../../fetch-api/get-products-list'
import { ProductsPagination } from './ProductList.Pagination'
import clsx from 'clsx'
import { Product } from '@/payload-types'
import { generateProductsQueryKey } from '../../tanstack-ultils/generate-querry-key'

export default function ProductList() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const productName = searchParams.get('product-name')
  const vehicleMakeName = searchParams.get('vehicle-make')
  const vehicleModelName = searchParams.get('vehicle-model')

  const { data } = useSuspenseQuery<ProductsPaginationResult>({
    queryKey: generateProductsQueryKey({
      page,
      productName,
      vehicleMakeName,
      vehicleModelName,
    }),
    queryFn: () =>
      getProductsApi({
        page,
        productName,
        vehicleMakeName,
        vehicleModelName,
      }),
  })

  const products = data?.docs

  return (
    <div className="flex flex-col gap-6 w-full flex-1">
      <div className="flex flex-col gap-2">
        <h2 className="text-foreground text-[22px] font-semibold uppercase">KẾT QUẢ TÌM KIẾM</h2>
        <div className="h-0.5 bg-primary w-30"></div>
      </div>

      <div className="flex flex-col">
        {/* Table Header */}
        <div
          className={clsx(
            'hidden',
            // Desktop
            'md:grid md:grid-cols-[220px_1fr_200px] xl:grid-cols-[320px_1fr_260px] bg-primary',
            'text-base font-semibold text-primary-foreground',
          )}
        >
          <div className="px-6 h-full border border-accent py-4">
            <span># HÌNH ẢNH</span>
          </div>
          <div className="px-6 h-full border border-accent py-4">
            <span>THÔNG TIN</span>
          </div>
          <div className="px-6 h-full border border-accent py-4">
            <span>MÔ TẢ TƯƠNG THÍCH</span>
          </div>
        </div>

        {/* Table Rows */}
        {products?.map((item, idx) => {
          return <ProductCard key={idx} product={item.prod as Product} imgUrl={item.img ?? ''} />
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
