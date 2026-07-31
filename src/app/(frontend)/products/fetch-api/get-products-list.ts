import { GetProductsSearchParams, ProductsPaginationResult } from '../actions/get-products'

export async function getProductsApi({
  page,
  productName,
  vehicleMakeName,
  vehicleModelName,
}: GetProductsSearchParams) {
  const params = genProductParams(page, productName, vehicleMakeName, vehicleModelName)
  const res = await fetch(`/api/products?${params}`)
  const pagiRes = (await res.json()) as ProductsPaginationResult
  return pagiRes
}

export function genProductParams(
  page?: number | null,
  productName?: string | null,
  vehicleMakeName?: string | null,
  vehicleModelName?: string | null,
) {
  const productNameParam = productName ? '&product-name=' + productName : ''
  const makeParam = vehicleMakeName ? '&vehicle-make=' + vehicleMakeName : ''
  const modelParam = vehicleModelName ? '&vehicle-model=' + vehicleModelName : ''
  return `page=${page}${productNameParam}${makeParam}${modelParam}`
}
