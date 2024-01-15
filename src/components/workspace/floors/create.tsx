'use client'

import { XmarkIcon } from 'icons'
import { createFlour } from 'libs/client/floor'
import React from 'react'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ToastContainer } from 'commons/sonner'
import { useAuth } from 'stores'
import { Modal } from 'commons/modal'
import { useModal } from 'hooks/useModal'
import { Input } from 'commons/input'
import { Button } from 'commons/button'
import { usePending } from 'hooks/usePending'
import { type Floor } from 'types'
import ToggleControl from 'commons/toggle/control'
import { Select } from 'commons/select'

type FormData = {
  name: string
  headquarder: Floor['headquarder']
  status: boolean
}

function CreateFloor() {
  const user = useAuth((store) => store.session)
  if (!user) return null
  const { open, onCloseModal, onOpenModal, setOpen } = useModal()
  const { end, isPending, start } = usePending()

  const router = useRouter()
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { name: '', status: true, headquarder: 'alameda' }
  })

  const onSubmit = async (data: FormData) => {
    start()
    try {
      await createFlour(data.name, data.headquarder, data.status)
      router.refresh()
      toast(ToastContainer('Piso creado correctamente'))
      onCloseModal()
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
    <Modal
      title="Registrar nuevo piso"
      onDone={handleSubmit(onSubmit)}
      isPending={isPending}
      onDoneText="Crear"
      width={500}
      trigger={
        <Button
          disabled={!user?.is_admin}
          onClick={onOpenModal}
          variant="none"
          className="w-[200px] grid place-content-center border border-neutral-700 hover:border-neutral-300 font-semibold text-neutral-300 p-5 bg-neutral-950 rounded-2xl shadow-md shadow-black/20"
        >
          <XmarkIcon className="rotate-45 w-6" />
        </Button>
      }
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex flex-col gap-3 p-4">
        <Input
          placeholder="Ingresa el nombre"
          control={control}
          name="name"
          className="h-14"
        />
        <Select className="h-14" control={control} name="headquarder">
          <option value="alameda">Alameda</option>
          <option value="jazmines">Jazmines</option>
        </Select>
        <ToggleControl control={control} name="status">
          Estado del piso
        </ToggleControl>
      </div>
    </Modal>
  )
}

export default CreateFloor
