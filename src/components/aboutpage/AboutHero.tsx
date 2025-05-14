'use client'
import React from 'react'
import { Building2, Award, Globe } from 'lucide-react'
import Image from 'next/image'

interface AboutHeroBlockProps {
  block: {
    clause: string
    photo: { url: string }
  }
}

export default function AboutHero({ block }: AboutHeroBlockProps) {
  // Color scheme
  // Format paragraphs for better readability
  const aboutContent = block.clause
  const paragraphs = aboutContent.split('. ').reduce((acc, sentence, index, array) => {
    if (index % 2 === 0) {
      const currentSentence = sentence + (index < array.length - 1 ? '.' : '')
      const nextSentence = array[index + 1] ? array[index + 1] + '.' : ''
      acc.push((currentSentence + ' ' + nextSentence).trim())
    }
    return acc
  }, [] as string[])

  return (
    <section className="relative bg-gradient-to-b from-blue-950 to-blue-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 md:pt-0 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Company badge */}
            <div className="inline-flex items-center bg-[#eab20859] rounded-full px-4 py-2 border border-blue-800 mb-6">
              <div className="bg- mr-2 rounded-full p-1">
                <Building2 size={16} className="text-[#eab308]" />
              </div>
              <span className="text-white font-medium">Mayad World Connections</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Connecting you <span className="text-[#eab308]">to the world</span>
            </h1>

            {/* Description */}
            <div className="space-y-4 text-blue-100/90 md:text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/30 transform rotate-1 hover:rotate-0 transition-all duration-300">
              <Image
                src={block.photo?.url}
                width={900}
                height={1200}
                priority
                alt="Mayad World Connections Global Network"
                className="w-full h-[50vh] lg:h-[80vh] object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-blue-950/20"></div>

              {/* Tag overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-950/90 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-xl md:text-2xl font-bold">
                      Mayad World Connections
                    </h3>
                    <p className="text-blue-100/80">Global Connections, Local Expertise</p>
                  </div>
                  <div className="bg-primary/20 backdrop-blur-sm p-2 rounded-lg border border-primary/30">
                    <Globe size={24} className="text-[#eab308]" />
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-6 right-6 bg-primary/20 backdrop-blur-sm p-3 rounded-full border border-primary/30">
                <Award size={24} className="text-white" />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 -z-10"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-blue-800/20 backdrop-blur-sm border border-blue-700/30 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
