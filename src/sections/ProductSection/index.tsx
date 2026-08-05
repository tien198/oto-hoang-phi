import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProductsCarouselClient, type ProductType } from './ProductsCarouselClient'

export const ProductsSection = async () => {
  const payload = await getPayload({ config: configPromise })
  const db = payload.db.drizzle

  const result = await db.query.products.findMany({
    limit: 9,
    orderBy: (products, { desc }) => [desc(products.createdAt)],
    where: (products, { eq }) => eq(products._status, 'published'),
    with: {
      gallery: {
        limit: 1,
        orderBy: (gallery, { asc }) => [asc(gallery._order)],
        with: {
          image: {
            columns: {
              url: true,
              sizes_thumbnail_url: true,
            },
          },
        },
      },
    },
  })

  const products: ProductType[] = result.map((doc) => {
    const gallery = doc.gallery
    const image = gallery?.[0]?.image

    return {
      name: doc.name ?? '',
      price: `${(doc.price ?? 0).toLocaleString('vi-VN')}đ0`,
      sku: doc.OEno ?? '',
      image: image,
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
