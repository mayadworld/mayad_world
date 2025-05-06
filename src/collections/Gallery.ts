import { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery',
    plural: 'Gallery',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Add Image',
    group: 'Gallery Collection',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },

    {
      name: 'image',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default Gallery
