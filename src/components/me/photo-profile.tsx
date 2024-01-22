'use client'

import { Button } from 'commons/button'
import { LineLoading } from 'commons/loading/line'
import { ToastContainer } from 'commons/utils'
import { usePending } from 'hooks/usePending'
import { CameraIcon } from 'icons'
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
      <div className="relative z-20">
        {isPending && (
          <span className="absolute rounded-full bg-neutral-200/80 inset-0 grid place-content-center">
            <LineLoading size={20} className="text-neutral-800" />
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
        <div className="w-[230px] max-700:w-[100px] border-[--background] max-700:h-[100px]  h-[230px] overflow-hidden rounded-full">
          <Image
            className="w-full h-full object-cover"
            width={230}
            height={230}
            src={image}
            alt=""
          />
        </div>
        <div className="absolute bottom-0 w-full justify-center">
          <Button
            disabled={isPending}
            aria-disabled={isPending}
            onClick={() => !isPending && onClickFileContent()}
            className="flex aria-disabled:cursor-not-allowed w-[100px] mx-auto items-center gap-2 shadow-lg"
            variant="white"
            isFilled
            icon={<CameraIcon className="w-5" />}
          >
            Editar
          </Button>
        </div>
      </div>
    </>
  )
}

export default PhotoProfile
