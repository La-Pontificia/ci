import { getUserByIdentifier } from 'libs/server'
import { getUsers, updateUser } from 'libs/server/user'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json()
    const storeCookie = cookies()
    const id = storeCookie.get('uft-ln')?.value ?? ''
    const user = await getUserByIdentifier(id)
    if (!user) throw new Error('Unauthorized')
    await updateUser(
      {
        ...data
      },
      user._id
    )
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q') ?? ''
    const limit = req.nextUrl.searchParams.get('limit')
    const users = await getUsers(query, limit ? parseInt(limit) : 10)
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
