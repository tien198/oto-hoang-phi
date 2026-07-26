import SearchBar from './comps/SearchBar'
import BrandSidebar from './comps/BrandSidebar'
import ProductList from './comps/ProductList'
import clsx from 'clsx'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getProductsPagination } from './actions/get-products'

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}
export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params.page) ?? 1
  const vehicleMake = params['vehicle-make'] as string | undefined
  const vehicleModel = params['vehicle-model'] as string | undefined

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products', vehicleMake, vehicleModel, page],
    queryFn: async () =>
      await getProductsPagination({
        page: Number(page),
        vehicleMakeName: vehicleMake,
        vehicleModelName: vehicleModel,
      }),
  })

  return (
    <div className="min-h-screen bg-background flex flex-col items-center w-full pb-20 font-sans">
      <div className="w-full max-w-[90vw]">
        <SearchBar />

        <div className={clsx('flex flex-col lg:flex-row gap-8 px-4 md:px-6 lg:px-4 w-full mt-8')}>
          <BrandSidebar />
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductList />
          </HydrationBoundary>
        </div>
      </div>
    </div>
  )
}
