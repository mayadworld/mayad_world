import React from 'react'
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram, Clock, Globe } from 'lucide-react'
import Link from 'next/link'

interface ContactSocialsProps {
  block: {
    socials: Array<{
      linkedin?: string
      facebook?: string
      instagram?: string
      twitter?: string
      tiktok?: string
    }>
    phoneNumbers?: Array<{ phone: string }>
    emailAdd?: Array<{ email: string }>
  }
}

export default function ContactSocials({ block }: ContactSocialsProps) {
  const socialLinks = block.socials[0] || {}

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <div className="w-20 h-1 bg-[#eab308] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Social Media Links */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-center bg-[#eab308] w-14 h-14 rounded-lg -mt-10 mb-4 mx-auto shadow-md">
              <Globe className="w-7 h-7 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-6">Follow Us</h3>

            <div className="grid grid-cols-2 gap-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300"
                >
                  <Facebook className="mr-2 text-[#eab308]" size={20} />
                  <span className="font-medium">Facebook</span>
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300"
                >
                  <Twitter className="mr-2 text-[#eab308]" size={20} />
                  <span className="font-medium">Twitter</span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300"
                >
                  <Linkedin className="mr-2 text-[#eab308]" size={20} />
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300"
                >
                  <Instagram className="mr-2 text-[#eab308]" size={20} />
                  <span className="font-medium">Instagram</span>
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2 text-[#eab308]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                  <span className="font-medium">TikTok</span>
                </a>
              )}
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-300">Stay updated with our latest news and events</p>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-center bg-[#eab308] w-14 h-14 rounded-lg -mt-10 mb-4 mx-auto shadow-md">
              <Phone className="w-7 h-7 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-6">Call Us</h3>

            <div className="space-y-4">
              {block.phoneNumbers && block.phoneNumbers.length > 0 ? (
                block.phoneNumbers.map(({ phone }, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <Phone size={18} className="text-[#eab308] mr-3" />
                      <span className="font-medium">{phone}</span>
                    </div>
                    <a
                      href={`tel:${phone.replace(/\D/g, '')}`}
                      className="bg-[#eab308] text-blue-900 font-medium px-3 py-1 rounded-md hover:bg-opacity-90 transition-opacity duration-300"
                    >
                      Call
                    </a>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Phone size={18} className="text-[#eab308] mr-3" />
                    <span className="font-medium">(123) 456-7890</span>
                  </div>
                  <a
                    href="tel:1234567890"
                    className="bg-[#eab308] text-blue-900 font-medium px-3 py-1 rounded-md hover:bg-opacity-90 transition-opacity duration-300"
                  >
                    Call
                  </a>
                </div>
              )}

              <div className="bg-white/10 p-4 rounded-lg mt-4">
                <div className="flex items-center">
                  <Clock size={18} className="text-[#eab308] mr-3" />
                  <div>
                    <p className="font-medium">Available Hours</p>
                    <p className="text-sm text-gray-300">Mon-Fri: 9AM - 5PM</p>
                    <p className="text-sm text-gray-300">Sat: 10AM - 2PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Addresses */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition hover:translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-center bg-[#eab308] w-14 h-14 rounded-lg -mt-10 mb-4 mx-auto shadow-md">
              <Mail className="w-7 h-7 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-6">Email Us</h3>

            <div className="space-y-4">
              {block.emailAdd && block.emailAdd.length > 0 ? (
                block.emailAdd.map(({ email }, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-all duration-300"
                  >
                    <Link href={`mailto:${email}`} className="">
                      <div className="flex items-center">
                        <Mail size={18} className="text-[#eab308] mr-3" />
                        <span className="font-medium">{email}</span>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Mail size={18} className="text-[#eab308] mr-3" />
                    <span className="font-medium">info@company.com</span>
                  </div>
                  <a
                    href="mailto:info@company.com"
                    className="bg-[#eab308] text-blue-900 font-medium px-3 py-1 rounded-md hover:bg-opacity-90 transition-opacity duration-300"
                  >
                    Email
                  </a>
                </div>
              )}

              <div className="bg-white/10 p-4 rounded-lg mt-4">
                <p className="text-center">
                  <span className="font-medium block mb-2">Response Time</span>
                  <span className="text-sm text-gray-300">
                    We typically respond within 24 hours
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
