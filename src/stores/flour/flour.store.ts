import { type Floor } from 'types'
import { create, type StateCreator } from 'zustand'

interface FloorState {
  floor: Floor | null
  setFloor: (flour: Floor) => void
}

const StoreApi: StateCreator<FloorState> = (set) => ({
  floor: null,
  setFloor: (floor) => set(() => ({ floor }))
})

export const useFloor = create(StoreApi)
