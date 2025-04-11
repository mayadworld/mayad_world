import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const header = await payload.findGlobal({
      slug: 'header',
    })

    return NextResponse.json(header || [])
  } catch (error) {
    console.error('Failed to fetch data', error)
    return NextResponse.json({ error: 'Failed to fetch header' }, { status: 500 })
  }
}
