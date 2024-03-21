import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Draggable, { type DraggableData } from 'react-draggable'
import { useTables, type NewTypeTable } from 'stores/tables/tables.store'
import { getUI } from './utils'
import Chairs from './chairs'
import { useUI } from 'stores'
import { useModal } from 'hooks/useModal'
import ModalContent from './modal'
import DropDownTable from './dropdown'
import { UsersIcon } from 'icons'
import { useCheckReservation } from './use-check-reservation'
import * as Drawer from 'commons/vaul'

type Props = {
  table: NewTypeTable
}

function Table({ table }: Props) {
  const setIsMoveable = useUI((store) => store.setIsMoveable)
  const isEditing = useUI((store) => store.isEditing)
  const { onOpenModal, open, setOpen } = useModal()
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

  const onDrag = (_: any, data: DraggableData) => {
    setIsMoveable(false)
  }

  const onStart = (_: any, data: DraggableData) => {
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

  const { size } = getUI(table)

  const { isReserved } = useCheckReservation(table.reserved_dates ?? [])

  return (
    <Drawer.root open={open} onOpenChange={setOpen}>
      <Drawer.trigger asChild>
        <div
          role="button"
          onClick={() => {
            !isEditing && table.status && onOpenModal()
          }}
        >
          <Draggable
            defaultPosition={{
              x,
              y
            }}
            grid={[20, 20]}
            disabled={!isEditing}
            onStop={onStop}
            onDrag={onDrag}
            onStart={onStart}
          >
            <div
              aria-disabled={!table.status}
              data-editing={isEditing}
              className="fixed aria-disabled:opacity-30 group data-[editing=true]:cursor-grabbing cursor-pointer rounded-2xl bg-neutral-300 hover:bg-neutral-200"
              style={{
                width: size[0],
                height: size[1]
              }}
            >
              <div
                aria-disabled={isReserved}
                data-currents={table.current_users.length > 0}
                className="relative text-white aria-disabled:bg-orange-500/30 data-[currents=true]:bg-blue-500/20 rounded-[inherit] w-full h-full grid place-content-center"
              >
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
                <span className="text-xs font-semibold opacity-50 text-black">
                  {table.name}
                </span>
              </div>
            </div>
          </Draggable>
        </div>
      </Drawer.trigger>
      <Drawer.content>
        <ModalContent isReserved={isReserved} table={table} />
      </Drawer.content>
    </Drawer.root>
  )
}

export default Table
