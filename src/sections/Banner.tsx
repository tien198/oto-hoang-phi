import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

export const Banner = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center px-5 md:px-20">
      {/* Background Image & Gradient */}
      <div
        className="absolute inset-0 z-0 bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: 'url("/banner-desktop.jpg")',
        }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div> */}
      </div>

      <div className="relative bottom-16 z-10 md:bottom-14 w-full max-w-[1030px] flex flex-col justify-end items-center h-full gap-2">
        <h1 className="text- text-3xl md:text-5xl font-bold text-center max-w-[90vw]">
          SẢN PHẨM ĐA DẠNG
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Link href="products">
            <Button
              variant="outline"
              className="text-primary hover:bg-accent-foreground hover:text-white px-8 py-1 md:py-2 rounded-full font-semibold text-base transition-all w-56 text-center"
            >
              Xem sản phẩm
            </Button>
          </Link>
          <Link href="#contact">
            <Button
              variant={'outline'}
              className="bg-primary hover:bg-white hover:text-primary text-white px-8 py-1 md:py-2 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-all w-64"
            >
              Liên hệ ngay
              <MessageCircle size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
