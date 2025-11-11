'use client'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { Users, ArrowRight } from 'lucide-react'

interface TeamBlockProps {
  block: {
    team_profiles: Array<{
      id: number
      slug: string
      name: string
      role: string
      bio: string
      photo: {
        url: string
      }
    }>
  }
}

export default function TeamSection({ block }: TeamBlockProps) {
  const members = block?.team_profiles || [
    {
      id: 1,
      slug: 'john-doe',
      name: 'John Doe',
      role: 'CEO & Founder',
      bio: 'With over 15 years of experience in global business development, John leads our mission to connect businesses worldwide through innovative solutions and strategic partnerships that drive growth.',
      photo: {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
      },
    },
    {
      id: 2,
      slug: 'jane-smith',
      name: 'Jane Smith',
      role: 'Head of Operations',
      bio: 'Jane brings a wealth of expertise in international operations and client relations, ensuring seamless service delivery across all our global connections and partnerships worldwide.',
      photo: {
        url: 'https://images.unsplash.com/photo-1494790108755-2616b95b7a0d?w=400&h=500&fit=crop&crop=face',
      },
    },
  ]

  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-8 md:px-16 relative overflow-hidden bg-[#800000]"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#fecc02]/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#fecc02" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#fecc02]/20 backdrop-blur-sm border border-[#fecc02]/30 text-[#fecc02] font-medium text-sm mb-6">
              <Users className="w-4 h-4" />
              <span>Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet Our <span className="text-[#fecc02]">Leaders</span>
            </h2>
            <div className="w-24 h-1 bg-[#fecc02] mx-auto mb-6"></div>
            <p className="text-blue-100/80 text-lg max-w-2xl mx-auto">
              The passionate educators and changemakers shaping the future of youth through global
              education, leadership and opportunity.
            </p>
          </motion.div>

          {/* Team Cards */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {members.map((member, index) => (
              <motion.div key={member.id} variants={fadeInUp} className="group relative">
                {/* Card */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  {/* Image Section */}
                  <div className="relative h-80 overflow-hidden">
                    {member.photo ? (
                      <Image
                        src={member.photo.url}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-800 to-[#800000] text-white">
                        <Users className="w-16 h-16 opacity-50" />
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-transparent"></div>

                    {/* Role badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#fecc02] text-blue-950 px-3 py-1 rounded-full text-xs font-bold">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#fecc02] font-medium">{member.role}</p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-[#fecc02] via-[#fecc02]/50 to-transparent"></div>

                    {/* Bio with line clamp */}
                    <p className="text-blue-100/90 text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>

                    {/* CTA Button */}
                    <Link
                      href={`/about-us/team/${member.slug}`}
                      className="inline-flex items-center gap-2 text-[#fecc02] font-medium hover:text-[#fecc02]/80 transition-colors group/link"
                    >
                      View Full Profile
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Decorative accent */}
                <div
                  className={`absolute -top-3 ${index % 2 === 0 ? '-right-3' : '-left-3'} w-6 h-6 rounded-full bg-[#fecc02] opacity-80`}
                ></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-[#fecc02] text-blue-950 px-8 py-4 rounded-full font-bold hover:bg-[#fecc02]/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
