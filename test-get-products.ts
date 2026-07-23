import { getProducts } from './src/app/(frontend)/products/get-products'
type InferType = NonNullable<Awaited<ReturnType<typeof getProducts>>['docs']>[number]
