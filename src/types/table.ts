import { type ObjectId } from 'mongodb'
import { type User } from './user'
import { type Floor } from 'types'

export interface Table {
  _id: ObjectId
  name: string
  floor: Pick<Floor, '_id' | 'name' | 'headquarder'>
  chairs: 1 | 4 | 6 | 8 | 12
  type: 'table' | 'pc'
  connected_to_printer: boolean
  current_users: TableCurrentUser[]
  occupied: boolean
  status: boolean
  accept_mutiple?: boolean
  ui: {
    x: number
    y: number
    rotation: 'horizontal' | 'vertical'
  }
  reserved_dates?: Array<[Date, Date]>
  created_at: Date
}

export interface TableCurrentUser {
  user: Pick<User, '_id' | 'email' | 'image' | 'names'>
  from: Date
  chair: number
  to: Date
  time: string
  display_time: string
}
