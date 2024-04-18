'use client'

import React from 'react'

import { type Table } from 'types/table'
import { useFloor } from 'stores/floor/floor.store'
import { Dialog } from 'commons/dialog'
import { useForm } from 'react-hook-form'
import { Input } from 'commons/input'
import { cn } from 'utils'
import axios from 'axios'
import { type NewTypeTable, useTables } from 'stores/tables/tables.store'
import { usePending } from 'hooks/usePending'
import ToggleControl from 'commons/toggle/control'
import { motion } from 'framer-motion'
import { Button } from 'commons/button'
import { useUI } from 'stores'

type Props = {
  initial?: NewTypeTable
  typeDefault?: Table['type']
  chairsDefault?: Table['chairs']
  trigger?: React.ReactNode
}
export const AddOrEditPable = ({
  initial,
  trigger,
  typeDefault,
  chairsDefault
}: Props) => {
  const floor = useFloor((state) => state.floor)
  const setTable = useTables((store) => store.setTable)
  const setTables = useTables((store) => store.setTables)
  const tables = useTables((store) => store.tables)
  const setIsDragging = useUI((store) => store.setItemDragging)
  const { end, isPending, start } = usePending()
  if (!floor) return

  const { control, setValue, reset, watch, handleSubmit } = useForm<Table>({
    defaultValues: initial ?? {
      connected_to_printer: false,
      status: true,
      accept_mutiple: false,
      ui: {
        rotation: 'horizontal',
        x: 100,
        y: 100
      },
      room: false,
      type: typeDefault,
      chairs: chairsDefault
    }
  })
  const { chairs, ui, type } = watch()

  const onChangeRotate = () => {
    setValue(
      'ui.rotation',
      ui?.rotation === 'vertical' ? 'horizontal' : 'vertical'
    )
  }

  return (
    <Dialog
      backdropClassName="z-[100]"
      parentClassName="z-[201]"
      className="w-[400px] p-3"
      onOpen={() => setIsDragging(false)}
      onClose={() => setIsDragging(true)}
      trigger={trigger}
    >
      {({ onClose }) => {
        const onSubmit = async (d: Partial<Table>) => {
          start()
          const uri = initial
            ? `/api/tables/${initial?._id}`
            : `/api/floors/${floor?._id}/tables`
          try {
            const { data } = await axios.post(uri, {
              ...d,
              room: d.type === 'pc' ? false : d.room,
              ui: {
                ...ui,
                rotation: d.chairs === 4 ? 'horizontal' : d.ui?.rotation
              }
            })
            if (initial) {
              setTables(
                tables.map((t) => {
                  if (t._id === initial._id) {
                    return {
                      ...t,
                      ...(data as NewTypeTable)
                    }
                  }
                  return t
                })
              )
            } else {
              setTable(data as NewTypeTable)
            }
            onClose()
            reset()
          } catch (error) {
            console.log(error)
          } finally {
            end()
          }
        }
        return (
          <React.Fragment>
            <h2 className="text-center pb-3 text-lg font-semibold">
              {initial ? 'Editar Mesa/Pc' : 'Agregar Mesa/Pc'}
            </h2>
            <div className="grid gap-3">
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
                <ToggleControl control={control} name="room">
                  Sala
                </ToggleControl>
              )}
              {type === 'pc' && (
                <ToggleControl control={control} name="accept_mutiple">
                  Usuarios multiples
                </ToggleControl>
              )}

              {type === 'table' && (
                <>
                  <div className="grid grid-cols-6 gap-2 text-neutral-200 font-semibold">
                    {[4, 6, 8, 12].map((c) => (
                      <button
                        key={c}
                        role="checkbox"
                        aria-checked={!!(chairs === c)}
                        onClick={() => setValue('chairs', c as Table['chairs'])}
                        className="rounded-xl text-lg aspect-square aria-checked:bg-blue-500 dark:aria-checked:bg-blue-800 text-neutral-800 dark:text-neutral-300 aria-checked:text-white text-center bg-neutral-200 dark:bg-neutral-700"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  {watch().chairs !== 1 && (
                    <div className="bg-neutral-100 dark:bg-neutral-950 relative grid place-content-center p-10 rounded-2xl">
                      <FramerTable
                        c={chairs ?? 4}
                        rotate={ui?.rotation ?? 'vertical'}
                      />
                      {watch().chairs !== 4 && (
                        <div className="absolute bottom-2 left-2 flex items-center">
                          <button
                            onClick={onChangeRotate}
                            className="bg-neutral-200 dark:bg-neutral-700 p-1 text-sm font-semibold rounded-full px-3"
                          >
                            {ui?.rotation === 'vertical'
                              ? 'Horizontal'
                              : 'Vertical'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            <Button
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
              className="w-full mt-3 dark:bg-white bg-black hover:bg-black dark:text-black text-white rounded-xl p-3"
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

const FramerTable = ({
  c,
  rotate
}: {
  c: Table['chairs']
  rotate: Table['ui']['rotation']
}) => (
  <motion.div
    initial={false}
    animate={{
      opacity: 1,
      height:
        c === 4 ? '80px' : c === 6 ? '150px' : c === 8 ? '200px' : '280px',
      rotate: rotate === 'vertical' ? 0 : 90
    }}
    className="relative ease-in-out duration-700 transition-transform bg-neutral-700 w-[80px] rounded-2xl"
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
      ) : c === 6 ? (
        <>
          <ChairUI />
          <ChairUI />
          <ChairUI />
        </>
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
      ) : c === 6 ? (
        <>
          <ChairUI />
          <ChairUI />
          <ChairUI />
        </>
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
  </motion.div>
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

export default AddOrEditPable
