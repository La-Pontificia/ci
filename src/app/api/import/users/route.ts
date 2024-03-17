/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { ObjectId } from 'mongodb'
import { type NextRequest, NextResponse } from 'next/server'
import { type User } from 'types'
import { getRandomUserProfile } from 'utils'
import { transformUserData } from 'utils/auth'
import { z } from 'zod'

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.json()
    const xvalid = zv.safeParse(formData)
    if (!xvalid.success) throw new Error('Invalid data')
    const { users } = xvalid.data

    const bulkOperations = []

    for (const item of users) {
      const filter = { email: item.email }
      const update = {
        $set: {
          dni: item.dni,
          career: item.career,
          type: item.type,
          sex: item.sex,
          names: item.names,
          nick_name: item.names
        }
      }
      bulkOperations.push({
        updateMany: {
          filter,
          update
        }
      })
    }

    await connectToMongoDB()
    const collection = getCollection('users')
    await collection.bulkWrite(bulkOperations)

    return NextResponse.json({ users })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error },
      {
        status: 500
      }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()
    const xvalid = zv.safeParse(formData)
    if (!xvalid.success) throw new Error('Invalid data')
    const { users } = xvalid.data

    await connectToMongoDB()
    const collection = getCollection('users')
    await collection.createIndex({ email: 1 }, { unique: true })
    const existingEmails = new Set<string>()

    const existingUsers = await collection
      .find({}, { projection: { email: 1 } })
      .toArray()

    for (const user of existingUsers) {
      existingEmails.add(user.email)
    }

    const newData: User[] = []

    for (const user of users) {
      const { email, tenant, dni } = transformUserData({
        email: user.email,
        id: '',
        image: '',
        name: user.names,
        dni: user.dni
      })

      if (!existingEmails.has(email)) {
        const newUser: User = {
          _id: new ObjectId(),
          access_token_facebook: null,
          email,
          facebook_id: null,
          identifiers: [],
          image: getRandomUserProfile(),
          is_active: true,
          is_admin: false,
          is_editor: false,
          names: user.names,
          nick_name: user.names,
          tenant,
          type_user: user.type as User['type_user'],
          bio: '',
          career: user.career as User['career'],
          dni,
          sex: user.sex,
          created_at: new Date()
        }

        newData.push(newUser)
        existingEmails.add(email)
      }
    }

    if (newData.length > 0) {
      await collection.insertMany(newData)
    }

    return NextResponse.json({ newData })
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500
      }
    )
  }
}

const zvUser = z.object({
  email: z.string(),
  names: z.string(),
  dni: z.string(),
  career: z.string(),
  type: z.string(),
  sex: z.string()
})

const zv = z.object({
  users: z.array(zvUser) // a
})
