'use client'
import React, { useState } from 'react'
import { Award, Clock, Shield, Zap } from 'lucide-react'

interface WhyBlockProps {
  block: {
    heading: string
    description: string
    listings: Array<{
      id: number
      title: string
      content: string
    }>
  }
}

export default function WhyBlock({ block }: WhyBlockProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeItem, setActiveItem] = useState(1)

  const getIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Award size={24} className="text-amber-400" />
      case 2:
        return <Clock size={24} className="text-amber-400" />
      case 3:
        return <Shield size={24} className="text-amber-400" />
      default:
        return <Zap size={24} className="text-amber-400" />
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Header */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-blue-900 transform -skew-y-2"></div>
        <div className="absolute top-0 right-0 w-full h-48 bg-blue-900/90 transform -skew-y-3"></div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl w-full">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center mb-4">
                  <span className="px-3 py-1 bg-blue-900 text-white text-xs font-medium rounded-full">
                    Mayad World Connections
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                  {block.heading}
                </h2>
                <div className="w-16 h-1 bg-amber-400 mx-auto mb-6"></div>
                <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">{block.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Interactive Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {block.listings.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-blue-100"
                onClick={() => setActiveItem(item.id)}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 to-amber-400"></div>
                <div className="p-8">
                  <div className="flex items-center mb-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-900 text-white mr-4">
                      {getIcon(item.id)}
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
