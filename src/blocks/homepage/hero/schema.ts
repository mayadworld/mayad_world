import { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  admin: {
    group: 'Homepage',
  },
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
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      admin: {
        description: 'Add up to 4 images for the carousel. Images will automatically rotate.',
      },
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
