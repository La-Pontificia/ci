import { type ObjectId } from 'mongodb'
import { type User } from './user'
import { type Table } from './table'

type Time = `${string}:${string}`
export interface Booking {
  _id: ObjectId
  user: Pick<User, '_id' | 'names' | 'image' | 'email' | 'tenant'>
  table: Pick<Table, '_id' | 'name' | 'type' | 'floor'>
  from: Date
  to: Date
  time: Time
  date: Date
  status: 'active' | 'cancelled' | 'completed' | 'expired'
  created_at: Date
}
