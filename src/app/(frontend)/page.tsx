import type { Metadata } from 'next'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { Header } from '@/sections/Header'
import { Banner } from '@/sections/Banner'
import { IntroSection } from '@/sections/IntroSection'
import { ProductsSection } from '@/sections/ProductsSection'
import { ContactSection } from '@/sections/ContactSection'
import { Footer } from '@/sections/Footer'

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main className="w-full min-h-screen flex flex-col bg-[#fafafa]">
      <Banner />
      <IntroSection />
      <ProductsSection />
      <ContactSection />
    </main>
  )
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
