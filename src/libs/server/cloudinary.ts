/* eslint-disable @typescript-eslint/no-misused-promises */
import { v2 as cloudinary } from 'cloudinary'

export type CloudinaryImageResponseApi = {
  secure_url: string
}

export async function uploadImage(image: File) {
  try {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'profiles',
            format: 'webp'
          },
          (err, result) => {
            if (err) {
              reject(err)
            }
            resolve(result)
          }
        )
        .end(buffer)
    })

    console.log(response)

    if (response) {
      const { secure_url } = response as CloudinaryImageResponseApi
      return {
        msg: 'Image uploaded successfully',
        ok: true,
        url: secure_url
      }
    }
    return {
      msg: 'Image upload not found',
      ok: false
    }
  } catch (error) {
    return {
      msg: 'Image upload failed',
      ok: false,
      error
    }
  }
}
