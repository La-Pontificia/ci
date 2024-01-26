'use client'

import axios from 'axios'
import { Button } from 'commons/button'
import { Dialog } from 'commons/dialog'
import { LineLoading } from 'commons/loading/line'
import { ToastContainer } from 'commons/utils'
import { useModal } from 'hooks/useModal'
import { usePending } from 'hooks/usePending'
import { XmarkIcon } from 'icons'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { type Booking } from 'types'
import { type Table } from 'types/table'
import { cn, isDateInRangeVerify } from 'utils'

function Add({ booking }: { booking: Booking }) {
  if (booking.status !== 'active') return null
  const { onOpenModal, open, setOpen, onCloseModal } = useModal()
  const [table, setTable] = useState<Table | null>(null)
  const { end, isPending, start } = usePending()
  const today = new Date()
  const router = useRouter()
  const newFrom = new Date(booking.from)
  const isRange = isDateInRangeVerify(booking.from, booking.to)
  const isPosibleAsign = today >= newFrom

  // const addReservation = async () => {
  //   console.log(booking)
  // }

  const getTable = async () => {
    start()
    try {
      const { data } = await axios.get(
        `/api/tables/${booking.table._id.toString()}`
      )
      setTable(data as Table)
    } catch (error) {
      onCloseModal()
    } finally {
      end()
    }
  }

  useEffect(() => {
    if (open) {
      void getTable()
    }
  }, [open])

  if (!isRange) return null

  const onAdd = async (chair: number) => {
    try {
      await axios.post(`/api/booking/${booking._id.toString()}`, {
        chair
      })
      toast(ToastContainer('Reserva completada'))
      onCloseModal()
      router.refresh()
    } catch (error) {
      toast(ToastContainer('Ocurrio algo inesperado'))
      console.log(error)
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          onClick={onOpenModal}
          disabled={!(isRange && isPosibleAsign)}
          variant="black"
          className="rounded-xl h-12 w-full"
          isFilled
        >
          Agregar
        </Button>
      }
    >
      <>
        <p className="text-white text-center text-lg font-semibold pb-3">
          {table?.name}
        </p>
        <div className="bg-white max-h-[90vh] overflow-y-auto w-[500px] min-h-[500px] p-5 rounded-3xl">
          {isPending ? (
            <div className="w-full h-full grid place-content-center">
              <LineLoading size={20} className="text-black" />
            </div>
          ) : (
            <>
              <h2 className="text-center pb-4 font-semibold text-lg">
                Elija el cubículo a asignar
              </h2>
              <div
                className={cn(
                  'gap-4 grid grid-cols-2',
                  table?.type === 'pc' && 'grid-cols-1'
                )}
              >
                {table &&
                  [...Array(table.chairs)].map((_, i) => {
                    const index = i + 1
                    const current = table.current_users.find(
                      (e) => e.chair === index
                    )
                    return (
                      <div
                        onClick={async () => await onAdd(index)}
                        className={cn(
                          'h-[160px] relative bg-stone-200 hover:border-neutral-500 border border-transparent cursor-pointer grid place-content-center rounded-2xl',
                          table?.type === 'pc' && 'h-[200px]',
                          current && 'bg-green-200 hover:bg-green-300'
                        )}
                        key={index}
                      >
                        <span className="absolute top-3 left-3">{index}</span>
                        {current ? (
                          <div>
                            <div
                              className={
                                'w-[70px] h-[70px] hover:bg-stone-300 border border-neutral-400 mx-auto relative z-10 overflow-hidden rounded-full'
                              }
                            >
                              <img
                                width={70}
                                height={70}
                                className="w-full h-full object-cover"
                                src={current.user.image}
                                alt={current.user.names}
                              />
                            </div>
                            <span className="text-sm text-center pt-2 block">
                              {current.user.names}
                            </span>
                          </div>
                        ) : (
                          <XmarkIcon className="w-5 rotate-45" />
                        )}
                      </div>
                    )
                  })}
              </div>
            </>
          )}
        </div>
      </>
    </Dialog>
  )
}

export default Add
