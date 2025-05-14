import React from 'react'
import GalleryHero from '@/components/gallery/GalleryHero'
import PaginationComponent from '@/components/navigation/PaginationComponent'
import { fetchGallery } from '@/lib/galleryUtil'
import GalleryCard from '@/components/gallery/GalleryCard'

type Props = {
  searchParams?: Promise<{
    page?: string
  }>
}

export const metadata = {
  title: 'Gallery - Mayad World Connections',
  description:
    'Explore our gallery to see highlights from Mayad World Connections’ Model UN conferences, educational tours, cultural exchanges, and global leadership programs.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Gallery | Mayad World Connections in Action',
    description:
      'View inspiring moments from our global events, youth leadership experiences, and educational journeys around the world.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mayad World Connections',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`,
  },
}

export default async function GalleryPage({ searchParams }: Props) {
  const resolvedParams = await searchParams
  const currentPage = Number(resolvedParams?.page) || 1
  const { posts, pagination } = await fetchGallery(currentPage)

  if (!posts || posts.length === 0) {
    return (
      <>
        <GalleryHero />
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 flex flex-col items-center">
              {/* Empty state illustration */}
              <div className="w-40 h-40 mb-6 relative">
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  {/* Frame */}
                  <rect
                    x="40"
                    y="30"
                    width="120"
                    height="140"
                    rx="8"
                    stroke="#1e3a8a"
                    strokeWidth="6"
                  />

                  {/* Mountain */}
                  <path
                    d="M50 130L80 90L95 110L130 60L150 130"
                    stroke="#1e3a8a"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Sun */}
                  <circle cx="125" cy="70" r="15" fill="#eab308" />

                  {/* Diagonal slash */}
                  <line
                    x1="30"
                    y1="170"
                    x2="170"
                    y2="30"
                    stroke="#1e3a8a"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500/20 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-blue-900/20 rounded-full"></div>
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-3">No Images Found</h2>

              <div className="w-16 h-1 bg-yellow-500 rounded-full mb-4"></div>

              <p className="text-blue-900/70 text-center mb-6">
                It looks like there are no images available in the gallery at the moment.
              </p>
            </div>

            {/* Decorative pattern at bottom */}
            <div className="h-8 bg-gradient-to-r from-blue-900 to-blue-800 flex overflow-hidden">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-full w-6"
                    style={{
                      backgroundColor: i % 3 === 0 ? '#eab308' : 'transparent',
                      opacity: i % 3 === 0 ? 0.3 : 0,
                    }}
                  />
                ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <GalleryHero />
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        <PaginationComponent totalPages={pagination.totalPages} />
      </section>
    </>
  )
}
