import { getProducts } from '@/app/(frontend)/products/actions/get-products'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page = Number(searchParams.get('page')) || 1

  const productsPaginationRes = await getProducts(page)

  return NextResponse.json(productsPaginationRes)
}
