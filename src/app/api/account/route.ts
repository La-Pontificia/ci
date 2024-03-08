import { authOptions } from 'libs/next-auth'
import { updateUser } from 'libs/server'
import { getServerSession } from 'next-auth'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function PATCH(req: NextRequest) {
  try {
    const zva = zv.safeParse(await req.json())
    if (!zva.success) throw new Error('Invalid Data')
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('Not Authenticated')
    await updateUser(zva.data, session.account?._id)
    return NextResponse.json({ msg: 'Account Updated' })
  } catch (error) {
    return NextResponse.json({ msg: 'Not found' }, { status: 400 })
  }
}

const zv = z.object({
  nick_name: z.string().min(3).max(40),
  bio: z.string().max(200)
})
