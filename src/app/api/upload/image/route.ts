import { uploadImage } from 'libs/server/cloudinary'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()
    const image = data.get('image') as File
    if (!image) {
      return NextResponse.json('No Image', { status: 403 })
    }
    const result = await uploadImage(image)
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
