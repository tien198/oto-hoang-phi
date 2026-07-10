import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="w-full bg-[#171717] pt-16 pb-6 px-5 md:px-20 flex flex-col gap-16">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-6 max-w-[360px]">
          <div className="w-[135px] h-[86px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Logo loading="eager" priority="high" />

            {/* <img src="/images/brand/logo.png" alt="Logo" className="w-full h-full object-contain" /> */}
          </div>
          <p className="text-[#737373] text-sm leading-[1.6]">
            Nhà cung cấp phụ tùng ô tô uy tín, chất lượng hàng đầu.
          </p>
        </div>

        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-[#f5f5f5] text-base font-semibold">Về Hoàng Phi</h4>
            <Link href="#" className="text-[#737373] text-sm hover:text-white transition-colors">
              Trang chủ
            </Link>
            <Link
              href="#products"
              className="text-[#737373] text-sm hover:text-white transition-colors"
            >
              Sản phẩm
            </Link>
            <Link href="#" className="text-[#737373] text-sm hover:text-white transition-colors">
              Về chúng tôi
            </Link>
            <Link
              href="#contact"
              className="text-[#737373] text-sm hover:text-white transition-colors"
            >
              Liên hệ
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[#f5f5f5] text-base font-semibold">Chính sách</h4>
            <Link href="#" className="text-[#737373] text-sm hover:text-white transition-colors">
              Chính sách đổi trả
            </Link>
            <Link href="#" className="text-[#737373] text-sm hover:text-white transition-colors">
              Bảo hành
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e5e5e5]/20 pt-6 flex justify-center">
        <p className="text-[#737373] text-sm text-center">
          © 2026 Phụ tùng Ô tô Hoàng Phi. Tất cả các quyền được bảo lưu.
        </p>
      </div>
    </footer>
  )
}
