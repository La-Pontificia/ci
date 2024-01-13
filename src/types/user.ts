import { type ObjectId } from 'mongodb'

export type User = {
  _id: ObjectId
  identifiers: string[]
  email: string
  names: string
  nick_name: string
  image: string
  tenant: 'ilp' | 'elp'
  type_user: 'student' | 'executive'
  is_admin: boolean
  facebook_id: string | null
  access_token_facebook: string | null
  is_active: boolean
  is_editor: boolean
  created_at: Date
}
