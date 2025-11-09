'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Anton_SC } from 'next/font/google'

const anton = Anton_SC({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
})

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about-us' },
    { label: 'Programs', link: '/programs' },
    { label: 'Events', link: '/events' },
    { label: 'Gallery', link: '/gallery' },
    { label: 'Contact', link: '/contact-us' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="w-full relative md:fixed top-0 left-0 z-50 bg-[#fffff6] px-8 md:px-16">
      <div className="transition-all duration-300 border-b border-[#fecc02]">
        <div className="max-w-screen-xl px-4 lg:px-8 mx-auto">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div
                className={`flex items-center gap-2 transition-all duration-300 ${scrolled ? 'bg-[#ffffff] p-2 rounded' : ''}`}
              >
                <div>
                  <Image
                    src="/darklogo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="w-8 md:w-10 h-8 md:h-10 rounded-full object-cover"
                  />
                </div>

                <div className={`${anton.className} flex flex-col leading-tight`}>
                  <span className={`text-lg md:text-xl font-semibold text-[#800000] tracking-wide`}>
                    Mayad World
                  </span>
                  <span className="text-[#800000] tracking-wider uppercase text-xs md:text-sm font-light">
                    Connections
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((nav, index) => (
                <Link
                  key={index}
                  href={nav.link}
                  className="text-[#800000] font-semibold transition-colors duration-200"
                >
                  {nav.label}
                </Link>
              ))}

              <Link
                href="/register"
                className="bg-[#fecc02] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#dbb107] transition-colors duration-200 text-white"
              >
                Register Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-[#800000] focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#fffff6] absolute right-8 w-1/2 py-4 px-6 shadow-lg border-b-2 border-yellow-500">
          <div className="flex flex-col space-y-5">
            {navItems.map((nav, index) => (
              <Link
                key={index}
                href={nav.link}
                className="text-[#800000] font-medium transition-colors duration-200 border-b-2 border-[#800000] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {nav.label}
              </Link>
            ))}

            <Link
              href="/register"
              className="bg-transparent text-center px-4 py-2 rounded-md text-sm border border-[#fecc02] text-[#800000] font-semibold hover:bg-[#800000] hover:border-white hover:text-white transition-colors duration-200"
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
