import { GetProductsSearchParams } from '../actions/get-products'

export function generateProductsQueryKey(search: GetProductsSearchParams) {
  const { page = 1, productName, vehicleMakeName, vehicleModelName } = search
  const queryKey = ['products', vehicleMakeName, vehicleModelName, productName, page]
  return queryKey
}
