import React from 'react'
import EventsHero from '@/components/eventsPage/EventsHero'
import EventsList from '@/components/eventsPage/EventsList'

export const metadata = {
  title: 'Events - Mayad World Connections',
  description:
    'Stay updated on upcoming Mayad World Connections events, including Model UN conferences, leadership summits, cultural exchanges, and global education initiatives.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Upcoming Events | Mayad World Connections',
    description:
      'Explore our calendar of impactful youth events around the world—Model UN simulations, international summits, and immersive cultural programs.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/events`,
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/events`,
  },
}

function page() {
  return (
    <>
      <EventsHero />
      <EventsList />
    </>
  )
}

export default page
