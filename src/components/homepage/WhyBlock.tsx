'use client'
import React, { useState } from 'react'
import { Plus, Minus, Scale, Clock, Shield, Zap } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface WhyBlockProps {
  block: {
    name: string
    description: string
    listings: Array<{
      id: number
      title: string
      content: string
    }>
  }
}

export default function WhyBlock({ block }: WhyBlockProps) {
  const [activeItem, setActiveItem] = useState('item-1')

  const handleValueChange = (value: string) => {
    setActiveItem(value)
  }

  return (
    <>
      {/* Hero section with decorative elements */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#003566]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#003566]/3 blur-3xl" />

        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#003566" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003566] mb-6 tracking-tight">
              {block.name}
            </h2>
            <div className="w-24 h-1 bg-[#003566] mx-auto mb-8"></div>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">{block.description}</p>
          </div>
        </div>
      </section>

      {/* Accordion section */}
      <section className="bg-[#f8fcff] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={activeItem}
              onValueChange={handleValueChange}
            >
              {block.listings.map((item) => {
                const itemValue = `item-${item.id}`
                const isActive = activeItem === itemValue

                return (
                  <AccordionItem
                    key={item.id}
                    value={itemValue}
                    className={cn(
                      'mb-5 overflow-hidden rounded-lg shadow-sm transition-all duration-300',
                      isActive ? 'shadow-md' : '',
                    )}
                  >
                    <AccordionTrigger
                      className={cn(
                        'p-5 flex items-center justify-between transition-all duration-300 hover:no-underline',
                        isActive ? 'bg-[#003566] text-white' : 'bg-white hover:bg-gray-50',
                      )}
                    >
                      <div className="flex items-center">
                        <div
                          className={cn(
                            'p-2 rounded-full mr-4 flex items-center justify-center',
                            isActive ? 'bg-white' : 'bg-[#003566]/10',
                          )}
                        >
                          {item.id === 1 && (
                            <Scale
                              size={22}
                              className={isActive ? 'text-[#003566]' : 'text-[#003566]'}
                            />
                          )}
                          {item.id === 2 && (
                            <Clock
                              size={22}
                              className={isActive ? 'text-[#003566]' : 'text-[#003566]'}
                            />
                          )}
                          {item.id === 3 && (
                            <Shield
                              size={22}
                              className={isActive ? 'text-[#003566]' : 'text-[#003566]'}
                            />
                          )}
                          {item.id > 3 && (
                            <Zap
                              size={22}
                              className={isActive ? 'text-[#003566]' : 'text-[#003566]'}
                            />
                          )}
                        </div>
                        <h3
                          className={cn(
                            'text-xl font-semibold',
                            isActive ? 'text-white' : 'text-[#003566]',
                          )}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div
                        className={cn(
                          'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300',
                          isActive ? 'bg-white' : 'bg-[#003566]/10',
                        )}
                      >
                        {isActive ? (
                          <Minus size={18} className="text-[#003566]" />
                        ) : (
                          <Plus size={18} className="text-[#003566]" />
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 bg-white">
                      <div className="border-l-4 border-[#003566] pl-4">
                        <p className="text-gray-700">{item.content}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}
