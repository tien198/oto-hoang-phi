import { adminOnly } from '@/access/adminOnly'
import { anyone } from '@/access/anyone'
import { CollectionConfig, slugField } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Content } from '@/blocks/Content/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { generateUUID7 } from '@/hooks/generateUUID7'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: adminOnly,
    update: adminOnly,
    read: anyone,
    delete: adminOnly,
  },
  admin: {
    group: 'E-Commerce',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'products',
        req,
      }),
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
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'price',
              type: 'number',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              // label: false,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature(),
                ],
              }),
            },
            {
              name: 'gallery',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'layouts',
              type: 'blocks',
              blocks: [MediaBlock, Content, CallToAction],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'vehicle-models',
      type: 'relationship',
      relationTo: 'vehicle-models',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'model-fitments',
      type: 'relationship',
      relationTo: 'vehicle-models',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    slugField({
      useAsSlug: 'name',
      // Tùy chỉnh logic tạo chuỗi (bỏ dấu tiếng Việt)
      slugify: ({ valueToSlugify }) => {
        if (!valueToSlugify) return ''

        // Custom logic xử lý tiếng Việt
        return String(valueToSlugify)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
      },
    }),
  ],
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 5,
  },
}
