import { type User } from 'types'
import { type TableCompanion, type Table } from './table'
import { type ObjectId } from 'mongodb'

export interface Record {
  _id: ObjectId
  table: Pick<Table, '_id' | 'name' | 'floor' | 'type'>
  companions: Omit<TableCompanion, 'image'>[]
  current: RecordUser
  created_at: Date
}

interface RecordUser {
  user: Pick<User, '_id' | 'names' | 'email' | 'tenant' | 'type_user'>
  from: Date
  chair: number
  to: Date
  signed_to: Date
}
