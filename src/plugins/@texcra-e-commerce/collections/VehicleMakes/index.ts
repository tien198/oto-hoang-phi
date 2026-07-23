import { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { anyone } from '@/access/anyone'
import { generateUUID7 } from '@/hooks/generateUUID7'

export const VehicleMakes: CollectionConfig = {
  slug: 'vehicle-makes',
  access: {
    create: adminOnly,
    update: adminOnly,
    read: anyone,
    delete: adminOnly,
  },
  labels: {
    plural: {
      en: 'Vehicle Makes',
      vi: 'Hãng xe',
    },
    singular: {
      en: 'Vehicle Make',
      vi: 'Hãng xe',
    },
  },
  admin: {
    group: { en: 'E-Commerce', vi: 'Quản lý Sản Phẩm' },
    defaultColumns: ['name', 'updatedAt'],
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
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        en: 'Name',
        vi: 'Tên hãng xe',
      },
    },
  ],
}
