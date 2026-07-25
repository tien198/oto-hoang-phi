import { GetProductsSearchParams, ProductsPaginationResult } from '../actions/get-products'

export async function getProductsApi({
  page,
  vehicleMakeName,
  vehicleModelName,
}: GetProductsSearchParams) {
  const params = genProductParams(page, vehicleMakeName, vehicleModelName)
  const res = await fetch(encodeURI(`/api/products${params}`))
  const pagiRes = (await res.json()) as ProductsPaginationResult
  return pagiRes
}

export function genProductParams(
  page?: number | null,
  vehicleMakeName?: string | null,
  vehicleModelName?: string | null,
) {
  const makeParam = vehicleMakeName ? '&vehicle-make=' + vehicleMakeName : ''
  const modelParam = vehicleModelName ? '&vehicle-model=' + vehicleModelName : ''
  return `?page=${page}${makeParam}${modelParam}`
}
