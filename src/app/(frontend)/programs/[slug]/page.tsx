// app/program/[slug]/page.tsx
export const dynamic = 'force-dynamic'

import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'

import { notFound } from 'next/navigation'
import { fetchAllPrograms, fetchRelatedPrograms } from '@/lib/progUtil'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ChevronRight } from 'lucide-react'
import ProgramsHero from '@/components/programspage/ProgDetailsHero'

export default async function ProgramDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payloadClient = await getPayload({ config })

  // Step 1: Fetch the program by slug
  const programResult = await payloadClient.find({
    collection: 'program',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const program = programResult?.docs?.[0]

  if (!program) {
    notFound()
  }

  // Step 2: Fetch events related to this program
  const eventsResult = await payloadClient.find({
    collection: 'event',
    where: {
      category: {
        equals: program.id,
      },
    },
  })

  const events = eventsResult.docs
  const relatedProgramsResult = await fetchRelatedPrograms(program.slug)
  const relatedPrograms = relatedProgramsResult.slice(0, 4)

  return (
    <>
      <ProgramsHero program={program} />
      {/* Upcoming Events Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-16">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-blue-900/5 -skew-y-6"></div>
        <div className="absolute top-40 right-0 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-900/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Upcoming Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us at these upcoming events for the {program.title} program
            </p>
            <div className="w-24 h-1 bg-amber-400 mx-auto mt-6"></div>
          </div>

          {events && events.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100"
                >
                  <div className="relative">
                    <Image
                      src={
                        typeof event.thumbnail === 'object' && 'url' in event.thumbnail
                          ? event.thumbnail.url || '/placeholder-image.jpg'
                          : '/placeholder-image.jpg'
                      }
                      alt={event.title}
                      width={600}
                      height={400}
                      className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Date overlay badge */}
                    {event.date && (
                      <div className="absolute top-4 right-4 bg-blue-900/80 text-white text-xs font-medium px-3 py-2 rounded-lg backdrop-blur-sm">
                        <Calendar size={14} className="inline mr-1" />
                        {event.date}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-3 mb-6 text-gray-600">
                      {event.location && (
                        <div className="flex items-center">
                          <MapPin size={18} className="mr-2 text-amber-500" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                      <Link
                        href={event.purchaseLink || `/events/${event.slug}`}
                        className="flex items-center justify-center px-5 py-2 bg-amber-400 hover:bg-amber-500 text-blue-900 text-sm font-medium rounded-lg transition-colors shadow-sm w-full"
                      >
                        {event.purchaseLink ? 'Register Now' : 'View Details'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center max-w-2xl mx-auto">
              <Calendar size={48} className="mx-auto text-blue-200 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">No Events Scheduled</h3>
              <p className="text-gray-600 mb-6">
                There are no upcoming events for this program at the moment. Please check back later
                or sign up for notifications.
              </p>
              <Link
                href="/notifications/subscribe"
                className="inline-flex items-center justify-center px-5 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 text-sm font-medium rounded-lg transition-colors"
              >
                Get Notified About New Events
              </Link>
            </div>
          )}

          {/* Bottom CTA */}
          {events && events.length > 0 && (
            <div className="mt-12 text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Events
                <ChevronRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Related Programs */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-blue-900">You May Also Be Interested In</h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto mt-4"></div>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 snap-x scrollbar-hide">
            {relatedPrograms.map((prog) => (
              <div
                key={prog.id}
                className="min-w-[280px] max-w-[280px] bg-blue-50 rounded-xl p-6 flex flex-col snap-start"
              >
                <h3 className="font-bold text-blue-900 mb-2">{prog.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {prog.description}
                </p>
                <Link
                  href={`/programs/${prog.slug}`}
                  className="text-sm text-amber-600 font-medium hover:text-amber-700"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// Static params generation for SSG/ISR
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const programs = await fetchAllPrograms()
    return programs.map((prog) => ({ slug: String(prog.slug) }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
