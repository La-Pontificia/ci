import { type User } from 'types'
import { type Table } from './table'
import { type ObjectId } from 'mongodb'

export interface Record {
  _id: ObjectId
  table: Pick<Table, '_id' | 'name' | 'floor' | 'type'>
  current: RecordUser
  responsible: User
  created_at: Date
}

interface RecordUser {
  user: Pick<
    User,
    | '_id'
    | 'names'
    | 'email'
    | 'tenant'
    | 'type_user'
    | 'career'
    | 'sex'
    | 'dni'
  >
  from: Date
  chair: number
  to: Date
  signed_to: Date
  type_of_use: 'companion' | 'user'
}
