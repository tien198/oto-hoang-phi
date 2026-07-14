import ProductCard from './ProductCard'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const products = [
  {
    title: 'Bơm nước làm mát',
    sku: 'SKU: BN-2004',
    imageUrl: '/generated-1783491561656.png',
    price: 1000000,
  },
  {
    title: 'Lọc dầu động cơ',
    sku: 'SKU: LD-2001',
    imageUrl: '/generated-1783491561213.png',
    price: 1000000,
  },
  {
    title: 'Má phanh trước',
    sku: 'SKU: MP-2002',
    imageUrl: 'generated-1783491561249.png',
    price: 1000000,
  },
  { title: 'Curoa cam', sku: 'SKU: CR-2003', imageUrl: '', price: 1000000 },
  { title: 'Bugi Toyota Innova', sku: 'SKU: BG-2000', imageUrl: '', price: 1000000 },
]

export default function ProductList() {
  return (
    <div className="flex flex-col gap-6 w-full flex-1">
      <div className="flex flex-col gap-2">
        <h2 className="text-[#08210e] text-[22px] font-semibold uppercase">KẾT QUẢ TÌM KIẾM</h2>
        <div className="h-[3px] bg-[#9f0712] w-[120px]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            title={product.title}
            sku={product.sku}
            imageUrl={product.imageUrl}
            price={product.price}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="border border-transparent hover:bg-gray-100 text-[#737373]"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className="border-[#e5e5e5] bg-[#fafafa] text-[#0a0a0a] font-semibold"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="border-transparent hover:bg-gray-100 text-[#0a0a0a]"
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="border-transparent hover:bg-gray-100 text-[#0a0a0a]"
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                className="border border-transparent hover:bg-gray-100 text-[#0a0a0a]"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
