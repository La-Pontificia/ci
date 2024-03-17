/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { type WithId, ObjectId } from 'mongodb'
import {
  type Session,
  type Account,
  type User as UserNextAuth
} from 'next-auth'
import { type User } from 'types'
import { getRandomUserProfile } from 'utils'
import { type UserResponse } from 'utils/auth'

export async function updateUser(
  partials: Partial<User> | any,
  _id?: ObjectId
) {
  try {
    await connectToMongoDB()
    const collection = getCollection('users')
    const query = { _id }
    const docSnapshot = await collection.findOne(query)

    if (docSnapshot) {
      await collection.updateOne(query, { $set: partials })
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUsers(
  query?: string,
  limit?: number,
  tenant?: string,
  type_user?: string,
  is_active?: boolean
): Promise<User[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('users')

    const baseQuery: Record<string, any> = {
      $or: [
        { email: new RegExp(query || '', 'i') },
        { names: new RegExp(query || '', 'i') }
      ]
    }

    if (tenant !== undefined && tenant !== null) {
      baseQuery.tenant = tenant
    }

    if (type_user !== undefined && type_user !== null) {
      baseQuery.type_user = type_user
    }

    if (is_active !== undefined && is_active !== null) {
      baseQuery.is_active = is_active
    }

    const cursor = collection
      .find(baseQuery)
      .sort({ created_at: -1 })
      .limit(limit ?? 10)

    return (await cursor.toArray()).map((idWithId) => {
      const { _id, ...rest } = idWithId as WithId<User>
      return {
        ...rest,
        _id
      }
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getUserById(_id: ObjectId): Promise<User | null> {
  try {
    await connectToMongoDB()
    return await getCollection('users').findOne<User>({
      _id
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function creteNewUser(user: UserResponse) {
  try {
    const newUser: User = {
      _id: new ObjectId(),
      dni: user.dni,
      sex: '',
      bio: '',
      nick_name: user.names,
      identifiers: [user._id],
      is_editor: false,
      facebook_id: null,
      access_token_facebook: null,
      created_at: new Date(),
      image: getRandomUserProfile(),
      email: user.email,
      is_active: true,
      is_admin: false,
      names: user.names,
      tenant: user.tenant,
      type_user: user.type_user
    }
    await connectToMongoDB()
    const collection = getCollection('users')
    await collection.insertOne(newUser)
    return newUser
  } catch (err) {
    console.log(err)
    throw new Error('error')
  }
}

export async function getUserByIdentifier(
  identifier: string
): Promise<User | null> {
  try {
    await connectToMongoDB()
    return await getCollection('users').findOne<User>({
      identifiers: { $in: [identifier] }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserByEmail(
  email?: string | null
): Promise<User | null> {
  try {
    await connectToMongoDB()
    return await getCollection('users').findOne<User>({
      email
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function addIdentifier(
  account: Account | null,
  user: UserNextAuth,
  { user: UserSession }: Session
) {
  try {
    await updateUser(
      {
        identifiers: [...UserSession.identifiers, user.id],
        facebook_id: user.id,
        nick_name: user.name,
        access_token_facebook: account?.access_token
      },
      UserSession._id
    )
    return '/'
  } catch (error) {
    return false
  }
}
