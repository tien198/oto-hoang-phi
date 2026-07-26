export type Pagination = {
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage?: number | null
  offset?: number | null
  page: number
  pagingCounter: number
  prevPage?: number | null
  totalDocs: number
  totalPages: number
}
