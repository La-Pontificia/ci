import { type Record } from 'types/record'
import { create, type StateCreator } from 'zustand'

export interface NewRecord extends Omit<Record, '_id'> {
  _id: string
}

export interface TablesState {
  records: NewRecord[]
  setRecords: (records: NewRecord[]) => void
}

const StoreApi: StateCreator<TablesState> = (set) => {
  return {
    records: [],
    setRecords: (records) => set({ records })
  }
}

export const useRecords = create(StoreApi)
