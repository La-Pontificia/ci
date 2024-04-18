/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { type Table } from 'types/table'
import { getTable, updateTable } from '..'
import { ObjectId } from 'mongodb'
import { type Booking } from 'types'
import { getBooking } from '../booking'

export async function getRandomTable(
  headquarder: string,
  chairs: number,
  ids: ObjectId[],
  room: boolean
): Promise<Table | null> {
  try {
    await connectToMongoDB()
    const collection = getCollection('tables')

    const query: any = {
      type: 'table',
      'floor.headquarder': headquarder,
      chairs: {
        $gte: chairs
      },
      status: true
    }

    if (room === true) {
      query.room = true
    }
    if (ids.length > 0) {
      query._id = { $nin: ids }
    }

    const doc = await collection.find(query).limit(1).toArray()

    const table = doc[0] as Table

    // IF NOT TABLE FOUND
    if (!table) return null

    // IF TABLE IS AVAILABLE
    return table
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getCountDocument(
  headquarder: string,
  chairs: number,
  type: Table['type'],
  room: boolean
): Promise<number> {
  try {
    await connectToMongoDB()
    const collection = getCollection('tables')

    const query: any = {
      type,
      'floor.headquarder': headquarder,
      chairs: {
        $gte: chairs
      },
      status: true
    }

    if (room === true) {
      query.room = true
    }
    const count = await collection.countDocuments(query)
    return count
  } catch (error) {
    throw error
  }
}

export async function getRandomPc(
  headquarder: string,
  chairs: number,
  ids: ObjectId[],
  room: boolean
): Promise<Table | null> {
  try {
    await connectToMongoDB()
    const collection = getCollection('tables')

    const type = 'pc'
    const query: any = {
      type,
      'floor.headquarder': headquarder,
      status: true
    }

    if (room === true) {
      query.room = true
    }

    if (ids.length > 0) {
      query._id = { $nin: ids }
    }

    // Get the count of documents that match the query
    const count = await collection.countDocuments(query)

    // Generate a random skip value to get a random document
    const randomSkip = Math.floor(Math.random() * count)

    const doc = await collection.find(query).limit(1).skip(randomSkip).toArray()

    const table = doc[0] as Table

    // IF NOT TABLE FOUND
    if (!table) return null

    // IF TABLE IS AVAILABLE
    return table
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getBookingsByTable(
  tableId: ObjectId,
  from: Date,
  to: Date
): Promise<number> {
  try {
    await connectToMongoDB()
    const collection = getCollection('bookings')

    const totalDocts = await collection.countDocuments({
      'table._id': tableId,
      status: 'active',
      from: { $lte: new Date(to) },
      to: { $gte: new Date(from) }
    })

    return totalDocts
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function createBooking(booking: Booking) {
  try {
    await connectToMongoDB()
    const collection = getCollection('bookings')
    await collection.insertOne(booking)
    return booking
  } catch (error) {
    throw error
  }
}

export async function removeReservedDateByBooking(_id: string) {
  try {
    const booking = await getBooking(new ObjectId(_id))
    const table = await getTable(booking.table._id.toString())

    const reserved_dates = table?.reserved_dates ?? []
    const newReservedList = reserved_dates.filter(
      (e) => e[0].toString() !== booking.from.toString()
    )

    await updateTable({ reserved_dates: newReservedList }, table?._id)
    return {
      booking,
      table
    }
  } catch (error) {
    throw error
  }
}
