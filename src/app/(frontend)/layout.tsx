import React from 'react'
import './styles.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

export const metadata = {
  title: 'Mayad World Connections | Youth Programs & Model UN Conferences in Kenya',
  description:
    'Mayad World Connections empowers youth in Kenya through Model UN conferences, STEM programs, debates, Olympiads, educational travel, and academic consulting. Join us in shaping global leaders and changemakers of tomorrow.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Mayad World Connections – Youth Programs in Kenya',
    description:
      'Discover Model UN events, STEM initiatives, debates, Olympiads, and leadership programs with Mayad World Connections. Empowering youth for global impact.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
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
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
