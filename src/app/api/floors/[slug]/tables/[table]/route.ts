import { deleteTable, updateTable } from 'libs/server/table'
import { ObjectId } from 'mongodb'
import { NextResponse, type NextRequest } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { table: string } }
) {
  try {
    const data = await req.json()
    const id = params.table
    await updateTable({ ...data }, new ObjectId(id))
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { table: string } }
) {
  try {
    const id = params.table
    if (!id) return NextResponse.json({ message: 'id is required' })
    await deleteTable(new ObjectId(id))
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
