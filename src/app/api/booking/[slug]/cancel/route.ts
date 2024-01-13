import { updateBooking } from 'libs/server/booking'
import { ObjectId } from 'mongodb'
import { NextResponse, type NextRequest } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await req.json()
    const id = params.slug
    await updateBooking(
      {
        status: 'cancelled'
      },
      new ObjectId(id)
    )
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
