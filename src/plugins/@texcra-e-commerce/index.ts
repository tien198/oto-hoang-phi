import { Config, definePlugin } from 'payload'
import { Products } from './collections/Products'
import { VehicleMakes } from './collections/VehicleMakes'
import { VehicleModels } from './collections/VehicleModels'
import { config } from 'process'
import { Manufacturers } from './collections/Manufacturers'

type PluginOptions = {
  enable?: boolean
}

export const texCraECommercePlugin = definePlugin<PluginOptions>({
  slug: 'texcra-e-commerce',
  order: 0,
  plugin: ({ config }) => {
    return {
      ...config,
      collections: [
        ...(config.collections || []),
        Products,
        Manufacturers,
        VehicleMakes,
        VehicleModels,
      ],
    }
  },
})
