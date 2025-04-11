'use client'
import React from 'react'
import { Building2, Users, Scale, Briefcase, CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface AboutHeroBlockProps {
  block: {
    clause: string
    photo: { url: string }
  }
}

export default function AboutHero({ block }: AboutHeroBlockProps) {
  // Main color: #003566 (deep navy blue)
  // Secondary colors derived from the main color
  const mainColor = '#003566'
  const lightMainColor = '#e5edf5' // Light version for backgrounds

  const aboutContent =
    block.clause ||
    'At LilanKichwenKadima, we are a team of passionate legal professionals committed to achieving the best possible outcomes for our clients. Our firm was founded on the belief that effective legal representation is built on integrity, transparency, and a deep understanding of our clients needs. Over the years, we have expanded our services to cover a variety of practice areas, including family law, criminal defense, business law, estate planning, and more. We believe in providing personal, accessible legal support to individuals, families, and businesses alike. With decades of experience, we have earned a reputation for excellence in our community. We combine strategic legal expertise with a compassionate approach to ensure our clients feel supported and empowered throughout the legal process.'

  // Split content into paragraphs for better readability
  const paragraphs = aboutContent.split('. ').reduce((acc, sentence, index, array) => {
    if (index % 2 === 0) {
      const currentSentence = sentence + (index < array.length - 1 ? '.' : '')
      const nextSentence = array[index + 1] ? array[index + 1] + '.' : ''
      acc.push((currentSentence + ' ' + nextSentence).trim())
    }
    return acc
  }, [] as string[])

  return (
    <section className="bg-[#003566] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src={block.photo?.url || '/bg.jpg'}
                width={800}
                height={600}
                priority
                alt="LilanKichwenKadima Law Firm"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* New overlay element with firm name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-bold">LilanKichwenKadima</h3>
                <p className="text-white/80 text-sm">Legal Excellence Since 1998</p>
              </div>
            </div>

            {/* Values Icons - Updated colors */}
            <div
              className="bg-white shadow-md mt-6 p-6 rounded-lg border-t-4"
              style={{ borderColor: mainColor }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: mainColor }}>
                Our Values
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="p-3 rounded-full mb-2"
                    style={{ backgroundColor: lightMainColor }}
                  >
                    <Scale size={24} style={{ color: mainColor }} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Integrity</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="p-3 rounded-full mb-2"
                    style={{ backgroundColor: lightMainColor }}
                  >
                    <CheckCircle size={24} style={{ color: mainColor }} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Excellence</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="p-3 rounded-full mb-2"
                    style={{ backgroundColor: lightMainColor }}
                  >
                    <Users size={24} style={{ color: mainColor }} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Compassion</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column - Updated styling */}
          <div className="order-1 md:order-2">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: mainColor }}>
                About Our Firm
              </h2>
              <div className="w-20 h-1 mb-6" style={{ backgroundColor: mainColor }}></div>

              <div
                className="flex items-center mb-6 p-4 rounded-lg"
                style={{ backgroundColor: lightMainColor }}
              >
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: 'white' }}>
                  <Building2 size={24} style={{ color: mainColor }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: mainColor }}>
                  LilanKichwenKadima
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-white/90">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Facts - Updated styling */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div
                className="flex items-center p-4 rounded-lg shadow-sm"
                style={{ backgroundColor: lightMainColor }}
              >
                <div className="p-2 rounded-full mr-3 bg-white">
                  <Briefcase size={20} style={{ color: mainColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: mainColor }}>
                    25+
                  </p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
              <div
                className="flex items-center p-4 rounded-lg shadow-sm"
                style={{ backgroundColor: lightMainColor }}
              >
                <div className="p-2 rounded-full mr-3 bg-white">
                  <Users size={20} style={{ color: mainColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: mainColor }}>
                    5,000+
                  </p>
                  <p className="text-sm text-gray-600">Clients Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
