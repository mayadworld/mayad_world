import { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services-block',
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'ourServices',
      label: 'Services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
  ],
}
