'use client'
import React from 'react'
import { Calendar, Globe, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function EventsHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-800 z-0">
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Glowing orb effects */}
      <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-400 opacity-10 blur-3xl"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-800/50 backdrop-blur-sm text-blue-100 px-4 py-2 rounded-full border border-blue-700/50 mb-6">
          <Calendar size={16} className="text-yellow-400" />
          <span className="text-sm font-medium">Upcoming Global Events</span>
        </div>

        {/* Main heading with highlight */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-4xl mb-6">
          Global Experiences.
          <span className="relative inline-block mx-2">
            <span className="relative z-10">Lasting Impact.</span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-400/30 rounded-full -rotate-1"></span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-blue-100/80 text-center max-w-3xl mb-12 leading-relaxed">
          Our events are more than just conferences—they{"'"}re gateways to global thinking,
          cultural exchange, and academic enrichment. Whether you{"'"}re stepping into your first
          committee session or representing your country on an international stage, there{"'"}s an
          experience here for you.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            href="#events"
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 transition-all"
          >
            Browse Events
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-blue-800/50 hover:bg-blue-800 text-white border border-blue-700/50 font-medium rounded-lg transition-all backdrop-blur-sm"
          >
            Join Our Network
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-3xl">
          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/30 rounded-lg p-4 text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center mb-3">
                <Globe size={24} className="text-yellow-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white">50+</h3>
            <p className="text-blue-200/70 text-sm">Countries Represented</p>
          </div>

          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/30 rounded-lg p-4 text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center mb-3">
                <Calendar size={24} className="text-yellow-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white">25+</h3>
            <p className="text-blue-200/70 text-sm">Annual Events</p>
          </div>

          <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-700/30 rounded-lg p-4 text-center col-span-2 md:col-span-1">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center mb-3">
                <MapPin size={24} className="text-yellow-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white">12</h3>
            <p className="text-blue-200/70 text-sm">Host Cities</p>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400"></div>
      </div>
    </section>
  )
}
