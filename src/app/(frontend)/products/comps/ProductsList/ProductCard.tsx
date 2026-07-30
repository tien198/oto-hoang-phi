import RichText from '@/components/RichText'
import type { Product } from '@/payload-types'
// import { products, vehicle_models } from '@/payload-generated-schema'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
  imgUrl: string
}

export default function ProductCard({ product, imgUrl }: ProductCardProps) {
  const { name, slug, price, OEno, warranty } = product

  return (
    <div className="grid grid-cols-[320px_1fr_260px] w-full border-b border-primary last:border-b-0">
      {/* Image Column */}
      <div className="flex flex-col items-center justify-center py-10">
        <div className="flex items-center justify-center overflow-hidden">
          {imgUrl ? (
            <img src={imgUrl} alt={name ?? ''} className="w-full h-full object-cover" />
          ) : (
            <div className="text-muted-foreground text-sm">No Image</div>
          )}
        </div>
      </div>

      {/* Specs Column */}
      <div className="flex flex-col gap-6 px-8 py-10 border-r border-primary">
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-xl font-semibold text-foreground leading-normal">{name ?? ''}</h3>

          <div className="w-fit px-6 bg-primary border border-primary rounded-full">
            <span className="text-base font-semibold text-white whitespace-nowrap ">
              {price ? price.toLocaleString('vi-VN') : NaN} ₫
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <span className="text-sm text-foreground">Mã OE: {OEno ?? ''}</span>

          <span className="text-sm text-foreground">
            Bảo hành: <i>{warranty ?? NaN}</i> tháng
          </span>
        </div>
      </div>

      {/* Application Column */}
      <div className="flex flex-col gap-1 py-6">
        {product['compatible-description'] && (
          <RichText data={product['compatible-description']} className="px-2 text-base" />
        )}
      </div>
    </div>
  )
}
