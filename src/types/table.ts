import { type ObjectId } from 'mongodb'
import { type User } from './user'
import { type Floor } from 'types'

export interface Table {
  _id: ObjectId
  name: string
  floor: Pick<Floor, '_id' | 'name' | 'headquarder'>
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
    | 'identifiers'
    | 'access_token_facebook'
    | 'facebook_id'
    | 'is_editor'
    | 'nick_name'
    | 'is_active'
    | 'is_admin'
    | 'created_at'
  >
  from: Date
  chair: number
  to: Date
  time: string
  display_time: string
}
