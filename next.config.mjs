import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: ['localhost', 'mayadworld-production.up.railway.app'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
