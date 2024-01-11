import { connectToMongoDB, getCollection } from 'libs/mongodb'
import { ObjectId } from 'mongodb'
import { type User } from 'types'
import { getRandomUserProfile } from 'utils'
import { type UserResponse } from 'utils/auth'

export async function creteNewUser(user: UserResponse) {
  try {
    const newUser: User = {
      _id: new ObjectId(),
      identifiers: [user._id],
      isEditor: false,
      created_at: new Date(),
      image: getRandomUserProfile(),
      email: user.email,
      is_active: true,
      is_admin: false,
      names: user.names,
      tenant: user.tenant,
      type_user: user.type_user
    }
    await connectToMongoDB()
    const collection = getCollection('users')
    await collection.insertOne(newUser)
    return newUser
  } catch (err) {
    console.log(err)
    throw new Error('error')
  }
}

// export async function getUserById(_id: string): Promise<User | null> {
//   try {
//     const docRef = db.collection('users').doc(_id)
//     const documentSnapshot = await docRef.get()
//     if (documentSnapshot.exists) {
//       const documentData = documentSnapshot.data() as User
//       return documentData
//     }
//     return null
//   } catch (err) {
//     throw err
//   }
// }

export async function getUserByIdentifier(
  identifier: string
): Promise<User | null> {
  try {
    await connectToMongoDB()
    const idCollection = getCollection('users')
    const user = await idCollection.findOne({
      identifiers: { $in: [identifier] }
    })

    return user as User
  } catch (error) {
    console.log(error)
    throw error
  }
}
