import { updateUser } from 'libs/server'
import { ObjectId } from 'mongodb'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const formData = await req.json()
  const zv = schema.partial().safeParse(formData)
  if (!zv.success) {
    return NextResponse.json(
      { msg: 'invalid data', error: zv.error },
      { status: 400 }
    )
  }
  try {
    await updateUser({ ...zv.data }, new ObjectId(params.slug))
    return NextResponse.json({ msg: 'Update' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ msg: 'internal server error' }, { status: 500 })
  }
}

const schema = z.object({
  names: z.string(),
  nick_name: z.string(),
  is_admin: z.boolean(),
  is_active: z.boolean(),
  is_editor: z.boolean()
})
