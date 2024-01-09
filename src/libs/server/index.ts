import { db } from 'libs/firebase'
import { type User } from 'types'
import { type UserResponse } from 'utils/auth'

export async function creteNewUser(user: UserResponse) {
  try {
    const newUser: User = {
      _id: user._id,
      isEditor: false,
      created_at: new Date(),
      image: user.image,
      email: user.email,
      is_active: true,
      is_admin: false,
      names: user.names,
      tenant: user.tenant,
      type_user: user.type_user
    }
    const docRef = db.collection('users').doc(newUser._id)
    await docRef.set(newUser)
    return newUser
  } catch (err) {
    console.log(err)
    throw new Error('error')
  }
}

export async function getUserById(_id: string): Promise<User | null> {
  try {
    const docRef = db.collection('users').doc(_id)
    const documentSnapshot = await docRef.get()
    if (documentSnapshot.exists) {
      const documentData = documentSnapshot.data() as User
      return documentData
    }
    return null
  } catch (err) {
    throw err
  }
}
