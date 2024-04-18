import { getFloor } from 'libs/server'
import { createTable, getTables } from 'libs/server/table'
import { ObjectId } from 'mongodb'
import { type NextRequest, NextResponse } from 'next/server'
import { type Table } from 'types/table'
import { TableCrearSchema } from 'z'

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const formData = await req.json()
    const zVa = TableCrearSchema.safeParse(formData)
    if (!zVa.success) return NextResponse.json(zVa, { status: 400 })
    const { data } = zVa
    const floor = await getFloor(params.slug)
    if (!floor) return NextResponse.json({ status: 404 })

    const newTable: Table = {
      _id: new ObjectId(),
      room: data.room,
      chairs: data.chairs as Table['chairs'],
      connected_to_printer: data.connected_to_printer,
      created_at: new Date(),
      current_users: [],
      accept_mutiple: zVa.data.accept_mutiple,
      floor: {
        _id: floor._id,
        headquarder: floor.headquarder,
        name: floor.name
      },
      name: data.name,
      occupied: false,
      status: data.status,
      type: data.type,
      ui: data.ui
    }
    await createTable(newTable)
    return NextResponse.json(newTable, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const id = params.slug
    const tables = await getTables(new ObjectId(id))
    return NextResponse.json(tables, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
