import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { vehicle_makes } from '@/payload-generated-schema'

export async function GET(req: NextRequest) {
  const vehicleMakes = await getVehicleMakes()
  return NextResponse.json({ vehicleMakes })
}

export async function getVehicleMakes() {
  const {
    db: { drizzle },
  } = await getPayload({
    config: payloadConfig,
  })

  const vehicleMakes = await drizzle
    .select({
      name: vehicle_makes.name,
    })
    .from(vehicle_makes)
  return vehicleMakes
}

export type VehicleMakeResult = Awaited<ReturnType<typeof getVehicleMakes>>
