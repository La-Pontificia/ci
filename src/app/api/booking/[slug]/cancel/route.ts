import { updateBooking } from 'libs/server/booking'
import { removeReservedDateByBooking } from 'libs/server/bookings/utils'
import { NextResponse, type NextRequest } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const id = params.slug

    const { booking } = await removeReservedDateByBooking(id)
    if (!booking) throw new Error('Booking not found')
    await updateBooking(
      {
        status: 'cancelled'
      },
      booking._id
    )
    return NextResponse.json(id, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(error, { status: 500 })
  }
}
