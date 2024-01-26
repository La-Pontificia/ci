import { completBooking, updateBooking } from 'libs/server/booking'
import { ObjectId } from 'mongodb'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  status: z.string()
})

const schemaAdd = z.object({
  chair: z.number()
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await req.json()
    const zVa = schema.partial().safeParse(data)
    if (!zVa.success) return NextResponse.json(zVa.error, { status: 400 })
    const id = params.slug
    await updateBooking(zVa.data, new ObjectId(id))
    return NextResponse.json(data, { status: 200 })
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
    const zVa = schemaAdd.safeParse(data)
    if (!zVa.success) return NextResponse.json(zVa.error, { status: 400 })
    const id = params.slug
    await completBooking(id, zVa.data.chair)
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
