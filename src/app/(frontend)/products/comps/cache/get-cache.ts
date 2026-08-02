import { unstable_cache } from 'next/cache'
import type { VehicleMake, VehicleModel } from '@/payload-types'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

export const getMakes = unstable_cache(
  async () => {
    const payload = await getPayload({ config: payloadConfig })
    const res = await payload.find({ collection: 'vehicle-makes', limit: 1000 })
    return res.docs as VehicleMake[]
  },
  ['vehicle-makes'],
  { tags: ['vehicle-makes'] },
)

export const getModels = unstable_cache(
  async () => {
    const payload = await getPayload({ config: payloadConfig })
    const res = await payload.find({ collection: 'vehicle-models', limit: 1000 })
    return res.docs as VehicleModel[]
  },
  ['vehicle-models'],
  { tags: ['vehicle-models'] },
)
