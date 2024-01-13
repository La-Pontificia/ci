import { getUserByIdentifier } from 'libs/server'
import { createBooking, getBookings } from 'libs/server/booking'
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

    const user = await getUserByIdentifier(session.sub)
    if (!user) return NextResponse.json({ status: 401 })

    const res = await createBooking({ ...parsedData.data, user })
    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 500 }, { status: 500 })
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

    const query = req.nextUrl.searchParams.get('q') ?? ''
    const limit = req.nextUrl.searchParams.get('limit') ?? '10'

    const bookings = await getBookings(user._id, query, parseInt(limit))
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
  type: z.string(),
  time: z.string()
})
