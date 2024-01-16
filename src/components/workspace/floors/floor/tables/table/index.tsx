import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Draggable, { type DraggableData } from 'react-draggable'
import { useTables, type NewTypeTable } from 'stores/tables/tables.store'
import { getUI } from './utils'
import Chairs from './chairs'
import { useUI } from 'stores'
import { useModal } from 'hooks/useModal'
import { Modal } from 'commons/modal'
import ModalContent from './modal'
import DropDownTable from './dropdown'

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

  return (
    <Modal
      title={table.name}
      hiddenFooter
      width={500}
      backdropBlur
      onOpenChange={setOpen}
      {...{ open }}
      trigger={
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
            role="button"
            onClick={() => {
              !isEditing && table.status && onOpenModal()
            }}
            aria-disabled={!table.status}
            data-editing={isEditing}
            className="fixed shadow-xl aria-disabled:opacity-30 group data-[editing=true]:cursor-grabbing cursor-pointer  rounded-2xl bg-neutral-700 hover:bg-neutral-600"
            style={{
              width: size[0],
              height: size[1]
            }}
          >
            <div
              data-currents={table.current_users.length > 0}
              className="relative text-black/50 data-[currents=true]:bg-blue-500/20 rounded-[inherit] w-full h-full grid place-content-center"
            >
              {isEditing && (
                <span className="absolute z-10 top-1 right-1">
                  <DropDownTable table={table} />
                </span>
              )}
              <Chairs table={table} />
              <span className="text-xs opacity-50 text-neutral-300">
                {table.name}
              </span>
            </div>
          </div>
        </Draggable>
      }
    >
      {open && <ModalContent table={table} />}
    </Modal>
  )
}

export default Table
