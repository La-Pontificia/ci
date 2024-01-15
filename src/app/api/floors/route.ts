import { createFloor } from 'libs/server/floor'
import { ObjectId } from 'mongodb'
import { type NextRequest, NextResponse } from 'next/server'
import { type Floor } from 'types'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const newFloor: Floor = {
      _id: new ObjectId(),
      created_at: new Date(),
      headquarder: data.headquarder,
      name: data.name,
      status: data.status
    }
    await createFloor(newFloor)
    return NextResponse.json(newFloor, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ msg: 'Hello' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}