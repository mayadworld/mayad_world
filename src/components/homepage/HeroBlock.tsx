'use client'
import React, { useEffect, useState } from 'react'
import { MapPin, Play, Pause } from 'lucide-react'

import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

interface HeroSlideProps {
  block: {
    slider: Array<{
      id: number
      heading: string
      subheading: string
      hero_image: {
        url: string
      }
      alt: string
      program: {
        slug: string
        title: string
        description: string
      }
    }>
  }
}

export default function HeroBlock({ block }: HeroSlideProps) {
  // Use default slides or convert existing data
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [direction, setDirection] = useState(0)

  // Setup intersection observer for scroll animations
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Animations when component is in view
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  // Auto-rotate carousel
  useEffect(() => {
    if (!isPlaying || block.slider.length <= 1) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % block.slider.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [block.slider.length, isPlaying])

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const currentSlideData = block.slider[currentSlide]

  return (
    <section
      ref={ref}
      className="relative flex justify-center items-center h-auto 2xl:h-[70vh] overflow-hidden bg-transparent pt-12 pb-24 md:pb-0 md:pt-12 lg:pt-4 px-4 md:px-16"
    >
      {/* Main Content */}
      <div className="relative z-20 md:min-h-screen flex items-center">
        <div className="2xl:container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-6 space-y-6 md:space-y-8">
              <motion.div
                key={`content-${currentSlide}`}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6"
              >
                {/* Main heading */}
                <motion.div variants={itemVariants}>
                  <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-bold text-[#800000] leading-tight">
                    {currentSlideData.heading}
                  </h1>
                  <div className="h-1 w-20 md:w-24 bg-[#fecc02] mt-4 rounded-full" />
                </motion.div>

                {/* Subheading */}
                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-[#800000] leading-relaxed max-w-2xl"
                >
                  {currentSlideData.subheading}
                </motion.p>

                {/* UN-inspired decorative element */}
                <motion.div className="flex items-center space-x-1" variants={itemVariants}>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-1 rounded-full ${i % 2 === 0 ? 'bg-[#fecc02]' : 'bg-[#800000]'}`}
                      style={{ width: `${12 + i * 8}px` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    />
                  ))}
                </motion.div>

                {/* Location info */}
                <motion.div variants={itemVariants} className="flex items-center text-blue-100/80">
                  <MapPin className="w-4 h-4 text-[#fecc02] mr-2" />
                  <span className="text-sm md:text-base text-[#800000] font-medium">
                    Global Conferences • Online Programs Available
                  </span>
                </motion.div>
              </motion.div>
            </div>
            <div></div>
            {/* Program Info Card */}
            <div className="lg:col-span-5">
              <motion.div
                key={`program-${currentSlide}`}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-[#fecc02]/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-[#800000] shadow-2xl"
              >
                {/* Program features */}
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#800000] mb-4">
                      {currentSlideData.program.title}
                    </h3>
                    <p className="text-[#800000] text-sm md:text-base">
                      {currentSlideData.program.description}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/programs/${currentSlideData.program.slug}`}
                    className="flex-1 bg-[#800000] font-semibold px-6 py-2 rounded-lg justify-center items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-[#fffff6]"
                  >
                    Details
                  </Link>
                  <Link
                    href="/programs"
                    className="flex-1 bg-[#fecc02] text-[#800000] border border-[#800000] hover:bg-[#fecc02]/10 px-6 py-2 rounded-lg justify-center items-center text-center transition-all duration-300 font-semibold"
                  >
                    All Programs
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center space-x-4 bg-[#800000] backdrop-blur-md rounded-full px-4 py-2">
          {/* Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:text-[#fecc02] transition-colors duration-300"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Slide indicators */}
          <div className="flex space-x-2">
            {block.slider.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-[#fecc02] scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <span className="text-white/70 text-sm ml-2">
            {currentSlide + 1} / {block.slider.length}
          </span>
        </div>
      </div>
    </section>
  )
}
