import { type Floor } from 'types'
import { create, type StateCreator } from 'zustand'

export interface NewTypeFloor extends Omit<Floor, '_id'> {
  _id: string
}

interface FloorState {
  floor: NewTypeFloor | null
  setFloor: (flour: NewTypeFloor) => void
}

const StoreApi: StateCreator<FloorState> = (set) => ({
  floor: null,
  setFloor: (floor) => set(() => ({ floor }))
})

export const useFloor = create(StoreApi)
