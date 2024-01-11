import { type ObjectId } from 'mongodb'
import { type User } from './user'

export interface Table {
  _id: ObjectId
  name: string
  flour_id: ObjectId
  chairs: 1 | 4 | 8 | 12
  type: 'table' | 'pc'
  connected_to_printer: boolean
  current_users: TableCurrentUser[]
  occupied: boolean
  status: boolean
  ui: {
    x: number
    y: number
    rotation: 'horizontal' | 'vertical'
  }
  created_at: Date
}

export interface TableCurrentUser {
  user: Omit<
    User,
    'identifiers' | 'isEditor' | 'is_active' | 'is_admin' | 'created_at'
  >
  from: string
  chair: number
  to: string
  time: string
  display_time: string
  date: Date
}
