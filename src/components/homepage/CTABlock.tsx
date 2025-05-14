import Link from 'next/link'
import React from 'react'

export default function CTABlock() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl shadow-xl overflow-hidden border-4 border-[#eab308]">
          <div className="relative p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700/30 rounded-full blur-xl"></div>

            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to join our next MUN conference?
              </h3>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                Register now to secure your committee preference and be part of an unforgettable
                diplomatic experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-blue-900 font-medium rounded-lg transition-colors shadow-lg"
                >
                  Register Now
                </Link>
                <Link
                  href="/about-us"
                  className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-blue-900 font-medium rounded-lg transition-colors"
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
