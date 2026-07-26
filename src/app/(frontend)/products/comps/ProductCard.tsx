import { products, vehicle_models } from '@/payload-generated-schema'
import Link from 'next/link'

type Product = typeof products.$inferSelect
type VehicleModel = typeof vehicle_models.$inferSelect
interface ProductCardProps {
  product: Product
  vehicleModel: VehicleModel | null
  imgUrl: string
}

export default function ProductCard({ product, vehicleModel, imgUrl }: ProductCardProps) {
  const { name, slug, price, OEno, weight, warranty, size_x, size_y, size_z } = product
  const sizeStr = `${size_x ?? 0}x${size_y ?? 0}x${size_z ?? 0}`

  const vehicleModels: string[] = []
  if (vehicleModel?.name) {
    vehicleModels.push(vehicleModel.name)
  }
  if (product['model-fitments']) {
    for (const fitment of product['model-fitments']) {
      const model = fitment as VehicleModel
      if (model?.name && !vehicleModels.includes(model.name)) {
        vehicleModels.push(model.name)
      }
    }
  }

  const displayModels = vehicleModels?.slice(0, 3) ?? []
  const hasMoreModels = (vehicleModels?.length ?? 0) > 3

  return (
    <div className="flex flex-row w-full border-b border-primary last:border-b-0">
      {/* Image Column */}
      <div className="w-[260px] shrink-0 flex flex-col items-center justify-center py-10">
        <div className="flex items-center justify-center overflow-hidden">
          {imgUrl ? (
            <img src={imgUrl} alt={name ?? ''} className="w-full h-full object-cover" />
          ) : (
            <div className="text-muted-foreground text-sm">No Image</div>
          )}
        </div>
      </div>

      {/* Specs Column */}
      <div className="flex-1 flex flex-col gap-6 px-8 py-6 border-r border-primary py-10">
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-xl font-semibold text-foreground leading-normal">{name ?? ''}</h3>

          <div className="w-fit px-6 bg-primary border border-primary rounded-full">
            <span className="text-base font-semibold text-white whitespace-nowrap ">
              {price ? price.toLocaleString('vi-VN') : NaN} ₫
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-8">
          {/* Spec Left */}
          <div className="flex-1 flex flex-col gap-4">
            <span className="text-sm text-foreground">Mã OE: {OEno ?? ''}</span>
            <span className="text-sm text-foreground">Kích thước: {sizeStr ?? ''} mm</span>
          </div>
          {/* Spec Right */}
          <div className="flex-1 flex flex-col gap-4">
            <span className="text-sm text-foreground">Trọng lượng: {weight ?? NaN} KG</span>

            <span className="text-sm text-foreground">Bảo hành: {warranty ?? NaN} tháng</span>
          </div>
        </div>
      </div>

      {/* Application Column */}
      <div className="w-[320px] shrink-0 flex flex-col gap-4 px-8 py-10">
        <div className="p-3">
          <p className="text-sm leading-[21px] text-foreground">
            {displayModels.map((model, idx) => (
              <span key={idx}>
                {model}
                {idx < displayModels.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
        {/* {(hasMoreModels || slug) && (
          <Link
            href={slug ? `/products/${slug}` : '#'}
            className="text-sm font-bold text-foreground hover:text-primary transition-colors"
          >
            Xem Thêm
          </Link>
        )} */}
      </div>
    </div>
  )
}
