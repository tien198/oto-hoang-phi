'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { MapPin, Phone, Mail } from 'lucide-react'
import { ContactForm } from './ContactForm'

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [showFirst, setShowFirst] = useState(false)
  const [showSecond, setShowSecond] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFirst(true)
          setTimeout(() => setShowSecond(true), 500)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={clsx(
        // Base / Mobile layout & styling
        'w-full bg-[#fafafa] flex flex-col gap-16 justify-center',

        // Desktop (lg)
        'lg:flex-row',
      )}
    >
      <div
        className={clsx(
          'flex-1 flex flex-col gap-8 max-w-xl duration-300',
          'py-16 px-5',
          'md:py-20 md:px-20',
          showFirst ? 'animate-fade-in' : 'opacity-0',
        )}
      >
        <div className="flex flex-col gap-4">
          <h2
            className={clsx(
              // Base / Mobile
              'text-primary text-3xl font-light leading-[1.2]',
              // Tablet / Desktop (md)
              'md:text-[36px] md:font-medium',
            )}
          >
            Kết nối với chúng tôi
          </h2>
          <p className="text-[#737373] text-base leading-[1.6]">
            Hãy để lại thông tin, đội ngũ tư vấn của Phụ tùng Ô tô Hoàng Phi sẽ liên hệ lại với quý
            khách trong thời gian sớm nhất.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3 mt-3">
            <MapPin className="w-5 h-6 shrink-0 text-primary" />
            <span>Ngõ 2, xóm Bảng, Cổ Điển A, Thanh Trì, Hà Nội, Việt Nam</span>
          </div>
          <div className="flex items-end gap-3 mt-3">
            <Phone className="w-5 h-6 shrink-0 text-primary" />
            <a href="tel:+84974414843" className="hover:text-primary transition-colors">
              +84 974 414 843
            </a>
            //
            <a href="tel:+84964832268" className="hover:text-primary transition-colors">
              +84 964 832 268
            </a>
          </div>
          <div className="flex items-end gap-3 mt-3">
            <Mail className="w-5 h-6 shrink-0 text-primary" />
            <a
              href="mailto:phutungotohoangphi@gmail.com"
              className="hover:text-primary transition-colors"
            >
              phutungotohoangphi@gmail.com
            </a>
          </div>
        </div>
      </div>

      <ContactForm className={clsx(showSecond ? 'animate-fade-in' : 'opacity-0')} />
    </section>
  )
}
