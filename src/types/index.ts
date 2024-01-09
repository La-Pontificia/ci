import { type ERRORS_NEXT_AUTH } from '../constants'

export * from './booking'
export * from './next-auth'
export * from './user'

export type AuthErrorNextAuth = keyof typeof ERRORS_NEXT_AUTH

export interface Floor {
  _id: string
  name: string
  headquarder: 'alameda' | 'jazmines'
  status: boolean
  created_at: Date
}
