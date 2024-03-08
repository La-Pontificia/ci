import { type ObjectId } from 'mongodb'
import { type ERRORS_NEXT_AUTH } from '../constants'
import { type User } from './user'

export * from './booking'
export * from './next-auth'
export * from './user'

export type AuthErrorNextAuth = keyof typeof ERRORS_NEXT_AUTH

export interface Floor {
  _id: ObjectId
  name: string
  headquarder: 'alameda' | 'jazmines'
  status: boolean
  created_at: Date
}

declare module 'next-auth' {
  interface Session {
    account: User | null
  }
}
