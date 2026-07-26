import payloadConfig from '@payload-config'
import { getPayload } from 'payload'
import { aliasedTable, and, count, eq, or, sql } from 'drizzle-orm'
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
  vehicleMakeName?: string | null
  vehicleModelName?: string | null
}

const vehicle_models_alias = aliasedTable(vehicle_models, 'vehicle_models_fitmentsalias')

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
    .leftJoin(
      products_rels,
      and(eq(products.id, products_rels.parent), eq(products_rels.path, 'model-fitments')),
    )
    .leftJoin(vehicle_models_alias, eq(products_rels['vehicle-modelsID'], vehicle_models_alias.id))
    .leftJoin(products_gallery, eq(products.id, products_gallery._parentID))
    .leftJoin(media, eq(media.id, products_gallery.image))
    // .orderBy(products.id, asc(media.id))
    .where(
      and(
        eq(products._status, 'published'),
        vehicleMakeName
          ? eq(sql`LOWER(${vehicle_makes.name})`, vehicleMakeName.toLowerCase())
          : undefined,
        or(
          vehicleModelName
            ? eq(sql`LOWER(${vehicle_models.name})`, vehicleModelName.toLowerCase())
            : undefined,
          vehicleModelName
            ? eq(sql`LOWER(${vehicle_models_alias.name})`, vehicleModelName.toLowerCase())
            : undefined,
        ),
      ),
    )
    .limit(limit)
    .offset(offset)

  const paginationQuery = drizzle
    .select({ totalDocs: count() })
    .from(products)
    .leftJoin(vehicle_models, eq(vehicle_models.id, products['vehicle-models']))
    .leftJoin(vehicle_makes, eq(vehicle_makes.id, vehicle_models.make))
    .leftJoin(
      products_rels,
      and(eq(products.id, products_rels.parent), eq(products_rels.path, 'model-fitments')),
    )
    .leftJoin(vehicle_models_alias, eq(products_rels['vehicle-modelsID'], vehicle_models_alias.id))
    .where(
      and(
        eq(products._status, 'published'),
        vehicleMakeName
          ? eq(sql`LOWER(${vehicle_makes.name})`, vehicleMakeName.toLowerCase())
          : undefined,
        or(
          vehicleModelName
            ? eq(sql`LOWER(${vehicle_models.name})`, vehicleModelName.toLowerCase())
            : undefined,
          vehicleModelName
            ? eq(sql`LOWER(${vehicle_models_alias.name})`, vehicleModelName.toLowerCase())
            : undefined,
        ),
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
