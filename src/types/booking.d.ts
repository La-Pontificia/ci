import { type ObjectId } from 'mongodb'
import { type User } from './user'
import { type Table } from './table'

type Time = `${string}:${string}`
export interface Booking {
  _id: ObjectId
  user: Pick<User, '_id' | 'names' | 'image' | 'email' | 'tenant'>
  table: Pick<Table, '_id' | 'name' | 'type' | 'floor'>
  from: Time
  to: Time
  time: Time
  date: Date
  status: 'active' | 'cancelled' | 'completed'
  created_at: Date
}
