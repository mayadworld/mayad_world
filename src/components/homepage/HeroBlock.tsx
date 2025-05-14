'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { ChevronRight, MapPin } from 'lucide-react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

interface HeroImage {
  image: {
    url: string
  }
  alt: string
}

interface HeroBlockProps {
  block: {
    heading: string
    subheading: string
    hero_image: HeroImage[]
  }
}

export default function HeroBlock({ block }: HeroBlockProps) {
  // Default values if props are not provided
  const heading = block?.heading
  const subheading = block?.subheading
  const heroImages = block?.hero_image || []

  // State management
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])
  const [isMobile, setIsMobile] = useState(false)

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

    // Check on mount
    checkIfMobile()

    // Add event listener
    window.addEventListener('resize', checkIfMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Initialize image loaded states
  useEffect(() => {
    if (heroImages.length > 0) {
      setImagesLoaded(new Array(heroImages.length).fill(false))
    }
  }, [heroImages.length])

  // Handle image load events
  const handleImageLoaded = useCallback((index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }, [])

  // Animations when component is in view
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  // Auto-rotate carousel
  useEffect(() => {
    if (heroImages.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [heroImages.length])

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Slide transition variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    }),
  }

  // Handle manual slide navigation
  const navigateSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Check if there are multiple slides
  const hasMultipleSlides = heroImages.length > 1

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] md:min-h-[120vh] xl:min-h-[120vh] 2xl:min-h-[80vh] overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 pt-20 md:py-0 md:pt-20 flex items-center justify-center"
    >
      {/* Background Carousel - works on all screen sizes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} custom={1}>
          {heroImages.map(
            (image, index) =>
              index === currentSlide && (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.image.url}
                      fill
                      alt={image.alt || 'Hero background image'}
                      className={`object-cover w-full h-full transition-opacity duration-1000 ${
                        imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoaded(index)}
                      priority={index === 0}
                    />
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>

        {/* Overlay gradient - different for mobile and desktop */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-blue-900 via-blue-900/80 to-blue-900/60" />
      </div>

      <div className="xl:container mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Content side */}
        <div className="flex flex-col justify-center py-12 md:py-16 lg:py-0 lg:col-span-6 z-10">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="max-w-xl mx-auto lg:mx-0"
          >
            {/* Main heading with accent */}
            <motion.h1
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight"
              variants={itemVariants}
            >
              {heading}
              <div className="h-1 w-20 sm:w-24 bg-yellow-500 mt-4 rounded-full" />
            </motion.h1>

            {/* Subheading text */}
            <motion.div variants={itemVariants}>
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-blue-100/90 leading-relaxed">
                {subheading}
              </p>
            </motion.div>

            {/* UN-inspired decorative element */}
            <motion.div className="flex mb-6 md:mb-8" variants={itemVariants}>
              <div className="flex space-x-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-1 rounded-full ${i % 2 === 0 ? 'bg-yellow-500' : 'bg-blue-400'}`}
                    style={{ width: `${8 + i * 6}px` }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Call to action buttons - responsive layout */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6"
              variants={itemVariants}
            >
              <Link
                href="/programs"
                className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-medium px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-lg flex items-center justify-center shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0"
              >
                Join Our Program
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              </Link>

              <Link
                href="/about-us"
                className="bg-transparent border-2 border-yellow-500/80 text-yellow-500 hover:bg-blue-800/30 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-lg flex items-center justify-center transition-transform hover:-translate-y-1 active:translate-y-0"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Location indicator */}
            <motion.div
              className="flex items-center mt-8 sm:mt-10 text-blue-100/80"
              variants={itemVariants}
            >
              <MapPin className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm">Conferences worldwide • Online programs available</span>
            </motion.div>

            {/* Carousel navigation indicators - only show if multiple slides */}
            {hasMultipleSlides && (
              <motion.div className="flex items-center justify-start mt-8" variants={itemVariants}>
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => navigateSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full mx-1 transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-yellow-500 scale-125'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="lg:col-span-1"></div>

        <div className="relative lg:col-span-4 lg:h-full z-10 pt-0 lg:pt-0 hidden md:block">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            {/* Animated glowing ring */}
            <motion.div
              className="absolute inset-0 -m-4 bg-yellow-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />

            {/* Logo with perspective effect */}
            <motion.div
              className="relative p-8"
              whileHover={{
                rotateY: 10,
                rotateX: -10,
                scale: 1.05,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <Image
                src="/logolight.png"
                alt="Logo"
                width={450}
                height={450}
                className="drop-shadow-xl"
              />
            </motion.div>

            {/* Animated dots */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-yellow-500/30 blur-sm animate-pulse" />
              <div
                className="absolute bottom-6 left-10 w-3 h-3 rounded-full bg-blue-400/30 blur-sm animate-pulse"
                style={{ animationDelay: '1s' }}
              />
              <div
                className="absolute top-10 left-0 w-2 h-2 rounded-full bg-yellow-500/20 blur-sm animate-pulse"
                style={{ animationDelay: '1.5s' }}
              />
            </div>
          </motion.div>

          {/* Decorative orbit elements */}
          <motion.div
            className="absolute w-full h-full pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2">
              <div className="absolute w-full h-full rounded-full border border-blue-400/10" />
              <div className="absolute w-3 h-3 bg-yellow-500/50 rounded-full top-0 left-1/2 -translate-x-1/2" />
            </div>
          </motion.div>

          <motion.div
            className="absolute w-[90%] h-[90%] pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2">
              <div className="absolute w-full h-full rounded-full border border-yellow-500/10" />
              <div className="absolute w-2 h-2 bg-blue-400/50 rounded-full bottom-0 left-1/2 -translate-x-1/2" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-blue-900 via-yellow-500 to-blue-900" />
    </section>
  )
}
