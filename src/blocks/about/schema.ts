import { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  admin: {
    group: 'About Page',
  },
  fields: [
    { name: 'clause', type: 'textarea', required: true },
    { name: 'photo', label: 'Firm Photo', type: 'upload', relationTo: 'media', required: true },
  ],
}

export const Goals: Block = {
  slug: 'goals',
  admin: {
    group: 'About Page',
  },
  fields: [
    { name: 'mission', type: 'textarea', required: true },
    { name: 'vision', type: 'textarea', required: true },
  ],
}

export const Values: Block = {
  slug: 'core-values',
  admin: {
    group: 'About Page',
  },
  fields: [
    {
      name: 'our_values',
      label: 'Core Values',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          label: 'Value Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Value Description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
