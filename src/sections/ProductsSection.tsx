'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export const ProductsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  const products = [
    {
      sku: 'BN-2004',
      name: 'Bơm nước làm mát',
      price: '1,200,000đ',
      image: '/generated-1783491561656.png',
    },
    {
      sku: 'LD-2001',
      name: 'Lọc dầu động cơ',
      price: '150,000đ',
      image: '/generated-1783491561213.png',
    },
    {
      sku: 'MP-2002',
      name: 'Má phanh trước',
      price: '850,000đ',
      image: '/generated-1783491561249.png',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          products.forEach((_, idx) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, idx])
            }, idx * 300)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="products"
      className="w-full bg-white py-16 md:py-20 px-5 md:px-20 flex flex-col gap-12"
    >
      <div className="flex flex-col gap-4 items-center text-center">
        <span className="text-primary text-sm font-bold tracking-[2px] uppercase">SẢN PHẨM</span>
        <h2 className="text-accent-foreground text-3xl md:text-[32px] font-bold">
          Phụ Tùng Nổi Bật
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <Card
            key={idx}
            className={`overflow-hidden hover:shadow-md border-gray-100 rounded-xl bg-white transition-all duration-300 ${visibleCards.includes(idx) ? 'animate-fade-in' : 'opacity-0'}`}
          >
            <div className="w-full h-[240px] bg-gray-50 flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <CardHeader className="px-6 py-4 pb-2">
              <CardDescription className="text-sm font-medium">SKU: {product.sku}</CardDescription>
              <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
            </CardHeader>
            <CardFooter className="px-6 pb-6 pt-2 flex items-center justify-between">
              <span className="text-primary font-bold text-lg">{product.price}</span>
              <Button
                variant="outline"
                className="text-sm font-semibold border hover:border-primary px-4 py-2 rounded-full hover:text-primary transition-colors"
              >
                Xem chi tiết
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
