import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { NextResponse } from 'next/server'
import { vehicle_models } from '@/payload-generated-schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const { db, create } = await getPayload({ config: payloadConfig })
  const innovaModel = (
    await db.drizzle.select().from(vehicle_models).where(eq(vehicle_models.name, 'Innova')).limit(1)
  )[0]
  function getRandomFloat(min: number, max: number) {
    const random = Math.random() * (max - min) + min
    return Math.round(random * 100) / 100
  }
  for (let i = 12; i < 150; i++) {
    await create({
      collection: 'products',
      draft: false,
      data: {
        name: `product-${i}`,
        slug: `product-${i}`,
        _status: 'published',
        'compatible-description': {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Sản phẩm tốt ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
            ],
            direction: null,
          },
        },
        price: getRandomFloat(1000, 100000),
        'vehicle-models': innovaModel.id,
        gallery: [
          {
            image: {
              id: 1,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          },
        ],
        OEno: 'OEno-' + i,
        warranty: 12,
      },
    })
  }

  /*
    await db.drizzle.insert(_products_v).values({
      id: 7,
      parent: '019f982f-3dc2-715c-8065-a21e3efbf52f',
      name: `product-${i}`,
      slug: `product-${i}`,
      description:
        '{"root": {"type": "root","format": "","indent": 0,"version": 1,"children": [{"type": "paragraph","format": "","indent": 0,"version": 1,"children": [{"mode": "normal","text": "Sản phẩm tốt ","type": "text","style": "","detail": 0,"format": 0,"version": 1}],"direction": null,"textStyle": "","textFormat": 0}],"direction": null}',
      price: 1000000,
      'vehicle-models': '019f856e-cd64-74ad-81d8-32e664227a58',
      _status: 'draft',
    })
  }
    */
  return NextResponse.json({ success: true })
}
