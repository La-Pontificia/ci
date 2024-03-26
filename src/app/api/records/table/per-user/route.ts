import { authOptions } from 'libs/next-auth'
import { getTable, getUserById } from 'libs/server'
import { createRecord } from 'libs/server/record'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { type NextRequest, NextResponse } from 'next/server'
import { type Record } from 'types/record'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const responsible = await getServerSession(authOptions)
    if (!responsible?.account) throw new Error('Unauthorized')

    const data = await req.json()
    const parsedData = zod.safeParse(data)
    if (!parsedData.success) throw new Error('Invalid data')

    const table = await getTable(parsedData.data.table_id)
    const current = table?.current_users.find(
      (current) => current.user._id.toString() === parsedData.data.user_id
    )

    if (!table) throw new Error('Table not found')
    if (!current) throw new Error('Current User not found')

    const isNotComplet =
      new Date(table.current_users[0].to) < new Date() ||
      new Date(table.current_users[0].to) > new Date()

    const user = await getUserById(new ObjectId(current.user._id))

    if (!user) throw new Error('User not found')

    const constructRecord: Record = {
      _id: new ObjectId(),
      created_at: new Date(),
      responsible: responsible.account,
      table: {
        _id: new ObjectId(table?._id),
        name: table.name,
        floor: table.floor,
        type: table.type
      },
      current: {
        type_of_use: 'user',
        signed_to: current.to,
        chair: current.chair,
        from: current.from,
        to: isNotComplet ? new Date() : current.to,
        user: {
          dni: user.dni,
          _id: new ObjectId(user._id),
          names: user.names,
          email: user.email,
          career: user.career,
          sex: user.sex,
          tenant: user.tenant,
          type_user: user.type_user
        }
      }
    }

    await createRecord(constructRecord)
    return NextResponse.json({
      msg: 'Record created'
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error
      },
      {
        status: 500
      }
    )
  }
}

const zod = z.object({
  table_id: z.string(),
  user_id: z.string()
})
