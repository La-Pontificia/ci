import { getUserByIdentifier } from 'libs/server'
import { getBookingsByUserId } from 'libs/server/booking'
import { generateBooking } from 'libs/server/bookings'
import { ObjectId } from 'mongodb'
import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const parsedData = BookingSchema.safeParse(data)

    if (!parsedData.success) {
      return NextResponse.json(parsedData.error, { status: 400 })
    }
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    })
    if (!session?.sub) return NextResponse.json({ status: 401 })

    const form = {
      from: new Date(parsedData.data.from),
      headquarder: parsedData.data.headquarder,
      to: new Date(parsedData.data.to),
      ids: parsedData.data.ids.map((id) => new ObjectId(id))
    }

    const type = parsedData.data.type

    const res =
      type === 'table'
        ? await generateBooking({ ...form, type: 'table', room: false })
        : type === 'pc'
        ? await generateBooking({ ...form, type: 'pc', room: false })
        : type === 'room'
        ? await generateBooking({ ...form, type: 'table', room: true })
        : null

    if (res === null) throw new Error('Not found ')
    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = await req.json()
    const parsedData = BookingSchema.safeParse(data)
    if (!parsedData.success) {
      return NextResponse.json(parsedData.error, { status: 400 })
    }
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    })
    if (!session?.sub) return NextResponse.json({ status: 401 })

    const user = await getUserByIdentifier(session.sub)
    if (!user) return NextResponse.json({ status: 401 })

    const bookings = await getBookingsByUserId(user._id)
    return NextResponse.json(bookings, { status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 500 })
  }
}

const BookingSchema = z.object({
  date: z.string(),
  headquarder: z.string(),
  from: z.string(),
  to: z.string(),
  type: z.enum(['table', 'pc', 'room']),
  ids: z.array(z.string())
})
