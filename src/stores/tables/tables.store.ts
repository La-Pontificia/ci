import axios from 'axios'
import { type Table } from 'types/table'
import { create, type StateCreator } from 'zustand'

export interface NewTypeTable extends Omit<Table, '_id'> {
  _id: string
}

interface TablesState {
  tables: NewTypeTable[]
  setTable: (table: NewTypeTable) => void
  setTables: (table: NewTypeTable[]) => void
  subscribeToApi: (floorId: string) => () => void
  fetchTables: (floorId: string) => Promise<void>
}

const StoreApi: StateCreator<TablesState> = (set) => {
  let intervalId: NodeJS.Timeout | null = null

  const fetchDataFromApi = async (floorId: string) => {
    const res = await axios.get(`/api/floors/${floorId}/tables`)
    set(() => ({ tables: res.data }))
  }

  return {
    tables: [],
    setTable: (table) => set((state) => ({ tables: [...state.tables, table] })),

    subscribeToApi: (floorId) => {
      void fetchDataFromApi(floorId)
      intervalId = setInterval(() => {
        void fetchDataFromApi(floorId)
      }, 300000)
      return () => {
        if (intervalId) {
          clearInterval(intervalId)
        }
      }
    },
    setTables: (tables) => set(() => ({ tables })),
    fetchTables: async (floorId) => {
      const res = await axios.get(`/api/floors/${floorId}/tables`)
      set(() => ({ tables: res.data }))
    }
  }
}

export const useTables = create(StoreApi)
