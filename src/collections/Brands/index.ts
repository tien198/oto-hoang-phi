import { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { anyone } from '@/access/anyone'
import { generateUUID7 } from '@/hooks/generateUUID7'

export const Brands: CollectionConfig = {
  slug: 'brands',
  access: {
    create: adminOnly,
    update: adminOnly,
    read: anyone,
    delete: adminOnly,
  },
  admin: {
    group: 'Inventory',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    useAsTitle: 'name',
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
  ],
}
