import { Pagination } from './pagination'

export type PaginationResult<T> = {
  docs: T[]
} & Pagination
