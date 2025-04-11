import { Block } from 'payload'

export const Contact: Block = {
  slug: 'contact',
  admin: { group: 'Contact Page' },
  fields: [
    { name: 'title', type: 'textarea', required: true },
    { name: 'description', type: 'textarea', required: true },
  ],
}

export const ContactAddresses: Block = {
  slug: 'contactAddresses',
  admin: { group: 'Contact Page' },

  fields: [
    {
      name: 'socials',
      type: 'array',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'tiktok', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },
    {
      name: 'phoneNumbers',
      label: 'Phone Numbers',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'emailAdd',
      label: 'Email Addresses',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
