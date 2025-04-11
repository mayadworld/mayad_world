'use client'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Globe } from 'lucide-react'

interface AboutUsBlockProps {
  block: {
    heading: string
    description: string
  }
}

export default function AboutUsSection({ block }: AboutUsBlockProps) {
  const heading = block?.heading || 'About Our Law Firm'
  const description =
    block?.description ||
    'With decades of combined experience, our attorneys provide strategic counsel and aggressive advocacy tailored to your unique legal challenges.'

  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="py-16 md:py-24 bg-white relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gray-50 h-1/2 bottom-0" />

      <div className="max-w-screen-xl mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left column - content */}
          <div className="space-y-8">
            <div>
              <div className="h-px w-16 bg-[#eab308] mb-6" />
              <span className="text-sm uppercase tracking-widest text-[#eab308] font-bold">
                About Us
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-blue-900 leading-tight">
                {heading}
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed">{description}</p>

            <div className="pt-2">
              <Link
                href="/who-we-are"
                className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-blue-800 group transition-colors duration-200"
              >
                <span>Learn more about our expertise</span>
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right column - visual element */}
          <div className="relative aspect-square md:aspect-auto md:h-full hidden md:block">
            <div className="absolute inset-0 border border-[#eab308]" />
            <div className="absolute top-4 right-4 bottom-4 left-4 bg-gray-100" />
            <div className="absolute top-8 right-8 bottom-8 left-8 border border-[#eab308]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe
                className="w-48 text-blue-900 animate-[spin_6s_ease-in-out_infinite]"
                size={200}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
