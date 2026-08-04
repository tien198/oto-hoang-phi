// 'use server'

import type { Metadata } from 'next'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { Header } from '@/sections/Header'
import { Banner } from '@/sections/Banner'
import { IntroSection } from '@/sections/IntroSection'
import { ProductsSection } from '@/sections/ProductSection'
import { ContactSection } from '@/sections/ContactSection'
import { Footer } from '@/sections/Footer'

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <main className="w-full min-h-screen flex flex-col bg-[#fafafa]">
      <Banner />
      <IntroSection />
      <ProductsSection />
      <ContactSection />
    </main>
  )
}

// SEO
export const metadata: Metadata = {
  title: 'Trang chủ | Hoàng Phi - Phụ Tùng Ôtô nhập khẩu',
  description:
    'Chuyên cung cấp phụ tùng ô tô nhập khẩu chính hãng, đa dạng thương hiệu, tương thích nhiều dòng xe, giá cạnh tranh và giao hàng toàn quốc.',
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Phụ Tùng Ôtô Hoàng Phi',
      },
    ],
  },
  twitter: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Phụ Tùng Ôtô Hoàng Phi',
      },
    ],
  },
}

// type Args = {
//   params: Promise<{
//     slug?: string
//   }>
// }

// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
//   const { slug = 'home' } = await paramsPromise
//   // Decode to support slugs with special characters
//   const decodedSlug = decodeURIComponent(slug)
//   const page = await queryPageBySlug({
//     slug: decodedSlug,
//   })

//   return generateMeta({ doc: page })
// }

// const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
//   const { isEnabled: draft } = await draftMode()

//   const payload = await getPayload({ config: configPromise })

//   const result = await payload.find({
//     collection: 'pages',
//     draft,
//     limit: 1,
//     pagination: false,
//     overrideAccess: draft,
//     where: {
//       slug: {
//         equals: slug,
//       },
//     },
//   })

//   return result.docs?.[0] || null
// })
