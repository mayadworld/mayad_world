'use client'
import React from 'react'
import { Target, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface GoalsBlockProps {
  block: {
    mission: string
    vision: string
  }
}

export default function GoalsSection({ block }: GoalsBlockProps) {
  // Default values in case none are provided
  const mission = block.mission
  const vision = block.vision

  return (
    <section className="py-8 px-8 md:px-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16 max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#800000]">Our Purpose</h2>
          <div className="h-1 w-12 bg-[#800000] mx-auto"></div>
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Mission */}
          <div className="group">
            <div className="mb-6 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 rounded-full mr-3 bg-blue-50 text-cyan-600 transition-all group-hover:scale-110">
                <Target size={20} />
              </span>
              <h3 className="text-2xl font-medium text-[#800000]">Our Mission</h3>
            </div>

            <p className="text-[#800000] leading-relaxed">{mission}</p>
          </div>

          {/* Vision */}
          <div className="group">
            <div className="mb-6 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 rounded-full mr-3 bg-green-50 text-green-600 transition-all group-hover:scale-110">
                <Eye size={20} />
              </span>
              <h3 className="text-2xl font-medium text-[#800000]">Our Vision</h3>
            </div>

            <p className="text-[#800000] leading-relaxed">{vision}</p>
          </div>
        </div>

        {/* Bottom CTA - Minimalist Style */}
        <div className="mt-16 bg-[#800000] rounded-lg overflow-hidden shadow-md">
          <div className="p-8 md:p-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-medium text-white mb-2">
                Ready to participate in our Model UN program?
              </h3>
              <p className="text-[#fffff6]">
                Join delegates from around the world in simulating international diplomacy.
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center bg-[#fffff6] text-[#800000] transition-colors font-medium px-6 py-3 rounded-lg shadow-sm"
            >
              Register Now
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
