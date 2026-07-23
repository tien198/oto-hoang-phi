import { vehicle_makes } from '@/payload-generated-schema'
import payloadConfig from '@payload-config'
import { getPayload } from 'payload'

export async function getVehicleMakes() {
  const {
    db: { drizzle },
  } = await getPayload({ config: payloadConfig })
  const makes = await drizzle
    .select({
      id: vehicle_makes.id,
      name: vehicle_makes.name,
    })
    .from(vehicle_makes)
  return makes
}
