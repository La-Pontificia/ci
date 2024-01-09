export type User = {
  _id: string
  email: string
  image: string
  tenant: 'ilp' | 'elp'
  type_user: 'student' | 'executive'
  is_admin: boolean
  is_active: boolean
  isEditor: boolean
  names: string
  created_at: Date
}
