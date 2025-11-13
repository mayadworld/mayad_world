'use client'
import React from 'react'
import { Award } from 'lucide-react'

export default function ProgramsHero() {
  return (
    <section className="relative overflow-hidden px-8 md:px-16">
      {/* Background with overlay gradient */}
      <div className="absolute inset-0 bg-[#800000] z-0 border-b-2 border-[#fecc02]"></div>

      {/* Glowing orb effects */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#fecc02] opacity-10 blur-3xl"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-12 flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#fffff6] backdrop-blur-sm text-blue-100 px-4 py-2 rounded-full border-2 border-[#fecc02] mb-6">
          <Award size={16} className="text-[#800000]" />
          <span className="text-sm font-medium text-[#800000]">Our Programs</span>
        </div>

        {/* Main heading with highlight */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-4xl mb-6">
          Discover Our
          <span className="relative inline-block mx-2">
            <span className="relative z-10">Programs</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#fecc02]/30 rounded-full -rotate-3"></span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-[#fffff6]/80 text-center max-w-3xl mb-6 leading-relaxed">
          From beginner workshops to advanced diplomatic simulations, our Model UN programs are
          designed to develop your leadership, public speaking, and problem-solving skills. Explore
          our comprehensive range of programs tailored for students of all experience levels.
        </p>
      </div>
    </section>
  )
}
