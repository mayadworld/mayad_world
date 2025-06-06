'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export default function ContactHero() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const pathVariant = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-950 to-blue-800 text-white pt-32 pb-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
      </div>

      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-yellow-400 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>

      {/* Main content container */}
      <div className="xl:container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center bg-blue-800/70 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-700/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="flex items-center text-sm font-medium text-blue-100">
                <Mail size={14} className="mr-2 text-yellow-400" />
                We{"'"}d love to hear from you
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Let{"'"}s Start a{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Conversation</span>
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-400/30 rounded-full -rotate-1"></span>
                </span>
              </h1>
              <p className="text-lg text-blue-100/90 max-w-lg">
                Transforming ideas into reality through innovation and excellence. Reach out to us
                for collaboration opportunities or inquiries.
              </p>
            </motion.div>
          </div>

          {/* Right side - decorative element */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative">
              {/* Main circle */}
              <motion.div
                className="w-80 h-80 rounded-full border-4 border-blue-400/30 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                {/* Inner circle */}
                <motion.div
                  className="w-64 h-64 rounded-full border-4 border-yellow-400/30 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                >
                  {/* Center circle */}
                  <motion.div
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-400/20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.1 }}
                  >
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-blue-900"
                    >
                      <motion.path
                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                        variants={pathVariant}
                        transition={{ duration: 1.5, delay: 1.3 }}
                        strokeWidth="2"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Decorative small circles */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-blue-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              />
              <motion.div
                className="absolute -bottom-2 left-10 w-8 h-8 rounded-full bg-yellow-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400"></div>
    </section>
  )
}
