import { getUserByIdentifier } from 'libs/server'
import { createUser, getUsers, updateUser } from 'libs/server/user'
import { ObjectId } from 'mongodb'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { type User } from 'types'
import { validateEmail } from 'utils'
import { transformUserData } from 'utils/auth'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const parser = zva.safeParse(await req.json())
    if (!parser.success) throw new Error(parser.error.message)
    const storeCookie = cookies()
    const id = storeCookie.get('uft-ln')?.value ?? ''
    const user = await getUserByIdentifier(id)
    if (!user) throw new Error('Unauthorized')

    const { tenant } = transformUserData({
      dni: '',
      email: parser.data.email,
      id: '',
      image: '',
      name: ''
    })
    const newUser: User = {
      _id: new ObjectId(),
      access_token_facebook: null,
      bio: null,
      created_at: new Date(),
      dni: parser.data.dni,
      email: parser.data.email,
      facebook_id: null,
      identifiers: [],
      image: process.env.PROFILE_DEFAULT_USER!,
      is_active: true,
      is_admin: false,
      is_editor: false,
      names: `${parser.data.first_name} ${parser.data.last_name}`,
      nick_name: `${parser.data.first_name} ${parser.data.last_name}`,
      sex: parser.data.sex,
      tenant,
      type_user: parser.data.type,
      career: parser.data.career as User['career']
    }
    await createUser(newUser)
    return NextResponse.json({ user: newUser }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json()
    const storeCookie = cookies()
    const id = storeCookie.get('uft-ln')?.value ?? ''
    const user = await getUserByIdentifier(id)
    if (!user) throw new Error('Unauthorized')
    await updateUser(
      {
        ...data
      },
      user._id
    )
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q') ?? ''
    const limit = req.nextUrl.searchParams.get('limit')
    const users = await getUsers(query, limit ? parseInt(limit) : 10)
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}

const careers = [
  {
    code: 'ESI',
    name: 'Escuela: Ingeniería de Sistemas'
  },
  {
    code: 'EAE',
    name: 'Escuela: Administración de Empresas'
  },
  {
    code: 'ECF',
    name: 'Escuela: Contabilidad y Finanzas'
  },
  {
    code: 'IAE',
    name: 'Instituto: Administración de Empresas'
  },
  {
    code: 'IET',
    name: 'Insituto: Enfermeria Técnica'
  },
  {
    code: 'ICT',
    name: 'Instituto: Contabilidad Técnica'
  },
  {
    code: 'DOC',
    name: 'Docente'
  }
]

const zva = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().refine(validateEmail, {
    message: 'Invalid email'
  }),
  dni: z.string().length(8),
  career: z.string().refine((v) => careers.map((c) => c.code).includes(v), {
    message: 'Invalid career'
  }),
  sex: z.enum(['M', 'F']),
  type: z.enum(['student', 'executive', 'teacher'])
})
