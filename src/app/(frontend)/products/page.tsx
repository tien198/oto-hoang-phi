import SearchBar from './comps/SearchBar'
import BrandSidebar from './comps/BrandSidebar'
import ProductList from './comps/ProductList'
import clsx from 'clsx'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getProducts } from './actions/get-products'

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}
export default async function ProductsPage({ searchParams }: Props) {
  const page = Number((await searchParams).page) || 1

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products', page],
    queryFn: async () => await getProducts(page),
  })

  return (
    <div className="min-h-screen bg-background flex flex-col items-center w-full pb-20 font-sans">
      <div className="w-full max-w-[1440px]">
        <SearchBar />

        <div className={clsx('flex flex-col lg:flex-row gap-8 px-4 md:px-6 lg:px-8 w-full mt-8')}>
          <BrandSidebar />
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductList />
          </HydrationBoundary>
        </div>
      </div>
    </div>
  )
}
