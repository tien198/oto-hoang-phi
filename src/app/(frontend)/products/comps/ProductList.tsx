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
        <h2 className="text-[#08210e] text-[22px] font-semibold uppercase">KẾT QUẢ TÌM KIẾM</h2>
        <div className="h-[3px] bg-primary w-[120px]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products?.map((item, idx) => (
          <ProductCard
            key={idx}
            title={item.product.name ?? ''}
            // sku={item.product.gallery}
            imageUrl={item.media ?? ''}
            price={item.product.price ?? NaN}
          />
        ))}
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
