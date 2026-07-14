import { Logo } from '@/components/Logo/Logo'
import clsx from 'clsx'
import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="w-full bg-[#171717] pt-16 pb-6 px-5 md:px-20 flex flex-col gap-16">
      <div className="flex flex-col md:flex-row items-end justify-between gap-12">
        <div className="flex flex-col gap-8 max-w-[360px] text-muted-foreground text-sm">
          <div className="w-[135px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Logo loading="eager" priority="high" />

            {/* <img src="/images/brand/logo.png" alt="Logo" className="w-full h-full object-contain" /> */}
          </div>
          <div className="flex items-start gap-3">
            <Building2 className="w-4 h-4 mt-[3px] shrink-0 text-muted" />
            <span>Công ty TNHH Đầu tư thương mại Hoàng Phi</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-[3px] shrink-0 text-muted" />
            <span>Ngõ 2, xóm Bảng, Cổ Điển A, Thanh Trì, Hà Nội, Việt Nam</span>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 mt-[3px] shrink-0 text-muted" />
            <span>+84 974 414 843 // +84 964 832 268</span>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 mt-[3px] shrink-0 text-muted" />
            <a
              href="mailto:phutungotohoangphi@gmail.com"
              className="hover:text-white transition-colors"
            >
              phutungotohoangphi@gmail.com
            </a>
          </div>
        </div>

        <div
          className={clsx(
            'flex flex-col items-center gap-16',
            'md:flex-row md:gap-24 md:justify-start',
          )}
        >
          <div className="hidden md:flex flex-col gap-4 ">
            <h4 className="text-accent text-base font-semibold">Về Hoàng Phi</h4>
            <Link
              href="#"
              className="text-muted-foreground text-sm hover:text-white transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="products"
              className="text-muted-foreground text-sm hover:text-white transition-colors"
            >
              Sản phẩm
            </Link>
            <Link
              href="#"
              className="text-muted-foreground text-sm hover:text-white transition-colors"
            >
              Về chúng tôi
            </Link>
            <Link
              href="#contact"
              className="text-muted-foreground text-sm hover:text-white transition-colors"
            >
              Liên hệ
            </Link>
          </div>

          <div
            className={clsx(
              'flex flex-col gap-4 max-w-xl p-5 bg-muted-foreground rounded-2xl text-sm leading-[1.6]',
              'bg-linear-to-l from-[var(--primary)] to-[var(--muted]',
            )}
          >
            <h4 className="text-base font-semibold">Chính sách bảo hành</h4>
            <div className="flex flex-col gap-4">
              <p>Cửa hàng mang đến khách hàng chính sách bảo hành như sau:</p>

              <div className="flex flex-col gap-2">
                <span className="font-semibold">Hàng hóa cung cấp:</span>
                <ul className="flex flex-col gap-1.5 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>Hàng mới 100%.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>Bảo hành 1 đổi 1 lên đến 12 tháng tùy loại sản phẩm.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>Thủ tục bảo hành nhanh chóng, tiện lợi.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-semibold">Điều kiện bảo hành:</span>
                <ul className="flex flex-col gap-1.5 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>Thời gian bảo hành tính từ thời điểm xuất kho bên bán.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>
                      Người mua nhận hàng và phản hồi lại ngay sau khi kiểm tra nếu hàng hóa có lỗi
                      về quy cách sản phẩm trong vòng tối đa 24h sau khi nhận hàng.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e5e5e5]/20 pt-6 flex justify-center">
        <p className="text-muted-foreground text-sm text-center">
          © 2026 Phụ tùng Ô tô Hoàng Phi. Tất cả các quyền được bảo lưu.
        </p>
      </div>
    </footer>
  )
}
