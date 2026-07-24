import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import { and, count, eq, sql } from 'drizzle-orm'
import { Product, VehicleModel, VehicleMake, Media } from '@/payload-types'
import {
  products,
  products_gallery,
  media,
  vehicle_makes,
  vehicle_models,
} from '@/payload-generated-schema'
import { Pagination } from '@/types/pagination-result'

export type ProductResult = {
  product: Product
  vehicleModel: VehicleModel
  vehicleMake: VehicleMake
  media: Media['url'] | null
}

export type GetProductsSearchParams = {
  page?: number
  limit?: number
  vehicleMakeName?: string | null
  vehicleModelName?: string | null
}
export async function getProductsPagination({
  page = 1,
  limit = 9,
  vehicleMakeName,
  vehicleModelName,
}: GetProductsSearchParams) {
  const offset = (page - 1) * limit
  const {
    db: { drizzle },
  } = await getPayload({ config: payloadConfig })

  const productsQuery = drizzle
    .selectDistinctOn([products.id], {
      product: products,
      vehicleModel: vehicle_models,
      vehicleMake: vehicle_makes,
      media: media.url,
    })
    .from(products)
    .leftJoin(vehicle_models, eq(vehicle_models.id, products['vehicle-models']))
    .leftJoin(vehicle_makes, eq(vehicle_makes.id, vehicle_models.make))
    .leftJoin(products_gallery, eq(products.id, products_gallery._parentID))
    .leftJoin(media, eq(media.id, products_gallery.image))
    // .orderBy(products.id, asc(media.id))
    .where(
      and(
        vehicleMakeName
          ? eq(sql`LOWER(${vehicle_makes.name})`, vehicleMakeName.toLowerCase())
          : undefined,
        vehicleModelName
          ? eq(sql`LOWER(${vehicle_models.name})`, vehicleModelName.toLowerCase())
          : undefined,
      ),
    )
    .limit(limit)
    .offset(offset)

  const paginationQuery = drizzle.select({ totalDocs: count() }).from(products)
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
