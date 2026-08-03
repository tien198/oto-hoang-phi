import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProductsCarouselClient, type ProductType } from './ProductsCarouselClient'

export const ProductsSection = async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    limit: 9,
    sort: '-createdAt',
    depth: 1,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const products: ProductType[] = result.docs.map((doc) => {
    const gallery = doc.gallery
    const firstImage = gallery?.[0]?.image
    const imageUrl =
      typeof firstImage === 'object' && firstImage !== null ? (firstImage.url ?? '') : ''

    return {
      name: doc.name,
      price: `${(doc.price ?? 0).toLocaleString('vi-VN')}đ`,
      sku: doc.OEno ?? '',
      image: imageUrl,
    }
  })

  return (
    <section
      id="products"
      className="w-full bg-white py-16 md:py-20 px-5 md:px-20 flex flex-col gap-12"
    >
      <div className="flex flex-col gap-4 items-center text-center">
        <span className="text-primary text-sm font-extralight md:font-light tracking-[2px] uppercase">
          SẢN PHẨM MỚI
        </span>
        <h2 className="text-accent-foreground text-3xl md:text-[32px] font-light">
          Lướt sang để xem phụ tùng mới
        </h2>
      </div>

      <ProductsCarouselClient products={products} />
    </section>
  )
}
