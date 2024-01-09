import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  isEditing: boolean
  setIsEditing: (disabledDragPanel: boolean) => void
}

const StoreApi: StateCreator<UIState> = (set) => ({
  isEditing: false,
  setIsEditing: (isEditing) => set((state) => ({ isEditing }))
})

export const useUI = create<UIState>()(
  persist(StoreApi, {
    name: 'ui-store'
  })
)
