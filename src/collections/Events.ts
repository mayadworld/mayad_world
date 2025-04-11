import { CollectionConfig } from 'payload'
import { text } from 'stream/consumers'

export const Events: CollectionConfig = {
  slug: 'event',
  admin: {
    useAsTitle: 'title',
    description: 'Add Event',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
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
      name: 'thumbnail',
      label: 'Thumbnail Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'date',
      label: 'Event Date',
      type: 'date',
      required: true,
    },
    {
      name: 'purchaseLink',
      label: 'Registration Link',
      type: 'text',
      required: true,
    },
  ],
}

export default Events
