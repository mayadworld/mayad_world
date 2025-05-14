export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import React from 'react'
import AboutHero from '@/components/aboutpage/AboutHero'
import GoalsSection from '@/components/aboutpage/Goals'
import ValuesSection from '@/components/aboutpage/Values'
import config from '@/payload.config'

export const metadata = {
  title: 'About Us - Mayad World Connections',
  description:
    'Learn about Mayad World Connections, a youth-focused organization dedicated to developing global leaders through Model UN, academic travel, and educational consulting.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'About Mayad World Connections - Bridging Cultures, Ideas, and Opportunities',
    description:
      'Discover how Mayad World Connections equips young people with tools and platforms to lead confidently in a globally connected world. Learn about our mission, values, and impact.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mayad World Connections',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`,
  },
}

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'about-us' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  // Render the page layout dynamically
  return <>{page.layout?.map((block, index) => renderBlock(block, index))}</>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'about':
      return <AboutHero key={index} block={block} />
    case 'goals':
      return <GoalsSection key={index} block={block} />
    case 'core-values':
      return <ValuesSection key={index} block={block} />
    default:
      return null
  }
}
