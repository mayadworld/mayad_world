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
      className="py-24 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden"
    >
      {/* Abstract accent shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl"></div>

      <div className="xl:container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* Accent line */}
          <div className="flex justify-center mb-6">
            <div className="h-1 w-16 bg-yellow-500 rounded-full"></div>
          </div>

          {/* Badge */}
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-500/20 text-yellow-500 font-medium text-sm tracking-wide mb-4">
            What You Need
          </span>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{heading}</h2>

          {/* Supporting text */}
          <p className="max-w-2xl mx-auto text-white/70">
            Explore the initiatives and programs we offer to empower future diplomats and leaders
          </p>
        </div>

        {/* Service cards grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={fadeInUp}
              className="group relative overflow-hidden"
            >
              {/* Hexagon shape background effect */}
              <div className="absolute inset-0 bg-blue-800 transform -skew-x-6 rounded-lg -z-10"></div>

              {/* Card content */}
              <div className="relative p-8 bg-gradient-to-br from-blue-800/80 to-blue-900/80 backdrop-blur-sm rounded-lg border border-blue-700/50 h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-500/10 group-hover:border-yellow-500/30">
                {/* Icon with animation */}
                <div className="mb-6 transition-all duration-300 group-hover:scale-110 origin-left">
                  <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg text-blue-900 shadow-lg shadow-yellow-500/20"></div>
                </div>

                {/* Title with underline effect */}
                <h3 className="text-xl font-bold text-white mb-4 relative pb-3">
                  {service.title}
                  <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </h3>

                {/* Description */}
                <p className="text-white/80 mb-6 flex-grow">{service.description}</p>
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
          className="text-center mt-16"
        >
          <Link
            href="/programs"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 font-semibold rounded-lg shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 hover:-translate-y-1"
          >
            <span>Explore all programs</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
