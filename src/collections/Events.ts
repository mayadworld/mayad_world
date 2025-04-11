import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Events: CollectionConfig = {
  slug: 'event',
  admin: {
    useAsTitle: 'title',
    description: 'Add Event',
    group: 'Events Collection',
  },
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
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value, { lower: true, strict: true })
            if (data?.title) return slugify(data.title, { lower: true, strict: true })
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
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
      type: 'text',
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
