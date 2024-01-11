import { type ReactZoomPanPinchState } from 'react-zoom-pan-pinch'
import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  isEditing: boolean
  isMoveable: boolean
  setIsMoveable: (isMoveable: boolean) => void
  setIsEditing: (disabledDragPanel: boolean) => void
  pinchState: ReactZoomPanPinchState
  setPinchState: (state: ReactZoomPanPinchState) => void
}

const StoreApi: StateCreator<UIState> = (set) => ({
  isEditing: false,
  isMoveable: true,
  setIsMoveable: (isMoveable) => set(() => ({ isMoveable })),
  setIsEditing: (isEditing) => set(() => ({ isEditing })),
  pinchState: {
    positionX: 0,
    positionY: 0,
    scale: 1,
    previousScale: 0
  },
  setPinchState: (state) => set(() => ({ pinchState: state }))
})

export const useUI = create<UIState>()(
  persist(StoreApi, {
    name: 'ui-store'
  })
)
