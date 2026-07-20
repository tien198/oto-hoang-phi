import { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { anyone } from '@/access/anyone'
import { generateUUID7 } from '@/hooks/generateUUID7'

export const VehicleModels: CollectionConfig = {
  slug: 'vehicle-models',
  access: {
    create: adminOnly,
    update: adminOnly,
    read: anyone,
    delete: adminOnly,
  },
  admin: {
    group: '<Texcra> E-Commerce',
    defaultColumns: ['name', 'model-year', 'updatedAt'],
    useAsTitle: 'vehicle-specification',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [generateUUID7],
      },
    },
    { name: 'name', type: 'text', required: true },
    {
      name: 'make',
      type: 'relationship',
      relationTo: 'vehicle-makes',
      required: true,
    },
    {
      name: 'model-year',
      type: 'number',
      required: true,
    },
    {
      name: 'vehicle-specification',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (!siblingData) return ''
            return `${siblingData.name} ${siblingData['model-year'] || 'NaN'}`
          },
        ],
      },
    },
  ],
}
