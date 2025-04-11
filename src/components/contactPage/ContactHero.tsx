'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function ContactHero() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative min-h-screen overflow-hidden ">
      <motion.div
        className="relative overflow-hidden bg-blue-900 text-white py-20"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="relative z-10 max-w-2xl">
            <motion.h1
              className="text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              className="text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transforming ideas into reality through innovation and excellence.
            </motion.p>
          </div>
        </div>

        {/* Yellow accent shape */}
        <div className="absolute right-0 bottom-0">
          <svg width="350" height="350" viewBox="0 0 350 350" fill="none">
            <circle cx="175" cy="175" r="175" fill="#EAB308" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
