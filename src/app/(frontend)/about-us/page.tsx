export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import React from 'react'
import AboutHero from '@/components/aboutpage/AboutHero'
import GoalsSection from '@/components/aboutpage/Goals'
import ValuesSection from '@/components/aboutpage/Values'
import TeamSection from '@/components/aboutpage/TeamSection'
import config from '@/payload.config'

export const metadata = {
  title: 'About Us - Mayad World Connections Kenya',
  description:
    'Mayad World Connections is a youth-focused organization in Kenya empowering students through Model UN conferences, STEM programs, Olympiads, debates, educational travel, and academic consulting. Learn about our mission, values, and impact.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'About Mayad World Connections - Youth Leadership & Academic Programs in Kenya',
    description:
      'Discover how Mayad World Connections equips young people in Kenya with tools and platforms to lead confidently in a globally connected world. Learn about our mission, values, and impact.',
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
    case 'ourTeam':
      return <TeamSection key={index} block={block} />
    default:
      return null
  }
}
