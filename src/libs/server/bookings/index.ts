import { type Booking, type User } from 'types'
import {
  createBooking,
  getBookingsByTable,
  getCountDocument,
  getRandomPc,
  getRandomTable
} from './utils'
import { ObjectId } from 'mongodb'
import { getFloor, getUserById, updateTable } from '..'
import { calculateDurationByDates } from 'utils'
import { type Table } from 'types/table'

type FormData = {
  headquarder: string
  ids: ObjectId[]
  from: Date
  to: Date
  type: Table['type']
}

const ids: ObjectId[] = []

async function generateBooking(form: FormData, recursionCount: number = 0) {
  const count = await getCountDocument(
    form.headquarder,
    form.type === 'table' ? form.ids.length : 1,
    form.type
  )

  if (recursionCount >= count) {
    throw new Error('No se encontro una mesa disponible para la reserva')
  }

  try {
    const tableRandom =
      form.type === 'table'
        ? await getRandomTable(form.headquarder, form.ids.length, ids)
        : await getRandomPc(form.headquarder, form.ids.length, ids)

    // IF NOT TABLE FOUND
    if (!tableRandom) {
      throw new Error('No pudimos encontrar una mesa para la reserva')
    }

    // IF FLOOR IS DISABLED
    const floor = await getFloor(tableRandom.floor._id.toString())

    if (floor?.status === false) {
      ids.push(tableRandom._id)
      return await generateBooking(form, recursionCount + 1)
    }

    const bookings = await getBookingsByTable(
      tableRandom._id,
      form.from,
      form.to
    )
    if (bookings > 0) {
      ids.push(tableRandom._id)
      return await generateBooking(form, recursionCount + 1)
    }

    // founded table
    const booking = await constructAndCreate(form, tableRandom)
    return booking
  } catch (error) {
    throw error
  }
}

async function constructAndCreate(
  form: FormData,
  table: Table
): Promise<Booking> {
  try {
    const from = new Date(form.from)
    const to = new Date(form.to)

    // getting users
    const users: User[] = []
    for (const _id of form.ids) {
      const user = await getUserById(_id)
      if (user) {
        users.push(user)
      }
    }

    if (users.length < 1) throw new Error('Users not found')

    // generate and save new booking
    const newBooking: Booking = {
      _id: new ObjectId(),
      created_at: new Date(),
      date: form.from,
      from,
      status: 'active',
      table: {
        _id: table._id,
        floor: {
          _id: table.floor._id,
          headquarder: table.floor.headquarder,
          name: table.floor.name
        },
        name: table.name,
        type: table.type
      },
      time: calculateDurationByDates(from, to),
      to,
      users: users.map((e) => ({
        _id: e._id,
        career: e.career,
        email: e.email,
        image: e.image,
        names: e.names,
        sex: e.sex ?? '',
        tenant: e.tenant,
        type_user: e.type_user
      }))
    }

    await updateTable(
      {
        reserved_dates: [
          ...(table.reserved_dates ?? []),
          [newBooking.from, newBooking.to]
        ]
      },
      table._id
    )

    await createBooking(newBooking)
    return newBooking
  } catch (error) {
    throw error
  }
}

export { generateBooking }
