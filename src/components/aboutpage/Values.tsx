'use client'
import React from 'react'

interface ValuesBlockProps {
  block: {
    our_values: Array<{
      title: string
      description: string
    }>
  }
}

export default function ValuesSection({ block }: ValuesBlockProps) {
  const mainColor = '#003566'

  // Use provided values or defaults
  const values = block.our_values

  return (
    <section className="py-16" style={{ backgroundColor: mainColor }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-white">Our Core Values</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            The principles that guide our practice and define our commitment to clients
          </p>
          <div className="w-20 h-1 mx-auto mt-4 bg-white/30"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:translate-y-[-5px]"
            >
              <div className="h-2 w-full" style={{ backgroundColor: getAccentColor(index) }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: mainColor }}>
                  {value.title}
                </h3>
                <p className="text-gray-600 text-base">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  function getAccentColor(index: number) {
    const accentColors = [
      '#0353A4', // Slightly lighter blue
      '#023E7D', // Medium blue
      '#002855', // Darker blue
      '#001845', // Very dark blue
      '#0466C8', // Brighter blue
      '#0077B6', // Ocean blue
    ]
    return accentColors[index % accentColors.length]
  }
}
