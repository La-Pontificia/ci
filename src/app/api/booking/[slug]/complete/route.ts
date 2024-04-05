import { getTable, updateTable } from 'libs/server'
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

    const table = await getTable(booking.table._id.toString())
    if (!table) return NextResponse.json({ status: 500 })

    const newCurrentUsers: typeof table.current_users = booking.users.map(
      (e, i) => ({
        chair: i + 1,
        display_time: booking.time,
        from: booking.from,
        time: booking.time,
        to: booking.to,
        user: {
          _id: e._id,
          email: e.email,
          image: e.image,
          names: e.names
        }
      })
    )

    // Update table
    await updateTable(
      {
        current_users: newCurrentUsers
      },
      table._id
    )

    // Update booking
    await updateBooking(
      {
        status: 'completed'
      },
      booking._id
    )

    return NextResponse.json(id, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(error, { status: 500 })
  }
}
