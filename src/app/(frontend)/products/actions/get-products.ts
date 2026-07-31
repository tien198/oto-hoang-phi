'use server'

import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import { aliasedTable, and, asc, count, eq, or, sql } from 'drizzle-orm'
import { Product, VehicleModel, VehicleMake, Media } from '@/payload-types'
import {
  products,
  products_gallery,
  products_rels,
  media,
  vehicle_makes,
  vehicle_models,
} from '@/payload-generated-schema'
import { Pagination } from '@/types/pagination'

export type ProductResult = {
  product: Product
  vehicleModel: VehicleModel
  vehicleMake: VehicleMake
  media: Media['url'] | null
}

export type GetProductsSearchParams = {
  page?: number
  limit?: number
  productName?: string | null
  vehicleMakeName?: string | null
  vehicleModelName?: string | null
}

export async function getProductsPagination({
  page = 1,
  limit = 9,
  productName,
  vehicleMakeName,
  vehicleModelName,
}: GetProductsSearchParams) {
  const offset = (page - 1) * limit
  const {
    db: { drizzle },
  } = await getPayload({ config: payloadConfig })

  const products_fitments_CTE = drizzle.$with('fitments_cte').as(
    drizzle
      .select({
        prod: products,
        models: sql`COALESCE(
         jsonb_agg(DISTINCT to_jsonb(${vehicle_models})-'{id, make_id, updated_at, created_at}'::text[]),
         '[]'::jsonb
        )::jsonb`.as('models'),
        makes: sql`COALESCE(
         jsonb_agg(DISTINCT to_jsonb(${vehicle_makes})-'{id, updated_at, created_at}'::text[]),
         '[]'::jsonb
        )::jsonb`.as('makes'),
      })
      .from(products)
      .leftJoin(
        products_rels,
        and(eq(products_rels.path, 'model-fitments'), eq(products_rels.parent, products.id)),
      )
      .leftJoin(vehicle_models, eq(products_rels['vehicle-modelsID'], vehicle_models.id))
      .leftJoin(vehicle_makes, eq(vehicle_models.make, vehicle_makes.id))
      .where(
        and(
          eq(products._status, 'published'),

          productName
            ? sql`${products.name} ILIKE ${'%' + productName.toLowerCase() + '%'}`
            : undefined,
          vehicleMakeName ? eq(vehicle_makes.name, vehicleMakeName.toLowerCase()) : undefined,
          vehicleModelName ? eq(vehicle_models.name, vehicleModelName.toLowerCase()) : undefined,
        ),
      )
      .groupBy(products.id)
      .orderBy(asc(products.id))
      .limit(limit)
      .offset(offset),
  )

  const img_CTE = drizzle.$with('image_cte').as(
    drizzle
      .selectDistinctOn([products_fitments_CTE.prod.id], {
        prod_id: products_fitments_CTE.prod.id,
        img_url: media.url,
      })
      .from(products_fitments_CTE)
      .leftJoin(products_gallery, eq(products_fitments_CTE.prod.id, products_gallery._parentID))
      .leftJoin(media, eq(media.id, products_gallery.image))
      .orderBy(products_fitments_CTE.prod.id, asc(media.id)),
  )

  const productsQuery = drizzle
    .with(products_fitments_CTE, img_CTE)
    .select({
      prod: products,
      img: img_CTE.img_url,
      models: products_fitments_CTE.models,
      makes: products_fitments_CTE.makes,
    })
    .from(products_fitments_CTE)
    .innerJoin(products, eq(products.id, products_fitments_CTE.prod.id))
    .leftJoin(img_CTE, eq(img_CTE.prod_id, products_fitments_CTE.prod.id))

  // count total pagination with filter
  const paginationQuery = drizzle
    .select({ totalDocs: count(sql`DISTINCT ${products.id}`) })
    .from(products)
    .leftJoin(
      products_rels,
      and(eq(products_rels.path, 'model-fitments'), eq(products_rels.parent, products.id)),
    )
    .leftJoin(vehicle_models, eq(products_rels['vehicle-modelsID'], vehicle_models.id))
    .leftJoin(vehicle_makes, eq(vehicle_models.make, vehicle_makes.id))
    .where(
      and(
        eq(products._status, 'published'),

        productName
          ? sql`${products.name} ILIKE ${'%' + productName.toLowerCase() + '%'}`
          : undefined,
        vehicleMakeName ? eq(vehicle_makes.name, vehicleMakeName.toLowerCase()) : undefined,
        vehicleModelName ? eq(vehicle_models.name, vehicleModelName.toLowerCase()) : undefined,
      ),
    )

  const [productRes, [{ totalDocs }]] = await Promise.all([productsQuery, paginationQuery])

  const totalPages = Math.ceil(totalDocs / limit)
  const hasPrevPage = page > 1
  const hasNextPage = page < totalPages
  const pagingCounter = (page - 1) * limit + 1

  const pagination: Pagination = {
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage: hasPrevPage ? page - 1 : null,
    nextPage: hasNextPage ? page + 1 : null,
  }

  return {
    docs: productRes,
    pagination,
  }
}

export type ProductsPaginationResult = Awaited<ReturnType<typeof getProductsPagination>>
