import { authOptions } from 'libs/next-auth'
import { getTable, getUserById } from 'libs/server'
import { createManyRecord } from 'libs/server/record'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { type NextRequest, NextResponse } from 'next/server'
import { type User } from 'types'
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
    const recoverUsers: User[] = []

    if (!table) throw new Error('Table not found')

    for (const item of table.current_users) {
      const u = await getUserById(new ObjectId(item.user._id))
      if (u) recoverUsers.push(u)
    }

    const isNotComplet =
      new Date(table.current_users[0].to) < new Date() ||
      new Date(table.current_users[0].to) > new Date()

    const newRecords: Record[] = recoverUsers.map((user, i) => {
      const constructRecord: Record = {
        _id: new ObjectId(),
        created_at: new Date(),
        table: {
          _id: new ObjectId(table?._id),
          name: table.name,
          floor: table.floor,
          type: table.type
        },
        responsible: responsible.account!,
        current: {
          type_of_use: i === 0 ? 'user' : 'companion',
          signed_to: table.current_users[0].to,
          chair: table.current_users[0].chair,
          from: table.current_users[0].from,
          to: isNotComplet ? new Date() : table.current_users[0].to,
          user: {
            dni: user.dni,
            _id: new ObjectId(user._id),
            career: user.career,
            sex: user.sex,
            names: user.names,
            email: user.email,
            tenant: user.tenant,
            type_user: user.type_user
          }
        }
      }
      return constructRecord
    })

    await createManyRecord(newRecords)

    return NextResponse.json({
      msg: 'Records created'
    })
  } catch (error) {
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
  table_id: z.string()
})
