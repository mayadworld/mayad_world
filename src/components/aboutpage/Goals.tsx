'use client'
import React from 'react'
import { Target, Eye } from 'lucide-react'

interface GoalsBlockProps {
  block: {
    mission: string
    vision: string
  }
}

export default function GoalsSection({ block }: GoalsBlockProps) {
  const mainColor = '#003566'
  const lightMainColor = '#e5edf5'

  // Default values in case none are provided
  const mission = block.mission

  const vision = block.vision

  return (
    <section className="py-16" style={{ backgroundColor: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ color: mainColor }}>
            Our Purpose
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Guiding principles that shape our approach to legal practice and client service
          </p>
          <div className="w-20 h-1 mx-auto mt-4" style={{ backgroundColor: mainColor }}></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 transition-transform hover:translate-y-[-5px]"
            style={{ borderColor: mainColor }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: lightMainColor }}>
                  <Target size={28} style={{ color: mainColor }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: mainColor }}>
                  Our Mission
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{mission}</p>

              <div className="flex flex-wrap gap-3 mt-6">
                <span
                  className="inline-block px-3 py-1 text-sm rounded-full text-white"
                  style={{ backgroundColor: mainColor }}
                >
                  Client-Focused
                </span>
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                  Ethical Practice
                </span>
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                  Excellence
                </span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 transition-transform hover:translate-y-[-5px]"
            style={{ borderColor: mainColor }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: lightMainColor }}>
                  <Eye size={28} style={{ color: mainColor }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: mainColor }}>
                  Our Vision
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{vision}</p>

              <div className="flex flex-wrap gap-3 mt-6">
                <span
                  className="inline-block px-3 py-1 text-sm rounded-full text-white"
                  style={{ backgroundColor: mainColor }}
                >
                  Leadership
                </span>
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                  Innovation
                </span>
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                  Trust
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="p-8 rounded-lg" style={{ backgroundColor: lightMainColor }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: mainColor }}>
              Want to learn more about our approach?
            </h3>
            <p className="text-gray-600 mb-6">
              Schedule a consultation with one of our experienced attorneys today.
            </p>
            <button
              className="px-6 py-3 rounded-lg text-white font-medium transition-all hover:opacity-90 shadow-md"
              style={{ backgroundColor: mainColor }}
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
