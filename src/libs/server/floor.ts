import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { ObjectId, type WithId } from 'mongodb'
import { type Floor } from 'types'

export async function getFloors(): Promise<Floor[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('floors')
    const cursor = collection.find().sort({ created_at: -1 })
    return (await cursor.toArray()).map((collId) => {
      const { _id, ...rest } = collId as WithId<Floor>
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

export async function getFloor(_id: string): Promise<Floor | null> {
  try {
    await connectToMongoDB()
    const coll = getCollection('floors')
    const objectId = new ObjectId(_id)
    const collId = await coll.findOne({ _id: objectId })
    if (!collId) return null
    const { _id: floorId, ...rest } = collId as WithId<Floor>
    return {
      ...rest,
      _id: floorId
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function createFloor(floor: Floor) {
  try {
    await connectToMongoDB()
    const collection = getCollection('floors')
    await collection.insertOne(floor)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateFloor(
  partials: Partial<Floor> | any,
  _id?: ObjectId
) {
  try {
    await connectToMongoDB()
    const collection = getCollection('floors')
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
