'use client'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

interface ServicesBlockProps {
  block: {
    heading?: string
    ourServices: {
      id: number
      title: string
      description: string
      icon?: string
    }[]
  }
}

export default function ServicesSection({ block }: ServicesBlockProps) {
  const heading = block?.heading || 'Our Services'
  const services = block?.ourServices

  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
      },
    }),
  }

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden px-8 md:px-16 bg-gradient-to-b from-[#fffff6] to-[#fffff6]/50"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#fecc02]/8 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#800000]/5 blur-3xl"></div>

      <div className="xl:container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          {/* Accent line with dots */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#fecc02]"></div>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#fecc02] to-[#800000]"></div>
            <div className="w-2 h-2 rounded-full bg-[#800000]"></div>
          </div>

          {/* Badge */}
          <span className="inline-block px-5 py-2 rounded-full bg-[#fecc02]/15 text-[#800000] font-semibold text-sm tracking-wide mb-6 border border-[#fecc02]/30">
            WHAT WE OFFER
          </span>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#800000] mb-6 tracking-tight">
            {heading}
          </h2>

          {/* Supporting text */}
          <p className="max-w-3xl mx-auto text-lg text-[#800000]/70 leading-relaxed">
            Explore the initiatives and programs we offer to empower future diplomats and leaders
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={fadeInUp}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-white rounded-2xl border-2 border-[#800000]/10 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#fecc02]/20">
                {/* Card content */}
                <div className="p-8 flex flex-col h-full">
                  {/* Icon container */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#800000] to-[#800000]/80 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-[#800000]/30">
                      <div className="w-8 h-8 rounded-lg bg-[#fecc02]"></div>
                    </div>
                  </div>

                  {/* Service number badge */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#fecc02]/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#800000]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#800000] mb-4 leading-tight group-hover:text-[#800000] transition-colors">
                    {service.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-12 h-1 bg-[#fecc02] rounded-full mb-4 transition-all duration-300"></div>

                  {/* Description */}
                  <p className="text-[#800000]/70 leading-relaxed flex-grow mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom gradient accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fecc02]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.8, duration: 0.6 },
            },
          }}
          className="text-center mt-20"
        >
          <Link
            href="/programs"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#800000] text-[#fffff6] font-bold rounded-xl shadow-lg shadow-[#800000]/30 hover:shadow-2xl hover:shadow-[#800000]/40 transition-all duration-300 hover:-translate-y-1 hover:bg-[#800000]/90 border-2 border-[#800000] hover:border-[#fecc02] group"
          >
            <span>Explore All Programs</span>
            <svg
              className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
