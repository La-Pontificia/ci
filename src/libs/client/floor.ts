import { doc, setDoc } from 'firebase/firestore'
import { db } from 'libs/firebase-client'
import { type Floor } from 'types'

export async function createFlour(
  name: string,
  headquarder: Floor['headquarder'],
  status: boolean
) {
  try {
    const newFloor: Floor = {
      _id: crypto.randomUUID(),
      created_at: new Date(),
      headquarder,
      status,
      name
    }
    const ref = doc(db, 'floors', newFloor._id)
    await setDoc(ref, newFloor)
  } catch (error) {
    throw new Error('error firebase create floor')
  }
}

export async function updateFloor(partials: any, _id: string): Promise<void> {
  try {
    const ref = doc(db, 'floors', _id)
    await setDoc(ref, partials, { merge: true })
  } catch (error) {
    throw new Error('error firebase update floor')
  }
}

// function generateUniqueNumericId(): string {
//   const idLength = 10
//   const digits = '0123456789'
//   let uniqueId = ''

//   while (uniqueId.length < idLength) {
//     const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length))
//     uniqueId += randomDigit
//   }

//   return uniqueId
// }
