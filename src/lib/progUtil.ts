import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchAllPrograms() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: allProgs } = await payload.find({
    collection: 'program',
    depth: 2,
    limit: 100,
  })

  return allProgs.map((progs) => ({
    id: progs.id,
    slug: progs.slug,
    title: progs.title,
    description: progs.description,
  }))
}

export async function fetchRelatedPrograms(currentSlug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: allProgs } = await payload.find({
    collection: 'program',
    depth: 1,
    limit: 4,
    where: {
      slug: {
        not_equals: currentSlug,
      },
    },
  })

  return allProgs
}
