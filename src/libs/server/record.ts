/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { ObjectId, type WithId } from 'mongodb'
import { type Record as RecordType } from 'types/record'

export async function createRecord(record: RecordType) {
  try {
    await connectToMongoDB()
    const collection = getCollection('records')
    await collection.insertOne(record)
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function createManyRecord(records: RecordType[]) {
  try {
    await connectToMongoDB()
    const collection = getCollection('records')
    await collection.insertMany(records)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getRecords(
  from?: string,
  to?: string,
  cubicle?: string,
  tenant?: string,
  limit?: number
): Promise<RecordType[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('records')

    let baseQuery: Record<string, any> = {}

    if (from !== undefined) {
      baseQuery.created_at = { $gte: new Date(from) }
    }
    if (to !== undefined) {
      baseQuery.created_at = {
        ...baseQuery.created_at,
        $lte: new Date(to)
      }
    }

    if (cubicle !== undefined) {
      baseQuery = {
        ...baseQuery,
        'table._id': new ObjectId(cubicle)
      }
    }

    if (tenant !== undefined) {
      baseQuery = {
        ...baseQuery,
        'current.user.tenant': tenant
      }
    }

    const cursor = collection
      .find(baseQuery)
      .sort({ created_at: 1 })
      .limit(limit ?? 2000)

    return (await cursor.toArray()).map((idWithId) => {
      const { _id, ...rest } = idWithId as WithId<RecordType>
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
export async function getRecordsByUserId(
  user_id: ObjectId
): Promise<RecordType[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('records')

    const baseQuery: Record<string, any> = {
      'current.user._id': user_id
    }
    const cursor = collection.find(baseQuery).sort({ created_at: 1 }).limit(30)

    return (await cursor.toArray()).map((idWithId) => {
      const { _id, ...rest } = idWithId as WithId<RecordType>
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
