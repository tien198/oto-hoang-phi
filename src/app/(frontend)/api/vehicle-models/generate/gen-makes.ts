import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'

export async function generateMakes() {
  const makes = ['Toyota', 'Kia', 'Honda']
  const { create } = await getPayload({ config: payloadConfig })

  for (const make of makes) {
    await create({
      collection: 'vehicle-makes',
      data: {
        name: make,
      },
    })
  }
  return 1
}
