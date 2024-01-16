import { getAllBookingsByTable } from 'libs/server/booking'
import { ObjectId } from 'mongodb'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const tableId = params.slug
    const reservations = await getAllBookingsByTable(new ObjectId(tableId))
    return NextResponse.json(reservations, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
