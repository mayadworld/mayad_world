import React from 'react'
import ProgramsHero from '@/components/programspage/ProgramsHero'
import ProgramsList from '@/components/programspage/ProgramsList'

export const metadata = {
  title: 'Our Programs - Mayad World Connections',
  description:
    'Explore Mayad World Connections’ youth-centered programs, including Model UN conferences, academic consulting, and global educational travel experiences.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Programs at Mayad World Connections - Educate, Empower, Connect',
    description:
      'Discover transformative programs designed to develop global leadership, critical thinking, and cultural understanding among youth. Join a movement of changemakers.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/programs`,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mayad World Connections',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/programs`,
  },
}

export default function page() {
  return (
    <>
      <ProgramsHero />
      <ProgramsList />
    </>
  )
}
