import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { vehicle_models } from '@/payload-generated-schema'
import { eq } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const vehicleMakeName = req.nextUrl.searchParams.get('vehicle-make')
  const vehicleModels = await getVehicleModels({ vehicleMakeName })
  return NextResponse.json({ vehicleModels })
}

type Props = { vehicleMakeName: string | null }
async function getVehicleModels({ vehicleMakeName }: Props) {
  const {
    db: { drizzle },
  } = await getPayload({
    config: payloadConfig,
  })

  const vehicleModels = await drizzle
    .select({
      name: vehicle_models.name,
    })
    .from(vehicle_models)
    .where(vehicleMakeName ? eq(vehicle_models.make, vehicleMakeName) : undefined)
  return vehicleModels
}

export type VehicleModelResult = Awaited<ReturnType<typeof getVehicleModels>>
