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
  labels: {
    plural: {
      en: 'Vehicle Models',
      vi: 'Dòng xe',
    },
    singular: {
      en: 'Vehicle Model',
      vi: 'Dòng xe',
    },
  },
  admin: {
    group: { en: 'E-Commerce', vi: 'Quản lý Sản Phẩm' },
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
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        en: 'Name',
        vi: 'Tên dòng xe',
      },
    },
    {
      name: 'make',
      type: 'relationship',
      relationTo: 'vehicle-makes',
      required: true,
      label: {
        en: 'Make',
        vi: 'Hãng xe',
      },
    },
    {
      name: 'model-year',
      type: 'number',
      required: true,
      label: {
        en: 'Model Year',
        vi: 'Năm sản xuất',
      },
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
