import { GetProductsSearchParams, ProductsPaginationResult } from '../actions/get-products'

export async function getProductsApi({
  page,
  vehicleMakeName,
  vehicleModelName,
  modelYear,
}: GetProductsSearchParams) {
  const params = genProductParams(page, vehicleMakeName, vehicleModelName, modelYear)
  const res = await fetch(`/api/products?${params}`)
  const pagiRes = (await res.json()) as ProductsPaginationResult
  return pagiRes
}

export function genProductParams(
  page?: number | null,
  vehicleMakeName?: string | null,
  vehicleModelName?: string | null,
  modelYear?: string | null,
) {
  const makeParam = vehicleMakeName ? '&vehicle-make=' + vehicleMakeName : ''
  const modelParam = vehicleModelName ? '&vehicle-model=' + vehicleModelName : ''
  const modelYearParam = modelYear ? '&model-year=' + modelYear : ''
  return `page=${page}${makeParam}${modelParam}${modelYearParam}`
}
