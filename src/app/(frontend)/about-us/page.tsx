import { getPayload } from 'payload'
import React from 'react'
import AboutHero from '@/components/aboutpage/AboutHero'
// import AboutSection from '@/components/aboutPage/AboutSection'
// import GoalsSection from '@/components/aboutPage/GoalsSection'
// import TeamSection from '@/components/aboutPage/TeamSection'

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
    case 'ourTeam':
      return <TeamSection key={index} block={block} />
    default:
      return null
  }
}
