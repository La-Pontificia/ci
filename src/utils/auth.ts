import { type User } from 'types'

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export type InputData = {
  id: string
  name: string
  email: string
  image: string | null
  dni: string
}

export type UserResponse = {
  _id: string
  image: string
  email: string
  tenant: User['tenant']
  type_user: User['type_user']
  names: string
  dni: string
}

const defaultImage = process.env.PROFILE_DEFAULT_USER!

export function transformUserData(data: InputData): UserResponse {
  let tenant: User['tenant']
  const e = data.email.split('@')[1].trim()
  if (e === 'elp.edu.pe') {
    tenant = 'elp'
  } else if (e === 'ilp.edu.pe') {
    tenant = 'ilp'
  } else if (e === 'lapontificia.edu.pe') {
    tenant = 'lp'
  } else {
    throw new Error('tenantNotAllowed')
  }

  const dniMatch = data.email.match(/\d{8}/)
  const dni = dniMatch ? dniMatch[0] : ''
  const isStudent = /^\d{8}$/.test(dni)
  const type_user = isStudent ? 'student' : 'executive'

  const response: UserResponse = {
    _id: data.id,
    image: data.image ?? defaultImage,
    tenant,
    email: data.email,
    type_user,
    names: data.name,
    dni
  }

  return response
}
