import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { type Record } from 'types/record'

export async function createRecord(record: Record) {
  try {
    await connectToMongoDB()
    const collection = getCollection('records')
    await collection.insertOne(record)
  } catch (error) {
    console.log(error)
    throw error
  }
}
