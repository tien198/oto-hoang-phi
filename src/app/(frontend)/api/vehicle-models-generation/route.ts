import { NextRequest, NextResponse } from 'next/server'
import { generateMakes } from './generate/gen-makes'
import { generateModels } from './generate/gen-models'

export async function GET(req: NextRequest) {
  await generateMakes()
  await generateModels()
  return NextResponse.json({ success: true })
}
