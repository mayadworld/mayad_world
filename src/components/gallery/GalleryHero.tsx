'use client'
import React from 'react'

export default function GalleryHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-950 to-blue-800 text-white py-16 md:py-24 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-yellow-400 opacity-20 blur-3xl animate-pulse"></div>
      <div
        className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-blue-400 opacity-20 blur-3xl animate-pulse"
        style={{ animationDuration: '8s' }}
      ></div>
      <div
        className="absolute -bottom-24 -left-12 w-72 h-72 rounded-full bg-yellow-400 opacity-15 blur-3xl animate-pulse"
        style={{ animationDuration: '12s' }}
      ></div>

      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            Our Curated Gallery
          </h1>

          <div className="w-24 h-1 bg-yellow-500 rounded-full mb-8"></div>
        </div>
      </div>

      {/* Bottom decorative edge */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-1">
        <svg
          className="relative w-full h-12 md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,123.11,111.31,181,85.23c59.47-26.64,115.94-64.16,175.39-71.79Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  )
}
