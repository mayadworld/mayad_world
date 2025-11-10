import Link from 'next/link'
import React from 'react'

export default function CTABlock() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#800000] rounded-2xl shadow-xl overflow-hidden border-4 border-[#fecc02]">
          <div className="relative p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fecc02]/10 rounded-full blur-xl"></div>

            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#fffff6] mb-4">
                Ready to Be Part of Something Bigger?
              </h3>
              <p className="text-gray-200 mb-8 max-w-lg mx-auto">
                Join students from across the world in transformative programs that build skills,
                spark ambition, and open global doors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-[#fecc02] hover:bg-amber-500 text-[#fffff6] font-semibold rounded-lg transition-colors shadow-lg"
                >
                  Register Now
                </Link>
                <Link
                  href="/about-us"
                  className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-[#800000] font-semibold rounded-lg transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
