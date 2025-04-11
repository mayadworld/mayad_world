import { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  fields: [
    { name: 'heading', label: 'Heading', type: 'text', required: true },
    {
      name: 'subheading',
      label: 'SubHeading',
      type: 'textarea',
      required: true,
    },
    {
      name: 'hero_image',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
