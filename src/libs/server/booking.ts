/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { type TableCurrentUser, type Table } from 'types/table'
import { getTable, updateTable } from '.'
import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { type Booking } from 'types'
import { ObjectId, type WithId } from 'mongodb'
import { calculateTimeMargin } from 'utils'

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

export async function getBookingsByUserId(
  userId: ObjectId
): Promise<Booking[]> {
  try {
    await connectToMongoDB()
    const collection = getCollection('bookings')
    return await collection
      .find<Booking>({
        users: { $elemMatch: { _id: userId } }
      })
      .sort({ created_at: -1 })
      .limit(20)
      .toArray()
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
        users: {
          $elemMatch: {
            $or: [
              { names: regexQuery },
              { email: regexQuery },
              { tenant: regexQuery },
              { name: regexQuery }
            ]
          }
        },
        'table.floor._id': floorId,
        status: 'active'
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
export async function completBooking(_id: string) {
  try {
    await connectToMongoDB()
    const booking = await getBooking(new ObjectId(_id))
    const table = await getTable(booking.table._id.toString())
    if (!table) throw new Error('No se encontro la mesa')
    if (!booking) throw new Error('No se encontro la reserva')

    const { displayTime, time } = calculateTimeMargin(booking.date, booking.to)

    const newCurrentUsers: TableCurrentUser[] = booking.users.map(
      (user, i) => ({
        chair: i + 1,
        to: booking.to,
        from: booking.from,
        display_time: displayTime,
        time,
        user: {
          _id: user._id,
          email: user.email,
          image: user.image,
          names: user.names
        }
      })
    )
    const current_users: Table['current_users'] = newCurrentUsers

    await updateTable(
      {
        current_users
      },
      table._id
    )
    await updateBooking({ status: 'completed' }, new ObjectId(_id))
  } catch (error) {
    console.log(error)
    throw error
  }
}
