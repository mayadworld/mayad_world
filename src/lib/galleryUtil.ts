import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchGallery(page = 1, limit = 9) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const res = await payload.find({
    collection: 'gallery',
    depth: 2,
    limit,
    page,
  })

  return {
    posts: res.docs.map((post) => ({
      id: post.id,
      title: post.title,
      image: post.image,
    })),
    pagination: {
      hasNextPage: res.hasNextPage,
      hasPrevPage: res.hasPrevPage,
      totalPages: res.totalPages,
      page: res.page,
    },
  }
}
