import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: [
      'localhost',
      'mayadworld-production-c63e.up.railway.app',
      'mayadworld.com',
      'www.mayadworld.com',
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
