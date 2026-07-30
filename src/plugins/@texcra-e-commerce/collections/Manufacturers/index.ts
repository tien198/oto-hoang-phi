import { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { anyone } from '@/access/anyone'
import { generateUUID7 } from '@/hooks/generateUUID7'
import { revalidateTag } from 'next/cache'

export const Manufacturers: CollectionConfig = {
  slug: 'manufacturers',
  access: {
    create: adminOnly,
    update: adminOnly,
    read: anyone,
    delete: adminOnly,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('manufacturers', 'max')
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag('manufacturers', 'max')
        return doc
      },
    ],
  },
  labels: {
    plural: {
      en: 'Manufacturers',
      vi: 'Hãng sản xuất phụ tùng',
    },
    singular: {
      en: 'Manufacturer',
      vi: 'Hãng sản xuất phụ tùng',
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
        vi: 'Tên hãng sản xuất phụ tùng',
      },
    },
  ],
}
