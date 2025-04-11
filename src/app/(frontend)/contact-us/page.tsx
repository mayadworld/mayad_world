import { getPayload } from 'payload'
import React from 'react'
import ContactHero from '@/components/contactPage/ContactHero'
import ContactForm from '@/components/contactPage/ContactSection'
import ContactSocials from '@/components/contactPage/ContactSocials'

import config from '@/payload.config'

export default async function ContactPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'contact-us' },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  // Render the page layout dynamically
  return (
    <>
      <ContactHero />
      {page.layout?.map((block, index) => renderBlock(block, index))}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'contact':
      return <ContactForm key={index} block={block} />
    case 'contactAddresses':
      return <ContactSocials key={index} block={block} />
    // case 'location':
    //   return <MapArea key={index} block={block} />

    default:
      return null
  }
}
