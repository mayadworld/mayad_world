import React from 'react'
import Link from 'next/link'
import { Award, Users, Bookmark, Calendar, MapPin } from 'lucide-react'

import { fetchAllPrograms } from '@/lib/progUtil'

export default async function ProgramsList() {
  const data = await fetchAllPrograms()
  const programs = data

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white"
      id="program-list"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-blue-900/5 -skew-y-6"></div>
      <div className="absolute top-40 right-0 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-900/5 blur-3xl"></div>

      <section className="py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Program filtering tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-6 py-2 bg-blue-900 text-white rounded-full font-medium hover:bg-blue-800 transition-colors">
              All Programs
            </button>
          </div>

          {/* Programs Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(1).map((program) => (
              <div
                key={program.id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100"
              >
                <div className="relative h-48 bg-blue-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 group-hover:opacity-90 transition-opacity"></div>

                  {/* Program icon */}
                  <div className="absolute top-4 left-2 right-0 inset-0 opacity-30 group-hover:opacity-40 transition-opacity">
                    <Award size={40} className="text-yellow-200" />
                  </div>

                  {/* Program title overlay */}
                  <div className="absolute flex justify-center items-center inset-0 p-4">
                    <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {program.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-4 mb-6 flex-grow">
                    {program.description}
                  </p>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="text-blue-900 font-semibold hover:text-blue-800 transition-colors flex items-center gap-1 bg-yellow-400/20 hover:bg-yellow-400/60 rounded-full px-4 py-2"
                    >
                      Program Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No programs fallback */}
          {programs.length <= 1 && (
            <div className="text-center py-16">
              <Award size={64} className="mx-auto text-blue-200 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">No Programs Available</h3>
              <p className="text-gray-600">Check back soon for new Model UN opportunities</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
