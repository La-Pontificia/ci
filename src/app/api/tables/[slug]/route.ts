import { getTable, updateTable } from 'libs/server'
import { NextResponse, type NextRequest } from 'next/server'
import { TableCrearSchema } from 'z'

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

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await req.json()
    const validate = TableCrearSchema.partial().safeParse(data)
    if (!validate.success) return NextResponse.json(validate, { status: 400 })
    const id = params.slug
    const table = await getTable(id)
    if (!table) return NextResponse.json({ status: 404 })
    await updateTable(validate.data, table._id)
    return NextResponse.json(validate.data, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
