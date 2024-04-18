import { type ObjectId } from 'mongodb'
import { type User } from './user'
import { type Table } from './table'

export interface Booking {
  _id: ObjectId
  users: Array<
    Pick<
      User,
      | '_id'
      | 'email'
      | 'image'
      | 'names'
      | 'tenant'
      | 'type_user'
      | 'career'
      | 'sex'
    >
  >
  table: Pick<Table, '_id' | 'name' | 'type' | 'floor' | 'room'>
  from: Date
  to: Date
  time: string
  date: Date
  status: 'active' | 'cancelled' | 'completed' | 'expired'
  created_at: Date
}
