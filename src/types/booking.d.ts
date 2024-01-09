import { type ClientSession, type User } from '@types'

export type Booking = {
  _id: string
  date: string
  from: string
  to: string
  client_id: string
  client_name: string
  type_client: ClientSession['type_client']
  user?: Partial<User> | null
  generated_at: string
  wait: boolean
}
