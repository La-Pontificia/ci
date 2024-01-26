import { getTable } from 'libs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const id = params.slug
    const table = await getTable(id)
    return NextResponse.json(table, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
