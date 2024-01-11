'use client'

import { LineLoading } from 'commons/loading/line'
import { ToastContainer } from 'commons/sonner'
import { usePending } from 'hooks/usePending'
import { uploadImage } from 'libs/client/cloudinary'
import { updateProfile } from 'libs/client/user'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { toast } from 'sonner'
import { useAuth } from 'stores'
import { validImage } from 'utils'

function PhotoProfile() {
  const user = useAuth((store) => store.session)
  if (!user) return null
  const { image } = user
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const { end, isPending, start } = usePending()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e?.target?.files?.[0]
    if (image && validImage(image)) {
      void ChangeProfile(image)
    } else toast(ToastContainer('La imagen es invalida'))
  }

  const ChangeProfile = async (img: File) => {
    start()
    try {
      const res = await uploadImage(img)
      if (!res) throw new Error('Error al actualizar tu foto de perfil')
      await updateProfile(res)
      toast(ToastContainer('Foto de perfil actualizado'))
      router.refresh()
    } catch (err) {
      if (err instanceof Error) {
        toast(ToastContainer(err.message))
      }
    } finally {
      end()
    }
  }

  const onClickFileContent = () => {
    if (inputRef?.current) inputRef.current.click()
  }

  return (
    <>
      <div
        aria-disabled={isPending}
        onClick={() => !isPending && onClickFileContent()}
        title="cambiar photo de perfil"
        className="relative z-20 cursor-pointer aria-disabled:cursor-not-allowed hover:opacity-80"
      >
        {isPending && (
          <span className="absolute z-10 rounded-full bg-neutral-800/80 inset-0 grid place-content-center">
            <LineLoading size={20} className="text-neutral-400" />
          </span>
        )}
        <span className="select-none hidden pointer-events-none">
          <input
            ref={inputRef}
            onChange={onChange}
            multiple
            accept="image/*"
            className="hidden"
            type="file"
          />
        </span>
        <span className="rounded-full bg-gradient-to-br from-violet-500 via-rose-500 to-yellow-500 p-0.5 block">
          <div className="w-[200px] max-700:w-[100px] border-[7px] border-[--background] max-700:h-[100px]  h-[200px] overflow-hidden rounded-full">
            <Image
              className="w-full h-full object-cover"
              width={200}
              height={200}
              src={image}
              alt=""
            />
          </div>
        </span>
      </div>
    </>
  )
}

export default PhotoProfile
