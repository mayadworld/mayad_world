'use client'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

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
    <section className="px-8 md:px-16 py-0 md:py-24 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 h-1/2 bottom-0" />

      <div className="max-w-screen-xl mx-auto px-6 relative bg-[#800000] p-8 md:p-12 text-white rounded-3xl">
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
              <span className="text-sm uppercase tracking-widest text-[#fecc02] font-bold">
                About Us
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-[#fffff6] leading-tight">
                {heading}
              </h2>
            </div>

            <p className="text-[#fffff6]/80 leading-relaxed">{description}</p>

            <div className="pt-2">
              <Link
                href="/about-us"
                className="inline-flex items-center text-sm font-medium text-[#fffff6] hover:text-[#fecc02] group transition-colors duration-200"
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
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src="/darklogo.png" alt="Mayad logo" width={400} height={450} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
