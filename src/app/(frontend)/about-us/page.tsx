import { getPayload } from 'payload'
import React from 'react'
import AboutHero from '@/components/aboutpage/AboutHero'
import GoalsSection from '@/components/aboutpage/Goals'
import ValuesSection from '@/components/aboutpage/Values'
import config from '@/payload.config'

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
