/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { type WithId, type ObjectId } from 'mongodb'
import { type User } from 'types'

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
