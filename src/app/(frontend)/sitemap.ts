import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [progRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      next: { revalidate: 3600 },
    }),
  ])

  if (!progRes.ok) {
    throw new Error(`Failed to fetch data: ${!progRes.statusText}`)
  }

  const postsData = await progRes.json()

  const prog: { slug: string }[] = postsData.docs

  const postEntries: MetadataRoute.Sitemap = prog.map((post: { slug: string }) => ({
    type: 'programs',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/programs/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: 'https://www.mayadworld.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://www.mayadworld.com/about-us',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.mayadworld.com/events',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.mayadworld.com/programs',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.mayadworld.com/contact-us',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.mayadworld.com/register',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.mayadworld.com/gallery',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...postEntries,
  ]
}
