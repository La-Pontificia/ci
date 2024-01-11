import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { ObjectId, type WithId } from 'mongodb'
import { type Table } from 'types/table'

export async function getTables(flour_id: ObjectId): Promise<Table[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('tables')
    const cursor = collection
      .find({
        flour_id
      })
      .sort({ created_at: -1 })

    return (await cursor.toArray()).map((collId) => {
      const { _id, ...rest } = collId as WithId<Table>
      return {
        ...rest,
        _id
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getTable(_id: string): Promise<Table | null> {
  try {
    await connectToMongoDB()
    const coll = getCollection('tables')
    const objectId = new ObjectId(_id)
    const collId = await coll.findOne({ _id: objectId })
    if (!collId) return null
    const { _id: floorId, ...rest } = collId as WithId<Table>
    return {
      ...rest,
      _id: floorId
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function createTable(floor: Table) {
  try {
    await connectToMongoDB()
    const collection = getCollection('tables')
    await collection.insertOne(floor)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateTable(partials: any, _id?: ObjectId) {
  try {
    await connectToMongoDB()
    const collection = getCollection('tables')
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
