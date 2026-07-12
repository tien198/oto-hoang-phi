'use client'

import { useEffect, useRef, useState } from 'react'

export const IntroSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [showFirst, setShowFirst] = useState(false)
  const [showSecond, setShowSecond] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFirst(true)
          setTimeout(() => setShowSecond(true), 400)
          observer.disconnect()
        }
      },
      { threshold: 0.6 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-accent py-16 md:py-20 px-5 md:px-20 flex flex-col lg:flex-row items-center gap-16"
    >
      <div
        className={`flex-1 flex flex-col gap-6 duration-300 ${showFirst ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <h2 className="text-primary text-3xl md:text-[36px] font-bold leading-[1.2]">
          Đối tác đáng tin cậy trong nhập khẩu và cung cấp các sản phẩm phụ tùng ô tô
        </h2>
        <p className="text-muted-foreground text-base leading-[1.6]">
          Cửa hàng phụ tùng ô tô Hoàng Phi là đơn vị nhập khẩu trực tiếp và phân phối các sản phẩm
          chính hãng, chất lượng cao các hãng xe Toyota, Hyundai, Kia, Ford, Mazda, Honda,
          Mitsubishi, Nissan, Suzuki... Với nhiều năm kinh nghiệm kinh doanh mặt hàng phụ tùng ô tô.
          Chúng tôi cam kết cung cấp các giải pháp về phụ tùng ô tô chính hãng, cao cấp linh hoạt,
          đáp ứng tiêu chuẩn chất lượng khắt khe nhất để mang lại sự an toàn tuyệt đối trên mọi hành
          trình.
        </p>
      </div>
      <div
        className={`flex-1 w-full rounded-xl overflow-hidden shadow-lg h-[400px] duration-400 ${showSecond ? 'animate-fade-in' : 'opacity-0'}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/generated-1783491206653.png"
          alt="Intro Image"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
