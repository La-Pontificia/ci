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
  limit?: number
): Promise<User[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('users')
    const regexQuery = new RegExp(query || '', 'i')
    const cursor = collection
      .find({
        $or: [{ email: regexQuery }, { names: regexQuery }],
        is_active: true
      })
      .sort({ created_at: -1 })
      .limit(limit ? (limit < 30 ? limit : 10) : 10)

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

export async function creteNewUser(user: UserResponse) {
  try {
    const newUser: User = {
      _id: new ObjectId(),
      nick_name: user.names.slice(0, 2),
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
    const idCollection = getCollection('users')
    const user = await idCollection.findOne({
      identifiers: { $in: [identifier] }
    })

    return user as User
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
