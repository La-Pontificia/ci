'use client'

import React from 'react'
import { Add } from './add'
import Tables from './tables'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useAuth, useUI } from 'stores'
import { ReloadIcon, XmarkIcon } from 'icons'
import { Toggle } from 'commons/toggle'

export function Floor() {
  const isMoveable = useUI((store) => store.isMoveable)
  const setPinchState = useUI((store) => store.setPinchState)
  const pinchState = useUI((store) => store.pinchState)

  const user = useAuth((store) => store.session)
  const setIsEditing = useUI((state) => state.setIsEditing)
  const isEditing = useUI((state) => state.isEditing)

  return (
    <>
      <Add />
      <TransformWrapper
        initialScale={pinchState.scale}
        initialPositionX={pinchState.positionX}
        initialPositionY={pinchState.positionY}
        minScale={0.8}
        maxScale={1.2}
        onZoomStop={(e) => setPinchState(e.state)}
        onPanningStop={(e) => setPinchState(e.state)}
        onPinchingStop={(e) => setPinchState(e.state)}
        onWheelStop={(e) => setPinchState(e.state)}
        disabled={!isMoveable}
        limitToBounds={false}
        pinch={{ step: 5 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div
              aria-selected={isEditing}
              className="fixed z-10 opacity-40 hover:opacity-100 aria-selected:opacity-100 transition-opacity divide-x text-neutral-400 divide-neutral-800 bg-neutral-950 p-1 rounded-full flex justify-between w-[300px] h-[40px] bottom-5 left-5"
            >
              <button
                className="w-full disabled:cursor-not-allowed hover:text-neutral-100"
                onClick={() => zoomIn()}
              >
                <XmarkIcon className="w-5 mx-auto rotate-45" />
              </button>
              <button
                className="w-full disabled:cursor-not-allowed text-2xl hover:text-neutral-100"
                onClick={() => zoomOut()}
              >
                -
              </button>
              <button
                className="w-full disabled:cursor-not-allowed hover:text-neutral-100"
                onClick={() => resetTransform(1)}
              >
                <ReloadIcon className="w-4 mx-auto" />
              </button>
              <div className="px-2">
                <Toggle
                  className="text-sm"
                  disabled={!user?.isEditor}
                  onChangeValue={() => setIsEditing(!isEditing)}
                  checked={isEditing}
                >
                  Edicion
                </Toggle>
              </div>
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
          </>
        )}
      </TransformWrapper>
    </>
  )
}
