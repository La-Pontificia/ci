import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'libs/firebase-client'

export async function updateProfile(userId: string, image: string) {
  try {
    const ref = doc(db, 'users', userId)
    await updateDoc(ref, {
      image
    })
  } catch (error) {
    throw new Error('error firebase change profile')
  }
}
