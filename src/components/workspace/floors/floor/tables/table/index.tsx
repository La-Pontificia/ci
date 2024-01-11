import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Draggable, { type DraggableData } from 'react-draggable'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { getUI } from './utils'
import Chairs from './chairs'
import { useUI } from 'stores'
import { useModal } from 'hooks/useModal'
import { Modal } from 'commons/modal'
import ModalContent from './modal'

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
    // setUiState((prev) => ({
    //   ...prev,
    //   x: data.x,
    //   y: data.y
    // }))
  }

  const onStart = (_: any, data: DraggableData) => {
    setIsMoveable(false)
    // setUiState((prev) => ({
    //   ...prev,
    //   x: data.x,
    //   y: data.y
    // }))
  }

  const updateUi = async (data: NewTypeTable['ui']) => {
    try {
      await axios.patch(
        `/api/floors/${table.flour_id.toString()}/tables/${table._id}`,
        {
          ui: data
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const { size } = getUI(table)

  return (
    <Modal
      width={700}
      heigth={720}
      title={table.name}
      hiddenFooter
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
          <button
            onClick={() => {
              !isEditing && onOpenModal()
            }}
            data-editing={isEditing}
            className="fixed shadow-xl data-[editing=true]:cursor-grabbing cursor-pointer  rounded-2xl bg-neutral-700 hover:bg-neutral-600"
            style={{
              width: size[0],
              height: size[1]
            }}
          >
            <div
              data-currents={table.current_users.length > 0}
              className="relative text-black/50 data-[currents=true]:bg-blue-500/20 rounded-[inherit] w-full h-full grid place-content-center"
            >
              <Chairs table={table} />
              <span className="text-xs opacity-50 text-neutral-300">
                {table.name}
              </span>
            </div>
          </button>
        </Draggable>
      }
    >
      <ModalContent table={table} />
    </Modal>
  )
}

export default Table
