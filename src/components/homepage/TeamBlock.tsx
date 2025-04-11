'use client'
import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Import shadcn carousel components
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel'

interface TeamBlockProps {
  block: {
    attorney_profiles: Array<{
      id: number
      name: string
      role: string
      bio: string
      photo: {
        url: string
      }
    }>
  }
}

export default function TeamSection({ block }: TeamBlockProps) {
  const attorneys = block?.attorney_profiles || []
  const [api, setApi] = useState<CarouselApi>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [current, setCurrent] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0)

  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section
      ref={ref}
      className="py-0 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Abstract decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#003566]/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#003566]/3 blur-3xl" />

      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="team-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#003566" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#team-grid)" />
        </svg>
      </div>

      <div className="mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="max-w-full mx-auto"
        >
          {/* Carousel section with edge navigation */}
          <motion.div variants={fadeInUp} className="relative w-full">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent className="w-full">
                {attorneys.map((attorney) => (
                  <CarouselItem key={attorney.id} className="basis-full md:basis-1/3 pl-0">
                    <div className="relative group overflow-hidden">
                      <div className="relative h-96 w-full border border-white">
                        {attorney.photo ? (
                          <Image
                            src={attorney.photo.url}
                            alt={attorney.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-16 h-16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                        )}

                        {/* Custom gradient overlay with #003566 */}
                        <div className="absolute inset-x-0 bottom-0 h-32 z-10 bg-gradient-to-t from-[#003566] via-[#003566]/70 to-transparent" />

                        {/* Name and role overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-4 text-white z-20 flex flex-col items-center">
                          <h3 className="text-xl md:text-3xl font-bold">{attorney.name}</h3>
                          <p className="text-base font-medium text-white/90 mb-1">
                            {attorney.role}
                          </p>

                          <Link
                            href={`/our-team/${attorney.id}`}
                            className="inline-flex md:hidden items-center text-white text-xs font-medium border border-white rounded-3xl p-2 hover:bg-white hover:text-[#003566] transition-colors duration-200"
                            aria-label={`View profile of ${attorney.name}`}
                          >
                            View profile
                          </Link>
                        </div>

                        {/* Bio overlay on hover */}
                        <div className="absolute inset-0 bg-[#003566]/90 hidden md:flex flex-col justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                          <div className="text-white">
                            <h3 className="text-xl font-bold mb-2">{attorney.name}</h3>
                            <p className="text-sm font-medium text-white/80 mb-4">
                              {attorney.role}
                            </p>
                            <p className="text-white/90 mb-4 line-clamp-4">{attorney.bio}</p>
                            <Link
                              href={`/our-team/${attorney.id}`}
                              className="inline-flex items-center text-white font-medium border border-white rounded-3xl p-2 hover:bg-white hover:text-[#003566] transition-colors duration-200"
                              aria-label={`View profile of ${attorney.name}`}
                            >
                              View profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Previous button - positioned at left edge */}
              <button
                onClick={() => api?.scrollPrev()}
                className="absolute top-1/2 left-0 -translate-y-1/2 p-2 rounded-r-lg bg-white shadow-lg text-[#003566] hover:bg-[#003566] hover:text-white transition-colors z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next button - positioned at right edge */}
              <button
                onClick={() => api?.scrollNext()}
                className="absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-l-lg bg-white shadow-lg text-[#003566] hover:bg-[#003566] hover:text-white transition-colors z-50"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </Carousel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
