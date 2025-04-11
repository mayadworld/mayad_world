// app/api/get-form/route.ts

import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // 🔍 Check if email already exists
    const existing = await payload.find({
      collection: 'newsletter',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existing.docs.length > 0) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 })
    }

    // ✅ Create new subscription
    const newEntry = await payload.create({
      collection: 'newsletter',
      data: { email },
    })

    return NextResponse.json({ message: 'Subscribed successfully', data: newEntry })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
