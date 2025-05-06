'use client'
import React, { useEffect, useState } from 'react'
import { ChevronRight, Globe, Users, Award, MapPin } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

interface HeroBlockProps {
  block: {
    heading: string
    subheading: string
    hero_image: { url: string }
  }
}

export default function HeroBlock({ block }: HeroBlockProps) {
  // Default values if props are not provided
  const heading = block?.heading
  const subheading = block?.subheading
  const heroImage = block?.hero_image?.url
  // State to hold the background image load status
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [currentHighlight, setCurrentHighlight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const highlights = [
    { icon: Globe, text: 'Global Diplomacy' },
    { icon: Users, text: 'Leadership Development' },
    { icon: Award, text: 'Award-Winning Programs' },
  ]

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

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  useEffect(() => {
    const image = new Image()
    image.src = heroImage
    image.onload = () => {
      setIsImageLoaded(true)
    }
  }, [heroImage])

  // Rotate through highlights
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % highlights.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [highlights.length])

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

  return (
    <section
      ref={ref}
      className="relative min-h-[50vh] md:min-h-[120vh] xl:min-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-20 flex items-center justify-center"
    >
      {/* Mobile background image (visible only on small screens) */}
      <div className="absolute inset-0 md:hidden">
        <div
          className="w-full h-full bg-center opacity-20"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-blue-900/70" />
      </div>

      {/* Decorative world map pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="worldMap"
            patternUnits="userSpaceOnUse"
            width="200"
            height="200"
            patternTransform="scale(1.5)"
          >
            <path
              d="M20,40 Q40,20 60,40 T100,40 T140,20 T180,40"
              fill="none"
              stroke="#eab308"
              strokeWidth="0.2"
            />
            <path
              d="M20,80 Q40,100 60,80 T100,80 T140,100 T180,80"
              fill="none"
              stroke="#eab308"
              strokeWidth="0.2"
            />
            <path
              d="M20,120 Q40,140 60,120 T100,120 T140,140 T180,120"
              fill="none"
              stroke="#eab308"
              strokeWidth="0.2"
            />
            <path
              d="M20,160 Q40,180 60,160 T100,160 T140,180 T180,160"
              fill="none"
              stroke="#eab308"
              strokeWidth="0.2"
            />
            <path
              d="M40,20 L40,180"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.1"
              strokeDasharray="1,4"
            />
            <path
              d="M80,20 L80,180"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.1"
              strokeDasharray="1,4"
            />
            <path
              d="M120,20 L120,180"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.1"
              strokeDasharray="1,4"
            />
            <path
              d="M160,20 L160,180"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.1"
              strokeDasharray="1,4"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#worldMap)" />
        </svg>
      </div>

      <div className="xl:container mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Content side */}
        <div className="flex flex-col justify-center py-12 md:py-16 lg:py-0 lg:col-span-6 z-10">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="max-w-xl mx-auto lg:mx-0"
          >
            {/* Highlighted badge */}
            <motion.div
              className="inline-flex items-center mb-6 px-4 py-2 bg-blue-900/50 backdrop-blur-sm rounded-full border border-yellow-500/30"
              variants={itemVariants}
            >
              <div className="relative h-5 overflow-hidden">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: currentHighlight === index ? 1 : 0,
                      y: currentHighlight === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <highlight.icon className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-blue-100 font-medium text-sm whitespace-nowrap">
                      {highlight.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

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
                {[...Array(5)].map((_, i) => (
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

            {/* Location indicator - New element */}
            <motion.div
              className="flex items-center mt-8 sm:mt-10 text-blue-100/80"
              variants={itemVariants}
            >
              <MapPin className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm">Conferences worldwide • Online programs available</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right image side with SVG overlay */}
        <div className="relative hidden lg:block lg:col-span-6">
          {/* Image with clip path */}
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: "url('" + heroImage + "')",
                clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
              }}
            />
          </motion.div>

          {/* SVG Overlay */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              {/* Decorative patterns */}
              <motion.path
                d="M20,0 C40,20 60,20 80,0 L100,0 L100,100 L0,100 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.8 }}
              />
              <motion.path
                d="M0,80 C20,60 40,90 60,70 C80,50 90,60 100,40"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />

              {/* Dots pattern */}
              {[...Array(12)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={10 + (i % 4) * 25}
                  cy={20 + Math.floor(i / 4) * 25}
                  r="0.5"
                  fill="rgba(255, 255, 255, 0.5)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.2 + i * 0.1,
                  }}
                />
              ))}

              {/* World map outline suggestion */}
              <motion.path
                d="M30,30 C35,25 40,35 45,30 C50,25 55,35 60,30 C65,25 70,35 75,30"
                fill="none"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 3, delay: 1.5 }}
              />
            </svg>
          </motion.div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent opacity-70 z-30" />
        </div>
      </div>

      {/* Bottom bar accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-blue-900 via-yellow-500 to-blue-900" />
    </section>
  )
}
