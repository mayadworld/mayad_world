import React from 'react'
import './styles.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'
import Script from 'next/script'
import { Host_Grotesk, Montserrat } from 'next/font/google'

const host_grotesk = Host_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '700', '800'],
  variable: '--font-host-grotesk',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  variable: '--font-montserrat',
})

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
      <body className={`${montserrat.className} bg-[#fffff6] text-[#34373e]`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7TCK3SVFKH"
          strategy="afterInteractive"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-7TCK3SVFKH');
          `}
        </Script>
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
