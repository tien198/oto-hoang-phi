import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export const ProductsSection = () => {
  const products = [
    {
      sku: 'BN-2004',
      name: 'Bơm nước làm mát',
      price: '1,200,000đ',
      image: '/generated-1783491561656.png',
    },
    {
      sku: 'LD-2001',
      name: 'Lọc dầu động cơ',
      price: '150,000đ',
      image: '/generated-1783491561213.png',
    },
    {
      sku: 'MP-2002',
      name: 'Má phanh trước',
      price: '850,000đ',
      image: '/generated-1783491561249.png',
    },
  ]

  return (
    <section
      id="products"
      className="w-full bg-white py-16 md:py-20 px-5 md:px-20 flex flex-col gap-12"
    >
      <div className="flex flex-col gap-4 items-center text-center">
        <span className="text-[#9f0712] text-sm font-bold tracking-[2px] uppercase">SẢN PHẨM</span>
        <h2 className="text-[#0a0a0a] text-3xl md:text-[32px] font-bold">Phụ Tùng Nổi Bật</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <Card
            key={idx}
            className="overflow-hidden hover:shadow-md transition-shadow border-gray-100 rounded-xl bg-white"
          >
            <div className="w-full h-[240px] bg-gray-50 flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <CardHeader className="px-6 py-4 pb-2">
              <CardDescription className="text-sm font-medium">SKU: {product.sku}</CardDescription>
              <CardTitle className="text-lg font-bold text-gray-900">{product.name}</CardTitle>
            </CardHeader>
            <CardFooter className="px-6 pb-6 pt-2 flex items-center justify-between">
              <span className="text-[#9f0712] font-bold text-lg">{product.price}</span>
              <Button
                variant="outline"
                className="text-sm font-semibold border hover:border-primary px-4 py-2 rounded-full hover:text-primary transition-colors"
              >
                Xem chi tiết
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
