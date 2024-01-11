import { updateFloor } from 'libs/server/floor'
import { ObjectId } from 'mongodb'
import { NextResponse, type NextRequest } from 'next/server'
export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await req.json()
    const id = params.slug
    await updateFloor({ ...data }, new ObjectId(id))
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
