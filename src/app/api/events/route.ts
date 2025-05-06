import config from '@/payload.config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function GET() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: events } = await payload.find({
    collection: 'event',
    depth: 2,
    limit: 100,
  })

  return NextResponse.json(events)
}
