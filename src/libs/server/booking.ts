/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { type Table } from 'types/table'
import { getRandomTable } from '.'
import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { type Booking, type User } from 'types'
import { ObjectId, type WithId } from 'mongodb'

type FormData = {
  headquarder: string
  user: User
  type: string
  from: string
  to: string
  date: string
  time: string
}

export async function createBooking(
  data: FormData,
  recursionCount: number = 0
) {
  if (recursionCount >= 3) {
    throw new Error('No se encontro un cubículo para la reserva')
  }

  const tableRandom = await getRandomTable(data.headquarder, data.type)
  if (!tableRandom) {
    return await createBooking(data, recursionCount + 1)
  }
  const tableAvailable = await verifyBookingToTable(tableRandom, data)
  if (!tableAvailable) {
    return await createBooking(data, recursionCount + 1)
  }

  const newBooking: Booking = {
    _id: new ObjectId(),
    created_at: new Date(),
    date: new Date(data.date),
    from: new Date(data.from),
    status: 'active',
    table: {
      _id: tableRandom._id,
      floor: {
        _id: tableRandom.floor._id,
        headquarder: tableRandom.floor.headquarder,
        name: tableRandom.floor.name
      },
      name: tableRandom.name,
      type: tableRandom.type
    },
    time: data.time as Booking['time'],
    to: new Date(data.to),
    user: {
      _id: data.user._id,
      email: data.user.email,
      image: data.user.image,
      names: data.user.names,
      tenant: data.user.tenant
    }
  }
  await connectToMongoDB()
  const collection = getCollection('bookings')
  await collection.insertOne(newBooking)

  return newBooking
}

export async function verifyBookingToTable(
  table: Table,
  form: FormData
): Promise<boolean> {
  try {
    await connectToMongoDB()
    const collection = getCollection('bookings')
    const existingBookings: Booking[] = (await collection
      .find({
        date: new Date(form.date),
        'table._id': table._id,
        status: 'active'
      })
      .toArray()) as Booking[]

    const overlappingBooking = existingBookings.find((book) => {
      const bookingStart = book.from
      const bookingEnd = book.to
      const formStart = new Date(form.from)
      const formEnd = new Date(form.to)

      const overlap =
        (bookingStart <= formStart && formStart < bookingEnd) ||
        (bookingStart < formEnd && formEnd <= bookingEnd) ||
        (formStart <= bookingStart && bookingEnd <= formEnd)

      return overlap
    })

    return !overlappingBooking
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateBooking(partials: any, _id?: ObjectId) {
  try {
    await connectToMongoDB()
    const collection = getCollection('bookings')
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

export async function getBookings(
  userId: ObjectId,
  query?: string,
  limit?: number
): Promise<Booking[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('bookings')
    const regexQuery = new RegExp(query || '', 'i')
    const cursor = collection
      .find({
        $or: [
          { 'user.names': regexQuery },
          { 'user.email': regexQuery },
          { 'user.tenant': regexQuery }
        ],
        'user._id': userId
      })
      .sort({ created_at: -1 })
      .limit(limit ?? 10)

    return (await cursor.toArray()).map((idWithId) => {
      const { _id, ...rest } = idWithId as WithId<Booking>
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

export async function getAllBookingsByFloor(
  floorId: ObjectId,
  query?: string,
  limit?: number
): Promise<Booking[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('bookings')
    const regexQuery = new RegExp(query || '', 'i')
    const cursor = collection
      .find({
        $or: [
          { 'user.names': regexQuery },
          { 'user.email': regexQuery },
          { 'user.tenant': regexQuery },
          { 'table.name': regexQuery }
        ],
        'table.floor._id': floorId
      })
      .sort({ from: 1 })
      .sort({ created_at: -1 })
      .limit(limit ?? 10)

    return (await cursor.toArray()).map((idWithId) => {
      const { _id, ...rest } = idWithId as WithId<Booking>
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

export async function getAllBookingsByTable(
  tableId: ObjectId
): Promise<Booking[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('bookings')
    const cursor = collection
      .find({
        'table._id': tableId,
        status: 'active'
      })
      .sort({ from: 1 })
      .sort({ created_at: -1 })
      .limit(40)
      .toArray()

    return (await cursor).map((idWithId) => {
      const { _id, ...rest } = idWithId as WithId<Booking>
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

export async function getBooking(_id: ObjectId): Promise<Booking> {
  try {
    await connectToMongoDB()
    const collection = getCollection('bookings')
    const coll = await collection.findOne<Booking>({
      _id
    })
    if (!coll) throw new Error('No se encontro la reserva')
    return coll
  } catch (error) {
    console.error(error)
    throw error
  }
}
