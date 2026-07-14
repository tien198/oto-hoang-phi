import { Button } from '@/components/ui/button'

interface ProductCardProps {
  title: string
  sku: string
  imageUrl: string
  price: number
}

export default function ProductCard({ title, sku, imageUrl, price }: ProductCardProps) {
  return (
    <div className="flex flex-col border border-[#e5e5e5] rounded-lg bg-[#fafafa] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6 flex justify-center border-b border-[#e5e5e5] bg-white">
        <div className="w-full h-[160px] bg-gray-50 rounded flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
          ) : (
            <div className="text-gray-300">No Image</div>
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col gap-2 flex-1">
        <h3 className="text-[#0a0a0a] text-xl font-medium line-clamp-2 leading-tight">{title}</h3>
        <p className="text-[#737373] text-base">{sku}</p>
      </div>
      <div className="px-6 pb-6 flex items-center justify-between">
        <div className="bg-[#171717] text-white text-xs px-3 py-1 rounded-full font-medium">
          {price.toLocaleString('vn-vi')}
        </div>
        <Button
          variant="outline"
          className="border-[#e5e5e5] bg-[#fafafa] shadow-sm hover:bg-accent hover:border hover:border-accent-foreground"
        >
          Chi tiết
        </Button>
      </div>
    </div>
  )
}
