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
        return <Award size={24} className="text-[#fecc02]" />
      case 2:
        return <Clock size={24} className="text-[#fecc02]" />
      case 3:
        return <Shield size={24} className="text-[#fecc02]" />
      default:
        return <Zap size={24} className="text-[#fecc02]" />
    }
  }

  return (
    <div className="py-4 px-8 md:px-16">
      {/* Hero Header */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-32 rounded-3xl bg-[#800000] transform -skew-y-2"></div>
        <div className="absolute top-0 right-0 w-full h-48 rounded-3xl bg-[#800000]/90 transform -skew-y-8"></div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-[#fffff6] rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl w-full">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center mb-4">
                  <span className="px-3 py-1 bg-[#800000] text-white text-xs font-medium rounded-full">
                    Mayad World Connections
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-4">
                  {block.heading}
                </h2>
                <div className="w-16 h-1 bg-[#fecc02] mx-auto mb-6"></div>
                <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">{block.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Interactive Cards */}
      <section className="py-2 md:py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {block.listings.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-blue-100"
                onClick={() => setActiveItem(item.id)}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#800000]"></div>
                <div className="p-8">
                  <div className="flex items-center mb-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#800000] text-white mr-4">
                      {getIcon(item.id)}
                    </div>
                    <h3 className="text-xl font-bold text-[#800000]">{item.title}</h3>
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
