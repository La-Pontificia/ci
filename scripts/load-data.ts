import { type User } from 'types'
import data from './Matriculados 2023-IIC ELP-ILP.json'
import { ObjectId } from 'mongodb'
import { getRandomUserProfile } from 'utils'
import { transformUserData } from 'utils/auth'
import { connectToMongoDB, getCollection } from 'libs/mongodb'

export async function getDataListParser() {
  await connectToMongoDB()
  const collection = getCollection('users')
  await collection.createIndex({ email: 1 }, { unique: true })

  const newData: User[] = []
  data.forEach((user) => {
    const { email, tenant, type_user } = transformUserData({
      email: user.email,
      id: '',
      image: '',
      name: user.name
    })
    const newUser: User = {
      _id: new ObjectId(),
      access_token_facebook: null,
      created_at: new Date(),
      email,
      facebook_id: null,
      identifiers: [],
      image: getRandomUserProfile(),
      is_active: true,
      is_admin: false,
      is_editor: false,
      names: user.name,
      nick_name: user.name,
      tenant,
      type_user
    }
    newData.push(newUser)
  })

  await collection.insertMany(newData)

  return newData
}
