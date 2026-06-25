import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: ['localhost', 'mayad-world.vercel.app', 'mayadworld.co.ke', 'www.mayadworld.co.ke'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
