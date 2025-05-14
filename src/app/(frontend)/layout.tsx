import React from 'react'
import './styles.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'

export const metadata = {
  title: 'Mayad World Connections',
  description:
    'Mayad World Connections empowers youth to become global leaders and changemakers through Model UN conferences, educational travel, and academic consulting. We bridge cultures and ideas for a more connected world.',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    title: 'Mayad World Connections – Empowering Youth for Global Impact',
    description:
      'Join Mayad World Connections in shaping the next generation of global thinkers through immersive Model UN experiences, cross-cultural education, and innovative leadership programs.',
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
