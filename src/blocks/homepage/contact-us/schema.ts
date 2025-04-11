import { Block } from 'payload'

export const Contact: Block = {
  slug: 'contact', // Unique identifier for the block
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'phone_number',
      label: 'Phone Number',
      type: 'number',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
    },
  ],
}
