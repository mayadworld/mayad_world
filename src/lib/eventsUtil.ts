import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchAllEvents() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: allBlogs } = await payload.find({
    collection: 'event',
    depth: 2,
    limit: 100,
  })

  return allBlogs.map((events) => ({
    id: events.id,
    slug: events.slug,
    title: events.title,
    description: events.description,
    location: events.location,
    thumbnail: events.thumbnail,
    date: events.date,
    purchaseLink: events.purchaseLink,
  }))
}

export async function fetchRelatedEvents(currentSlug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: allBlogs } = await payload.find({
    collection: 'event',
    depth: 1,
    limit: 4,
    where: {
      slug: {
        not_equals: currentSlug,
      },
    },
  })

  return allBlogs
}
