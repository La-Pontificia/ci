import axios from 'axios'

export async function updateProfile(image: string) {
  try {
    await axios.patch('/api/users', {
      image
    })
  } catch (error) {
    throw new Error('error change profile')
  }
}
