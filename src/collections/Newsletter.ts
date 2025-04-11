// payload.config.ts
import { CollectionConfig } from 'payload'

const Newsletter: CollectionConfig = {
  slug: 'newsletter',
  access: {
    create: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
}

export default Newsletter
