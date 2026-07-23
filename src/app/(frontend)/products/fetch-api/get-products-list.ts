import { PaginationResult } from '@/types/pagination-result'
import { ProductResult } from '../actions/get-products'

export async function getProductsApi(page: number = 1) {
  const res = await fetch('/api/products?page=' + page)
  const pagiRes = (await res.json()) as PaginationResult<ProductResult>
  return pagiRes
}
