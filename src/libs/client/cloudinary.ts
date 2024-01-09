import axios from 'axios'

export async function uploadImage(file: File): Promise<string | null> {
  if (!file) {
    throw new Error('No files provided.')
  }

  try {
    const formdata = new FormData()
    formdata.append('image', file)
    const res = await axios.post('/api/upload/image', formdata)
    if (res.data.ok) {
      return res.data.url
    }
    return null
  } catch (error) {
    console.log(error)
    throw new Error('Error uploading files to Cloudinary.')
  }
}
