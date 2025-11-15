export const dynamic = 'force-dynamic'
import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { Phone, Mail, ArrowLeft, MapPin } from 'lucide-react'
import { fetchAllMembers } from '@/lib/ourTeamUtils'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'team',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  const profile = docs[0]

  if (!profile) {
    return {
      title: 'Team Member Not Found – Mayad World Connections',
      description:
        'The team member you are looking for could not be found. Meet the experts behind Mayad World Connections and explore their roles in driving global business connections.',
    }
  }

  const memberName = profile.name || 'Team Member – Mayad World Connections'
  const memberBio =
    profile.bio ||
    'Meet a key expert from Mayad World Connections. Learn how their skills and vision contribute to connecting businesses worldwide.'

  return {
    title: `${memberName} – Mayad World Connections`,
    description: memberBio,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
    openGraph: {
      title: `${memberName} – Mayad World Connections`,
      description: memberBio,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/team/${slug}`,
      images: [
        {
          url:
            profile.photo && typeof profile.photo === 'object' && profile.photo.url
              ? profile.photo.url
              : '/officialLogo.png',
          width: 1200,
          height: 630,
          alt: profile.name || 'Mayad World Connections Team',
        },
      ],
      type: 'profile',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/team/${slug}`,
    },
  }
}

export default async function TeamDescription({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'team',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const team_member = docs[0]
  if (!team_member) {
    notFound()
  }

  const descriptionParagraphs = team_member.bio.split('\n\n')

  return (
    <div className="min-h-screen bg-[#800000] relative overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#fecc02]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#fecc02]/5 to-blue-400/5 blur-3xl" />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2" fill="#fecc02" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Back to team navigation */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-4">
          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 text-[#fffff6] hover:text-[#fecc02] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Profile Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8">
                {/* Profile Card */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Profile Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={
                        typeof team_member.photo === 'object' &&
                        'url' in team_member.photo &&
                        team_member.photo.url
                          ? team_member.photo.url
                          : '/john.jpg'
                      }
                      alt={team_member.name}
                      fill
                      className="object-cover"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent"></div>

                    {/* Role badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#fecc02] text-blue-950 px-3 py-1 rounded-full text-sm font-bold">
                        {team_member.role}
                      </span>
                    </div>

                    {/* Name overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h1 className="text-2xl md:text-3xl font-bold text-white">
                        {team_member.name}
                      </h1>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">{team_member.name}</h2>
                      <p className="text-[#fecc02] font-semibold">{team_member.role}</p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-[#fecc02] via-[#fecc02]/50 to-transparent"></div>

                    {/* Contact Links */}
                    <div className="space-y-3">
                      {team_member.email && (
                        <a
                          href={`mailto:${team_member.email}`}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                        >
                          <div className="bg-[#fecc02]/20 p-2 rounded-lg group-hover:bg-[#fecc02]/30 transition-colors">
                            <Mail className="w-4 h-4 text-[#fecc02]" />
                          </div>
                          <span className="text-[#fffff6] text-sm">{team_member.email}</span>
                        </a>
                      )}

                      {team_member.phone && (
                        <a
                          href={`tel:${team_member.phone}`}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                        >
                          <div className="bg-[#fecc02]/20 p-2 rounded-lg group-hover:bg-[#fecc02]/30 transition-colors">
                            <Phone className="w-4 h-4 text-[#fecc02]" />
                          </div>
                          <span className="text-[#fffff6] text-sm">{team_member.phone}</span>
                        </a>
                      )}

                      {/* Optional: LinkedIn or location */}
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                        <div className="bg-[#fecc02]/20 p-2 rounded-lg">
                          <MapPin className="w-4 h-4 text-[#fecc02]" />
                        </div>
                        <span className="text-[#fffff6] text-sm">Nairobi, Kenya</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <a
                        href={`tel:${team_member.phone}`}
                        className="w-full bg-[#fecc02] text-blue-950 py-3 px-4 rounded-lg font-bold hover:bg-[#fecc02]/90 transition-colors text-center block"
                      >
                        Get In Touch
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8">
              {/* Hero Section */}
              <div className="mb-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 lg:p-12">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fecc02]/20 text-[#fecc02] font-medium text-sm mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#fecc02]"></div>
                      Leadership Profile
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      About <span className="text-[#fecc02]">{team_member.name}</span>
                    </h2>
                    <div className="w-24 h-1 bg-[#fecc02] mb-6"></div>
                  </div>

                  {/* Bio Content */}
                  <div className="prose prose-lg max-w-none">
                    {descriptionParagraphs.map((paragraph: string, index: number) => (
                      <p
                        key={index}
                        className={`text-[#fffff6]/90 leading-relaxed text-lg ${
                          paragraph.trim() === '' ? 'mb-6' : 'mb-4'
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Card */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#fecc02]/20 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[#fecc02]" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Let{"'"}s Connect</h3>
                  </div>
                  <p className="text-[#fffff6]/80 mb-4">
                    Ready to discuss your global business needs? Get in touch to explore
                    opportunities.
                  </p>
                  <a
                    href={`mailto:${team_member.email}`}
                    className="inline-flex items-center gap-2 text-[#fecc02] font-medium hover:text-[#fecc02]/80 transition-colors"
                  >
                    Send Message
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const teamMembers = await fetchAllMembers()
    return teamMembers.map((member) => ({
      id: String(member.slug),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
