import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { ObjectId, type WithId } from 'mongodb'
import { type Table } from 'types/table'

export async function getTables(floor: ObjectId): Promise<Table[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('tables')
    const cursor = collection
      .find({
        'floor._id': floor
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

export async function deleteTable(_id: ObjectId) {
  try {
    await connectToMongoDB()
    const collection = getCollection('tables')
    await collection.deleteOne({ _id })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getRandomTable(
  headquarder: string,
  type: string
): Promise<Table | null> {
  try {
    await connectToMongoDB()
    const collection = getCollection('tables')

    const totalDocts = await collection.countDocuments({
      type,
      'floor.headquarder': headquarder,
      status: true
    })

    if (totalDocts === 0) return null
    const randomIndex = Math.floor(Math.random() * totalDocts)

    const randomDoc = await collection
      .find({
        type,
        'floor.headquarder': headquarder,
        status: true
      })
      .skip(randomIndex)
      .limit(1)
      .toArray()

    return (randomDoc[0] as Table) || null
  } catch (error) {
    console.log(error)
    throw error
  }
}
