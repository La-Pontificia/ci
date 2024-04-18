import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Draggable, { type DraggableData } from 'react-draggable'
import { useTables, type NewTypeTable } from 'stores/tables/tables.store'
import { getUI } from './utils'
import Chairs from './chairs'
import { useUI } from 'stores'
import ModalContent from './modal'
import DropDownTable from './dropdown'
import { UsersIcon } from 'icons'
import { useCheckReservation } from './use-check-reservation'
import { Dialog } from 'commons/dialog'
import { useModalTable } from './modal/state'

type Props = {
  table: NewTypeTable
}

function Table({ table }: Props) {
  const setIsMoveable = useUI((store) => store.setIsMoveable)
  const isDragging = useUI((store) => store.isItemDragging)
  const isEditing = useUI((store) => store.isEditing)
  const [{ x, y, rotation }, setUiState] = useState<NewTypeTable['ui']>(
    table.ui
  )
  const tables = useTables((store) => store.tables)
  const setTables = useTables((store) => store.setTables)

  useEffect(() => {
    setUiState(table.ui)
  }, [table])

  const onStop = (_: any, data: DraggableData) => {
    setIsMoveable(true)
    void updateUi({
      rotation,
      x: data.lastX,
      y: data.lastY
    })
  }

  const onDrag = () => {
    setIsMoveable(false)
  }

  const onStart = () => {
    setIsMoveable(false)
  }

  const updateUi = async (data: NewTypeTable['ui']) => {
    if (table.ui.x === data.x && table.ui.y === data.y) return

    try {
      await axios.patch(
        `/api/floors/${table.floor._id.toString()}/tables/${table._id}`,
        {
          ui: data
        }
      )
      setTables(
        tables.map((t) => {
          if (t._id === table._id) {
            return {
              ...t,
              ui: data
            }
          }
          return t
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  const isRoom = table.room

  const { size } = getUI(table)

  const { isReserved } = useCheckReservation(table.reserved_dates ?? [])

  return (
    <Dialog
      backdrop_blur="sm"
      className="p-2"
      disabled={!(!isEditing && table.status)}
      onClose={() => useModalTable.getState().resetState()}
      trigger={
        <div role="button">
          <Draggable
            defaultPosition={{
              x,
              y
            }}
            grid={[20, 20]}
            disabled={!isDragging || !isEditing}
            onStop={onStop}
            onDrag={onDrag}
            onStart={onStart}
          >
            <div
              aria-disabled={!table.status}
              data-editing={isEditing}
              className="fixed aria-disabled:opacity-30 group data-[editing=true]:cursor-grabbing cursor-pointer rounded-2xl bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:bg-neutral-200"
              style={{
                width: size[0],
                height: size[1]
              }}
            >
              <div
                aria-disabled={isReserved}
                data-currents={table.current_users.length > 0}
                className="relative text-white dark:text-neutral-500 aria-disabled:bg-orange-500/30 data-[currents=true]:bg-blue-500/20 dark:data-[currents=true]:bg-blue-500/30 rounded-[inherit] w-full h-full grid place-content-center"
              >
                {isRoom && (
                  <div className="absolute pointer-events-none border-2 -inset-2 border-blue-500 dark:border-blue-500/80 rounded-3xl" />
                )}
                {isEditing && (
                  <span className="absolute z-10 top-1 right-1">
                    <DropDownTable table={table} />
                  </span>
                )}
                {table.accept_mutiple && (
                  <span className="absolute text-white w-5 p-0.5 aspect-square rounded-full bg-blue-500 z-10 bottom-1 left-1">
                    <UsersIcon />
                  </span>
                )}
                <Chairs table={table} />
                <span className="text-xs font-semibold text-black dark:text-lime-50">
                  {table.name}
                </span>
              </div>
            </div>
          </Draggable>
        </div>
      }
    >
      <ModalContent isReserved={isReserved} table={table} />
    </Dialog>
  )
}

export default Table
