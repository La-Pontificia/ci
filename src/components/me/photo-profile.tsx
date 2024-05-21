'use client'

import { Dialog } from 'commons/dialog'
import { usePending } from 'hooks/usePending'
import { CameraIcon } from 'icons'
import { uploadImage } from 'libs/client/cloudinary'
import { updateProfile } from 'libs/client/user'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { useAuth } from 'stores'
import { validImage } from 'utils'

function PhotoProfile() {
  const user = useAuth((store) => store.session)
  if (!user) return null
  const router = useRouter()

  // profile
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { end, isPending, start } = usePending()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e?.target?.files?.[0]
    if (image && validImage(image)) {
      void ChangeProfile(image)
    } else toast.error('La imagen es invalida')
  }

  const ChangeProfile = async (img: File) => {
    start()
    try {
      const res = await uploadImage(img)
      if (!res) throw new Error('Error al actualizar tu foto de perfil')
      await updateProfile(res)
      toast.success('Foto de perfil actualizada')
      router.refresh()
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
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
      <div className="relative w-full flex justify-center">
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
        <div className="absolute z-[1] inset-x-0 -bottom-3 flex justify-center">
          <button
            onClick={onClickFileContent}
            className="w-8 aspect-square bg-white text-black/70 hover:text-black shadow-xl p-1 rounded-full"
          >
            <CameraIcon />
          </button>
        </div>
        <Dialog
          backdrop_blur="sm"
          empty
          className="w-[400px]"
          trigger={
            <div className="z-[0] relative">
              <div
                data-loading={isPending}
                className="w-[250px] data-[loading=true]:opacity-50 data-[loading=true]:scale-95 transition-all max-md:w-[120px] aspect-square border dark:border-neutral-700 cursor-pointer overflow-hidden rounded-full"
              >
                <Image
                  className="w-full h-full object-cover"
                  width={250}
                  height={250}
                  src={user.image}
                  alt=""
                />
              </div>
              {isPending && (
                <span className="absolute spinn-infinite -inset-2 border-black opacity-70 rounded-full border-4 border-dashed block" />
              )}
            </div>
          }
        >
          <div className="aspect-square w-[400px] max-md:w-[300px] max-md:mx-auto border overflow-hidden rounded-full dark:border-stone-600">
            <Image
              className="w-full h-full object-cover"
              width={400}
              height={400}
              src={user.image}
              alt=""
            />
          </div>
        </Dialog>
      </div>
    </>
  )
}

export default PhotoProfile
