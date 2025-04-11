import { NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const footer = await payload.findGlobal({
      slug: 'footer',
    })

    return NextResponse.json(footer || [])
  } catch (error) {
    console.error('Failed to fetch data', error)
    return NextResponse.json({ error: 'Failed to fetch header' }, { status: 500 })
  }
}
