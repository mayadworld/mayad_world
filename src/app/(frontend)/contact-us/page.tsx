export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import React from 'react'
import ContactHero from '@/components/contactPage/ContactHero'
import ContactForm from '@/components/contactPage/ContactSection'
import ContactSocials from '@/components/contactPage/ContactSocials'

import config from '@/payload.config'

export const metadata = {
  title: 'Contact Us - Mayad World Connections Kenya',
  description:
    'Get in touch with Mayad World Connections to learn more about our programs, partnerships, and opportunities for youth engagement and global education in Kenya and all around the world.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Connect with Mayad World Connections',
    description:
      'Reach out to Mayad World Connections for inquiries about our Model UN conferences, educational travel programs, and youth empowerment initiatives.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
  },
}

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
