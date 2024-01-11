import axios from 'axios'
import { type Floor } from 'types'

export async function createFlour(
  name: string,
  headquarder: Floor['headquarder'],
  status: boolean
) {
  try {
    const { data } = await axios.post('/api/floors', {
      name,
      headquarder,
      status
    })
    console.log(data)
  } catch (error) {
    throw error
  }
}

export async function updateFloor(partials: any, _id: string): Promise<void> {
  try {
    await axios.patch(`/api/floors/${_id}`, partials)
  } catch (error) {
    throw new Error('error update floor')
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
