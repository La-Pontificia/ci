import { type Record } from 'types/record'
import { create, type StateCreator } from 'zustand'

export interface NewRecord extends Omit<Record, '_id'> {
  _id: string
}

export interface TablesState {
  records: NewRecord[]
}

const StoreApi: StateCreator<TablesState> = (set) => {
  return {
    records: []
  }
}

export const useRecords = create(StoreApi)
