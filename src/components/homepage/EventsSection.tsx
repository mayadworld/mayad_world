import React from 'react'
import { fetchAllEvents } from '@/lib/eventsUtil'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, ChevronRight, ExternalLink } from 'lucide-react'

export default async function EventsSection() {
  const data = await fetchAllEvents()
  const events = data.slice(0, 4)

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-blue-900/5 -skew-y-6"></div>
      <div className="absolute top-40 right-0 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-900/5 blur-3xl"></div>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-1 bg-blue-900 text-white text-sm font-medium rounded-full">
                JOIN US
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">Upcoming Events</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg">
              Don{"'"}t Miss Out on Our Exciting Programs and Global Events Happening All Year Round
            </p>
          </div>

          {/* Featured Event (First Event) */}
          {events.length > 0 && (
            <div className="mb-16">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:flex">
                <div className="relative lg:w-1/2">
                  <div className="absolute inset-0 bg-blue-900 mix-blend-multiply opacity-10"></div>
                  <Image
                    src={
                      typeof events[0].thumbnail === 'object' && 'url' in events[0].thumbnail
                        ? events[0].thumbnail.url || '/placeholder-image.jpg'
                        : '/placeholder-image.jpg'
                    }
                    alt={events[0].title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover aspect-video"
                  />
                  <div className="absolute top-4 left-4 bg-blue-900 text-white rounded-lg p-3 shadow-lg">
                    <div className="text-center"></div>
                  </div>
                </div>
                <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center">
                  <div className="inline-flex items-center mb-4">
                    <span className="px-3 py-1 bg-amber-100 text-blue-900 text-xs font-medium rounded-full">
                      LATEST EVENT
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-4">
                    {events[0].title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={18} className="mr-2 text-amber-500" />
                      <span>{events[0].date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={18} className="mr-2 text-amber-500" />
                      <span>{events[0].location || 'Main Conference Hall'}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-8">{events[0].description}</p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {events[0].purchaseLink && (
                      <a
                        href={events[0].purchaseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition shadow-md"
                      >
                        Register Now
                        <ExternalLink size={16} className="ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Event Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(1).map((event) => {
              return (
                <div
                  key={event.id}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-colors"></div>
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
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-800 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                      {event.description}
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={18} className="mr-2 text-amber-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-2 text-amber-500" />
                        <span>{event.location || 'Main Conference Hall'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div></div>
                      {event.purchaseLink && (
                        <a
                          href={event.purchaseLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-3 py-1 bg-amber-400 hover:bg-amber-500 text-blue-900 text-sm font-medium rounded-md transition shadow-sm"
                        >
                          Register
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* View More Button */}
          <div className="mt-16 text-center">
            <Link
              href="/events"
              className="inline-flex items-center px-8 py-4 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition shadow-lg shadow-blue-900/20"
            >
              View All Events
              <ChevronRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
