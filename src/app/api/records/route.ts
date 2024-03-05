import { getTable } from 'libs/server'
import { createRecord } from 'libs/server/record'
import { ObjectId } from 'mongodb'
import { type NextRequest, NextResponse } from 'next/server'
import { type Record } from 'types/record'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const parsedData = zod.safeParse(data)
    if (!parsedData.success) throw new Error('Invalid data')

    const table = await getTable(parsedData.data.table_id)
    const current = table?.current_users.find(
      (current) => current.user._id.toString() === parsedData.data.user_id
    )

    if (!table) throw new Error('Table not found')
    if (!current) throw new Error('Current User not found')

    const isNotComplet = new Date(current.to) < new Date()

    const companions: Record['companions'] = table.companions
      ? table.companions.map((e) => {
          return {
            _id: e._id,
            names: e.names,
            email: e.email
          }
        })
      : []

    const constructRecord: Record = {
      _id: new ObjectId(),
      created_at: new Date(),
      table: {
        _id: new ObjectId(table?._id),
        name: table.name,
        floor: table.floor,
        type: table.type
      },
      companions,
      current: {
        signed_to: current.to,
        chair: current.chair,
        from: current.from,
        to: isNotComplet ? new Date() : current.to,
        user: {
          _id: new ObjectId(current.user._id),
          names: current.user.names,
          email: current.user.email,
          tenant: current.user.tenant,
          type_user: current.user.type_user
        }
      }
    }

    await createRecord(constructRecord)
    return NextResponse.json({
      msg: 'Record created'
    })
  } catch (error) {
    NextResponse.json(
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
