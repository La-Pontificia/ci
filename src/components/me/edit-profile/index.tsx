import React from 'react'
import * as Drawer from 'commons/vaul'
import { Button } from 'commons/button'
import { useAuth } from 'stores'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Input } from 'commons/input'
import { validImage } from 'utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { uploadImage } from 'libs/client/cloudinary'
import { updateProfile } from 'libs/client/user'
import { usePending } from 'hooks/usePending'
import axios from 'axios'
import { useDialog } from 'commons/vaul/use-dialog'

type FormControl = {
  nick_name: string
  bio: string
  names: string
}

export function EditProfile() {
  const user = useAuth((store) => store.session)
  if (!user) return null
  const router = useRouter()
  const { end, isPending, start } = usePending()
  const { control, handleSubmit } = useForm<FormControl>({
    values: {
      nick_name: user.nick_name,
      bio: user.bio ?? '',
      names: user.names
    }
  })
  const { onClose, open, setOpen } = useDialog()

  // profile
  const inputRef = React.useRef<HTMLInputElement>(null)
  const {
    end: endPhoto,
    isPending: isPendingPhoto,
    start: startPhoto
  } = usePending()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e?.target?.files?.[0]
    if (image && validImage(image)) {
      void ChangeProfile(image)
    } else toast.error('La imagen es invalida')
  }

  const ChangeProfile = async (img: File) => {
    startPhoto()
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
      endPhoto()
    }
  }

  const onClickFileContent = () => {
    if (inputRef?.current) inputRef.current.click()
  }

  const onSubmit = async (form: FormControl) => {
    start()
    try {
      await axios.patch('/api/account', form)
      toast.success('Perfil actualizado', {
        description: 'Tu perfil ha sido actualizado correctamente'
      })
      onClose()
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      end()
    }
  }

  return (
    <Drawer.root open={open} onOpenChange={setOpen}>
      <Drawer.trigger asChild>
        <Button
          variant="none"
          className="border w-full p-1.5 text-center rounded-xl "
        >
          Editar perfil
        </Button>
      </Drawer.trigger>
      <Drawer.content>
        <div className="max-w-xl mx-auto w-full px-2 pb-5">
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
          <h1 className="text-center font-bold">Editar perfil</h1>
          <div className="flex max-700:flex-col items-start max-700:items-center py-10 pt-5 gap-5">
            <div
              data-pending={isPendingPhoto}
              className="data-[pending=false]:hover:scale-105 rounded-full transition outline-dashed outline-black outline-offset-2"
            >
              <div
                data-pending={isPendingPhoto}
                onClick={() => !isPendingPhoto && onClickFileContent()}
                className="w-[130px] transition data-[pending=true]:scale-90 data-[pending=true]:opacity-40 aspect-square border cursor-pointer overflow-hidden rounded-full"
              >
                <Image
                  className="w-full h-full object-cover"
                  width={130}
                  height={130}
                  src={user.image}
                  alt=""
                />
              </div>
            </div>
            <div className="w-full space-y-2 flex flex-col">
              <Input
                label="Nick Name"
                control={control}
                rules={{
                  minLength: {
                    value: 3,
                    message: 'El nick name debe tener al menos 2 caracteres'
                  },
                  maxLength: {
                    value: 40,
                    message: 'El nick name debe tener como maximo 20 caracteres'
                  },
                  required: 'El nick name es requerido'
                }}
                className="font-semibold"
                name="nick_name"
              />
              <Input
                disabled
                label="Nombres legales"
                control={control}
                className="font-semibold"
                name="names"
              />
              <Input
                rules={{
                  maxLength: {
                    value: 100,
                    message:
                      'La biografia debe tener como maximo 100 caracteres'
                  }
                }}
                label="Bio"
                control={control}
                className="font-semibold"
                name="bio"
              />
            </div>
          </div>
          <div>
            <Button
              loading={isPending}
              onClick={handleSubmit(onSubmit)}
              className="w-full rounded-xl p-4"
              variant="black"
              isFilled
            >
              Guardar
            </Button>
          </div>
        </div>
      </Drawer.content>
    </Drawer.root>
  )
}
