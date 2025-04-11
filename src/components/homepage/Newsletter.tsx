'use client'
import { useState } from 'react'
import { Mail, Phone, ArrowRight, ChevronUp, Send, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    // Reset notification states
    setSubscribed(false)
    setAlreadySubscribed(false)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.status === 409) {
        // Show already subscribed notification instead of alert
        setAlreadySubscribed(true)
        setTimeout(() => setAlreadySubscribed(false), 5000)
      } else if (res.ok) {
        setSubscribed(true)
        setEmail('')
        setTimeout(() => setSubscribed(false), 5000)
      } else {
        alert(data.error || 'Something went wrong. Please try again later.')
      }
    } catch (error) {
      alert('Failed to subscribe. Please try again later.')
      console.error(error)
    }
  }

  return (
    <section className="bg-blue-900 py-12 relative">
      <div className="absolute top-0 right-0 w-full h-12 bg-blue-900 -skew-y-2 transform -translate-y-6"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 md:flex items-center justify-between mx-auto">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Stay Updated on Events
              </h3>
              <p className="text-blue-100">
                Get notifications about upcoming MUN conferences and special events
              </p>
            </div>

            <div className="flex-shrink-0">
              <form onSubmit={handleSubscribe} className="mb-6">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-5 py-4 pr-14 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#eab308] focus:ring-opacity-50 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#eab308] text-[#13589e] p-2.5 rounded-md hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Subscribe"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>

                {/* Success notification */}
                {subscribed && (
                  <div className="mt-4 px-4 py-3 bg-[#eab308] bg-opacity-20 rounded-md border-l-4 border-[#eab308] animate-fade-in">
                    <p className="text-white text-sm">
                      Thank you for subscribing! We{"'"}ll be in touch soon.
                    </p>
                  </div>
                )}

                {/* Already subscribed notification */}
                {alreadySubscribed && (
                  <div className="mt-4 px-4 py-3 bg-amber-500 bg-opacity-20 rounded-md border-l-4 border-amber-500 animate-fade-in flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">Already Subscribed</p>
                      <p className="text-white/80 text-sm">
                        This email is already in our subscriber list. Thank you for your continued
                        interest!
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
