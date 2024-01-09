import { db } from 'libs/firebase'
import { type Floor } from 'types'

export async function getFloors(): Promise<Floor[]> {
  try {
    const ref = db.collection('floors').orderBy('created_at', 'desc')
    const snapshot = await ref.get()
    const data: Floor[] = snapshot.docs.map((doc) => {
      return doc.data() as Floor
    })
    return data
  } catch (error) {
    throw new Error('error firebase get flour')
  }
}
