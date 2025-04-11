'use client'
import React, { useEffect } from 'react'
import { PhoneCall, Scale, BookOpen, ArrowRight } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

interface HeroBlockProps {
  block: {
    title: string
    description: string
    backgroundImage?: string
  }
}

export default function CTABlock({ block }: HeroBlockProps) {
  // Default values if props are not provided
  const heading = block?.title || 'Let Us Help You'
  const subheading =
    block?.description || 'Let us help you navigate the complexities of the legal system.'
  const backgroundImage = block?.backgroundImage || '/api/placeholder/1200/800'

  // Setup intersection observer for scroll animations
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80 z-0" />

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-10 right-10 sm:top-20 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 bg-blue-800 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.25, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-blue-800 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 2,
        }}
      />

      {/* Main content container */}
      <div className="xl:container relative mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 z-10">
        {/* Content area - spans 7 columns on large screens */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {/* Accent line above heading */}
            <motion.div
              className="w-16 h-1 bg-blue-600 mb-6"
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: { width: 64, opacity: 1, transition: { duration: 0.8 } },
              }}
            />

            <motion.h2
              className="text-3xl font-serif uppercase font-bold mb-4 md:mb-6 text-white leading-tight"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              {heading}
            </motion.h2>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl leading-relaxed">
                {subheading}
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
              }}
            >
              <Link
                href="/contact-us"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/practice-areas"
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 hover:border-white/60 text-white py-3 px-6 rounded-md font-medium transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore Our Services</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side feature card - spans 5 columns on large screens */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.5, duration: 0.8 },
              },
            }}
            className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-xl border border-white/20 shadow-2xl w-full max-w-lg"
          >
            <div className="flex flex-col space-y-6">
              <div className="inline-flex p-3 rounded-full bg-blue-600/20 self-start">
                <Scale className="w-6 h-6 text-blue-400" />
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Expert Legal Representation
              </h3>

              <p className="text-white/80">
                Our team of experienced attorneys is dedicated to providing personalized legal
                solutions tailored to your specific needs.
              </p>

              <Link
                href="tel:+1234567890"
                className="flex items-center justify-center gap-2 mt-4 bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-md font-medium transition-all duration-300 border border-white/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Us Now</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom trust indicators */}
      <motion.div
        className="container relative mx-auto mt-16 z-10 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.7, duration: 0.8 },
          },
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            <span>Available 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-400"></div>
            <span>Free Initial Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-400"></div>
            <span>98% Success Rate</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
