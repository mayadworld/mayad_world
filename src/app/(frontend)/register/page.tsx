import React from 'react'
import RegisterHero from '@/components/registrationPage/RegisterHero'
import RegistrationForm from '@/components/registrationPage/Register'

export const metadata = {
  title: 'Registration - Mayad World Connections',
  description:
    'Register now to join Mayad World Connections programs, including Model UN conferences, educational travel experiences, and youth leadership initiatives.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Register for Mayad World Connections Programs',
    description:
      'Secure your spot in upcoming Model UN conferences, global education trips, and youth leadership programs. Begin your journey with Mayad World Connections today.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/register`,
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/register`,
  },
}

export default function page() {
  return (
    <>
      <RegisterHero />
      <RegistrationForm />
    </>
  )
}
