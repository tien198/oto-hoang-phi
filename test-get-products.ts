import { getProductsPagination } from './src/app/(frontend)/products/actions/get-products'
type InferType = NonNullable<Awaited<ReturnType<typeof getProductsPagination>>['docs']>[number]
