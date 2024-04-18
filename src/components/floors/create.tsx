'use client'

import { XmarkIcon } from 'icons'
import { createFlour } from 'libs/client/floor'
import React from 'react'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ToastContainer } from 'commons/utils'
import { useAuth } from 'stores'
import { Input } from 'commons/input'
import { usePending } from 'hooks/usePending'
import { type Floor } from 'types'
import ToggleControl from 'commons/toggle/control'
import { Select } from 'commons/select'
import { Dialog } from 'commons/dialog'
import { Button } from 'commons/button'

type FormData = {
  name: string
  headquarder: Floor['headquarder']
  status: boolean
}

function CreateFloor({
  defaultHeadquarter
}: {
  defaultHeadquarter: Floor['headquarder']
}) {
  const user = useAuth((store) => store.session)
  if (!user) return null
  const { end, isPending, start } = usePending()

  const router = useRouter()
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { name: '', status: true, headquarder: defaultHeadquarter }
  })

  return (
    <Dialog
      title="Registrar nuevo piso"
      className="w-[400px] p-3"
      trigger={
        <button
          // disabled={!user?.is_admin}
          // onClick={onOpenModal}
          className="h-full w-full flex items-center justify-center gap-2 font-semibold text-neutral-800 p-5 bg-neutral-200 dark:bg-neutral-100/10 dark:border-neutral-600 dark:text-white rounded-2xl"
        >
          <XmarkIcon className="rotate-45 w-6" />
          <span className="text-sm">Agregar piso</span>
        </button>
      }
    >
      {({ setOpen }) => {
        const onSubmit = async (data: FormData) => {
          start()
          try {
            await createFlour(data.name, data.headquarder, data.status)
            router.refresh()
            toast('Piso creado correctamente')
            setOpen(false)
            reset()
          } catch (err) {
            if (err instanceof Error) {
              toast(ToastContainer(err.message))
            }
          } finally {
            end()
          }
        }

        return (
          <React.Fragment>
            <h2 className="text-center text-lg pb-3 font-bold">
              Registrar nuevo Piso
            </h2>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Ingresa el nombre"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'El nombre es requerido'
                  }
                }}
                name="name"
                className="h-14"
              />
              <Select
                className="h-14 dark:bg-neutral-900"
                control={control}
                name="headquarder"
              >
                <option value="alameda">Alameda</option>
                <option value="jazmines">Jazmines</option>
              </Select>
              <ToggleControl control={control} name="status">
                Estado del piso
              </ToggleControl>
            </div>
            <Button
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
              className="w-full mt-3 dark:bg-white bg-black hover:bg-black dark:text-black text-white rounded-xl p-4"
              isFilled
            >
              Guardar
            </Button>
          </React.Fragment>
        )
      }}
    </Dialog>
  )
}

export default CreateFloor
