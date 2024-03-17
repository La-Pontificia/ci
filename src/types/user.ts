import { type ObjectId } from 'mongodb'

export type User = {
  _id: ObjectId
  identifiers: string[]
  email: string
  names: string
  nick_name: string
  image: string
  tenant: 'ilp' | 'elp'
  type_user: 'student' | 'executive' | 'teacher'
  bio: string | null
  is_admin: boolean
  facebook_id: string | null
  access_token_facebook: string | null
  is_active: boolean
  is_editor: boolean

  dni: string
  career?: 'EIS' | 'EAE' | 'ECF' | 'IAE' | 'IET' | 'ICT' | 'DOC'
  sex: string

  created_at: Date
}
