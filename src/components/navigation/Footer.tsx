'use client'
import Link from 'next/link'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
} from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const navItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about-us' },
    { label: 'Events', link: '/events' },
    { label: 'Contact', link: '/contact-us' },
    { label: 'Registration', link: '/register' },
  ]
  return (
    <footer className="bg-blue-900 py-16 px-8 md:px-12 lg:px-16">
      {/* Top accent line */}
      <div className="h-px bg-[#eab308] w-full mb-16"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-2 transition-all duration-300">
            <div>
              <Image
                src="/logolight.png"
                alt="Logo"
                width={50}
                height={50}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-[#ffffff] tracking-wide">
                Mayad<span className="text-[#EAB308]"> World</span>
              </span>
              <span className="text-white tracking-wider uppercase text-xs">
                Connecting You to the World
              </span>
            </div>
          </div>

          <p className="text-white/80 text-sm leading-relaxed">
            Whether you{"'"}re a school, student, or educator, we{"'"}re here to support your MUN
            goals. Join our network of changemakers today.
          </p>

          <div className="flex gap-4">
            <a href="#" className="text-white/80 hover:text-[#74b1dd] transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-white/80 hover:text-[#74b1dd] transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-white/80 hover:text-[#74b1dd] transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-white/80 hover:text-[#74b1dd] transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-8">
          <h3 className="font-serif text-white text-lg">Quick Links</h3>

          <ul className="space-y-4">
            {navItems.map((nav, index) => (
              <li key={index}>
                <Link
                  href={nav.link}
                  className="text-white/70 hover:text-[#74b1dd] transition-colors text-sm flex items-center group"
                >
                  <ChevronRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="space-y-8">
          <h3 className="font-serif text-white text-lg">Contact</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#74b1dd] flex-shrink-0 mt-1" />
              <p className="text-white/70 text-sm">
                3rd Floor, Muchane Plaza
                <br />
                Kikuyu, Kenya
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#74b1dd] flex-shrink-0" />
              <a
                href="mailto:info@mayadworld.com"
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                info@mayadworld.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#74b1dd] flex-shrink-0" />
              <a
                href="tel:+254715337850"
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                +254 715 337850
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with copyright and links */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} Mayad World Connections. All rights reserved.
          </p>

          <div className="flex gap-8">
            <p className="text-white/50 text-xs">Connecting You To the World</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
