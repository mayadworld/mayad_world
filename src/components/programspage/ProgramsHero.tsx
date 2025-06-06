'use client'
import React from 'react'
import { Award } from 'lucide-react'

export default function ProgramsHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-800 z-0 border-b-2 border-yellow-400"></div>

      {/* Glowing orb effects */}
      <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-400 opacity-10 blur-3xl"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-12 flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-800/50 backdrop-blur-sm text-blue-100 px-4 py-2 rounded-full border border-blue-700/50 mb-6">
          <Award size={16} className="text-yellow-400" />
          <span className="text-sm font-medium">Our Programs</span>
        </div>

        {/* Main heading with highlight */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-4xl mb-6">
          Discover Our
          <span className="relative inline-block mx-2">
            <span className="relative z-10">Programs</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-400/30 rounded-full -rotate-3"></span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-blue-100/80 text-center max-w-3xl mb-6 leading-relaxed">
          From beginner workshops to advanced diplomatic simulations, our Model UN programs are
          designed to develop your leadership, public speaking, and problem-solving skills. Explore
          our comprehensive range of programs tailored for students of all experience levels.
        </p>
      </div>
    </section>
  )
}
