'use client'

import React from 'react'

import { type Table } from 'types/table'
import { useUI } from 'stores'
import { useFloor } from 'stores/floor/floor.store'
import { useModal } from 'hooks/useModal'
import { Modal } from 'commons/modal'
import { useForm } from 'react-hook-form'
import { Input } from 'commons/input'
import { cn } from 'utils'
import { Button } from 'commons/button'
import axios from 'axios'
import { type NewTypeTable, useTables } from 'stores/tables/tables.store'
import { usePending } from 'hooks/usePending'
import { PlusIcon } from 'icons'

export const Add = () => {
  const floor = useFloor((state) => state.floor)
  const setTable = useTables((store) => store.setTable)
  const { end, isPending, start } = usePending()
  const { onCloseModal, onOpenModal, open, setOpen } = useModal()
  if (!floor) return

  const isEditing = useUI((state) => state.isEditing)

  const { control, setValue, reset, watch, handleSubmit } = useForm<Table>({
    defaultValues: {
      connected_to_printer: false,
      status: true,
      ui: {
        rotation: 'horizontal',
        x: 100,
        y: 100
      }
    }
  })
  const { chairs, ui, type } = watch()

  const ButtonChair = ({ n }: { n: Table['chairs'] }) => {
    const isActive = !!(n === chairs)
    const onClick = () => setValue('chairs', n)
    return (
      <Button
        aria-checked={isActive}
        onClick={onClick}
        isFilled
        variant={'none'}
        className="rounded-xl aria-checked:bg-black text-neutral-800 aria-checked:text-white text-center h-12 bg-neutral-200"
      >
        {n}
      </Button>
    )
  }

  const onChangeRotate = () => {
    setValue(
      'ui.rotation',
      ui?.rotation === 'vertical' ? 'horizontal' : 'vertical'
    )
  }

  const onSubmit = async (d: Partial<Table>) => {
    start()
    try {
      const { data } = await axios.post(`/api/floors/${floor._id}/tables`, {
        ...d,
        ui: {
          ...ui,
          rotation: d.chairs === 4 ? 'horizontal' : d.ui?.rotation
        }
      })
      setTable(data as NewTypeTable)
      onCloseModal()
      reset()
    } catch (error) {
      console.log(error)
    } finally {
      end()
    }
  }

  return (
    <>
      <span className="grid-background pointer-events-none select-none w-screen fixed h-screen opacity-40" />
      <Modal
        onDone={handleSubmit(onSubmit)}
        width={400}
        trigger={
          isEditing && (
            <div className="fixed bottom-5 flex gap-5 z-10 right-5">
              <button
                onClick={(e) => {
                  setValue('type', 'table')
                  setValue('chairs', 4)
                  onOpenModal()
                }}
                className="opacity-20 transition-all p-3 hover:opacity-100"
              >
                <PlusIcon className="w-[50px]" />
                <span>Mesa</span>
              </button>
              <button
                onClick={(e) => {
                  setValue('type', 'pc')
                  setValue('chairs', 1)
                  onOpenModal()
                }}
                className="opacity-20 transition-all p-3 hover:opacity-100"
              >
                <PlusIcon className="w-[50px]" />
                <span>Pc</span>
              </button>
            </div>
          )
        }
        title="Agregar un cubículo"
        onOpenChange={setOpen}
        {...{ open, isPending }}
      >
        <div className="p-4 grid gap-3">
          <Input
            autoFocus
            rules={{
              required: {
                value: true,
                message: 'El nombre es requerido'
              }
            }}
            className="h-14"
            placeholder="Nombre Ej. T04 , M01"
            control={control}
            name="name"
          />
          {type === 'table' && (
            <>
              <div className="grid grid-cols-3 gap-2 text-neutral-200 font-semibold">
                <ButtonChair n={4} />
                <ButtonChair n={8} />
                <ButtonChair n={12} />
              </div>
              {watch().chairs !== 4 && watch().chairs !== 1 && (
                <div className="bg-neutral-100 relative grid place-content-center p-10 rounded-2xl">
                  <FramerTable
                    c={chairs ?? 4}
                    rotate={ui?.rotation ?? 'vertical'}
                  />
                  <div className="absolute bottom-2 left-2 flex items-center">
                    <button
                      onClick={onChangeRotate}
                      className="bg-neutral-200 p-1 text-sm font-semibold rounded-full px-3"
                    >
                      {ui?.rotation === 'vertical' ? 'Horizontal' : 'Vertical'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  )
}

const FramerTable = ({
  c,
  rotate
}: {
  c: Table['chairs']
  rotate: Table['ui']['rotation']
}) => (
  <div
    className={cn(
      'relative ease-in-out duration-700 transition-transform bg-neutral-700 w-[80px] rounded-2xl',
      c === 4 && 'h-[80px]',
      c === 8 && 'h-[200px]',
      c === 12 && 'h-[280px]'
    )}
    style={{
      transform: rotate === 'vertical' ? 'rotate(0deg)' : 'rotate(90deg)'
    }}
  >
    {c === 4 && (
      <>
        <div className="absolute -top-3 left-[50%] translate-x-[-50%]">
          <ChairUI isHorizontal />
        </div>
        <div className="absolute -bottom-3 left-[50%] translate-x-[-50%]">
          <ChairUI isHorizontal />
        </div>
      </>
    )}
    <span className="flex flex-col absolute translate-y-[-50%] -left-3 gap-2 top-[50%]">
      {c === 4 ? (
        <ChairUI />
      ) : c === 8 ? (
        <>
          <ChairUI />
          <ChairUI />
          <ChairUI />
          <ChairUI />
        </>
      ) : (
        <>
          <ChairUI />
          <ChairUI />
          <ChairUI />
          <ChairUI />
          <ChairUI />
          <ChairUI />
        </>
      )}
    </span>
    <span className="flex flex-col justify-between absolute translate-y-[-50%] -right-3 gap-2 top-[50%]">
      {c === 4 ? (
        <ChairUI />
      ) : c === 8 ? (
        <>
          <ChairUI />
          <ChairUI />
          <ChairUI />
          <ChairUI />
        </>
      ) : (
        <>
          <ChairUI />
          <ChairUI />
          <ChairUI />
          <ChairUI />
          <ChairUI />
          <ChairUI />
        </>
      )}
    </span>
  </div>
)

const ChairUI = ({
  isHorizontal
}: {
  isHorizontal?: boolean
  isTop?: boolean
}) => {
  return (
    <span
      className={cn(
        'rounded-full block bg-neutral-700/60',
        isHorizontal ? 'h-2 w-9' : 'h-9 w-2'
      )}
    />
  )
}

export default Add
