import { User } from 'types'
import { create, type StateCreator } from 'zustand'
type Pages = 'home' | 'search' | 'configure' | 'create'

interface UIState {
  page: Pages
  setPage: (page: Pages) => void
  isCompanion: boolean
  setIsCompanion: (isCompanion: boolean) => void
  chairSelected: number | null
  setChairSelected: (chair: number | null) => void
  userSelected: User | null
  setUserSelected: (user: User | null) => void
  resetState: () => void
}

const StoreApi: StateCreator<UIState> = (set) => ({
  page: 'home',
  setPage: (page) => set({ page }),
  isCompanion: false,
  setIsCompanion: (isCompanion) => set({ isCompanion }),
  chairSelected: null,
  setChairSelected: (chairSelected) => set({ chairSelected }),
  userSelected: null,
  setUserSelected: (userSelected) => set({ userSelected }),
  resetState: () =>
    set({
      page: 'home',
      userSelected: null,
      chairSelected: null,
      isCompanion: false
    })
})

export const useModalTable = create<UIState>()(StoreApi)
