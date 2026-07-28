import { getProductsPagination } from '@/app/(frontend)/products/actions/get-products'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page = Number(searchParams.get('page')) || 1
  const vehicleMakeName = searchParams.get('vehicle-make')
  const vehicleModelName = searchParams.get('vehicle-model')
  const modelYear = searchParams.get('model-year')

  const productsPaginationRes = await getProductsPagination({
    page,
    vehicleMakeName,
    vehicleModelName,
    modelYear,
  })

  return NextResponse.json(productsPaginationRes)
}
