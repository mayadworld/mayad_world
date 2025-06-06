import { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  admin: {
    group: 'Homepage',
  },
  fields: [
    {
      type: 'array',
      name: 'slider',
      label: 'Slider',
      minRows: 1,
      maxRows: 5,
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
          required: true,
          relationTo: 'media',
        },
        {
          name: 'program',
          label: 'Program',
          type: 'relationship',
          relationTo: 'program',
          hasMany: false,
        },
      ],
    },
  ],
}
