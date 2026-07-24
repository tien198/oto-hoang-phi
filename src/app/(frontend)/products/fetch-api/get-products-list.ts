import { GetProductsSearchParams, ProductsPaginationResult } from '../actions/get-products'

export async function getProductsApi({
  page,
  vehicleMakeName,
  vehicleModelName,
}: GetProductsSearchParams) {
  const makeParam = vehicleMakeName ? '&vehicle-make=' + encodeURI(vehicleMakeName) : ''
  const modelParam = vehicleModelName ? '&vehicle-model=' + encodeURI(vehicleModelName) : ''

  const res = await fetch(`/api/products?page=${page}${makeParam}${modelParam}`)
  const pagiRes = (await res.json()) as ProductsPaginationResult
  return pagiRes
}
