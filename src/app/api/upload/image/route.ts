import { type NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
export type CloudinaryImageResponseApi = {
  secure_url: string
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()
    const image = data.get('image') as File
    if (!image) {
      return NextResponse.json('No Image', { status: 403 })
    }
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dc0t90ahb/upload'
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'ztmbixcz')
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return NextResponse.json(
      {
        msg: 'Image uploaded successfully',
        ok: true,
        url: response.data.secure_url
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}
