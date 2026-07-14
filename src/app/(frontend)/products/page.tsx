import SearchBar from './comps/SearchBar'
import BrandSidebar from './comps/BrandSidebar'
import ProductList from './comps/ProductList'
import clsx from 'clsx'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center w-full pb-20 font-sans">
      <div className="w-full max-w-[1440px]">
        <SearchBar />

        <div className={clsx('flex flex-col lg:flex-row gap-8 px-4 md:px-6 lg:px-8 w-full mt-8')}>
          <BrandSidebar />
          <ProductList />
        </div>
      </div>
    </div>
  )
}
