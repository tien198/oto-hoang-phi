import { Suspense } from 'react'
import SearchBar from './comps/SearchBar'
import BrandSidebar from './comps/MakeSidebar'
import ProductList from './comps/ProductsList/ProductList'
import ProductListSkeleton from './comps/ProductsList/ProductList.Skeleton'
import clsx from 'clsx'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getProductsPagination } from './actions/get-products'
import { generateProductsQueryKey } from './tanstack-ultils/generate-querry-key'

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}
export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params.page) ?? 1
  const productName = params['product-name'] as string | undefined
  const vehicleMakeName = params['vehicle-make'] as string | undefined
  const vehicleModelName = params['vehicle-model'] as string | undefined

  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: generateProductsQueryKey({
      page,
      productName,
      vehicleMakeName,
      vehicleModelName,
    }),

    queryFn: async () =>
      await getProductsPagination({
        page,
        productName,
        vehicleMakeName,
        vehicleModelName,
      }),
  })

  return (
    <div className="min-h-screen bg-background flex flex-col items-center w-full pb-20 font-sans">
      <div className="w-full max-w-[90vw]">
        <SearchBar />

        <div className={clsx('flex flex-col lg:flex-row gap-8 lg:px-4 w-full mt-8')}>
          <BrandSidebar />
          <Suspense key={JSON.stringify(params)} fallback={<ProductListSkeleton />}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ProductList />
            </HydrationBoundary>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
