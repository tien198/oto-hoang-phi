import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import { cn } from '@/utilities/ui'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
// import { Footer } from '@/Footer/Component'
// import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { Header } from '@/sections/Header'
import { Footer } from '@/sections/Footer'
import { TanstackProvider } from '@/tanstack-provider'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['vietnamese'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(montserrat.variable, montserrat.className)}
      lang="en"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        {/* <InitTheme /> */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        {/* <Providers> */}
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />

        <Header />
        <TanstackProvider>{children}</TanstackProvider>
        <Footer />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
