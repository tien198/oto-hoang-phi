import { ChevronRight } from 'lucide-react'
import { getMakes } from './cache/get-cache'
import Link from 'next/link'

export default async function BrandSidebar() {
  const makes = await getMakes()

  return (
    <div className={'w-full lg:w-[300px] flex flex-col gap-6 flex-shrink-0'}>
      <div className="flex flex-col border border-[#e5e5e5] rounded-sm bg-[#fafafa] overflow-hidden">
        <div className="bg-primary p-4">
          <h3 className="text-[#fef2f2] font-semibold text-base">PHỤ TÙNG CHÍNH HÃNG</h3>
        </div>
        <div className="flex flex-col">
          {makes.map((make, idx) => (
            <Link
              key={idx}
              href={`/products?vehicle-make=${make.name.toLowerCase()}`}
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-muted hover:text-primary transition-colors ${idx % 2 === 0 ? '' : 'bg-secondary'}`}
            >
              <span className="text-[15px]">{make.name.charAt(0).toUpperCase() + make.name.slice(1)}</span>
              <ChevronRight className="w-4 h-4 text-[#737373]" />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 text-accent-foreground bg-primary cursor-pointer hover:opacity-80 transition-opacity">
        <span className="font-semibold text-base mr-2">PHỤ TÙNG OEM</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  )
}
