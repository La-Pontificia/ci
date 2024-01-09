import { type User } from './user'

export interface Table {
  _id: string
  name: string
  flour_id: string
  chairs: 1 | 4 | 8 | 12
  type: 'table' | 'pc'
  connected_to_printer: boolean
  current_users: TableCurrentUser[]
  id_occupied: boolean
  is_active: boolean
  ui: {
    x: number
    y: number
    rotation: 'horizontal' | 'vertical'
  }
  created_at: Date
}

export interface TableCurrentUser extends User {
  from: string
  chair: number
  to: string
  time: string
  display_time: string
}
