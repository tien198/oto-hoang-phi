'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt?: string | null
  blurDataURL?: string | null
  className?: string | null
}

export default function SmoothBlurImage({ src, alt, blurDataURL, className }: Props) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className ?? '')}>
      <Image
        src={src ?? ''}
        alt={alt ?? ''}
        fill
        // width={220}
        // height={200}
        onLoad={() => setIsLoading(false)}
        className={`object-cover transition-all duration-700 ease-in-out ${
          isLoading ? 'blur-[2px]' : 'blur-0'
        }`}
        placeholder="blur"
        blurDataURL={blurDataURL ?? undefined}
      />
    </div>
  )
}
