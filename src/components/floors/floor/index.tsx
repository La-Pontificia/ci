'use client'

import React from 'react'
import { AddOrEditPable } from './add-or-edit'
import Tables from './tables'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useAuth, useUI } from 'stores'
import { Toggle } from 'commons/toggle'
import { PlusIcon } from 'icons'

export function Floor() {
  const setPinchState = useUI((store) => store.setPinchState)
  const isMoveable = useUI((store) => store.isMoveable)

  const pinchState = useUI((store) => store.pinchState)

  const user = useAuth((store) => store.session)
  const setIsEditing = useUI((state) => state.setIsEditing)
  const isEditing = useUI((state) => state.isEditing)

  return (
    <>
      <span className="grid-background pointer-events-none select-none w-screen fixed h-screen opacity-70" />
      {isEditing && (
        <div className="fixed bottom-5 flex items-center gap-10 px-5 right-2 z-10 p-2">
          <AddOrEditPable
            typeDefault="table"
            chairsDefault={4}
            trigger={
              <button className="dark:text-white font-semibold rounded-full">
                <PlusIcon className="w-10 mb-2 mx-auto" />
                Mésa
              </button>
            }
          />
          <AddOrEditPable
            typeDefault="pc"
            chairsDefault={1}
            trigger={
              <button className="dark:text-white font-semibold rounded-full">
                <PlusIcon className="w-10 mb-2 mx-auto" />
                PC
              </button>
            }
          />
        </div>
      )}
      <TransformWrapper
        initialScale={pinchState.scale}
        initialPositionX={pinchState.positionX}
        initialPositionY={pinchState.positionY}
        minScale={1}
        maxScale={2}
        onZoomStop={(e) => setPinchState(e.state)}
        onPanningStop={(e) => setPinchState(e.state)}
        onPinchingStop={(e) => setPinchState(e.state)}
        onWheelStop={(e) => setPinchState(e.state)}
        limitToBounds={false}
        disabled={!isMoveable}
        pinch={{ step: 5 }}
      >
        <div
          aria-selected={isEditing}
          className="fixed pr-4 z-10 opacity-40 hover:opacity-100 aria-selected:opacity-100 transition-opacity divide-x text-neutral-400 divide-neutral-800 bg-neutral-700 dark:bg-neutral-800 p-1 rounded-full flex justify-between h-[40px] bottom-5 left-[calc(var(--sidebar-width)+30px)]"
        >
          <Toggle
            className="text-sm"
            disabled={!user?.is_editor}
            onChangeValue={() => setIsEditing(!isEditing)}
            checked={isEditing}
          >
            <span className="text-white">Edicion</span>
          </Toggle>
        </div>
        <TransformComponent
          wrapperStyle={{
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            inset: 0
          }}
          contentClass="flex absolute"
        >
          <Tables />
        </TransformComponent>
      </TransformWrapper>
    </>
  )
}
