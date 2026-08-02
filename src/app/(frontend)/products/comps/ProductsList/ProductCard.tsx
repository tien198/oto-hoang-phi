import RichText from '@/components/RichText'
import type { Product } from '@/payload-types'
// import { products, vehicle_models } from '@/payload-generated-schema'
import Link from 'next/link'
import clsx from 'clsx'

interface ProductCardProps {
  product: Product
  imgUrl: string
}

export default function ProductCard({ product, imgUrl }: ProductCardProps) {
  const { name, slug, price, OEno, warranty } = product

  return (
    <div
        className={clsx(
          // Base / Mobile
          'flex flex-col w-full border-b border-primary last:border-b-0',
          // Desktop
          'md:grid md:grid-cols-[220px_1fr_200px] xl:grid-cols-[320px_1fr_260px]',
        )}
    >
      {/* Image Column */}
      <div
        className={clsx(
          // Base / Mobile
          'flex flex-col items-center justify-center py-6 border-b border-primary',
          // Desktop
          'md:py-8 md:border-b-0 xl:py-10',
        )}
      >
        <div className="flex items-center justify-center overflow-hidden">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={name ?? ''}
              className={clsx(
                // Base / Mobile
                'w-full max-h-64 object-contain',
                // Desktop
                'md:h-full md:object-cover md:max-h-none',
              )}
            />
          ) : (
            <div className="text-muted-foreground text-sm">No Image</div>
          )}
        </div>
      </div>

      {/* Specs Column */}
      <div
        className={clsx(
          // Base / Mobile
          'flex flex-col gap-4 px-4 py-6 border-b border-primary',
          // Desktop
          'md:gap-4 md:px-6 md:py-8 md:border-r md:border-b-0 md:border-primary xl:gap-6 xl:px-8 xl:py-10',
        )}
      >
        <div className="flex flex-1 flex-col gap-2">
          <h3
            className={clsx(
              // Base / Mobile
              'text-md font-semibold text-foreground leading-normal',
              // Desktop
              'md:text-xl',
            )}
          >
            {name ?? ''}
          </h3>

          <div
            className={clsx(
              // Base / Mobile
              'w-fit px-4 bg-primary border border-primary rounded-full',
              // Desktop
              'md:px-6',
            )}
          >
            <span
              className={clsx(
                // Base / Mobile
                'text-sm font-semibold text-white whitespace-nowrap',
                // Desktop
                'md:text-base',
              )}
            >
              {price ? price.toLocaleString('vi-VN') : NaN} ₫
            </span>
          </div>
        </div>

        <div
          className={clsx(
            // Base / Mobile
            'grid grid-cols-1 gap-2',
            // Tablet
            'sm:grid-cols-2 sm:gap-4',
            // Desktop
            'md:gap-6 xl:gap-8',
          )}
        >
          <span className="text-sm text-foreground">Mã OE: {OEno ?? ''}</span>

          <span className="text-sm text-foreground">
            Bảo hành: <i>{warranty ?? NaN}</i> tháng
          </span>
        </div>
      </div>

      {/* Application Column */}
      <div
        className={clsx(
          // Base / Mobile
          'flex flex-col gap-1 py-6 px-4',
          // Desktop
          'md:px-0',
        )}
      >
        {product['compatible-description'] && (
          <RichText
            data={product['compatible-description']}
            className={clsx(
              // Base / Mobile
              'px-0 text-sm',
              // Desktop
              'md:px-2 md:text-base',
            )}
          />
        )}
      </div>
    </div>
  )
}
