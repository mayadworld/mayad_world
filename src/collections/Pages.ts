import { Hero } from '@/blocks/homepage/hero/schema'
import { LandingAbout } from '@/blocks/homepage/home-about/schema'
import { ServicesBlock } from '@/blocks/homepage/services/schema'
import { WhyChooseUs } from '@/blocks/homepage/why-us/schema'
import type { CollectionConfig } from 'payload'
import { About, Goals, Values } from '@/blocks/about/schema'
import { Contact, ContactAddresses } from '@/blocks/contactPage/schema'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      blocks: [
        Hero,
        LandingAbout,
        ServicesBlock,
        WhyChooseUs,
        About,
        Goals,
        Values,
        Contact,
        ContactAddresses,
      ],
    },
  ],
}
