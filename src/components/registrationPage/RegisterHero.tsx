'use client'
import React from 'react'

export default function RegisterHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-950 to-blue-800 text-white py-10 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full"></div>
      </div>

      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#fecc02] opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-12 w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>

      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8"></div>
      </div>
    </section>
  )
}
