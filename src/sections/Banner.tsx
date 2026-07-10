import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

export const Banner = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center px-5 md:px-20">
      {/* Background Image & Gradient */}
      <div
        className="absolute inset-0 z-0 bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: 'url("/api/media/file/banner-desktop.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>

      <div className="relative bottom-10 z-10 w-full max-w-[1030px] flex flex-col justify-end items-center h-full gap-6">
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center leading-[1.2] max-w-[90vw]">
          SẢN PHẨM ĐA DẠNG
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Link
            href="#products"
            className="bg-[#f5f5f5] text-[#9f0712] px-8 py-1 md:py-2 rounded-full font-semibold text-base hover:bg-white transition-colors w-56 text-center"
          >
            Sản phẩm
          </Link>
          <Link
            href="#contact"
            className="bg-[#9f0712] text-[#fef2f2] px-8 py-1 md:py-2 rounded-full font-semibold text-base flex items-center justify-center gap-2 hover:bg-red-800 transition-colors w-64"
          >
            Liên hệ ngay
            <MessageCircle size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
