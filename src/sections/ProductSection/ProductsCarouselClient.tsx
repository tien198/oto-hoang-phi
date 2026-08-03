'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export type ProductType = {
  name: string
  price: string
  sku: string
  image: string
}

export const ProductsCarouselClient = ({ products }: { products: ProductType[] }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<number[]>([])

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
  }, [products])

  return (
    <div ref={sectionRef} className="px-4 md:px-12 w-full">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product, idx) => (
            <CarouselItem key={idx} className="basis-full lg:basis-1/3">
              <Card
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
                  <CardDescription className="text-sm font-medium">
                    SKU: {product.sku}
                  </CardDescription>
                  <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                </CardHeader>
                <CardFooter className="px-6 pb-6 pt-2 flex items-center justify-between">
                  <span className="text-primary font-light italic text-lg">{product.price}</span>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
}
